import { makeAutoObservable, runInAction } from "mobx";
import { IPost } from "../../../interfaces/News-Post-Incoming";
import axios from "axios";

export class PostStore {
  posts: IPost[] = [];
  authorsDataMap: { [key: number]: { username: string; email: string } } = {};
  private startPosition = 0;
  private quantityForFirstLoading = 20;
  private quantityForScrollLoading = 5;
  hasMore = true;

  constructor() {
    makeAutoObservable(this);
  }

  private async queryById(
    id: number
  ): Promise<{ username: string; email: string }> {
    if (this.authorsDataMap[id]) {
      return this.authorsDataMap[id];
    } else {
      const incomingData = await this.getById(id);
      runInAction(() => {
        this.authorsDataMap[id] = incomingData;
      });
      return incomingData;
    }
  }

  private async getById(
    id: number,
    apiURL = "https://jsonplaceholder.typicode.com/users"
  ): Promise<{ username: string; email: string }> {
    try {
      const incomingData = await axios.get(apiURL + `?id=${id}`);
      return {
        username: incomingData.data[0].username,
        email: incomingData.data[0].email,
      };
    } catch (error) {
      console.error("Failed to load user name and email", error);
      return { username: "some guy", email: "maybe girl@fuck.off" };
    }
  }

  async initLoadingPosts(
    apiURL: string = "https://jsonplaceholder.typicode.com/posts"
  ) {
    try {
      let offsetQuantity: number = this.quantityForFirstLoading;
      const incomingData = await axios.get(
        apiURL + `?_start=${this.startPosition}&_limit=${offsetQuantity}`
      );
      runInAction(() => {
        this.posts = [...this.posts, ...incomingData.data];
        if (incomingData.data.length === 0) {
          this.hasMore = false;
        }
        this.loadAuthorsData(this.posts);
        this.startPosition = this.posts.length;
      });
    } catch (error) {
      console.error("Failed to load posts", error);
    }
  }

  async loadNextPosts(
    apiURL: string = "https://jsonplaceholder.typicode.com/posts"
  ) {
    try {
      let offsetQuantity: number = this.quantityForScrollLoading;
      const incomingData = await axios.get(
        apiURL + `?_start=${this.startPosition}&_limit=${offsetQuantity}`
      );
      runInAction(() => {
        this.posts = [...this.posts, ...incomingData.data];
        if (incomingData.data.length === 0) {
          this.hasMore = false;
        }
        this.loadAuthorsData(this.posts);
        this.startPosition = this.posts.length;
      });
    } catch (error) {
      console.error("Failed to load posts", error);
    }
  }

  async loadAuthorsData(posts: IPost[]) {
    const uniqueUserIds = Array.from(new Set(posts.map((post) => post.userId)));
    for (const userId of uniqueUserIds) {
      if (!this.authorsDataMap[userId]) {
        await this.queryById(userId);
      }
    }
  }

  deletePost = (id: number) => {
    this.posts = this.posts.filter((post) => {
      return post.id !== id;
    });
  };

  sortPosts = (selectedValue: string) => {
    console.log(selectedValue);
    switch (selectedValue) {
      case "d-down":
        this.posts.sort((a, b) => b.id - a.id);
        break;
      case "t-up":
        this.posts.sort((a, b) =>
          a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase())
        );
        break;
      case "t-down":
        this.posts.sort((a, b) =>
          b.title.toLocaleLowerCase().localeCompare(a.title.toLocaleLowerCase())
        );
        break;

      case "d-up":
      default:
        this.posts.sort((a, b) => a.id - b.id);
        break;
    }
  };
}

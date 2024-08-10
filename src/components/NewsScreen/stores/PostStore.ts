import { makeAutoObservable, runInAction } from "mobx";
import { IPost } from "../../../interfaces/News-Post-Incoming";
import axios from "axios";

export class PostStore {
  posts: IPost[] = [];
  cashedPosts: IPost[] = [];
  authorsDataMap: { [key: number]: { username: string; email: string } } = {};

  currentSortingValue: string = "d-up";
  currentFilterValue: string = "all-posts";

  private startPosition = 0;
  private startPositionMP = 0;
  private quantityForFirstLoading = 20;
  private quantityForScrollLoading = 5;
  hasMore = true;
  isFirstRender = true;
  isFirstRenderMP = true;

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
        // because we get the array of objects (here length === 1)
        username: incomingData.data[0].username,
        email: incomingData.data[0].email,
      };
    } catch (error) {
      console.error("Failed to load user name and email", error);
      // this author will be shown in case of error
      return { username: "some guy", email: "maybe girl" };
    }
  }

  async initLoadingPosts(
    apiURL: string = "https://jsonplaceholder.typicode.com/posts?",
    withMyPostsFlag = false
  ) {
    try {
      let offsetQuantity: number = this.quantityForFirstLoading;
      const incomingData = await axios.get(
        apiURL + `_start=${this.startPosition}&_limit=${offsetQuantity}`
      );
      runInAction(() => {
        this.posts = [...this.posts, ...incomingData.data];
        if (incomingData.data.length === 0) {
          this.hasMore = false;
        }
        this.loadAuthorsData(this.posts);
        if (withMyPostsFlag) {
          this.startPositionMP = this.posts.length;
        } else {
          this.startPosition = this.posts.length;
        }
      });
    } catch (error) {
      console.error("Failed to load posts", error);
    }
  }

  async loadNextPosts(
    apiURL: string = "https://jsonplaceholder.typicode.com/posts?",
    withMyPostsFlag = false
  ) {
    try {
      let offsetQuantity: number = this.quantityForScrollLoading;
      const incomingData = await axios.get(
        apiURL + `_start=${this.startPosition}&_limit=${offsetQuantity}`
      );
      runInAction(() => {
        this.posts = [...this.posts, ...incomingData.data];
        if (incomingData.data.length === 0) {
          this.hasMore = false;
        }
        this.loadAuthorsData(this.posts);
        if (withMyPostsFlag) {
          this.startPositionMP = this.posts.length;
        } else {
          this.startPosition = this.posts.length;
        }
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

  filterPosts = (selectedValue: string) => {
    console.log(selectedValue);
    switch (selectedValue) {
      case "my-posts":
        runInAction(() => {
          this.startPosition = this.cashedPosts.length;
          this.startPositionMP = this.posts.length;
          [this.posts, this.cashedPosts] = [this.cashedPosts, this.posts];
          this.currentFilterValue = selectedValue;
        });
        break;

      case "all-posts":
      default:
        runInAction(() => {
          this.startPosition = this.posts.length;
          this.startPositionMP = this.cashedPosts.length;
          [this.posts, this.cashedPosts] = [this.cashedPosts, this.posts];
          this.currentFilterValue = selectedValue;
        });
    }
  };

  sortPosts = (selectedValue: string) => {
    console.log(selectedValue);
    switch (selectedValue) {
      case "d-down":
        this.posts.sort((a, b) => b.id - a.id);
        this.currentSortingValue = selectedValue;
        break;
      case "t-up":
        this.posts.sort((a, b) =>
          a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase())
        );
        this.currentSortingValue = selectedValue;
        break;
      case "t-down":
        this.posts.sort((a, b) =>
          b.title.toLocaleLowerCase().localeCompare(a.title.toLocaleLowerCase())
        );
        this.currentSortingValue = selectedValue;
        break;

      case "d-up":
      default:
        this.posts.sort((a, b) => a.id - b.id);
        this.currentSortingValue = selectedValue;
        break;
    }
  };
}

import { makeAutoObservable } from "mobx";
import { IPost } from "../../../interfaces/News-Post-Incoming";
import axios from "axios";

export class PostStore {
  posts: IPost[] = [];

  startPosition = 0;
  quantityForFirstLoading = 20;
  quantityForScrollLoading = 5;
  hasMore = true;

  constructor() {
    makeAutoObservable(this);
  }

  initLoadingPosts = async (apiURL: string) => {
    try {
      let offsetQuantity: number = this.quantityForFirstLoading;
      const incomingData = await axios.get(
        apiURL + `?_start=${this.startPosition}&_limit=${offsetQuantity}`
      );
      this.posts = [...this.posts, ...incomingData.data];
      if (incomingData.data.length === 0) {
        this.hasMore = false;
      }
    } catch (error) {
      console.error("Failed to load posts", error);
    } finally {
      this.startPosition = this.posts.length;
    }
  };

  loadNextPosts = async (apiURL: string) => {
    try {
      let offsetQuantity: number = this.quantityForScrollLoading;
      const incomingData = await axios.get(
        apiURL + `?_start=${this.startPosition}&_limit=${offsetQuantity}`
      );
      this.posts = [...this.posts, ...incomingData.data];
      if (incomingData.data.length === 0) {
        this.hasMore = false;
      }
    } catch (error) {
      console.error("Failed to load posts", error);
    } finally {
      this.startPosition = this.posts.length;
    }
  };

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

import { makeAutoObservable } from "mobx";
import { IPost } from "../../../interfaces/News-Post-Incoming";
import axios from "axios";

export class PostStore {
  posts: IPost[] = [];
  isLoading: boolean = false;

  startPosition = 0;
  quantityForFirstLoading = 10;
  quantityForScrollLoading = 5;
  isFirstLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  loadNextPosts = async (apiURL: string) => {
    try {
      let offsetQuantity: number;
      if (this.isFirstLoading) {
        offsetQuantity = this.quantityForFirstLoading;
      } else {
        offsetQuantity = this.quantityForScrollLoading;
      }
      const incomingData = await axios.get(
        apiURL + `?_start=${this.startPosition}&_limit=${offsetQuantity}`
      );
      this.posts = [...this.posts, ...incomingData.data];
    } catch (error) {
      console.error("Failed to load posts", error);
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

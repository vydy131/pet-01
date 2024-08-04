import { makeAutoObservable } from "mobx";
import { IPost } from "../../../interfaces/News-Post-Incoming";
import axios from "axios";

export class PostStore {
  posts: IPost[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadPosts = async (apiURL: string) => {
    this.isLoading = true;
    try {
      const incomingData = await axios.get(apiURL);
      this.posts = incomingData.data;
    } catch (error) {
      console.error("Failed to load posts", error);
    } finally {
      this.isLoading = false;
    }
  };
}

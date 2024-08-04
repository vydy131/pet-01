import { makeAutoObservable } from "mobx";
import { IPost } from "../../../interfaces/News-Post-Incoming";
import axios from "axios";

export class PostStore {
  posts: IPost[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadPosts = (apiURL: string) => {
    axios.get(apiURL).then((incomingData) => {
      this.posts = incomingData.data;
    });
  };
}

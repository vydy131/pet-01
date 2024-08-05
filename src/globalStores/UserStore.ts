import axios from "axios";
import { makeAutoObservable } from "mobx";
import { IUser } from "../interfaces/User-Profile-Incoming";

enum AuthLevel {
  unauthorized,
  authorized,
}

export class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  queryById = async (
    apiURL: string,
    id: number
  ): Promise<{ username: string; email: string }> => {
    try {
      const incomingData = await axios.get(apiURL + `?id=${id}`);
      console.log(incomingData.data[0].username, incomingData.data[0].email);
      return {
        username: incomingData.data[0].username,
        email: incomingData.data[0].email,
      };
    } catch (error) {
      console.error("Failed to load user name and email", error);
      return { username: "some guy", email: "maybe girl@fuck.off" };
    }
  };
}

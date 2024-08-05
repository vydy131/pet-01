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
}

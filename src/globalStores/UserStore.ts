import { makeAutoObservable } from "mobx";

enum AuthLevel {
  unauthorized,
  authorized,
}

export class UserStore {
  constructor() {
    makeAutoObservable(this);
  }
}

import axios from "axios";
import { makeAutoObservable } from "mobx";
import { IUser } from "../interfaces/User-Profile-Incoming";

enum AuthLevel {
  unauthorized,
  authorized,
}

export enum NavTabs {
  News,
  About,
  Null,
}

export class UserStore {
  currentTab: NavTabs = NavTabs.Null;

  constructor() {
    makeAutoObservable(this);
  }

  changeTab(newPosition: NavTabs) {
    this.currentTab = newPosition;
  }
}

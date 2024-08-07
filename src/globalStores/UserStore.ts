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

export enum ModalDialogs {
  Login,
  CreatingPost,
  ChangingPost,
  Null,
}

export class UserStore {
  currentTab: NavTabs = NavTabs.Null;
  currentModalDialog: ModalDialogs = ModalDialogs.Null;

  constructor() {
    makeAutoObservable(this);
  }

  changeTab(newPosition: NavTabs) {
    this.currentTab = newPosition;
  }

  changeModalDialog(newPosition: ModalDialogs) {
    this.currentModalDialog = newPosition;
  }
}

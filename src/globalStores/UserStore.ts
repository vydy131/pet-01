import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";
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
  currentUser: IUser | null = null;
  currentTab: NavTabs = NavTabs.Null;
  currentModalDialog: ModalDialogs = ModalDialogs.Null;
  currentAuthLevel: AuthLevel = AuthLevel.unauthorized;

  authUsername: string = "";
  authEmail: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  changeTab(newPosition: NavTabs) {
    this.currentTab = newPosition;
  }

  changeModalDialog(newPosition: ModalDialogs) {
    this.currentModalDialog = newPosition;
  }

  handleUsernameInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.authUsername = e.target.value;
  };

  handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.authEmail = e.target.value;
  };

  handlePreparedData = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.authUsername = "Samantha";
    this.authEmail = "Nathan@yesenia.net";
    e.preventDefault();
  };

  handleSubmitLoginForm = (e: any) => {
    e.preventDefault();
    console.log(e);
  };
}

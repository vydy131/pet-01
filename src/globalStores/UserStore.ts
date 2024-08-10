import { makeAutoObservable, runInAction } from "mobx";
import { ChangeEvent } from "react";
import { IUser } from "../interfaces/User-Profile-Incoming";
import axios from "axios";

export enum AuthLevel {
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
  Profile,
  CreatingPost,
  ChangingPost,
  Null,
}

export class UserStore {
  apiURL = "https://jsonplaceholder.typicode.com/users";

  currentUser: IUser | null = null;
  currentTab: NavTabs = NavTabs.Null;
  currentModalDialog: ModalDialogs = ModalDialogs.Null;
  currentAuthLevel: AuthLevel = AuthLevel.unauthorized;

  // These variables are here for Login form
  authUsername: string = "";
  authName: string = "";

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

  handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.authName = e.target.value;
  };

  // Only for tests
  handlePreparedData = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.authUsername = "Samantha";
    this.authName = "Clementine Bauch";
    e.preventDefault();
  };

  handleSubmitLoginForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const username = formData.get("username") as string;
    const name = formData.get("name") as string;

    try {
      axios.get(this.apiURL + `?username=${username}`).then((incomingData) => {
        if (incomingData.data.length === 0) {
          console.log("ERROR: NO USER WITH SUCH USERNAME");
        } else if (incomingData.data[0].name === name) {
          console.log("AUTH IS SUCCESSFUL");
          this.currentUser = incomingData.data[0];
          this.currentAuthLevel = AuthLevel.authorized;
          this.currentModalDialog = ModalDialogs.Profile;
        } else {
          console.log("WRONG NAME");
        }
      });
    } catch (error) {
      console.error("Failed to load user", error);
    }
  };

  handleLogOut = () => {
    runInAction(() => {
      this.currentUser = null;
      this.currentAuthLevel = AuthLevel.unauthorized;
      this.currentModalDialog = ModalDialogs.Login;
    });
  };
}

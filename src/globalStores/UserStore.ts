import { makeAutoObservable, runInAction } from "mobx";
import { ChangeEvent } from "react";
import { IUser } from "../interfaces/User-Profile";
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
  Signup,
  CreatingPost,
  Null,
}

export class UserStore {
  apiURL = "https://jsonplaceholder.typicode.com/users";

  currentUser: IUser | null = null;
  loadedUser: IUser | null = null;
  currentTab: NavTabs = NavTabs.Null;
  currentModalDialog: ModalDialogs = ModalDialogs.Null;
  currentAuthLevel: AuthLevel = AuthLevel.unauthorized;

  visibleProfileId: number = -1;

  // These variables are here for Login form
  authUsername: string = "";
  authName: string = "";
  warningText = "";

  // These variables are here for Sign up form
  name = "";
  username = "";
  email = "";
  street = "";
  suite = "";
  city = "";
  zipcode = "";
  lat = "";
  lng = "";
  phone = "";
  website = "";
  companyName = "";
  catchPhrase = "";
  bs = "";

  constructor() {
    makeAutoObservable(this);
  }

  changeTab(newPosition: NavTabs) {
    this.currentTab = newPosition;
  }

  changeModalDialog(newPosition: ModalDialogs) {
    this.currentModalDialog = newPosition;
  }

  changeVisibleProfileId(newPosition: number) {
    this.visibleProfileId = newPosition;
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
          this.warningText = "Wrong username or name";
        } else if (incomingData.data[0].name === name) {
          console.log("AUTH IS SUCCESSFUL");
          this.currentUser = incomingData.data[0];
          this.currentAuthLevel = AuthLevel.authorized;
          this.currentModalDialog = ModalDialogs.Profile;
          this.warningText = "";
        } else {
          console.log("WRONG NAME");
          this.warningText = "Wrong username or name";
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

  handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.currentModalDialog = ModalDialogs.Signup;
    e.preventDefault();
  };

  handleSubmitSignUpForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const street = formData.get("street") as string;
    const suite = formData.get("suite") as string;
    const city = formData.get("city") as string;
    const zipcode = formData.get("zipcode") as string;
    const lat = formData.get("lat") as string;
    const lng = formData.get("lng") as string;
    const phone = formData.get("phone") as string;
    const website = formData.get("website") as string;
    const companyName = formData.get("companyName") as string;
    const catchPhrase = formData.get("catchPhrase") as string;
    const bs = formData.get("bs") as string;

    const outcomingData: IUser = {
      id: Date.now(),
      name,
      username,
      email,
      address: {
        street,
        suite,
        city,
        zipcode,
        geo: {
          lat,
          lng,
        },
      },
      phone,
      website,
      company: {
        name: companyName,
        catchPhrase,
        bs,
      },
    };

    axios
      .post("https://jsonplaceholder.typicode.com/users", outcomingData)
      .then((response) => {
        this.currentUser = response.data;
        this.currentAuthLevel = AuthLevel.authorized;
        this.currentModalDialog = ModalDialogs.Null;
      });
  };

  async loadUserProfile(userId: number) {
    if (userId === -1) {
      runInAction(() => {
        this.loadedUser = this.currentUser;
      });
    } else {
      try {
        const response = await axios.get(this.apiURL + `?id=${userId}`);
        runInAction(() => {
          this.loadedUser = response.data[0];
        });
      } catch (error) {
        console.error("Failed to load user profile", error);
        runInAction(() => {
          this.loadedUser = null;
        });
      }
    }
  }

  handleSignupNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.name = e.target.value;
  };

  handleSignupUsernameInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.username = e.target.value;
  };

  handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.email = e.target.value;
  };

  handleStreetInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.street = e.target.value;
  };

  handleSuiteInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.suite = e.target.value;
  };

  handleCityInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.city = e.target.value;
  };

  handleZipcodeInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.zipcode = e.target.value;
  };

  handleLatInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.lat = e.target.value;
  };

  handleLngInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.lng = e.target.value;
  };

  handlePhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.phone = e.target.value;
  };

  handleWebsiteInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.website = e.target.value;
  };

  handleCompanyNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.companyName = e.target.value;
  };

  handleCatchPhraseInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.catchPhrase = e.target.value;
  };

  handleBsInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.bs = e.target.value;
  };

  handleClearSignupForm = () => {
    this.name = "";
    this.username = "";
    this.email = "";
    this.street = "";
    this.suite = "";
    this.city = "";
    this.zipcode = "";
    this.lat = "";
    this.lng = "";
    this.phone = "";
    this.website = "";
    this.companyName = "";
    this.catchPhrase = "";
    this.bs = "";
  };
}

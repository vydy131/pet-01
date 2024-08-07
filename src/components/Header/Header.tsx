import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Header.css";
import { GlobalStore } from "../../globalStores/GlobalStoreProvider";
import { ModalDialogs, NavTabs } from "../../globalStores/UserStore";
import { observer } from "mobx-react-lite";
import LoginModalDialog from "./LoginModalForm";
import ModalDialog from "../UI/ModalDialog";

const Header = observer(() => {
  const { userStore } = GlobalStore();
  return (
    <div className="header">
      <div className="high-bar">
        <div className="welcome-line">Welcome to my website!</div>
        <div className="profile-button">
          <button
            onClick={() => {
              userStore.changeModalDialog(ModalDialogs.Login);
            }}
          >
            Log in
          </button>
        </div>
        {userStore.currentModalDialog === ModalDialogs.Login ? (
          <ModalDialog>
            <LoginModalDialog />
          </ModalDialog>
        ) : null}
      </div>
      <nav className="nav-bar">
        <Link
          to="/NewsScreen"
          className={
            userStore.currentTab === NavTabs.News
              ? "nav-tab nav-tab-current"
              : "nav-tab"
          }
        >
          News
        </Link>
        <Link
          to="/AboutScreen"
          className={
            userStore.currentTab === NavTabs.About
              ? "nav-tab nav-tab-current"
              : "nav-tab"
          }
        >
          About
        </Link>
      </nav>
    </div>
  );
});

export default Header;

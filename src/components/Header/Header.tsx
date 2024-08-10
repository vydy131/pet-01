import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Header.css";
import { GlobalStore } from "../../globalStores/GlobalStoreProvider";
import { AuthLevel, ModalDialogs, NavTabs } from "../../globalStores/UserStore";
import { observer } from "mobx-react-lite";
import LoginModalDialog from "./LoginModalForm";
import ModalDialog from "../UI/ModalDialog";
import ProfileModalDialog from "./ProfileModalDialog";

const Header = observer(() => {
  const { userStore } = GlobalStore();

  const handleBackgroundClick = (e: MouseEvent) => {
    userStore.changeModalDialog(ModalDialogs.Null);
    e.stopPropagation();
  };

  return (
    <div className="header">
      <div className="high-bar">
        <div className="welcome-line">Welcome to my website!</div>
        <div className="profile-button">
          <button
            onClick={() => {
              if (userStore.currentAuthLevel === AuthLevel.unauthorized) {
                userStore.changeModalDialog(ModalDialogs.Login);
              } else {
                userStore.changeModalDialog(ModalDialogs.Profile);
              }
            }}
          >
            My profile
          </button>
        </div>
        {userStore.currentModalDialog === ModalDialogs.Login ? (
          <ModalDialog touchBackground={handleBackgroundClick}>
            <LoginModalDialog />
          </ModalDialog>
        ) : null}
        {userStore.currentModalDialog === ModalDialogs.Profile ? (
          <ModalDialog touchBackground={handleBackgroundClick}>
            <ProfileModalDialog />
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

import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Header.css";
import { GlobalStore } from "../../globalStores/GlobalStoreProvider";
import { NavTabs } from "../../globalStores/UserStore";
import { observer } from "mobx-react-lite";

const Header = observer(() => {
  const { userStore } = GlobalStore();
  return (
    <div className="header">
      <section className="welcome-line">Welcome to my website!</section>
      <nav className="nav-bar">
        <Link
          to="/NewsScreen"
          className={
            userStore.currentTab === NavTabs.News
              ? "nav-tab nav-tab-current"
              : "nab-tab"
          }
        >
          News
        </Link>
        <Link
          to="/AboutScreen"
          className={
            userStore.currentTab === NavTabs.About
              ? "nav-tab nav-tab-current"
              : "nab-tab"
          }
        >
          About
        </Link>
      </nav>
    </div>
  );
});

export default Header;

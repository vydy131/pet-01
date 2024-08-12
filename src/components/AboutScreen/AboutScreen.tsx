import React, { useEffect } from "react";
import { GlobalStore } from "../../globalStores/GlobalStoreProvider";
import { NavTabs } from "../../globalStores/UserStore";

function AboutScreen() {
  const { userStore } = GlobalStore();

  useEffect(() => {
    userStore.changeTab(NavTabs.About);
  }, []);

  return <div>AboutScreen</div>;
}

export default AboutScreen;

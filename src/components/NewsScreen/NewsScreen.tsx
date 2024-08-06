import { useEffect } from "react";
import { GlobalStore } from "../../globalStores/GlobalStoreProvider";
import { NavTabs } from "../../globalStores/UserStore";
import PostList from "./PostList";
import SortingPanel from "./SortingPanel";
import {
  NewsRootStore,
  NewsRootStoreContext,
} from "./stores/NewsStoreProvider";

function NewsScreen() {
  const { userStore } = GlobalStore();

  useEffect(() => {
    userStore.changeTab(NavTabs.News);
  }, []);

  return (
    <div>
      <NewsRootStoreContext.Provider value={new NewsRootStore()}>
        <SortingPanel />
        <PostList />
      </NewsRootStoreContext.Provider>
    </div>
  );
}

export default NewsScreen;

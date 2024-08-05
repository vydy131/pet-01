import PostList from "./PostList";
import SortingPanel from "./SortingPanel";
import {
  NewsRootStore,
  NewsRootStoreContext,
} from "./stores/NewsStoreProvider";

function NewsScreen() {
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

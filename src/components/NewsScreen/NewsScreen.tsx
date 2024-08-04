import PostList from "./PostList";
import {
  NewsRootStore,
  NewsRootStoreContext,
} from "./stores/NewsStoreProvider";

function NewsScreen() {
  return (
    <div>
      <NewsRootStoreContext.Provider value={new NewsRootStore()}>
        <PostList />
      </NewsRootStoreContext.Provider>
    </div>
  );
}

export default NewsScreen;

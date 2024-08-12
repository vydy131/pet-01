import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { NewsStore } from "./stores/NewsStoreProvider";
import "../../styles/PostList.css";
import PostItem from "./PostItem";
import { GlobalStore } from "../../globalStores/GlobalStoreProvider";
import PostCreateForm from "./PostCreateForm";

const PostList = observer(() => {
  const { postStore } = NewsStore();
  const { userStore } = GlobalStore();

  useEffect(() => {
    if (postStore.isFirstRender) {
      postStore.initLoadingPosts();
    }
    postStore.isFirstRender = false;
  }, [postStore]);

  useEffect(() => {
    if (postStore.currentFilterValue === "my-posts" && userStore.currentUser) {
      if (postStore.isFirstRenderMP) {
        postStore.initLoadingPosts(
          `https://jsonplaceholder.typicode.com/posts?userId=${userStore.currentUser.id}&`,
          true
        );
      }
      postStore.isFirstRenderMP = false;
    }
  }, [postStore, postStore.currentFilterValue]);

  return (
    <div className="post-list">
      {postStore.currentFilterValue === "my-posts" && userStore.currentUser ? (
        <>
          <PostCreateForm />
          <InfiniteScroll
            dataLength={postStore.myPosts.length}
            next={() => {
              return postStore.loadNextPosts(
                `https://jsonplaceholder.typicode.com/posts?userId=${
                  userStore.currentUser!.id
                }&`,
                true
              );
            }}
            hasMore={postStore.hasMoreMP}
            loader={<h1>LOADING BY INF SCR</h1>}
            endMessage={<h1>LOADING IS OVER</h1>}
          >
            {postStore.myPosts.map((post) => (
              <PostItem key={post.id} {...post} />
            ))}
          </InfiniteScroll>
        </>
      ) : (
        <InfiniteScroll
          dataLength={postStore.posts.length}
          next={() => {
            return postStore.loadNextPosts();
          }}
          hasMore={postStore.hasMore}
          loader={<h1>LOADING BY INF SCR</h1>}
          endMessage={<h1>LOADING IS OVER</h1>}
        >
          {postStore.posts.map((post) => (
            <PostItem key={post.id} {...post} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
});

export default PostList;

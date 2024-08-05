import { NewsStore } from "./stores/NewsStoreProvider";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const PostList = observer(() => {
  const { postStore } = NewsStore();
  let isFirstRender = true;

  useEffect(() => {
    if (isFirstRender) {
      console.log("Initial load of posts...");
      postStore.initLoadingPosts("https://jsonplaceholder.typicode.com/posts");
    }
    isFirstRender = false;
  }, [postStore]);

  return (
    <div>
      <InfiniteScroll
        dataLength={postStore.posts.length}
        next={() =>
          postStore.loadNextPosts("https://jsonplaceholder.typicode.com/posts")
        }
        hasMore={postStore.hasMore}
        loader={<h1>LOADING BY INF SCR</h1>}
        endMessage={<h1>LOADING IS OVER</h1>}
      >
        {postStore.posts.map((post) => {
          return (
            <div key={post.id}>
              <div>
                {post.title} key={post.id}
              </div>
              <div>{post.body}</div>
              <button
                onClick={() => {
                  postStore.deletePost(post.id);
                }}
              >
                Hide post
              </button>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
});

export default PostList;

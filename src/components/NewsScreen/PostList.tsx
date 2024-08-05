import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { NewsStore } from "./stores/NewsStoreProvider";

const PostList = observer(() => {
  const { postStore } = NewsStore();

  // There is an unknown bug, so don't erase isFirstRender and others rows
  // because in other way useEffect runs twice without offset's change
  let isFirstRender = true;
  useEffect(() => {
    if (isFirstRender) {
      postStore.initLoadingPosts();
    }
    isFirstRender = false;
  }, [postStore]);

  return (
    <div>
      <InfiniteScroll
        dataLength={postStore.posts.length}
        next={() => postStore.loadNextPosts()}
        hasMore={postStore.hasMore}
        loader={<h1>LOADING BY INF SCR</h1>}
        endMessage={<h1>LOADING IS OVER</h1>}
      >
        {postStore.posts.map((post) => {
          const author = postStore.authorsDataMap[post.userId];
          return (
            <div key={post.id}>
              <div>
                {post.title} key={post.id}
              </div>
              <div>{post.body}</div>
              {author ? (
                <address>
                  {author.username} - {author.email}
                </address>
              ) : (
                <address>Loading...</address>
              )}
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

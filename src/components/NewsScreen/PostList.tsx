import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { NewsStore } from "./stores/NewsStoreProvider";
import "../../styles/PostList.css";

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
    <div className="post-list">
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
            <div key={post.id} className="post-item">
              <div className="post-item-title">
                {post.title} key={post.id}
              </div>
              <div className="post-item-body">{post.body}</div>
              {author ? (
                <address className="post-item-author">
                  {author.username}, write me:{" "}
                  <span className="post-item-author-email">{author.email}</span>
                </address>
              ) : (
                <address className="post-item-author-loading">
                  Loading...
                </address>
              )}
              <button
                className="post-item-delete-button"
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

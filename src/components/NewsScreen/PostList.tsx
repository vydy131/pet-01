import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { NewsStore } from "./stores/NewsStoreProvider";
import "../../styles/PostList.css";
import PostItem from "./PostItem";
import { GlobalStore } from "../../globalStores/GlobalStoreProvider";
import PostCreateForm from "./PostCreateForm";
import { AuthLevel } from "../../globalStores/UserStore";
import { LoadIsOnComponent, LoadIsOverComponent } from "./LoadFillers";

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

  useEffect(() => {
    if (userStore.currentAuthLevel === AuthLevel.authorized) {
      if (!postStore.authorsDataMap[userStore.currentUser!.id]) {
        postStore.authorsDataMap[userStore.currentUser!.id] = {
          username: userStore.currentUser!.username,
          email: userStore.currentUser!.email,
        };
      }
    }
  }, [userStore.currentAuthLevel]);

  return (
    <div>
      {postStore.currentFilterValue === "my-posts" && userStore.currentUser ? (
        <>
          <PostCreateForm />
          <InfiniteScroll
            className="post-list"
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
            loader={
              <div>
                <LoadIsOnComponent />
              </div>
            }
            endMessage={
              <div>
                <LoadIsOverComponent />
              </div>
            }
          >
            {postStore.myPosts.map((post) => (
              <PostItem key={post.id} post={post} typeOfList="my-posts" />
            ))}
          </InfiniteScroll>
        </>
      ) : (
        <InfiniteScroll
          className="post-list"
          dataLength={postStore.posts.length}
          next={() => {
            return postStore.loadNextPosts();
          }}
          hasMore={postStore.hasMore}
          loader={
            <div>
              <LoadIsOnComponent />
            </div>
          }
          endMessage={
            <div>
              <LoadIsOverComponent />
            </div>
          }
        >
          {postStore.posts.map((post) => (
            <PostItem key={post.id} post={post} typeOfList="all-posts" />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
});

export default PostList;

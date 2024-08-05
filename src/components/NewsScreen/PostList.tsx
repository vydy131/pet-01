import { NewsStore } from "./stores/NewsStoreProvider";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { GlobalStore } from "../../globalStores/GlobalStoreProvider";

const PostList = observer(() => {
  const { postStore } = NewsStore();
  const { userStore } = GlobalStore();

  let isFirstRender = true;

  const [userDetails, setUserDetails] = useState<{
    [key: number]: { username: string; email: string };
  }>({});

  useEffect(() => {
    if (isFirstRender) {
      console.log("Initial load of posts...");
      postStore.initLoadingPosts("https://jsonplaceholder.typicode.com/posts");
    }
    isFirstRender = false;
  }, [postStore]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userIds = postStore.posts.map((post) => post.userId);
      const userDetailsMap: {
        [key: number]: { username: string; email: string };
      } = {};
      for (const userId of userIds) {
        if (!userDetails[userId]) {
          const userDetails = await userStore.queryById(
            "https://jsonplaceholder.typicode.com/users",
            userId
          );
          userDetailsMap[userId] = userDetails;
        }
      }
      setUserDetails(userDetailsMap);
    };

    fetchUserDetails();
  }, [postStore.posts, userStore]);

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
          const user = userDetails[post.userId];
          return (
            <div key={post.id}>
              <div>
                {post.title} key={post.id}
              </div>
              <div>{post.body}</div>
              <address>
                {user ? `${user.username} (${user.email})` : "Loading user..."}
              </address>
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

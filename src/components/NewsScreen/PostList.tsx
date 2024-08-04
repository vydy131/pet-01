import React, { useEffect } from "react";
import { NewsStore } from "./stores/NewsStoreProvider";
import { observer } from "mobx-react-lite";
import LoadElement from "../UI/LoadElement";

const PostList = observer(() => {
  const { postStore } = NewsStore();

  useEffect(() => {
    postStore.isLoading = true;
    postStore.loadPosts("https://jsonplaceholder.typicode.com/posts");
    postStore.isLoading = false;
  }, [postStore, postStore.isLoading]);

  return (
    <div>
      <LoadElement isLoading={postStore.isLoading}>
        <ol>
          {postStore.posts.map((post) => {
            return (
              <li key={post.id}>
                <div>{post.title}</div>
                <div>{post.body}</div>
              </li>
            );
          })}
        </ol>
      </LoadElement>
    </div>
  );
});

export default PostList;

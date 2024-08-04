import React, { useEffect } from "react";
import { NewsStore } from "./stores/NewsStoreProvider";
import { observer } from "mobx-react-lite";
import LoadElement from "../UI/LoadElement";

const PostList = observer(() => {
  const { postStore } = NewsStore();

  useEffect(() => {
    postStore.loadPosts("https://jsonplaceholder.typicode.com/posts");
  }, [postStore]);

  return (
    <div>
      <LoadElement isLoading={postStore.isLoading}>
        <ol>
          {postStore.posts.map((post) => {
            return (
              <li key={post.id}>
                <div>{post.title}</div>
                <div>{post.body}</div>
                <button
                  onClick={() => {
                    postStore.deletePost(post.id);
                  }}
                >
                  Hide post
                </button>
              </li>
            );
          })}
        </ol>
      </LoadElement>
    </div>
  );
});

export default PostList;

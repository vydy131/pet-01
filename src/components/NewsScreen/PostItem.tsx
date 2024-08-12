import React from "react";
import { IPost } from "../../interfaces/News-Post";
import { NewsStore } from "./stores/NewsStoreProvider";
import "../../styles/PostList.css";

const PostItem: React.FC<IPost> = (post: IPost) => {
  const { postStore } = NewsStore();

  const author = postStore.authorsDataMap[post.userId];
  return (
    <div className="post-item">
      <div className="post-item-header">
        <div className="post-item-title">
          {post.title} key={post.id}
        </div>
        <button
          className="post-item-delete-button"
          onClick={() => {
            postStore.deletePost(post.id);
          }}
        >
          Hide post
        </button>
      </div>
      <div className="post-item-body">{post.body}</div>
      {author ? (
        <address className="post-item-author">
          from {author.username} <br />
          <span className="post-item-author-email">{author.email}</span>
        </address>
      ) : (
        <address className="post-item-author-loading">Loading...</address>
      )}
    </div>
  );
};

export default PostItem;

import React from "react";
import { IPost } from "../../interfaces/News-Post";
import { NewsStore } from "./stores/NewsStoreProvider";
import "../../styles/PostList.css";
import { GlobalStore } from "../../globalStores/GlobalStoreProvider";
import { ModalDialogs } from "../../globalStores/UserStore";

interface IPostItem {
  post: IPost;
  typeOfList: "all-posts" | "my-posts";
}

const PostItem: React.FC<IPostItem> = ({ post, typeOfList }) => {
  const { postStore } = NewsStore();
  const { userStore } = GlobalStore();

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
            postStore.deletePost(post.id, typeOfList);
          }}
        >
          Hide post
        </button>
      </div>
      <div className="post-item-body">{post.body}</div>
      {author ? (
        <address className="post-item-author">
          from{" "}
          <span
            onClick={() => {
              userStore.changeVisibleProfileId(post.userId);
              userStore.changeModalDialog(ModalDialogs.Profile);
            }}
          >
            {author.username}
          </span>{" "}
          <br />
          <a href={`mailto:${author.email}`} className="post-item-author-email">
            {author.email}
          </a>
        </address>
      ) : (
        <address className="post-item-author-loading">Loading...</address>
      )}
    </div>
  );
};

export default PostItem;

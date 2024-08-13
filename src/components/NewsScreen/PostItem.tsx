import React from "react";
import { IPost } from "../../interfaces/News-Post";
import { NewsStore } from "./stores/NewsStoreProvider";
import "../../styles/PostList.css";
import { GlobalStore } from "../../globalStores/GlobalStoreProvider";
import { ModalDialogs } from "../../globalStores/UserStore";
import { observer } from "mobx-react-lite";

interface IPostItem {
  post: IPost;
  typeOfList: "all-posts" | "my-posts";
}

const PostItem: React.FC<IPostItem> = observer(({ post, typeOfList }) => {
  const { postStore } = NewsStore();
  const { userStore } = GlobalStore();

  const author = postStore.authorsDataMap[post.userId];

  return (
    <div
      className={`post-item ${
        post.id === postStore.activeItemId ? "active-item" : null
      }`}
      onClick={() => {
        postStore.handleItemClick(post.id);
      }}
    >
      <div className="image-div">
        <img
          className={`post-image ${
            post.id !== postStore.activeItemId ? "post-image-inactive" : null
          }`}
          src="data:image/jpeg;base64,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"
          alt="photo.png"
        />
      </div>

      <div className="post-item-header">
        <div className="post-item-title">
          {post.title} key={post.id}
        </div>

        <img
          src="https://ikonki.svgpng.ru/wp-content/uploads/2021/12/Krestiksvgpng.ru_.png"
          alt="Hide"
          onClick={(e) => {
            postStore.deletePost(post.id, typeOfList);
            e.stopPropagation();
          }}
          className="post-item-delete-button"
        />
      </div>
      <div
        className={
          post.id === postStore.activeItemId
            ? "post-item-active-body"
            : "post-item-inactive-body"
        }
      >
        {post.body}
      </div>
      {author ? (
        <address className="post-item-author">
          from{" "}
          <span
            className="post-item-author-username"
            onClick={() => {
              userStore.changeVisibleProfileId(post.userId);
              userStore.changeModalDialog(ModalDialogs.Profile);
            }}
          >
            {author.username}
          </span>
          <div>
            <a
              href={`mailto:${author.email}`}
              className="post-item-author-email"
            >
              {author.email}
            </a>
          </div>
        </address>
      ) : (
        <address className="post-item-author-loading">Loading...</address>
      )}
    </div>
  );
});

export default PostItem;

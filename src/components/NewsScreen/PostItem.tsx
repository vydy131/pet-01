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
  const image = postStore.imagesDataMap[post.id];

  return (
    <div
      className={`post-item ${
        post.id === postStore.activeItemId ? "active-item" : null
      }`}
      onClick={() => {
        postStore.handleItemClick(post.id);
      }}
    >
      {image ? (
        <div className="image-div">
          <img
            className={`post-image ${
              post.id !== postStore.activeItemId ? "post-image-inactive" : null
            }`}
            src={image.url}
            alt="photo is unavailable"
          />
        </div>
      ) : (
        <div className="post-item-image-loading">Load image...</div>
      )}

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
      {post.id === postStore.activeItemId && (
        <div className="post-comments">
          {!postStore.commentsDataMap[post.id]?.comments && (
            <button
              className="post-comments-button"
              onClick={() => postStore.loadInitialComments(post.id)}
            >
              Show comments
            </button>
          )}

          {Object.values(
            postStore.commentsDataMap[post.id]?.comments || {}
          ).map((comment) => (
            <div key={comment.body} className="comment">
              <div className="first-letter comment-title">{comment.title}</div>
              <div className="first-letter">{comment.body}</div>
              <a
                href={`mailto:${comment.userEmail}`}
                className="first-letter comment-email"
              >
                {comment.userEmail}
              </a>
            </div>
          ))}

          {postStore.commentsDataMap[post.id]?.canLoadMore && (
            <button onClick={() => postStore.loadMoreComments(post.id)}>
              More comments
            </button>
          )}
        </div>
      )}
    </div>
  );
});

export default PostItem;

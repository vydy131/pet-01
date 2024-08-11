import React from "react";
import { NewsStore } from "./stores/NewsStoreProvider";
import "../../styles/CreatePostForm.css";

const CreatePostForm = () => {
  const { postStore } = NewsStore();

  return (
    <div>
      <form className="form" onSubmit={postStore.handleSubmitCreatePostForm}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Create new post!</legend>
          <input
            className="title-input"
            type="text"
            name="title"
            placeholder="Title"
            value={postStore.createPostTitle}
            onChange={postStore.handleTitleInput}
          />
          {postStore.showCreatePostWarning && (
            <div>
              Title must contain at least 10 symbols and text - at least 30
            </div>
          )}
          <textarea
            className="text-input"
            placeholder="Write here whatever you want"
            name="text"
            value={postStore.createPostText}
            onChange={postStore.handleTextInput}
          ></textarea>
          <button type="submit" className="publ-btn">
            Publish!
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreatePostForm;

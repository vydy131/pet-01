import React from "react";
import { NewsStore } from "./stores/NewsStoreProvider";

const CreatePostForm = () => {
  const { postStore } = NewsStore();

  return (
    <div>
      <form>
        <fieldset>
          <legend>Create new post!</legend>
          <label>
            Title
            <input type="text" />
          </label>
        </fieldset>
      </form>
    </div>
  );
};

export default CreatePostForm;

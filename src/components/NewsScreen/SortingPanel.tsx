import { observer } from "mobx-react-lite";
import React from "react";
import { NewsStore } from "./stores/NewsStoreProvider";

const SortingPanel = observer(() => {
  const { postStore } = NewsStore();

  return (
    <div>
      <select
        name="sortPosts"
        id="sortPosts"
        onChange={(e) => {
          postStore.sortPosts(e.target.value);
        }}
      >
        <optgroup label="Date">
          <option value="d-up">Up</option>
          <option value="d-down">Down</option>
        </optgroup>
        <optgroup label="Title">
          <option value="t-up">Up</option>
          <option value="t-down">Down</option>
        </optgroup>
      </select>
    </div>
  );
});

export default SortingPanel;

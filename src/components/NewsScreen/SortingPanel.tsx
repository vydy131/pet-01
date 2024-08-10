import { observer } from "mobx-react-lite";
import React from "react";
import { NewsStore } from "./stores/NewsStoreProvider";
import "../../styles/SortingPanel.css";
import { GlobalStore } from "../../globalStores/GlobalStoreProvider";
import { AuthLevel } from "../../globalStores/UserStore";

const SortingPanel = observer(() => {
  const { userStore } = GlobalStore();
  const { postStore } = NewsStore();

  // return (
  //   <div className="sort-panel">
  //     <select
  //       name="sortPosts"
  //       id="sortPosts"
  //       onChange={(e) => {
  //         postStore.sortPosts(e.target.value);
  //       }}
  //     >
  //       <optgroup label="Date">
  //         <option value="d-up">Up</option>
  //         <option value="d-down">Down</option>
  //       </optgroup>
  //       <optgroup label="Title">
  //         <option value="t-up">Up</option>
  //         <option value="t-down">Down</option>
  //       </optgroup>
  //     </select>
  //   </div>
  // );

  return (
    <div className="sort-panel">
      {userStore.currentAuthLevel === AuthLevel.authorized ? (
        <form>
          <fieldset>
            <legend>Show me...</legend>
            <input
              type="radio"
              id="my-posts"
              value="my-posts"
              name="filter"
              checked={postStore.currentFilterValue === "my-posts"}
              onChange={(e) => {
                postStore.filterPosts(e.target.value);
              }}
            />
            <label htmlFor="my-posts">My posts</label>
            <input
              type="radio"
              id="all-posts"
              value="all-posts"
              name="filter"
              checked={postStore.currentFilterValue === "all-posts"}
              onChange={(e) => {
                postStore.filterPosts(e.target.value);
              }}
            />
            <label htmlFor="all-posts">All posts</label>
          </fieldset>
        </form>
      ) : null}
      <form>
        <fieldset>
          <legend>Sort by</legend>
          <input
            type="radio"
            id="d-up"
            value="d-up"
            name="sort"
            checked={postStore.currentSortingValue === "d-up"}
            onChange={(e) => {
              postStore.sortPosts(e.target.value);
            }}
          />
          <label htmlFor="d-up">Date up</label>
          <input
            type="radio"
            id="d-down"
            value="d-down"
            name="sort"
            checked={postStore.currentSortingValue === "d-down"}
            onChange={(e) => {
              postStore.sortPosts(e.target.value);
            }}
          />
          <label htmlFor="d-down">Date down</label>
          <input
            type="radio"
            id="t-up"
            value="t-up"
            name="sort"
            checked={postStore.currentSortingValue === "t-up"}
            onChange={(e) => {
              postStore.sortPosts(e.target.value);
            }}
          />
          <label htmlFor="t-up">Title up</label>
          <input
            type="radio"
            id="t-down"
            value="t-down"
            name="sort"
            checked={postStore.currentSortingValue === "t-down"}
            onChange={(e) => {
              postStore.sortPosts(e.target.value);
            }}
          />
          <label htmlFor="t-down">Title down</label>
        </fieldset>
      </form>
    </div>
  );
});

export default SortingPanel;

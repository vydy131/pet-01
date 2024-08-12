import React from "react";
import "../../styles/PostList.css";

function LoadIsOnComponent() {
  return (
    <div className="post-item" style={{ textAlign: "center" }}>
      <div className="post-item-header">
        <div className="post-item-title">We load new posts right now</div>
      </div>
      <div className="post-item-body">They are really interesting</div>
      <address className="post-item-author-loading">Loading...</address>
    </div>
  );
}

function LoadIsOverComponent() {
  return (
    <div className="post-item" style={{ textAlign: "center" }}>
      <div className="post-item-header" style={{ justifyContent: "center" }}>
        <div className="post-item-title">You've seen all posts</div>
      </div>
      <div className="post-item-body">But YOU can make a new one</div>
      <address className="post-item-author-loading">Try it right now!</address>
    </div>
  );
}

export { LoadIsOnComponent, LoadIsOverComponent };

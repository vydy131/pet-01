import React from "react";
import "../../styles/ModalDialog.css";

function ModalDialog({ children, touchBackground, ...props }: any) {
  return (
    <div className="modal-background" onClick={touchBackground}>
      <div
        className="modal-base"
        {...props}
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
        }}
      >
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

export default ModalDialog;

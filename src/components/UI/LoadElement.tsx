import { observer } from "mobx-react-lite";
import React from "react";

const LoadElement = observer(({ children, isLoading, ...props }: any) => {
  if (isLoading) {
    return <div {...props}>LOADER ACTIVE</div>;
  }
  return <div>{children}</div>;
});

export default LoadElement;

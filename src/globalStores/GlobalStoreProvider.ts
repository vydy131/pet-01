import { createContext, useContext } from "react";
import { UserStore } from "./UserStore";

export class GlobalRootStore {
  userStore = new UserStore();
}

export const GlobalRootStoreContext = createContext<GlobalRootStore | null>(
  null
);

export const GlobalStore = () => {
  const context = useContext(GlobalRootStoreContext);
  if (context === null) {
    throw new Error(
      "You have forgotten to wrap your root component with GlobalRootStoreProvider"
    );
  }
  return context;
};

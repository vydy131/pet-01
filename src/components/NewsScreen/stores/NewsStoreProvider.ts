import { useContext, createContext } from "react";
import { PostStore } from "./PostStore";

export class NewsRootStore {
  postStore = new PostStore();
}

export const NewsRootStoreContext = createContext<NewsRootStore | null>(null);

export const NewsStore = () => {
  const context = useContext(NewsRootStoreContext);
  if (context === null) {
    throw new Error(
      "You have forgotten to wrap your root component with NewsRootStoreProvider"
    );
  }
  return context;
};

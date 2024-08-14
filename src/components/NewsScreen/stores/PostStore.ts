import { makeAutoObservable, runInAction } from "mobx";
import { IPost } from "../../../interfaces/News-Post";
import axios from "axios";
import { ChangeEvent } from "react";
import { IUser } from "../../../interfaces/User-Profile";

export class PostStore {
  posts: IPost[] = [];
  myPosts: IPost[] = [];
  authorsDataMap: { [key: number]: { username: string; email: string } } = {};
  imagesDataMap: { [key: number]: { title: string; url: string } } = {};

  currentSortingValue: string = "d-up";
  currentFilterValue: string = "all-posts";

  private startPosition = 0;
  private startPositionMP = 0;
  private quantityForFirstLoading = 20;
  private quantityForScrollLoading = 5;
  hasMore = true;
  hasMoreMP = true;
  isFirstRender = true;
  isFirstRenderMP = true;

  showCreatePostWarning = false;
  createPostTitle: string = "";
  createPostText: string = "";

  activeItemId = -1;

  constructor() {
    makeAutoObservable(this);
  }

  private async queryById(
    id: number
  ): Promise<{ username: string; email: string }> {
    if (this.authorsDataMap[id]) {
      return this.authorsDataMap[id];
    } else {
      const incomingData = await this.getById(id);
      runInAction(() => {
        this.authorsDataMap[id] = incomingData;
      });
      return incomingData;
    }
  }

  private async queryImageById(
    id: number
  ): Promise<{ title: string; url: string }> {
    if (this.imagesDataMap[id]) {
      return this.imagesDataMap[id];
    } else {
      const incomingData = await this.getImageById(id);
      runInAction(() => {
        this.imagesDataMap[id] = incomingData;
      });
      return incomingData;
    }
  }

  private async getById(
    id: number,
    apiURL = "https://jsonplaceholder.typicode.com/users"
  ): Promise<{ username: string; email: string }> {
    try {
      const incomingData = await axios.get(apiURL + `?id=${id}`);
      return {
        // because we get the array of objects (here length === 1)
        username: incomingData.data[0].username,
        email: incomingData.data[0].email,
      };
    } catch (error) {
      console.error("Failed to load user name and email", error);
      // this author will be shown in case of error
      return { username: "some guy", email: "maybe girl" };
    }
  }

  private async getImageById(
    id: number,
    apiURL = "https://jsonplaceholder.typicode.com/photos"
  ): Promise<{ title: string; url: string }> {
    try {
      const incomingData = await axios.get(apiURL + `?id=${id}`);
      return {
        // because we get the array of objects (here length === 1)
        title: incomingData.data[0].title,
        url: incomingData.data[0].url,
      };
    } catch (error) {
      console.error("Failed to load image", error);
      // this author will be shown in case of error
      return {
        title: "_default_image_",
        url: "https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1",
      };
    }
  }

  async initLoadingPosts(
    apiURL: string = "https://jsonplaceholder.typicode.com/posts?",
    withMyPostsFlag = false
  ) {
    try {
      let offsetQuantity: number = this.quantityForFirstLoading;
      const incomingData = await axios.get(
        withMyPostsFlag
          ? apiURL + `_start=${this.startPositionMP}&_limit=${offsetQuantity}`
          : apiURL + `_start=${this.startPosition}&_limit=${offsetQuantity}`
      );
      runInAction(() => {
        if (!withMyPostsFlag) {
          this.posts = [...this.posts, ...incomingData.data];
          if (incomingData.data.length === 0) {
            this.hasMore = false;
          }
          this.loadAuthorsData(this.posts);
          this.loadImagesData(this.posts);
          this.startPosition = this.posts.length;
        } else {
          this.myPosts = [...this.myPosts, ...incomingData.data];
          if (incomingData.data.length === 0) {
            this.hasMoreMP = false;
          }
          this.loadAuthorsData(this.myPosts);
          this.loadImagesData(this.myPosts);
          this.startPositionMP = this.myPosts.length;
        }
      });
    } catch (error) {
      console.error("Failed to load posts", error);
    }
  }

  async loadNextPosts(
    apiURL: string = "https://jsonplaceholder.typicode.com/posts?",
    withMyPostsFlag = false
  ) {
    try {
      let offsetQuantity: number = this.quantityForScrollLoading;
      const incomingData = await axios.get(
        withMyPostsFlag
          ? apiURL + `_start=${this.startPositionMP}&_limit=${offsetQuantity}`
          : apiURL + `_start=${this.startPosition}&_limit=${offsetQuantity}`
      );
      runInAction(() => {
        if (!withMyPostsFlag) {
          this.posts = [...this.posts, ...incomingData.data];
          if (incomingData.data.length === 0) {
            this.hasMore = false;
          }
          this.loadAuthorsData(this.posts);
          this.loadImagesData(this.posts);
          this.startPosition = this.posts.length;
        } else {
          this.myPosts = [...this.myPosts, ...incomingData.data];
          if (incomingData.data.length === 0) {
            this.hasMoreMP = false;
          }
          this.loadAuthorsData(this.myPosts);
          this.loadImagesData(this.myPosts);
          this.startPositionMP = this.myPosts.length;
        }
      });
    } catch (error) {
      console.error("Failed to load posts", error);
    }
  }

  async loadAuthorsData(posts: IPost[]) {
    const uniqueUserIds = Array.from(new Set(posts.map((post) => post.userId)));
    for (const userId of uniqueUserIds) {
      if (!this.authorsDataMap[userId]) {
        const authorData = await this.queryById(userId);
        runInAction(() => {
          this.authorsDataMap[userId] = authorData;
        });
      }
    }
    runInAction(() => {
      this.posts = [...this.posts];
      this.myPosts = [...this.myPosts];
    });
  }

  async loadImagesData(posts: IPost[]) {
    // Image.id === Post.id
    const uniqueImageIds = Array.from(new Set(posts.map((post) => post.id)));
    for (const imageId of uniqueImageIds) {
      if (!this.imagesDataMap[imageId]) {
        const imageData = await this.queryImageById(imageId);
        runInAction(() => {
          this.imagesDataMap[imageId] = imageData;
        });
      }
    }
    // rerender post, 'cause sometimes data is loaded, but not showed
    runInAction(() => {
      this.posts = [...this.posts];
      this.myPosts = [...this.myPosts];
    });
  }

  // updateAuthorsDataMap = (userProfile: IUser) => {
  //   const { id, username, email } = userProfile;
  //   this.authorsDataMap[id] = {
  //     username,
  //     email,
  //   };
  // };

  deletePost = (id: number, typeOfList: "all-posts" | "my-posts") => {
    if (typeOfList === "all-posts") {
      this.posts = this.posts.filter((post) => {
        return post.id !== id;
      });
    } else {
      this.myPosts = this.myPosts.filter((post) => {
        return post.id !== id;
      });
    }
  };

  filterPosts = (selectedValue: string) => {
    this.currentFilterValue = selectedValue;
    this.hasMore = true;
    this.hasMoreMP = true;
    this.isFirstRender = true;
    this.isFirstRenderMP = true;
  };

  sortPosts = (selectedValue: string) => {
    console.log(selectedValue);
    switch (selectedValue) {
      case "d-down":
        this.posts.sort((a, b) => b.id - a.id);
        this.currentSortingValue = selectedValue;
        break;
      case "t-up":
        this.posts.sort((a, b) =>
          a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase())
        );
        this.currentSortingValue = selectedValue;
        break;
      case "t-down":
        this.posts.sort((a, b) =>
          b.title.toLocaleLowerCase().localeCompare(a.title.toLocaleLowerCase())
        );
        this.currentSortingValue = selectedValue;
        break;

      case "d-up":
      default:
        this.posts.sort((a, b) => a.id - b.id);
        this.currentSortingValue = selectedValue;
        break;
    }
  };

  handleTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.createPostTitle = e.target.value;
    if (this.createPostTitle.length >= 10 && this.createPostText.length >= 30) {
      this.showCreatePostWarning = false;
    }
  };

  handleTextInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.createPostText = e.target.value;
    if (this.createPostTitle.length >= 10 && this.createPostText.length >= 30) {
      this.showCreatePostWarning = false;
    }
  };

  handleSubmitCreatePostForm = (
    e: React.FormEvent<HTMLFormElement>,
    userId: number
  ) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const title = formData.get("title") as string;
    const text = formData.get("text") as string;

    if (title.length < 10 || text.length < 30) {
      this.showCreatePostWarning = true;
      return;
    }

    const outcomingData: IPost = {
      userId,
      id: Date.now(),
      title,
      body: text,
    };

    axios
      .post("https://jsonplaceholder.typicode.com/posts", outcomingData)
      .then((response) => {
        this.myPosts = [response.data, ...this.myPosts];
        this.posts = [...this.posts, response.data];
      });

    this.createPostText = "";
    this.createPostTitle = "";
    this.showCreatePostWarning = false;
  };

  handleItemClick = (id: number) => {
    this.activeItemId = id;
  };
}

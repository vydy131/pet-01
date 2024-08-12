import { observer } from "mobx-react-lite";
import React from "react";
import { GlobalStore } from "../../globalStores/GlobalStoreProvider";
import "../../styles/LoginForm.css";

const LoginModalForm = observer(() => {
  const { userStore } = GlobalStore();

  return (
    <div>
      <form onSubmit={userStore.handleSubmitLoginForm}>
        <fieldset>
          <legend>Log in</legend>
          <label>
            Username
            <input
              value={userStore.authUsername}
              onChange={userStore.handleUsernameInput}
              type="text"
              name="username"
            />
          </label>
          <label>
            Email
            <input
              value={userStore.authName}
              onChange={userStore.handleNameInput}
              type="name"
              name="name"
            />
          </label>
          <button onClick={userStore.handlePreparedData}>
            Continue with prepared data
          </button>
          <div>{userStore.warningText}</div>
          <button type="submit">Log in</button>
        </fieldset>
        <button onClick={userStore.handleSignUp}>Sign up</button>
      </form>
    </div>
  );
});

export default LoginModalForm;

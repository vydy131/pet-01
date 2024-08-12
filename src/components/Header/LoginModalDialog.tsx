import { observer } from "mobx-react-lite";
import React from "react";
import { GlobalStore } from "../../globalStores/GlobalStoreProvider";
import "../../styles/LoginForm.css";

const LoginModalForm = observer(() => {
  const { userStore } = GlobalStore();

  return (
    <div>
      <form onSubmit={userStore.handleSubmitLoginForm} className="login-form">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Log in</legend>
          <label className="username-label">
            Username
            <input
              value={userStore.authUsername}
              onChange={userStore.handleUsernameInput}
              type="text"
              name="username"
              className="username-input"
            />
          </label>
          <label className="name-label">
            Name
            <input
              value={userStore.authName}
              onChange={userStore.handleNameInput}
              type="name"
              name="name"
              className="name-input"
            />
          </label>
          <button
            onClick={userStore.handlePreparedData}
            className="prepared-data-btn"
          >
            Continue with prepared data
          </button>
          <div>{userStore.warningText}</div>
          <button type="submit" className="submit-btn">
            Log in
          </button>
        </fieldset>
        <button onClick={userStore.handleSignUp} className="signup-btn">
          Sign up
        </button>
      </form>
    </div>
  );
});

export default LoginModalForm;

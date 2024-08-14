import { observer } from "mobx-react-lite";
import React from "react";
import { GlobalStore } from "../../globalStores/GlobalStoreProvider";
import "../../styles/LoginForm.css";

const LoginModalForm = observer(() => {
  const { userStore } = GlobalStore();

  return (
    <div>
      <form onSubmit={userStore.handleSubmitLoginForm} className="login-form">
        <fieldset className="modal-fieldset">
          <legend className="fieldset-legend">Log in</legend>
          <div className="login-fieldset-content">
            <div className="login-inputs">
              <label className="username-label">
                Username:
                <input
                  value={userStore.authUsername}
                  onChange={userStore.handleUsernameInput}
                  type="text"
                  name="username"
                  className="username-input"
                />
              </label>
              <label className="name-label">
                Name:
                <input
                  value={userStore.authName}
                  onChange={userStore.handleNameInput}
                  type="name"
                  name="name"
                  className="name-input"
                />
              </label>
            </div>
            <div className="login-warning">{userStore.warningText}</div>
            <button
              onClick={userStore.handlePreparedData}
              className="prepared-data-btn"
            >
              Continue with prepared data
            </button>
            <button type="submit" className="submit-btn">
              Log in
            </button>
          </div>
        </fieldset>
        <button onClick={userStore.handleSignUp} className="signup-btn">
          Sign up
        </button>
      </form>
    </div>
  );
});

export default LoginModalForm;

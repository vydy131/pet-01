import { observer } from "mobx-react-lite";
import React from "react";
import { GlobalStore } from "../../globalStores/GlobalStoreProvider";

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
            />
          </label>
          <label>
            Email
            <input
              value={userStore.authEmail}
              onChange={userStore.handleEmailInput}
              type="email"
            />
          </label>
        </fieldset>
        <button type="submit">Log in</button>
        <button onClick={userStore.handlePreparedData}>
          Continue with prepared data
        </button>
      </form>
    </div>
  );
});

export default LoginModalForm;

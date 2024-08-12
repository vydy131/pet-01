import { observer } from "mobx-react-lite";
import { GlobalStore } from "../../globalStores/GlobalStoreProvider";
import { NewsStore } from "../NewsScreen/stores/NewsStoreProvider";

const SignupModalDialog = observer(() => {
  const { userStore } = GlobalStore();

  return (
    <form onSubmit={userStore.handleSubmitSignUpForm}>
      <fieldset>
        <legend>User Information</legend>

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={userStore.name}
            onChange={userStore.handleSignupNameInput}
          />
        </label>

        <label>
          Username:
          <input
            type="text"
            name="username"
            value={userStore.username}
            onChange={userStore.handleSignupUsernameInput}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userStore.email}
            onChange={userStore.handleEmailInput}
          />
        </label>

        <fieldset>
          <legend>Address</legend>

          <label>
            Street:
            <input
              type="text"
              name="street"
              value={userStore.street}
              onChange={userStore.handleStreetInput}
            />
          </label>

          <label>
            Suite:
            <input
              type="text"
              name="suite"
              value={userStore.suite}
              onChange={userStore.handleSuiteInput}
            />
          </label>

          <label>
            City:
            <input
              type="text"
              name="city"
              value={userStore.city}
              onChange={userStore.handleCityInput}
            />
          </label>

          <label>
            Zipcode:
            <input
              type="text"
              name="zipcode"
              value={userStore.zipcode}
              onChange={userStore.handleZipcodeInput}
            />
          </label>

          <fieldset>
            <legend>Geo</legend>

            <label>
              Lat:
              <input
                type="text"
                name="lat"
                value={userStore.lat}
                onChange={userStore.handleLatInput}
              />
            </label>

            <label>
              Lng:
              <input
                type="text"
                name="lng"
                value={userStore.lng}
                onChange={userStore.handleLngInput}
              />
            </label>
          </fieldset>
        </fieldset>

        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={userStore.phone}
            onChange={userStore.handlePhoneInput}
          />
        </label>

        <label>
          Website:
          <input
            type="text"
            name="website"
            value={userStore.website}
            onChange={userStore.handleWebsiteInput}
          />
        </label>

        <fieldset>
          <legend>Company</legend>

          <label>
            Company Name:
            <input
              type="text"
              name="companyName"
              value={userStore.companyName}
              onChange={userStore.handleCompanyNameInput}
            />
          </label>

          <label>
            CatchPhrase:
            <input
              type="text"
              name="catchPhrase"
              value={userStore.catchPhrase}
              onChange={userStore.handleCatchPhraseInput}
            />
          </label>

          <label>
            BS:
            <input
              type="text"
              name="bs"
              value={userStore.bs}
              onChange={userStore.handleBsInput}
            />
          </label>
        </fieldset>

        <button type="submit">Submit</button>
        <button type="button" onClick={userStore.handleClearSignupForm}>
          Clear Form
        </button>
      </fieldset>
    </form>
  );
});

export default SignupModalDialog;

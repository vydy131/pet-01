import { observer } from "mobx-react-lite";
import { GlobalStore } from "../../globalStores/GlobalStoreProvider";
import "../../styles/SignupForm.css";

const SignupModalDialog = observer(() => {
  const { userStore } = GlobalStore();

  return (
    <form onSubmit={userStore.handleSubmitSignUpForm}>
      <fieldset className="modal-fieldset">
        <legend className="signup-title">Tell about yourself</legend>
        <div className="personal-info">
          <label className="signup-input-label">
            Name:
            <input
              type="text"
              name="name"
              value={userStore.name}
              onChange={userStore.handleSignupNameInput}
              className="signup-inputs"
            />
          </label>

          <label className="signup-input-label">
            Username:
            <input
              type="text"
              name="username"
              value={userStore.username}
              onChange={userStore.handleSignupUsernameInput}
              className="signup-inputs"
            />
          </label>

          <label className="signup-input-label">
            Email:
            <input
              type="email"
              name="email"
              value={userStore.email}
              onChange={userStore.handleEmailInput}
              className="signup-inputs"
            />
          </label>
        </div>

        <fieldset className="modal-fieldset">
          <legend>Address</legend>
          <div className="address-info">
            <div className="f-d-c">
              <label className="signup-input-label">
                Street:
                <input
                  type="text"
                  name="street"
                  value={userStore.street}
                  onChange={userStore.handleStreetInput}
                  className="signup-inputs"
                />
              </label>

              <label className="signup-input-label">
                Suite:
                <input
                  type="text"
                  name="suite"
                  value={userStore.suite}
                  onChange={userStore.handleSuiteInput}
                  className="signup-inputs"
                />
              </label>

              <label className="signup-input-label">
                City:
                <input
                  type="text"
                  name="city"
                  value={userStore.city}
                  onChange={userStore.handleCityInput}
                  className="signup-inputs"
                />
              </label>

              <label className="signup-input-label">
                Zipcode:
                <input
                  type="text"
                  name="zipcode"
                  value={userStore.zipcode}
                  onChange={userStore.handleZipcodeInput}
                  className="signup-inputs"
                />
              </label>
            </div>

            <fieldset className="modal-fieldset no-margin">
              <legend>Geo</legend>

              <label className="signup-input-label">
                Lat:
                <input
                  type="text"
                  name="lat"
                  value={userStore.lat}
                  onChange={userStore.handleLatInput}
                  className="signup-inputs"
                />
              </label>

              <label className="signup-input-label">
                Lng:
                <input
                  type="text"
                  name="lng"
                  value={userStore.lng}
                  onChange={userStore.handleLngInput}
                  className="signup-inputs"
                />
              </label>
            </fieldset>
          </div>
        </fieldset>
        <fieldset className="modal-fieldset">
          <legend>Contacts</legend>
          <div className="contact-info">
            <label className="signup-input-label">
              Phone:
              <input
                type="text"
                name="phone"
                value={userStore.phone}
                onChange={userStore.handlePhoneInput}
                className="signup-inputs"
              />
            </label>

            <label className="signup-input-label">
              Website:
              <input
                type="text"
                name="website"
                value={userStore.website}
                onChange={userStore.handleWebsiteInput}
                className="signup-inputs"
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="modal-fieldset">
          <legend>Company</legend>

          <div className="company-info">
            <label className="signup-input-label">
              Company Name:
              <input
                type="text"
                name="companyName"
                value={userStore.companyName}
                onChange={userStore.handleCompanyNameInput}
                className="signup-inputs"
              />
            </label>

            <label className="signup-input-label margin-y-10">
              CatchPhrase:
              <input
                type="text"
                name="catchPhrase"
                value={userStore.catchPhrase}
                onChange={userStore.handleCatchPhraseInput}
                className="signup-inputs"
              />
            </label>

            <label className="signup-input-label">
              BS:
              <input
                type="text"
                name="bs"
                value={userStore.bs}
                onChange={userStore.handleBsInput}
                className="signup-inputs"
              />
            </label>
          </div>
        </fieldset>

        <div className="signup-btns">
          <button type="submit" className="signup-btn">
            Submit
          </button>
          <button
            type="button"
            className="signup-btn"
            onClick={userStore.handleClearSignupForm}
          >
            Clear Form
          </button>
        </div>
      </fieldset>
    </form>
  );
});

export default SignupModalDialog;

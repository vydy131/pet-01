import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { GlobalStore } from "../../globalStores/GlobalStoreProvider";
import { IUser } from "../../interfaces/User-Profile";
import "../../styles/Profile.css";

// -1 for current user profile, other values for load user from server
interface IProfileModalDialog {
  userId: number;
}

const ProfileModalDialog: React.FC<IProfileModalDialog> = observer(
  ({ userId }) => {
    const { userStore } = GlobalStore();

    useEffect(() => {
      userStore.loadUserProfile(userId);
    }, [userId, userStore]);

    const user: IUser | null = userStore.loadedUser;

    if (!user) {
      return <div>Loading...</div>;
    }

    if (!user.address || !user.company) {
      return <div>User data is incomplete.</div>;
    }

    return (
      <div>
        <div className="modal">
          <div className="modal-content">
            <div className="name">{user.name}</div>
            <div className="username">Username: {user.username}</div>
            <div className="email">Email: {user.email}</div>
            <div className="phone">Phone: {user.phone}</div>
            <div className="website">Website: {user.website}</div>
            <fieldset className="modal-fieldset">
              <legend>Address</legend>
              <div className="address-content">
                <div>
                  {user.address.street}, {user.address.suite}
                </div>
                <div>
                  {user.address.city}, {user.address.zipcode}
                </div>
                <div>
                  Geo: {user.address.geo.lat}, {user.address.geo.lng}
                </div>
              </div>
            </fieldset>
            <fieldset className="modal-fieldset">
              <legend>Company</legend>
              <div className="company-content">
                <div>Name: {user.company.name}</div>
                <div>Catchphrase: {user.company.catchPhrase}</div>
                <div>BS: {user.company.bs}</div>
              </div>
            </fieldset>
            {userId === -1 ? (
              <button className="logout-btn" onClick={userStore.handleLogOut}>
                Log out
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);

export default ProfileModalDialog;

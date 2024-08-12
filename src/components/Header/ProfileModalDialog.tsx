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

    return (
      <div>
        <div className="modal">
          <div className="modal-content">
            <h2>{user.name}</h2>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Website:</strong> {user.website}
            </p>
            <h3>Address</h3>
            <p>
              {user.address.street}, {user.address.suite}
            </p>
            <p>
              {user.address.city}, {user.address.zipcode}
            </p>
            <p>
              <strong>Geo:</strong> {user.address.geo.lat},{" "}
              {user.address.geo.lng}
            </p>
            <h3>Company</h3>
            <p>
              <strong>Name:</strong> {user.company.name}
            </p>
            <p>
              <strong>Catchphrase:</strong> {user.company.catchPhrase}
            </p>
            <p>
              <strong>BS:</strong> {user.company.bs}
            </p>
          </div>
        </div>
        {userId === -1 ? (
          <button onClick={userStore.handleLogOut}>Log out</button>
        ) : null}
      </div>
    );
  }
);

export default ProfileModalDialog;

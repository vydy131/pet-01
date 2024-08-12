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
            <div>{user.name}</div>
            <div>Username:</div> {user.username}
            <div>Email:</div> {user.email}
            <div>Phone:</div> {user.phone}
            <div>Website:</div> {user.website}
            <div>Address</div>
            <div>
              {user.address.street}, {user.address.suite}
            </div>
            <div>
              {user.address.city}, {user.address.zipcode}
            </div>
            <div>
              Geo: {user.address.geo.lat}, {user.address.geo.lng}
            </div>
            <div>Company</div>
            <div>Name:</div> {user.company.name}
            <div>Catchphrase:</div> {user.company.catchPhrase}
            <div>BS:</div> {user.company.bs}
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

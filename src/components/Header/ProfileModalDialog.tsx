import { observer } from "mobx-react-lite";
import React from "react";
import { GlobalStore } from "../../globalStores/GlobalStoreProvider";
import { IUser } from "../../interfaces/User-Profile-Incoming";

const ProfileModalDialog = observer(() => {
  const { userStore } = GlobalStore();

  const user: IUser = userStore.currentUser!;
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
            <strong>Geo:</strong> {user.address.geo.lat}, {user.address.geo.lng}
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
      <button onClick={userStore.handleLogOut}>Log out</button>
    </div>
  );
});

export default ProfileModalDialog;

import { useContext } from "react";
import { UserContext } from "./providers/UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);

  console.log(user)
  return (
    <div>
      <p>welcome back {user?.username}</p>
    </div>
  );
};

export default Profile;

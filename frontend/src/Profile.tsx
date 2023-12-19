import { useContext } from "react";
import { UserContext } from "./providers/UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);

  console.log(user)
  return (
    <div>
      <p className="text-3xl">welcome back {user?.username}</p>
      <div>
        {}
      </div>
    </div>
  );
};

export default Profile;

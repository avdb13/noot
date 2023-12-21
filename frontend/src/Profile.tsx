import { useContext } from "react";
import { UserContext } from "./providers/user";

const Profile = () => {
  const { user } = useContext(UserContext);

  console.log(user)
  return (
    <div className="grow flex flex-col justify-center">
      <p className="text-3xl">welcome back {user?.username}</p>
      <div>
        <h1>your quizzes</h1>
        {user?.quizzes}
        <h1>your statistics</h1>
      </div>
    </div>
  );
};

export default Profile;

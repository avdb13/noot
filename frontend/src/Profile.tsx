import { useContext } from "react";
import { UserContext } from "./providers/UserContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(UserContext);

  console.log(user)
  return (
    <div>
      <p className="text-3xl">welcome back {user?.username}</p>
      <div>
        <Link to="/quiz/all">my quizzes</Link>
        <Link to="/quiz/new">create new quiz</Link>
      </div>
    </div>
  );
};

export default Profile;

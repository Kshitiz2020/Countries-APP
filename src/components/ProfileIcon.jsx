import { auth } from "../config/config";

const ProfileIcon = () => {
  console.log(auth);
  return <div>Hello, {auth.currentUser?.displayName}🤠 </div>;
};

export default ProfileIcon;

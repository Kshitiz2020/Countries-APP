import { auth } from "../config/config";

const ProfileIcon = ({ displayName }) => {
  //console.log(auth);
  return <div>Hello, {displayName}🤠 </div>;
};

export default ProfileIcon;

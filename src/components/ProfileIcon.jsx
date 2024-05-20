import React from "react";
import { useAuth } from "../contexts/AuthContext";

const ProfileIcon = () => {
  const { user } = useAuth();
  return <div>Hello, {user?.displayName}🤠 </div>;
};

export default ProfileIcon;

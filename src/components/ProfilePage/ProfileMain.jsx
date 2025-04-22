import { NavLink, Outlet } from "react-router-dom";

import UserPage from "./UserPage.jsx"
import EditProfile from "./EditProfile.jsx"
// import EditProfile from "./components/ProfilePage/EditProfile.jsx"

export default function ProfileMain() {
  return (
    <div>
        {/* <UserPage/> */}
        <EditProfile/>
    </div>
  );
}

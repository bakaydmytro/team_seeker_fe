// import { NavLink, Outlet } from "react-router-dom";

// import UserPage from "./UserPage.jsx"
// import EditProfile from "./EditProfile.jsx"
// // import EditProfile from "./components/ProfilePage/EditProfile.jsx"

// export default function ProfileMain() {
//   return (
//     <div>
//         <UserPage/>
//         <EditProfile/>
//     </div>
//   );
// }

import { Outlet, NavLink } from "react-router-dom";

export default function ProfilePage() {
  return (
    <div>
      <nav>
        <NavLink to=""></NavLink> {/* тепер "" веде на UserPage */}
        <NavLink to="edit"></NavLink>
        <NavLink to="friends"></NavLink>
      </nav>

      <Outlet />
    </div>
  );
}

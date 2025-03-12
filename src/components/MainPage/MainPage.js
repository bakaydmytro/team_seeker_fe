import { useLocation, useNavigate } from "react-router-dom";

import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";
import React from "react";
import { getUserData } from "../../service/UserService";

function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    getUserData()
      .then((response) => {
        console.log("API call successful", response);
      })
      .catch((error) => {
        console.error("API call failed", error);
      });
  }, [navigate]);

  return (
    <div>
      <div className="container">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default MainPage;

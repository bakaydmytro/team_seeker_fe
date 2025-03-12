import "./App.css";

import { Route, Routes } from "react-router-dom";

import ChooseGamePage from "./components/ChooseGamePage/ChooseGamePage.js";
import Login from "./components/Login/Login.js";
import MainPage from "./components/MainPage/MainPage";
import ProfilePage from "./components/ProfilePage/ProfilePage.js";
import React from "react";
import Registration from "./components/Registration/Registration";
import Search from "./components/Search/Search.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/ChooseGamePage" element={<ChooseGamePage />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;

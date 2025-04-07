import "./Search.css";
import Footer from "../MainPage/Footer/Footer";
import SearchHeader from "./SearchHeader/SearchHeader.jsx";
import SearchMain from "./SearchMain/SearchMain.jsx";

export default function Search() {
  return (
    <>
      <div className="container">
        <SearchHeader />
        <SearchMain />
        <Footer />
      </div>
    </>
  );
}

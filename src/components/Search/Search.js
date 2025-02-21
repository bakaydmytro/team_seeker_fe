import './Search.css';
import SearchHeader from './SearchHeader/SearchHeader.jsx';
import SearchMain from './SearchMain/SearchMain.jsx';
import Footer from "../MainPage/Footer/Footer";

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
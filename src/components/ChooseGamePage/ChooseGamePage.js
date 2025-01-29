import ChooseGameHeader from "../ChooseGamePage/ChooseGameHeader/ChooseGameHeader";
import ChooseGameMain from "./ChooseGameMain/ChooseGameMain";
import Footer from "../MainPage/Footer/Footer";

export default function ChooseGamePage() {
    return (
        <>
            <div className="container">
                <ChooseGameHeader />
                <ChooseGameMain />
                <Footer />
            </div>
        </>
    );
}

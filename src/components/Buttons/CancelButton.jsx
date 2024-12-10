import './Buttons.css'
import {Link} from 'react-router-dom'

export default function LearnMoreButton(){
    return(
        <Link to='/ChooseGamePage'><button className="learn-more-button">X Cancel</button></Link>
    )
}
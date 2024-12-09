import './Buttons.css'
import {Link} from 'react-router-dom'

export default function LearnMoreButton(){
    return(
        <button className="learn-more-button"><Link to='ChooseGamePage'>Learn More</Link></button>
    )
}
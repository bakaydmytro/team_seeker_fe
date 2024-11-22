import './Buttons.css'
import {Link} from 'react-router-dom'

export default function LogInButton(){
    return(
        <button className="log-in-button"><Link to='login'>Log in</Link></button>
    )
}
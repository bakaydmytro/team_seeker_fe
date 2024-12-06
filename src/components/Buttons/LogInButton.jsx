import './Buttons.css'
import {Link} from 'react-router-dom'

export default function LogInButton(){
    return(
        <Link className='Link' to='login'><button className="log-in-button">Log in</button></Link>
    )
}
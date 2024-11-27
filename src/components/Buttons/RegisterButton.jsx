import './Buttons.css'
import {Link} from 'react-router-dom'

export default function RegisterButton(){
    return(
        <button className="register-button"><Link to='registration'>Sing Up</Link></button>
    )
}
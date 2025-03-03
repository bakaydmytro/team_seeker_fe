import MoreInfoButton from '../../Buttons/MoreInfoButton'
import { Button } from "antd";
import { Link } from 'react-router-dom'
import ProfileImg from '../../../img/icons/image 18.svg'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header(){
    const navigate = useNavigate()
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
    
        if (token) {
          localStorage.setItem("token", token);
          window.history.replaceState(null, "", window.location.pathname);
          navigate("/ProfilePage"); 
        }
      }, [navigate]);
    return(
        <header>
            <a className='logo' href="/">Team Seeker</a>
            <div className="button-block">
            <Button className="Profile-btn" type="link" style={{ all: 'unset' }}><img src={ProfileImg} alt="" /></Button>
                <MoreInfoButton />
            </div>
        </header>
    );
}

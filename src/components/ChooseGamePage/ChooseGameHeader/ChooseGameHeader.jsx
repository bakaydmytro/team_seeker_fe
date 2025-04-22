import { Button } from "antd";
import { Link } from 'react-router-dom'
import ProfileImg from '../../../img/icons/image 18.svg'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {getUserData} from "../../../service/UserService"
import MoreInfoButton from '../../Buttons/MoreInfoButton'

export default function Header(){
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
    
        if (token) {
          localStorage.setItem("token", token);
          window.history.replaceState(null, "", window.location.pathname);
          navigate("/ProfilePage"); 
        }
      }, [navigate]);

      useEffect(  ()  =>{
                getUserData().then(response => {
                    console.log(response.avatar_url)
                if(response){
                    setData(response)
                }
                setLoading(false);
              })
              .catch(error => {
                console.error("Error fetching user data:", error);
                setLoading(false);
            })
            
              
              
              
          },[])

    return(
        <header>
            <a className='logo'>Team Seeker</a>
            <div className="button-block">
            <Button className="Profile-btn" type="link" style={{ all: 'unset' }}>
                { data && data && data.avatar_url?(
                    <img src={data.avatar_url} style={{maxHeight:"50px",borderRadius:"20px"}} alt="" />
                ): (<p>Loading avatar...</p>)}
                </Button> 
            {loading ? (
                <p>Loading...</p>  
            ) : (
                <MoreInfoButton info={data} /> 
            )}
            
            </div>
        </header>
    );
}

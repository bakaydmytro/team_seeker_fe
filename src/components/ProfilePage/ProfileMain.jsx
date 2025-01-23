import './ProfilePage.css'
import { Button } from "antd";
import { Link } from 'react-router-dom'
import ProfileIcon from '../../img/icons/image 18.svg';
import CancelIcon from '../../img/icons/CancelIcon.svg';
import OkIcon from '../../img/icons/OkIcon.svg';
import RenameIcon from '../../img/icons/RenameIcon.svg';
import { ReactComponent as SteamIcon } from '../../img/icons/Vector.svg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


  
         
export default function ProfileMain() {
    const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  
  const [emailValid , setEmailValid] = useState(false)
  const [passwordValid , setPasswordValid] = useState(false)
  
  const [emailError , setEmailError] = useState('Email cannot be empty')
  const [passwordError , setPasswordError] = useState('Password cannot be empty')

  const [formValid , setFormValid] = useState(false)
  const navigate = useNavigate();

  const [fetchErrorEmail , setFetchErrorEmail] = useState(false)
  const [fetchErrorIncorrect , setFetchErrorIncorrect] = useState(false)

useEffect(() => {
    if(emailError || passwordError ){
      setFormValid(false)
    }else{
      setFormValid(true)
    }
  } , [emailError,passwordError])

    
    const emailHandler = e =>{
      setEmail(e.target.value)
      const re =   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if(!re.test(e.target.value)){
        setEmailError('Invalid email')
      }
      else{
        setEmailError('')
      }
    }
    const passwordHandler = e =>{
      setPassword(e.target.value)
      const re =  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
      if(!re.test(e.target.value)){
        setPasswordError('The password must be at least 8 characters long, one uppercase letter and one symbol.')
      }
      else{
        setPasswordError('')
      }
    }
    const formData = async (e) => {
        e.preventDefault(); 
    
    
        if (!formValid) {
          console.log("The form did not pass validation.");
          return; 
        }
    
        const userData = {
          email: email,
          password: password,
        };
        let response;
        try {
            response = await fetch('http://localhost:5001/api/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
    
          if (!response.ok) {
            throw new Error('Error sending data');
          }
    
          const result = await response.json();
          console.log(result)
          localStorage.setItem('token', result.token);
          console.log(response.status)
          setFetchErrorEmail(false)
          setFetchErrorIncorrect(false)
          navigate('/ChooseGamePage')
        } 
        catch (error) {
          if(response.status == 404){
            setFetchErrorEmail(true)
            setFetchErrorIncorrect(false)
          }
          if(response.status == 400){
            setFetchErrorIncorrect(true)
            setFetchErrorEmail(false)
          }
          console.log(response.status)
          console.error('Error:', error);
         }
      };
    
      
      const blurHandler = (e) => {
        switch(e.target.name){
          case 'email':
            setEmailValid(true)
            break
          case 'password':
            setPasswordValid(true)
            break
        }
          
      }

    return (
        <div className='container profile-container'>
            <h1>Edit profile</h1>
            <section className="profile-section">
                <aside className="left-side-profile-block">
                    <form className='image-form'>
                        <input type="image" src={ProfileIcon} alt="Profile Icon" className='profile-img' />
                        <span className='change-profile-img'>+</span>
                    </form>
                    <div className="rename">
                        <p className='profile-name'>Name</p>
                        <img src={RenameIcon} alt="Rename Icon" className='rename-btn' />
                    </div>
                </aside>
                <aside className="right-side-profile-block">

                    <div className="form-block">
                        <div className="form-head">
                            <h2>Change your Email</h2>
                            <div className="icons">
                                <img src={OkIcon} alt="Success Icon" className="success-icon" />
                                <img src={CancelIcon} alt="Cancel Icon" className="cancel-icon" />
                            </div>
                        </div>
                        <form className='change-profile-form'>
                            <h5>Enter your new email :</h5>
                            <input
                                name="email"
                                placeholder="Email"
                                // className={style.input}
                                type="text"
                                onBlur={e => {blurHandler(e)}}
                                value={email}
                                onChange={e => emailHandler(e)}
                                required
                                />
                            <button type='submit'>SEND</button>
                            {/* <Button className='apply-button'>Apply</Button> */}
                        </form>
                    </div>

                    <div className="form-block">
                        <div className="form-head">
                            <h2>Change your password</h2>
                            <div className="form-info-icons">
                                <img src={OkIcon} alt="Success Icon" className="success-icon" />
                                <img src={CancelIcon} alt="Cancel Icon" className="cancel-icon" />
                            </div>
                        </div>
                        <form className='change-profile-form'>
                            <h5>enter your new password :</h5>
                            <input
                                name="password"
                                placeholder="password"
                                // className={style.input}
                                type="password"
                                onChange={e =>{passwordHandler(e)}}
                                onBlur={e => {blurHandler(e)}}
                                value={password}            
                                required
                                />
                            <Button className='apply-button'>Apply</Button>
                        </form>
                    </div>
                    <div className="form-block">
                        <h2>Link your Steam account:</h2>
                        <Button className='steam-button' icon={<SteamIcon />}>Log in</Button>
                    </div>
                </aside>
            </section>
        </div>
    );
}

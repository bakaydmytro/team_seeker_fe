import reset from  '../../reset.css'
import style from './Login.module.css';


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  
  const [emailValid , setEmailValid] = useState(false)
  const [passwordValid , setPasswordValid] = useState(false)
  
  const [emailEror , setEmailEror] = useState('Email cannot be empty')
  const [passwordEror , setPasswordEror] = useState('Password cannot be empty')

  const [formValid , setFormValid] = useState(false)
  const navigate = useNavigate();



  useEffect(() => {
    if(emailEror || passwordEror ){
      setFormValid(false)
    }else{
      setFormValid(true)
    }
  } , [emailEror,passwordEror])

    
    const emailHandler = e =>{
      setEmail(e.target.value)
      const re =   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if(!re.test(e.target.value)){
        setEmailEror('wrong value')
      }
      else{
        setEmailEror('')
      }
    }
    const passwordHandler = e =>{
      setPassword(e.target.value)
      const re =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
      if(!re.test(e.target.value)){
        setPasswordEror('wrong value')
      }
      else{
        setPasswordEror('')
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
      passwordword: password,
    };

    try {
      const response = await fetch('http://localhost:5001/api/users/login', {
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
      console.log('Form submitted successfully:', result);
      
      localStorage.setItem('token', response);
      navigate('/')
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form, please try again later.');
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
    <div className={style.container} >
      <div className={style.login_wrapper}>
        <div className={style.title_block}>
          <h1 className={style.title}>Log in</h1>
        </div>
        <form onSubmit={formData}>
          <div className={style.input_block}>
            <label>Email</label>
            <input
              name="email"
              placeholder="Email"
              className={style.input}
              type="text"
              onBlur={e => {blurHandler(e)}}
              value={email}
              onChange={e => emailHandler(e)}
              required
            />
            {emailValid && emailEror && <div className={style.error}>{emailEror}</div>}
          </div>
          <div className={style.input_block}>
            <label>Password</label>
            <input
              name="password"
              placeholder="password"
              className={style.input}
              type="password"
              onChange={e =>{passwordHandler(e)}}
              onBlur={e => {blurHandler(e)}}
              value={password}            
              required
            />
            {passwordValid && passwordEror && <div className={style.error}>{passwordEror}</div>}
          </div>
          
          <div className={style.login_block}>
          <button 
            disabled={!formValid} 
            className={style.button_login} 
            type="submit"
            style={{
              backgroundColor: !formValid ? '#D3D3D3' : '#4CAF50',
              cursor: !formValid ? 'not-allowed' : 'pointer', 
              opacity: !formValid ? 0.6 : 1, 
            }}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

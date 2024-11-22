
import style from '../Loginn/Login.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Routes , Route , Link} from 'react-router-dom'

function Regist() {
  const [userName , setUserName] = useState('')
  const [email , setEmail] = useState('')
  const [pass , setPass] = useState('')
  const [confirmPass , setConfirmPass] = useState('')

  const [userNameDirty , setUserNameDirty] = useState(false)
  const [emailDirty , setEmailDirty] = useState(false)
  const [passDirty , setPassDirty] = useState(false)
  const [confPassDirty , setConfPassDirty] = useState(false)

  const  [userError , setUserError] = useState('Ім\'я не може бути пустим')
  const [emailEror , setEmailEror] = useState('Емеїл не може бути пустим')
  const [passEror , setPassEror] = useState('Пароль не може бути пустим')
  const  [confPassEror , setConfPassEror] = useState('Пароль не може бути пустим')

  const [formValid , setFormValid] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if(emailEror || userError || passEror || confPassEror){
      setFormValid(false)
    }else{
      setFormValid(true)
    }
  } , [emailEror,userError,passEror,confPassEror])

    const userHandler = e =>{
      setUserName(e.target.value)
      if (e.target.value.length < 2 || e.target.value.length > 50) {
        setUserError('Ім’я повинно бути від 2 до 50 символів');
    } else {
        setUserError('');
    }
    }
    const emailHandler = e =>{
      setEmail(e.target.value)
      const re =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if(!re.test(e.target.value)){
        setEmailEror('неправильне значення')
      }
      else{
        setEmailEror('')
      }
    }
    const passHandler = e =>{
      setPass(e.target.value)
      const re =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
      if(!re.test(e.target.value)){
        setPassEror('неправильне значення')
      }
      else{
        setPassEror('')
      }
    }
    const confPassHandler = e =>{
      const value = e.target.value;
      setConfirmPass(value)
    
      if(value !== pass){
        setConfPassEror('паролі не збігаються')
      }
      else{
        setConfPassEror('')
      }
    }
  
  const formData = async (e) => {
    e.preventDefault(); // Потрібно завжди викликати preventDefault для уникнення перезавантаження сторінки

    // Перевірка чи форма валідна перед відправкою
    if (!formValid) {
      console.log("Форма не пройшла валідацію");
      return; // Якщо форма не валідна, просто не відправляти
    }

    const userData = {
      username: userName,
      email: email,
      password: pass,
    };

    try {
      const response = await fetch('http://localhost:5001/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Помилка при відправці даних');
      }

      const result = await response.json();
      console.log('Форма відправлена успішно:', result);

      localStorage.setItem('token', response);
      navigate('/')
    } catch (error) {
      console.error('Помилка:', error);
      alert('Помилка при відправці форми, спробуйте пізніше');
    }
  };

  

  
  const blurHandler = (e) => {
    switch(e.target.name){
      case 'username':
        setUserNameDirty(true)
        break
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPassDirty(true)
        break
      case 'confirmPassword':
        setConfPassDirty(true)
        break
    }
      
  }
 
  return (
    <div className={style.container}>
      <div className={style.login_wrapper}>
        <div className={style.title_block}>
          <h1 className={style.title}>Sign Up</h1>
        </div>
        <div className={style.have_account}>
          <p>Already have an account? </p>
          <p><Link className={style.custom_link} to='/1'>Click</Link></p>
        </div>
        <form onSubmit={formData}>
          <div className={style.input_block}>
            <label>User Name</label>
            <input
              name="username"
              placeholder="Username"
              className={style.input}
              type="text"
              required
              onChange={e => {userHandler(e)}}
              onBlur={e => {blurHandler(e)}}
              value={userName}
            />
            {userNameDirty && userError && <div className={style.error}>{userError}</div>}
          </div>
          <div className="input_block">
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
            {emailDirty && emailEror && <div className={style.error}>{emailEror}</div>}
          </div>
          <div className={style.input_block}>
            <label>Password</label>
            <input
              name="password"
              placeholder="Password"
              className={style.input}
              type="password"
              onChange={e =>{passHandler(e)}}
              onBlur={e => {blurHandler(e)}}
              value={pass}
              required
            />
            {passDirty && passEror && <div className={style.error}>{passEror}</div>}
          </div>
          <div className={style.input_block}>
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              placeholder="Confirm Password"
              className={style.input}
              type="password"
              onBlur={e => {blurHandler(e)}}
              value={confirmPass}
              onChange={e => {confPassHandler(e)}}
              required
            />
            {confPassDirty && confPassEror && <div className={style.error}>{confPassEror}</div>}
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

export default Regist;



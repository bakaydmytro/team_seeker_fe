import '/Users/max/Desktop/project/src/reset.css';
import '/Users/max/Desktop/project/src/Components/Loginn/Login.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email , setEmail] = useState('')
  const [pass , setPass] = useState('')
  
  const [emailDirty , setEmailDirty] = useState(false)
  const [passDirty , setPassDirty] = useState(false)
  
  const [emailEror , setEmailEror] = useState('Емеїл не може бути пустим')
  const [passEror , setPassEror] = useState('Пароль не може бути пустим')

  const [formValid , setFormValid] = useState(false)
  const navigate = useNavigate();



  useEffect(() => {
    if(emailEror || passEror ){
      setFormValid(false)
    }else{
      setFormValid(true)
    }
  } , [emailEror,passEror])

    
    const emailHandler = e =>{
      setEmail(e.target.value)
      const re =   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
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
  
  
  const formData = async (e) => {
    e.preventDefault(); 


    if (!formValid) {
      console.log("Форма не пройшла валідацію");
      return; 
    }

    const userData = {
      email: email,
      password: pass,
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
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPassDirty(true)
        break
    }
      
  }
     

  return (
    <div className="container">
      <div className="login_wrapper">
        <div className="title_block">
          <h1 className="title">Log in</h1>
        </div>
        <form onSubmit={formData}>
          <div className="input_block">
            <label>Email</label>
            <input
              name="email"
              placeholder="Email"
              className="input"
              type="text"
              onBlur={e => {blurHandler(e)}}
              value={email}
              onChange={e => emailHandler(e)}
              required
            />
            {emailDirty && emailEror && <div className="error">{emailEror}</div>}
          </div>
          <div className="input_block">
            <label>Password</label>
            <input
              name="password"
              placeholder="Password"
              className="input"
              type="password"
              onChange={e =>{passHandler(e)}}
              onBlur={e => {blurHandler(e)}}
              value={pass}            
              required
            />
            {passDirty && passEror && <div className="error">{passEror}</div>}
          </div>
          
          <div className="login_block">
          <button 
            disabled={!formValid} 
            className="button_login" 
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

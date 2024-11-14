// import '/Users/max/Desktop/project/src/reset.css'
// import '/Users/max/Desktop/project/src/Components/Loginn/Login.css';
// import SwitchButton from '/Users/max/Desktop/project/src/Components/Loginn/SwitchButton.js'
// import Date from '/Users/max/Desktop/project/src/Components/Regist/Date.js'
// import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';

// function Regist() {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         confirmPassword: ''
//       })
    
//       const [errors, setErrors] = useState({})
    
//       const handleChange = (e) => {
//         const {name, value} = e.target;
//         setFormData({
//             ...formData, [name] : value
//         })
//       }
    
//       const handleSubmit = (e) => {
//         e.preventDefault()
//         const validationErrors = {}
//         if(!formData.username.trim()) {
//             validationErrors.username = "username is required"
//         }
    
//         if(!formData.email.trim()) {
//             validationErrors.email = "email is required"
//         } else if(!/\S+@\S+\.\S+/.test(formData.email)){
//             validationErrors.email = "email is not valid"
//         }
    
//         if(!formData.password.trim()) {
//             validationErrors.password = "password is required"
//         } else if(formData.password.length < 6){
//             validationErrors.password = "password should be at least 6 char"
//         }
    
//         if(formData.confirmPassword !== formData.password) {
//             validationErrors.confirmPassword = "password not matched"
//         }
    
//         setErrors(validationErrors)
    
//         if(Object.keys(validationErrors).length === 0) {
//             alert("Form Submitted successfully")
//         }
    
//       }
//   return (
//     <div style={{height: 'auto'}} className='container'>
//       <div className="login_wrapper">
//           <div className='title_block'>
//             <h1 className='title'>Log in</h1>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className='input_block'>
//               <label>User Name</label>
//               <input name="username" placeholder='name' className='input' type='text' value={formData.username}
//                 onChange={handleChange} required/> 
//             </div>
//             <div className='input_block'>
//               <label>Email</label>
//               <input name="email" placeholder='email' className='input' type='email' value={formData.email} onChange={handleChange}required/> 
                
//             </div>
//             <div className='input_block'>
//               <label>Password</label>
//               <input name="password" placeholder='Password' className='input' type='password' value={formData.password}
//                onChange={handleChange} required/>
//             </div>
//             <div className='input_block'>
//               <label>Confirm Password</label>
//               <input name="confirmPassword" placeholder='Password' className='input' type='password' value={formData.confirmPassword }
//                 onChange={handleChange} required/>
//             </div>
//             <div className='input_block'>
//               <label>Birth Day</label>
//               <Date/>
//             </div>
//             <div className='switch_block'>
//               <SwitchButton />
//               <p>Remember me</p>
//             </div>
//             <div className='login_block'>
//               <button className='button_login' type='submit'>Free Sign Up</button>
//             </div>
//           </form>
            
            
          
//       </div>
//     </div>
    
//   );
  
// }

// export default Regist;
import '/Users/max/Desktop/project/src/reset.css';
import '/Users/max/Desktop/project/src/Components/Loginn/Login.css';
import SwitchButton from '/Users/max/Desktop/project/src/Components/Loginn/SwitchButton.js';
import Date from '/Users/max/Desktop/project/src/Components/Regist/Date.js';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

function Regist() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // const validationErrors = {};
    try {
      const response =  fetch('https://66b65cfab5ae2d11eb66aa31.mockapi.io/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Помилка відправки форми');
      }

      const result =  response.json();
      console.log('Форма відправлена успішно:', result);
    } catch (error) {
      console.error('Помилка:', error);
    }
  };

    // if (!formData.username.trim()) {
    //     validationErrors.username = 'Потрібно ввести ім\'я користувача';
    //   } else if (formData.username.length < 2 || formData.username.length > 50) {
    //     validationErrors.username = 'Ім’я користувача має містити від 2 до 50 символів';
    //   }


    // if (!formData.email.trim()) {
    //   validationErrors.email = 'Email is required';
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   validationErrors.email = 'Email is not valid';
    // }
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    // if (!formData.password.trim()) {
    //     validationErrors.password = 'Необхідно ввести пароль';
    //   } else if (!passwordRegex.test(formData.password)) {
    //     validationErrors.password =
    //       'Пароль має містити принаймні 8 символів, містити одну велику літеру, одну малу літеру, одну цифру та один спеціальний символ';
    //   }

    // if (formData.confirmPassword !== formData.password) {
    //   validationErrors.confirmPassword = 'Паролі не збігаються';
    // }

    

    // setErrors(validationErrors);

    
  

  return (
    <div className="container">
      <div className="login_wrapper">
        <div className="title_block">
          <h1 className="title">Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input_block">
            <label>User Name</label>
            <input
              name="username"
              placeholder="Username"
              className="input"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          <div className="input_block">
            <label>Email</label>
            <input
              name="email"
              placeholder="Email"
              className="input"
              type="text"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="input_block">
            <label>Password</label>
            <input
              name="password"
              placeholder="Password"
              className="input"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="input_block">
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
         
          {/* <div className="switch_block">
            <SwitchButton 
            //   checked={formData.rememberMe} 
            //   onChange={handleChange} 
              name="rememberMe" 
            />
            <p>Запам'ятай мене</p>
          </div> */}
          <div className="login_block">
            <button className="button_login" type="submit">Free Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Regist;


{/* <div className="input_block">
            <label>Birth Day</label>
            <Date onDateChange={handleDateChange} value={formData.birthDate} />
            {errors.birthDate && <span className="error">{errors.birthDate}</span>}
          </div> */}
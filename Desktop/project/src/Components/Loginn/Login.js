// import '/Users/max/Desktop/project/src/reset.css'
// import '/Users/max/Desktop/project/src/Components/Loginn/Login.css';
// import SwitchButton from './SwitchButton'
// import { useState,useEffect } from 'react';
// import {Routes , Route , Link} from 'react-router-dom'
// import Regist from '/Users/max/Desktop/project/src/Components/Regist/Regist.js'
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: '',
//   });
//   const [data, setData] = useState(null);  // Стан для збереження отриманих даних
//   const [loading, setLoading] = useState(true);  // Стан для індикатора завантаження
//   const [error, setError] = useState(null);  // Стан для збереження помилок

//   useEffect(() => {
//     // Створюємо асинхронну функцію для запиту
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://66b65cfab5ae2d11eb66aa31.mockapi.io/items');
        
//         // Перевірка на успішність відповіді
//         if (!response.ok) {
//           throw new Error('Не вдалося отримати дані');
//         }
        
//         const result = await response.json();  // Перетворення відповіді в JSON
//         setData(result);  // Збереження результату в стан
//         console.log(result)
//       } catch (err) {
//         setError(err.message);  // Збереження помилки
//       } finally {
//         setLoading(false);  // Завершення завантаження
//       }
//     };

//     fetchData();  // Викликаємо функцію для виконання запиту
//   }, []);
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage(''); // Очищення повідомлення про помилку перед новим запитом

//     try {
//       const response = await fetch('https://66b65cfab5ae2d11eb66aa31.mockapi.io/items', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(credentials),
//       });
//       const users = await response.json();

//       // Пошук користувача з правильним логіном і паролем
//       const user = users.find(
//         (user) => user.username === credentials.username && user.password === credentials.password
//       );

//       if (user) {
//         console.log('Авторизація успішна:', user);
//         navigate('/dashboard'); // Перенаправлення на сторінку після входу
//       } else {
//         console.log('Авторизація неуспішна:');
//         throw new Error('Невірні логін або пароль');
//       }
     

      
//       navigate('/12');
//       // Додайте код для переходу на захищену сторінку або збереження токену
//     } catch (error) {
//       setErrorMessage('Невірний логін або пароль. Спробуйте ще раз.');
//       console.error('Помилка:', error);
//     }
//   };





//   return (
//     <div className='container'>
//       <div className="login_wrapper">
//           <div className='title_block'>
//             <h1 className='title'>Log in</h1>
//           </div>
//           {/* <div className='text_haveAccount'>
//             <p>Вже маєш Акаунт?</p>
//             <Link to='/12'>Увійти</Link>
//           </div> */}
//           <form onSubmit={handleSubmit}>
//             <div className='input_block'>
//               <label>User Name</label>
//               <input name="username" placeholder='User Name' className='input' type='text' value={credentials.username}
//                 onChange={(e) => setCredentials.password(e.target.value)}required/>
              
//             </div>
//             <div className='input_block'>
//               <label>Password</label>
//               <input name="password" placeholder='Password' className='input' type='password' value={credentials.password}
//               onChange={(e) => setCredentials.username(e.target.value)} required/>
              
//             </div>
//             {/* <div className='switch_block'>
//               <SwitchButton onChange={handleToggle}/>
//               <p>Remember me</p>
//             </div> */}
//             <div className='login_block'>
//               <button className='button_login' type='submit'>Log in</button>
//             </div>
//           </form>
//             <div className='line_block'>
//               <div className='line'></div>
//               <p className='text'>And</p>
//               <div className='line'></div>
//             </div>
//             <div className='steam_login'>
//               <button className='button_login' type='submit' >Log in Steam</button>
//             </div>
          
//       </div>
//     </div>
    
//   );
  
// }

// export default Login;


// {
//   "src": "favicon.ico",
//   "sizes": "64x64 32x32 24x24 16x16",
//   "type": "image/x-icon"
// },
// {
//   "src": "logo192.png",
//   "type": "image/png",
//   "sizes": "192x192"
// },


import '/Users/max/Desktop/project/src/reset.css';
import '/Users/max/Desktop/project/src/Components/Loginn/Login.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [users, setUsers] = useState([]);  // Збереження даних користувачів
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Завантаження користувачів при завантаженні компонента
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://66b65cfab5ae2d11eb66aa31.mockapi.io/items');
        const data = await response.json();
        setUsers(data);  // Збереження отриманих користувачів у стан
      } catch (error) {
        console.error('Помилка завантаження даних користувачів:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Очищення повідомлення про помилку перед новим запитом

    // Пошук користувача з правильним логіном і паролем
    const user = users.find(
      (user) => user.username === credentials.username && user.password === credentials.password
    );

    if (user) {
      console.log('Авторизація успішна:', user);
      navigate('/12'); // Перенаправлення на сторінку після входу
    } else {
      console.log('Авторизація неуспішна');
      setErrorMessage('Невірні логін або пароль. Спробуйте ще раз.');
    }
  };

  return (
    <div className="container">
      <div className="login_wrapper">
        <div className="title_block">
          <h1 className="title">Log in</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input_block">
            <label>User Name</label>
            <input
              name="username"
              placeholder="User Name"
              className="input"
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
            />
          </div>
          <div className="input_block">
            <label>Password</label>
            <input
              name="password"
              placeholder="Password"
              className="input"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>
          {errorMessage && <div className="error_message">{errorMessage}</div>}
          <div className="login_block">
            <button className="button_login" type="submit">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

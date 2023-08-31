import React, { useEffect, useState } from 'react'
import '../CSS/Login.css'
import loginIcon from '../images/Login-icon.svg'; 
import Spinner from '../ui/Spinner'
import { useLogin } from '../components/Hooks/useLogin';

const REMEMBER_ME_KEY = 'rememberMe';

export default function Login() {
 const [email, setEmail]=useState('')
 const [password, setPassword]=useState('')
 const [checkbox, setCheckbox]=useState(false)

 const {login, isLoading}=useLogin()

 useEffect(() => {
  const rememberMe = localStorage.getItem(REMEMBER_ME_KEY) === 'true';
  setCheckbox(rememberMe);
  if (rememberMe) {
    // Fetch user credentials from local storage if remembered
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
  }
}, []);


  function submitHandler(e){
    e.preventDefault();
   if(!email || !password) return

   if (checkbox) {
    localStorage.setItem('savedEmail', email);
    localStorage.setItem('savedPassword', password);
    localStorage.setItem(REMEMBER_ME_KEY, true);
  } else {
    // Clear saved credentials if "Remember Me" is unchecked
    localStorage.removeItem('savedEmail');
    localStorage.removeItem('savedPassword');
    localStorage.removeItem(REMEMBER_ME_KEY);
  }

   login(
    {email, password},
    {
    onSettled:()=>{
      setEmail('')
      setPassword('')
    }
  }
   )
  }
  return (
    <div className='container'>
        <div className='left-part'>
        <img src={loginIcon} alt='Login Icon' className='login-image'/>
        <h1 className='title'>Welcome Back To Condor</h1>
        </div>

        <div className='right-part'>
            <div className='form'>
                
            <div className='header'>
                <h3 className='login-hadding'>Login</h3>
                <h4 className='welcome'>Welcome back, you've been missed !</h4>
            </div>

         <form className='form-setting' onSubmit={submitHandler}>
             <label htmlFor="email" id='Email'>Email</label>
             <input type='email' className='input' placeholder='Email'
             required value={email}
              onChange={(e)=>setEmail(e.target.value)} 
            />

             <label htmlFor="password" id='Password'>Password</label>
             <input type='password' className='input' placeholder='Password'
             required value={password}
             onChange={(e)=>setPassword(e.target.value)}
             />

             <div className='checkbox-part'>  
             <div className='inner-check'> 
                <input type='checkbox' 
                value={checkbox} onChange={(e)=>setCheckbox(e.target.checked)}
                />
                <p className='remember'>Remember Me</p>
                </div>
                <button className='forget'>Forgot Password</button>
             </div>

             <button className='sign-in' type='submit'>
             {isLoading ? <Spinner /> : 'Sign in'}
             </button>

         <button className='google-btn' type='submit'>Sign in With Google</button>
    </form> 

         <div className='footer'>
         <p className='acc'>Don't have an account? </p>
         <button className='signup-btn'>Sign up</button>
         </div>

         </div>

        </div>
    </div>
  )
}

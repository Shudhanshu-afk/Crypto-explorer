import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [user,setuser] = useState({name:'', password:''});
    const navigate = useNavigate();
    const handlechange = (evt)=>{
        setuser((currdata)=>{
            currdata[evt.target.name] = evt.target.value;
            return {...currdata};
        })}
    const signin = async(evt)=>{
        evt.preventDefault();
        try {
            await axios.post('http://localhost:3000/login',{...user},{withCredentials: true});
            console.log('Login successful');
            navigate('/home');

        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      <div>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <div className='flex justify-center items-center h-full'>
            <div className='text-white bg-slate-800 w-1/4 h-fit flex flex-col items-center gap-9'>
             <h1 className='text-4xl mt-7'>Login:</h1>
             
                <form className='flex flex-col w-1/2 gap-7 ' action="">
                    
                    <input className='bg-slate-900 w-full h-10 outline-none p-4 rounded-lg' onChange={handlechange} name='name'  type="text" placeholder='Username' value={user.name}/>


                    
                    <input className='bg-slate-900 w-full h-10 outline-none p-4 rounded-lg' onChange={handlechange} name='password' type="text" placeholder='Password' value={user.password}/>
                    </form>
                    <button onClick={signin} className='bg-slate-950 mb-9 p-4 rounded-lg hover:bg-slate-900 active:bg-slate-700'>Login</button>
             </div>
            
        </div>
        </div>
    </div>
      </div>
    </div>
  )
}

export default Login


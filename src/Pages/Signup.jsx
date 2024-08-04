import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [newuser,setnewuser] = useState({name:'', password:''});
    const handlechange = (evt)=>{
        setnewuser((currdata)=>{
            currdata[evt.target.name] = evt.target.value;
            return {...currdata};
        })
    };
    const createUser = async (evt)=>{
        evt.preventDefault();
        try {
            await axios.post('http://localhost:3000/',{...newuser});
            console.log('New user created successfully');
            navigate('/login');
        } catch (error) {
            console.log(error);
        }

    }
  return (
    <div>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <div className='flex justify-center items-center h-full'>
            <div className='text-white bg-slate-800 w-1/4 h-fit flex flex-col items-center gap-8'>
             <h1 className='text-4xl mt-7'>Signup:</h1>
             
                <form className='flex flex-col w-1/2 gap-7 ' action="">
                    
                    <input className='bg-slate-900 w-full h-10 outline-none p-4 rounded-lg' onChange={handlechange} name='name'  type="text" placeholder='Username' value={newuser.name}/>


                    
                    <input className='bg-slate-900 w-full h-10 outline-none p-4 rounded-lg' onChange={handlechange} name='password' type="text" placeholder='Password' value={newuser.password}/>
                    </form>
                    <button onClick={createUser} className='bg-slate-950  p-4 rounded-lg hover:bg-slate-900 active:bg-slate-700'>Signup</button>
                    <h1 className='mb-9'>Already a user  : <Link to={'/login'}>Login</Link></h1>
             </div>
        </div>
        </div>
    </div>
  )
}

export default Signup

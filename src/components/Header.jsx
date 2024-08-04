import React, { useEffect } from 'react'
import { Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { Coincontext } from '../Context/Coincontext';
import { Link } from "react-router-dom";
const Header = () => {
    const {curr,setcurr} = useContext(Coincontext);
    
    const handlechange = (event)=>{
        switch (event.target.value) {
            case "usd":
                setcurr({name:"usd", symbol:"$"})
                break;
            case "inr":
                setcurr({name:"inr", symbol:"₹"})
                break;
        
            
        }
    }
    
    
    return (
        <div className='bg-slate-900 h-14 flex items-center justify-between text-white'>
            <Link to={'/home'}>
            <h1 className=' font-extrabold md:text-4xl ml-3'>Crypto</h1>
            </Link>
            <div className='hidden md:flex items-center'>
                <Link to={'/home'}>
                <Button variant='text' sx={{ color: 'white' }}>Home</Button>
                
                </Link>
                <Link to={'/saved'}>
                <Button variant='text' sx={{ color: 'white' }}>Saved</Button>
                </Link>
            </div>
            <div className='flex md:mr-5  '>
                <label htmlFor="curr">Currency:  </label>
                <select name="curr" id="curr" className='bg-slate-900 border-none ml-1 mr-3 ' value={curr.name} onChange={handlechange}>
                    
                    <option value="inr">INR</option>
                    <option value="usd">USD</option>
                </select>
                <Button variant='text' sx={{ color: 'white' }}>Signup</Button>




            </div>

        </div>
    )
}

export default Header

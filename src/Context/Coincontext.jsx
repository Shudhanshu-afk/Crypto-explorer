import { createContext, useEffect, useState } from "react";
import React from 'react'

import axios from "axios";
export const Coincontext = createContext();


const Coincontextprovider = (props) => {

    const [allcoins, setallcoins] = useState([]);
    const [favourite, setfavourite] = useState([]);
    const [curr, setcurr] = useState({ name: "usd", symbol: "$" })

    const fetchallcoins = async () => {

        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-CPbceEtUwoJY49yQeVprVmDH' }
        };


        await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${curr.name}`, options)
            .then(response => response.json())
            .then(response => setallcoins(response))
            .catch(err => console.error(err));
    }
    // const fetchuserdetails = async ()=>{
    //     const res=  await axios.get('http://localhost:3000/user', {withCredentials: true});
    //     setfavourite([...res.data.coinids]);
    //     console.log( 'data');
    //    }
    
    useEffect(() => {
        fetchallcoins();
    },[curr]);
    // useEffect(()=>{
    //     fetchuserdetails();
    // },[])

    const value = { allcoins, curr, setcurr,favourite, setfavourite };
    return (
        <Coincontext.Provider value={value}>
            {props.children}
        </Coincontext.Provider>
    )
}
export default Coincontextprovider
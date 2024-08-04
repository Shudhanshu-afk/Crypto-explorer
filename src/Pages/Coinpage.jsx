import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Coincontext } from '../Context/Coincontext';
import Graph from '../components/Graph';
import Header from '../components/Header';
const Coinpage = () => {
  const { id } = useParams();
  const {curr} = useContext(Coincontext);
  const [coindata, setcoindata] = useState();
  const [historicaldata, sethistoricaldata] = useState({});


  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'Your api key' }
    };

    await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${curr.name}&ids=${id}`, options)
      .then(response => response.json())
      .then(response => setcoindata({...response[0]}))
      .catch(err => console.error(err));
  }
  const fetchhistoricaldata = async () =>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'Your api key'}
    };
    
    await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${curr.name}&days=10&interval=daily`, options)
      .then(response => response.json())
      .then(response => sethistoricaldata(response))
      .catch(err => console.error(err));
  }




  useEffect(()=>{
    fetchCoinData();
    fetchhistoricaldata();
    
  },[curr])


  if (coindata) {
    
    return (
      <div className="absolute top-0 z-[-2] h-fit w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <Header></Header>
        <div className='mt-36 text-white flex flex-col items-center gap-10'>
          <img className='h-32' src={coindata.image} alt="" />
            <h1 className='font-bold text-4xl'>{coindata.name}</h1>
            <div className='graph w-3/4 md:w-1/2 h-80'>

            <Graph  historicaldata={(historicaldata.prices)}  /> 
            </div>
            <div className='data w-3/4 md:w-2/5 bg-slate-900 mb-8'>
              <div className='flex justify-between items-center h-12 border-b'>Crypto Market Rank<div>{coindata.market_cap_rank}</div></div>
              <div className='flex justify-between items-center h-12 border-b'>Current Price<div>{curr.symbol} {coindata.current_price}</div></div>
              <div className='flex justify-between items-center h-12 border-b'>Market cap<div>{curr.symbol} {coindata.market_cap}</div></div>
              <div className='flex justify-between items-center h-12 border-b'>24h High<div>{curr.symbol} {coindata.high_24h}</div></div>
              <div className='flex justify-between items-center h-12 border-b'>24h High<div>{curr.symbol} {coindata.low_24h}</div></div>
  
            </div>
  
        </div>
  
      </div>
    )
  }
  else{
    return (
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      <div className="flex justify-center items-center mt-48">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
    </div>
    </div>
    )
  }

}

export default Coinpage

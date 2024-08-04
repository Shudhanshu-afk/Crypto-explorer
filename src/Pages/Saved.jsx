import React, { useEffect,useState,useContext } from 'react'
import Header from '../components/Header';
import { Button } from '@mui/material';
import { Coincontext } from '../Context/Coincontext';
import { Link } from 'react-router-dom';
import save from '../assets/save.svg'
import saved from '../assets/saved.svg'
import axios from 'axios'
const Saved = () => {

  const [input, setinput]= useState("");
  const [coinslist, setcoinslist] = useState([]);
  
  const { allcoins,curr,favourite,setfavourite } = useContext(Coincontext);
  const fetchuserdetails = async ()=>{
   const res=  await axios.get('http://localhost:3000/user', {withCredentials: true});
   setfavourite([...res.data.coinids]);
   console.log( 'data',res.data.coinids);

  }
  const handlechange =(evt)=>{
    setinput(evt.target.value);
} 
 const search = async (event)=>{
  event.preventDefault();
  const coin = await allcoins.filter((item)=>{
    return item.name.toLowerCase().includes(input.toLocaleLowerCase());
  })
  setcoinslist(coin);


 }



  const round = (n)=>{
    if(n<1){
    const rdnum = n.toFixed(5);
    return rdnum;
  }
    return n;

  }
  
  const postcoin = async (id) => {
    try {
      await axios.post('http://localhost:3000/user', { coinid: id }, { withCredentials: true });
      console.log('coin posted');
    } catch (error) {
      console.log(error);
    }
  }
  const deletecoin = async (id) => {
    try {
      await axios.post('http://localhost:3000/delete', { coinid: id }, { withCredentials: true });
      console.log('coin deleted');

    } catch (error) {
      console.log(error);
    }
  }
  const postitem = async (id) => {
    postcoin(id)
    setfavourite((currdata)=>{
      return [...currdata,id];
    })
    

    console.log('coin saved');
    console.log(favourite);

  };
  const unsaveitem = (id) => {
    deletecoin(id);
    setfavourite((currdata)=>{
      return currdata.filter((item)=>item!=id);
    })
    console.log('unsaveitem');
    console.log(favourite);
    // setfavourite(prev => prev.filter(coinId => coinId !== id));


  }

  useEffect(()=>{
    fetchuserdetails();
    
    
    
  },[])
  useEffect(()=>{
    setcoinslist(()=>{
     return allcoins.filter(coins=> favourite.includes(coins.id));
    })
   
   
  },[allcoins,favourite])
  return (
    <div>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      <Header></Header>
      <div className='text-white flex flex-col items-center gap-16'>


        <h1 className='mt-28 text-4xl md:text-7xl'>Crypto Marketplace</h1>

        <div className='flex  items-center w-fit p-3 rounded-lg bg-white'>
          <input className='Searchcoins text-black focus:outline-none focus:ring-0 focus:border-transparent h-6 md:w-80' onChange={handlechange} value={input} type="text" placeholder='Search crypto' />
          <Button onClick={search} variant='contained' sx={{ color: 'white' }}>Search</Button>
        </div>
        <div className='flex w-full md:w-1/2 bg-slate-900 rounded-t-xl min-h-fit max-h-72 overflow-y-auto overflow-x-auto'>



          <table className="min-w-full  ">
            <thead className='bg-slate-900 h-12 '>
              <tr className='rounded-t-xl'>
                <th className="w-1/12  rounded-tl-xl">#</th>
                <th className="w-1/4 ">Coin</th>
                <th className="w-1/5 ">Price</th>
                <th className="w-1/5 ">24h change</th>
                <th className="w-1/4  rounded-tr-xl">Price cap</th>
                <th className="w-1/4 mr-4 rounded-tr-xl pr-10"></th>
              </tr>
            </thead>
            <tbody>
              {coinslist && coinslist.map((i,idx) => (
                <tr className='border-y h-12' key={i.id} >
                  <td className="# bg-slate-800 text-center">{idx+1}</td>
                  <td className="name bg-slate-800 cursor-pointer">
                    <Link to={`/coin/${i.id}`}>
                    <div className='flex  items-center gap-4 ml-6'>
                    <img className='h-10' src={i.image} alt="" />{i.name} 
                    
                    </div>
                    </Link>
                  </td>
                  <td className="currentprice bg-slate-800  text-center ">{curr.symbol}{i.current_price}</td>
                  <td className="24hchange bg-slate-800 text-center">{curr.symbol}{round(i.price_change_24h)}</td>
                  <td className="marketcap bg-slate-800 text-center">{curr.symbol}{i.market_cap}</td>
                  <td className="marketcap bg-slate-800 text-center">{favourite.includes(i.id)? <img className='invert h-8' src={saved} onClick={()=>{unsaveitem(i.id);}} alt="" />:<img className='invert h-8' src={save} onClick={()=>{postitem(i.id);}} alt="" />}</td>
                </tr>
              ))
              }



            </tbody>
          </table>
        </div>


      </div>
    </div>
    </div>
  )
}

export default Saved

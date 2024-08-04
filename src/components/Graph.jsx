import React, { useEffect, useState } from 'react'
import {Chart} from 'react-google-charts'
const Graph = ({historicaldata}) => {
  const [data, setdata] = useState([["Date","Prices"]]);

  useEffect(()=>{
    let datacopy = [["Date","Prices"]];
    console.log(historicaldata);
    
    if (historicaldata) {
      historicaldata.map((item)=>{
        datacopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`,item[1]])
      })
    }
    
    setdata(datacopy);
  },[historicaldata])
  const options = {
    
    legend: 'none',
    width: '100%',  // Adjust width as needed
    height: '100%',    // Adjust height as needed
  };
  return (
    <Chart
    chartType='LineChart'
    data={data}
    width="100%"
    height="100%"
    options={options}
    
    
    />
    
  )
}

export default Graph

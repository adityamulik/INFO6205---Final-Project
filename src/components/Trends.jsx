import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

const Trends = ({customCount}) => {

  useEffect(() => {
    
  }, []);


  return (
    <LineChart width={400} height={400} data={customCount}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  )
}

export default Trends;
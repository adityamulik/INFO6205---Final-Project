import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

const Trends = ({customCount}) => {

  useEffect(() => {
    
  }, []);


  return (
    <LineChart width={400} height={400} data={customCount}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <br></br>
      <XAxis dataKey="name" label={{ value: 'No. of Games', angle: 0, dy: 13}}/>
      <YAxis label={{ value: 'Beads Count', angle: -90, position: 'insideLeft' }}/>
    </LineChart>
  )
}

export default Trends;
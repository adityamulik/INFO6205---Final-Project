import React from 'react';
import { LineChart, Line } from 'recharts';

const Trends = () => {

  const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 600, pv: 2300, amt: 2100}, {name: 'Page A', uv: 200, pv: 2400, amt: 2400}];

  return (
    <LineChart width={400} height={400} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    </LineChart>
  )
}

export default Trends;
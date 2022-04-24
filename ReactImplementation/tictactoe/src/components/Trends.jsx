import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

const Trends = ({customCount}) => {

  useEffect(() => {
    // console.log(customCount);

    // for (let i=0; i<customCount.length; i++) {
    //   // console.log(customCount[i]);
    //   data.push([{name: customCount[i][0], uv: customCount[i][1], pv: 2400, amt: 2400}]);
    // }
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
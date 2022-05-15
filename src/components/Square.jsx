import React from 'react';

const Square = ({value, onClick}) => {

  const style = {
    background: "lightblue",
    border: "2px solid darkblue",
    fontSize: "30px",
    fontWeight: "800",
    outline: "none",
  };

  return (
      <button style={style}>
        {value}
      </button>
  )
}

export default Square;
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './square.css';

const Square = ({ value, color, index }) => {
  // Create a reference to the square element
  const squareRef = useRef(null);

  const top = Math.floor((index/4))*100 + 'px';
  const left = (index%4)*100 + 'px';


  return (
    <motion.div 
      className="square" 
      style={{ backgroundColor: color, left:left, top:top }}
      onClick={()=>console.log(index)}
    >
      {value}
    </motion.div>
  );
};

export default Square;

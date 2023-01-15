import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './square.css';

const Square = ({ value, color, index, preIndex}) => {
  // Create a reference to the square element
  const squareRef = useRef(null);
  const width = innerWidth>400? 400 : innerWidth;
  const offset = width/100;
  


  const finalTop = Math.floor(index/4)*(width/4) + offset + 'px';
  const finalLeft = Math.floor(index%4)*(width/4) + offset + 'px';

  const left = preIndex != '-1' ?  Math.floor(preIndex%4)*(width/4) + offset + 'px' : finalLeft;
  const top =  preIndex != '-1' ?  Math.floor((preIndex/4))*(width/4) + offset + 'px' : finalTop;

  const spring = {
    type: 'spring',
    damping: 10,
    stiffness: 100
  }


  return (
    <motion.div 
      className="square" 
      style={{ 
        backgroundColor: color,
        width:width/4 - 2*offset,
        height:width/4 - 2*offset,
      }}
      onClick={()=>console.log(index)}
      initial={{left:left, top:top, scale: preIndex!='-1'? 1 : 0}}
      animate={{left:finalLeft, top:finalTop, scale: 1 }}
      transition={{duration:.28, spring }}
    >
      {value}
    </motion.div>
  );
};

export default Square;

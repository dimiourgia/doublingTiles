import React, { useState, useEffect } from 'react';
import './Grid.css';
import {motion} from 'framer-motion';
import { useRef } from 'react';
import Square from './squares';



const Grid = () => {
  const [squares, setSquares] = useState([]); //state to keep track of the squares in the grid
  const [gameOver, setGameOver] = useState(false);

   // Function to generate a color based on the square's value
   const getColorForValue = (value) => {
    if (value < 4) {
      return '#e7b584';
    } else if (value < 8) {
      return '#ef9140e0';
    } else if (value < 16) {
      return '#f77f18';
    } else if (value < 32) {
      return '#F59563';
    } else if (value < 64) {
      return '#F67C5F';
    } else if (value < 128) {
      return '#F65E3B';
    } else if (value < 256) {
      return '#ebc244';
    } else if (value < 512) {
      return '#efb400';
    } else if (value < 1024) {
      return '#dafb04';
    } else if (value < 2048) {
      return '#8300b380';
    } else if (value < 4096) {
      return '#a12d2d';
    }
    else {
      return '#000';
    }
  };
   
  const dummy = [{value:2, color:getColorForValue(2), indexValue: 0, preIndex:-1, key:0}, {value:8, color:getColorForValue(2), indexValue: 1, preIndex:-1}, {value:4, color:getColorForValue(4), indexValue: 2, preIndex:-1} ]
//  setSquares([{value:2, color:getColorForValue(2), indexValue: 0, preIndex:-1}, {value:8, color:getColorForValue(2), indexValue: 1, preIndex:-1}, {value:4, color:getColorForValue(4), indexValue: 2, preIndex:-1} ]);

  const gridRef = useRef(null);

  useEffect(()=>{
    gridRef.current.focus();
  },[squares])

  useEffect(() => {
    gridRef.current.focus();

    var lastIndex = [];
    for(let i=0; i<3; i++){
      const rand = Math.floor(Math.random() * 3);
      if(rand<2) var value = 2;
      else var value = 4;
      // Generate a color for the square based on its value
      const color = getColorForValue(value);

      var indexValue;

      const index = [];
      squares.forEach(sqr => index.push(sqr.indexValue));

      while(true){
        indexValue = Math.floor(Math.random() * 16);
        if(!lastIndex.includes(indexValue)){
          lastIndex.push(indexValue);
          break;
        }
      }
        setSquares([...squares,{value, color, indexValue, preIndex:'-1'}]);
    }

  }, []); 


const [key, setKey] = useState(false);


  const generateRandomSquare = (squares)=>{

    if(squares.length>15) return;
    
      const rand = Math.floor(Math.random() * 3);
      if(rand==0) var value = 4;
      else var value = 2;
      // Generate a color for the square based on its value
      const color = getColorForValue(value);

      var indexValue;

      const index = [];
      squares.forEach(sqr => index.push(sqr.indexValue));
      while(true){
        indexValue = Math.floor(Math.random() * 16);
        if(!index.includes(indexValue)){
          break;
        }
      }

      return {value, color, indexValue, preIndex:'-1', key:indexValue};

  }


const handleKeyDown = (event) =>{
  console.log(event.key);
if(event.key !== 'ArrowUp' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'ArrowDown'){
  return;
}


  var updated_squares=[];
  var changed=false;

  for(let i=0; i<4; i++){
    const slice = [];
    const sqrs = JSON.parse(JSON.stringify(squares));

    sqrs.forEach(sqr=>{
      if(event.key === 'ArrowLeft' || event.key === 'ArrowRight'){
        if(Math.floor(sqr.indexValue/4)===i) 
          slice.push(sqr);
      }
      else if(Math.floor(sqr.indexValue%4)===i){
        slice.push(sqr);
      }
    });

    if(event.key === 'ArrowLeft' || event.key === 'ArrowUp'){
      slice.sort((a,b)=> a.indexValue-b.indexValue);
    }
    else{
      slice.sort((a,b)=>b.indexValue-a.indexValue);
    }

    var size= slice.length;
    var filled = 0;


    while(filled<size){
      var skip = false;

      if(filled+1<size && slice[filled+1].value === slice[filled].value){
        //merge slice[filled+1] and slice[filled]

        const value = slice[filled].value*2;
        const color = getColorForValue(value);
        const preIndex = slice[filled+1].indexValue;
        const key = indexValue;

        var indexValue;
        if(event.key==='ArrowLeft') indexValue=(i*4)+filled;
        else if(event.key === 'ArrowRight') indexValue=(i*4)+3-filled;
        else if(event.key === 'ArrowUp') indexValue=i+filled*4;
        else indexValue=i+(3-filled)*4;

        // push the merged tile in updated squares
        updated_squares.push({value, color, indexValue, preIndex, key});

        //removed the one the merged tiles either filled or filled+1 from slice array
        slice.splice(filled+1,1);

        //updated size
        size--;
        skip = true;
      }

      if(!skip){
        const value = slice[filled].value;
        const color = getColorForValue(value);
        const preIndex = slice[filled].indexValue;
        const key = indexValue;
        var indexValue;

        if(event.key==='ArrowLeft') indexValue=(i*4)+filled;
        else if(event.key === 'ArrowRight') indexValue=(i*4)+3-filled;
        else if(event.key === 'ArrowUp') indexValue=i+filled*4;
        else indexValue=i+(3-filled)*4;

        let goAhead = true;
        updated_squares.forEach(sqr =>{ 
        if(sqr.indexValue === indexValue) 
            goAhead = false;
        });

        if(goAhead)
          updated_squares.push({value,color,indexValue, preIndex, key});
      }

      filled++;
    }
  }


  if(squares.length === updated_squares.length ){
    squares.sort((a,b)=>a.indexValue-b.indexValue);
    updated_squares.sort((a,b)=>a.indexValue-b.indexValue);

    for(let i=0; i<squares.length; i++){
      if(squares[i].indexValue !== updated_squares[i].indexValue || squares[i].value !== updated_squares[i].value){
        changed=true;
      }
    }
  }
  else changed=true;

  
  if((event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') && changed ){
    updated_squares = [...updated_squares, generateRandomSquare(updated_squares)]
    console.log([...updated_squares]);
    var marking = (key)? 0 : 50;

    updated_squares.forEach(sqr => sqr.key = marking++);

    setSquares(updated_squares);
    setKey(!key);
  }

  const gameContinues = canGameContinue();

  console.log(gameContinues);

  if(!gameContinues){
    setGameOver(true);
  }

}

const canGameContinue = ()=>{
  if(squares.length!==16) return true;

  const sqrs = JSON.parse(JSON.stringify(squares));
  
//left right
  for(let i=0; i<4; i++){
  
    const slice=[];

    sqrs.forEach(sqr=>{
        if(Math.floor(sqr.indexValue/4)===i) 
          slice.push(sqr);
    });

    slice.sort((a,b) => a.indexValue-b.indexValue);

    for(let j=1; j<4; j++){
      if(slice[j-1].value === slice[j].value) return true;
    }

  }

//up down

for(let i=0; i<4; i++){
  
  const slice=[];

  sqrs.forEach(sqr=>{
      if(Math.floor(sqr.indexValue%4)===i) 
        slice.push(sqr);
  });

  slice.sort((a,b) => a.indexValue-b.indexValue);

  for(let j=1; j<4; j++){
    if(slice[j-1].value === slice[j].value) return true;
  }

  return false;
}

}




  // Function to render the squares
  const renderSquares = () => {
    return squares.map((square) => {
      return (
        <Square 
          key={square.key} 
          color={square.color}
          value={square.value}
          index={square.indexValue}
          preIndex={square.preIndex}
        >
          {square.value} 
        </Square>
      );
    });
  };

  const tiles = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  const renderEmptyTiles = ()=>{
    return tiles.map(()=>{
      return(
        <div className='tiles'>

        </div>
      );
    });
  }

  return (
    <div className="grid" tabIndex={0} ref={gridRef}  onKeyDown={handleKeyDown}>
      {renderSquares()}
      {renderEmptyTiles()}
      {gameOver && 
      <motion.div className='gameOver'
        initial={{scale: 0}}
        animate={{scale: 1}}
     //   transition={{duration:1}}
      >
        <p> Game Over ! </p>    
      </motion.div>
      }
      {gameOver && <motion.div className='newGameButtonWrapper'
        initial={{scale:0}}
        animate={{scale:1}}
        transition={{delay:1}}

        onClick={()=>{setGameOver(false); setSquares([generateRandomSquare([])])}}
        >
        <button>
          New Game
        </button>

        </motion.div>}
    </div>
  )

}


export default Grid;
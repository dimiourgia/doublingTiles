import React, { useState, useEffect } from 'react';
import './Grid.css';
import {motion} from 'framer-motion';
import { useRef } from 'react';
import Square from './squares';

const Grid = () => {
  const [squares, setSquares] = useState([]); //state to keep track of the squares in the grid
  const squaresRef = useRef(squares);
  
   // Function to generate a color based on the square's value
   const getColorForValue = (value) => {
    if (value < 4) {
      return '#EEE4DA';
    } else if (value < 8) {
      return '#EDE0C8';
    } else if (value < 16) {
      return '#F2B179';
    } else if (value < 32) {
      return '#F59563';
    } else if (value < 64) {
      return '#F67C5F';
    } else if (value < 128) {
      return '#F65E3B';
    } else {
      return '#EDCF72';
    }
  };
   

  useEffect(() => {
    var lastIndex = [];
    for(let i=0; i<3; i++){
      const rand = Math.pow(2, Math.floor(Math.random() * 3));
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
        setSquares([...squares,{value, color, indexValue}]);
    }
  }, []); 


  const generateRandomSquare = (squares)=>{

      const rand = Math.pow(2, Math.floor(Math.random() * 2));
      if(rand==0) var value = 4;
      else var value = 2;
      // Generate a color for the square based on its value
      const color = getColorForValue(value);

      var indexValue;

      const index = [];
      squares.forEach(sqr => index.push(sqr.indexValue));
      if(index.length > 16) return {};
      while(true){
        indexValue = Math.floor(Math.random() * 16);
        if(!index.includes(indexValue)){
          break;
        }
      }

      return {value, color, indexValue};

  }


const dummy = [{value:2, color:getColorForValue(2), indexValue: 12}, {value:2, color:getColorForValue(2), indexValue: 1}, {value:4, color:getColorForValue(4), indexValue: 5} ]
//setSquares(dummy);


const handleKeyDown = (event)=>{

  console.log(event.keyCode);

  var updated_squares=[];

  if(squares.length === 16) return;

  if(event.key == 'ArrowLeft'){

    for(let i=0; i<4; i++){
      const row  = [];
      const sqrs = JSON.parse(JSON.stringify(squares))
      sqrs.forEach(sqr=>{if(Math.floor(sqr.indexValue/4) === i) row.push(sqr)});
   //   console.log(row);
      row.sort((a,b)=>a.indexValue-b.indexValue);
      var size = row.length;
    //  console.log(row);
      var filled = 0;

      if(size>0){

      while(filled<size){
        if(filled+1 < size){
          console.log('this is true');
          if(row[filled+1].value === row[filled].value){
            console.log('and this also')
            const value = row[filled].value*2;
            const color = getColorForValue(value);
            const indexValue = (i*4)+filled;

            updated_squares.push({value,color,indexValue});

            row.splice(filled+1,1);
            filled--;
            size--;
          }

        else{
         // console.log(row[0]);
            const value = row[filled].value;
            const color = getColorForValue(value);
            const indexValue = (i*4)+filled;

            let goAhead = true;
            updated_squares.forEach(sqr => { if(sqr.indexValue === indexValue) goAhead = false;} )
            if(goAhead)
            updated_squares.push({value,color,indexValue});
        }
      }

      else{
        //console.log(row[0]);
          const value = row[filled].value;
          const color = getColorForValue(value);
          const indexValue = (i*4)+filled;

          let goAhead = true;
          updated_squares.forEach(sqr => { if(sqr.indexValue === indexValue) goAhead = false;} )
          if(goAhead)
          updated_squares.push({value,color,indexValue});
      }

        filled++;
      }
      }
    }

  }

  if(event.key == 'ArrowRight'){
    for(let i=0; i<4; i++){
      const row  = [];
      const sqrs = JSON.parse(JSON.stringify(squares))
      sqrs.forEach(sqr=>{if(Math.floor(sqr.indexValue/4) === i) row.push(sqr)});
   //   console.log(row);
      row.sort((a,b)=> b.indexValue-a.indexValue);
      var size = row.length;
    //  console.log(row);
      var filled = 0;

      if(size>0){

      while(filled<size){
        if(filled+1 < size){
          console.log('this is true');
          if(row[filled+1].value === row[filled].value){
            console.log('and this also')
            const value = row[filled].value*2;
            const color = getColorForValue(value);
            const indexValue = (i*4)+3-filled;

            updated_squares.push({value,color,indexValue});

            row.splice(filled+1,1);
            filled--;
            size--;
          }

        else{
         // console.log(row[0]);
            const value = row[filled].value;
            const color = getColorForValue(value);
            const indexValue = (i*4)+3-filled;

            let goAhead = true;
            updated_squares.forEach(sqr => { if(sqr.indexValue === indexValue) goAhead = false;} )
            if(goAhead)
            updated_squares.push({value,color,indexValue});
        }
      }

      else{
        //console.log(row[0]);
          const value = row[filled].value;
          const color = getColorForValue(value);
          const indexValue = (i*4)+3-filled;

          let goAhead = true;
          updated_squares.forEach(sqr => { if(sqr.indexValue === indexValue) goAhead = false;} )
          if(goAhead)
          updated_squares.push({value,color,indexValue});
      }

        filled++;
      }
      }
    }
    
  }
    
 

if(event.key=='ArrowUp'){
  
  for(let i=0; i<4; i++){
    const col = [];
    squares.forEach(sqr=> {if(Math.floor((sqr.indexValue%4 == i))) col.push(sqr)});
    col.sort((a,b)=>a.indexValue-b.indexValue);

    var filled = 0;
    var size = col.length;

    while(filled<size){
      if(filled+1<size){
        if(col[filled].value===col[filled+1].value){
          console.log('this is treu-1');
          const value = 2*col[filled].value;
          const color = getColorForValue(value);
          const indexValue = i+(filled*4);
          updated_squares.push({value, color, indexValue});
          col.splice(filled+1, 1);
          size--;
          filled--;
        }

        else{
          // console.log(row[0]);
             const value = col[filled].value;
             const color = getColorForValue(value);
             const indexValue = i+filled*4;
 
             let goAhead = true;
             updated_squares.forEach(sqr => { if(sqr.indexValue === indexValue) goAhead = false;} )
             if(goAhead)
             updated_squares.push({value,color,indexValue});
         }
       }
 
       else{
         //console.log(row[0]);
           const value = col[filled].value;
           console.log("value->" + value);
           const color = getColorForValue(value);
           const indexValue = i+4*filled;
 
           let goAhead = true;
           updated_squares.forEach(sqr => { if(sqr.indexValue === indexValue) goAhead = false;} )
           if(goAhead)
           updated_squares.push({value,color,indexValue});
       }
 
         filled++;
      }
    }

  }


  if(event.key == 'ArrowDown'){
    for(let i=0; i<4; i++){
      const col = [];
      squares.forEach(sqr=> {if(Math.floor((sqr.indexValue%4 == i))) col.push(sqr)});
      col.sort((a,b)=>b.indexValue-a.indexValue);
  
      var filled = 0;
      var size = col.length;
  
      while(filled<size){
        if(filled+1<size){
          if(col[filled].value===col[filled+1].value){
            console.log('this is treu-1');
            const value = 2*col[filled].value;
            const color = getColorForValue(value);
            const indexValue = i+(3-filled)*4;
            updated_squares.push({value, color, indexValue});
            col.splice(filled+1, 1);
            size--;
            filled--;
          }
  
          else{
            // console.log(row[0]);
               const value = col[filled].value;
               const color = getColorForValue(value);
               const indexValue = i+(3-filled)*4;
   
               let goAhead = true;
               updated_squares.forEach(sqr => { if(sqr.indexValue === indexValue) goAhead = false;} )
               if(goAhead)
               updated_squares.push({value,color,indexValue});
           }
         }
   
         else{
           //console.log(row[0]);
             const value = col[filled].value;
             console.log("value->" + value);
             const color = getColorForValue(value);
             const indexValue = i+4*(3-filled);
   
             let goAhead = true;
             updated_squares.forEach(sqr => { if(sqr.indexValue === indexValue) goAhead = false;} )
             if(goAhead)
             updated_squares.push({value,color,indexValue});
         }
   
           filled++;
        }
      }
  }


if(event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' ){
  updated_squares = [...updated_squares, generateRandomSquare(updated_squares)]
  console.log([...updated_squares]);
  setSquares(updated_squares);
}


//setSquares(dummy);
}


function moveLeft(value, indexValue, squares){
  if(indexValue%4!=0){
    
    let canMove = true;
    let canMerge = false;

    squares.forEach(sqr => {if(sqr.indexValue === indexValue-1){ if(sqr.value == value) canMerge=true; else canMove=false;} })
    
    if(canMove){
      if(canMerge){
        
      }
      else{

      }
    }
  }
}



  // Function to render the squares
  const renderSquares = () => {
    return squares.map((square) => {
      return (
        <Square 
          key={square.indexValue} 
          color={square.color}
          value={square.value}
          index={square.indexValue}
        >
          {square.value} 
        </Square>
      );
    });
  };

 

  return (
    <div className="grid" tabIndex={0} onKeyDown={(event)=>handleKeyDown(event)} onClick={()=> console.log('I am shot')}>
      {renderSquares()}
    </div>
  )

}


export default Grid;
import React from 'react'
import { useState } from 'react';
import './Bars.css';

function Bars(index, length, color) {

    const [len, setLen] = useState(length)

    // const barStyle = {
        
    //     height: length
    // }
    const colors = [['rgba(161,90,241,0.5)','rgba(61,220,241,0.2)'],
                    ['rgba(255,48,79,1)','rgba(255,48,79,0.5)'],
                    ['rgba(131,232,90,1)','rgba(255,48,79,0.2)'],];

    const inputStyle ={
        position: 'relative',
        width: length,
        top: Math.floor(length/2) - 12,
        left: Math.floor(length/2) + 13,
        border: 'none',
        background: 'none'
        
    }
    const front_bottom = {
        transform: 'translateY( ${200 - length}px) rotate( -90deg)',
        backgroundColor: '${colors[color][0]}',
        boxShadow: '5px 5px 50px 5px ${colors[color][1]}',
        transition: '0.3s'
    }
    const front_right_left = {
        transform: 'translateY( ${200 - length}px)',
        backgroundColor: '${colors[color][0]}',
        boxShadow: '5px 5px 50px 5px ${colors[color][1]}',
        transition: '0.3s'
    }
    
    const quantity ={
        position:'relative',
        top: 225,
    }
    
    const handleChange = (e) =>{
        let val = e.target.value;
        if(val === ''){
            setLen(0)

        }else{
            val = parseInt(val)
            if(val > 200){
                setLen(200);
            }else{
                setLen(val);
            }
        }
         setLen(parseInt(e.target.value))
    }
  return (
    <>
        <div className="bar">
            <div className="side top">

            </div>
            <div className="side bottom" style={front_bottom}></div>
            <div className="side right" style={front_right_left}>
                <div className="color-bar right-color-bar" style={front_right_left} ></div>
            </div>
            <div className="side left" style={front_right_left}>
            <div className="color-bar left-color-bar" style={front_right_left} ></div>
            </div>
            <div className="side front" style={front_bottom}>
                <div className="color-bar front-color-bar" style={front_bottom}>
                <input
                 type="number" 
                 length={length}
                  value={len} 
                  className='input'
                onChange={handleChange} style={inputStyle} />
                </div>
                
            </div>
            <div className="side back">
                <div className="color-bar back-color-bar" style={front_bottom}> </div>

            </div>
            <div className="quantity-nav">
                <div className="quantity-button quantity-up" style={quantity}>
                    +
                </div>
                <div className="quantity-button quantity-down" style={quantity}>
                    -
                </div>
            </div>
        </div>
    </>
  )
}

export default Bars
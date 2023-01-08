import react, {Component} from 'react'
import './App.css';
import Bars from './components/Bars';
import BubbleSort from './algorithms/Bs';
import * as React from 'react';

// icons

import Play from '@mui/icons-material/PlayCircleFilledWhite'; 
import Forward from '@mui/icons-material/ArrowForwardIos';
import Backward from '@mui/icons-material/ArrowBackIosNew';
import Rotate from '@mui/icons-material/Replay';

class App extends Component {
  state = { 
    array:[],
    arraySteps: [],
    colorKey: [], 
    currentStep :0,
    count :10,
    delay: 100,
    algorithm: 'Bubble Sort', 
    timeouts:[],
   }; 

   ALGORITHMS = {
    "Bubble Sort" : BubbleSort,
   }
   componentDidMount(){
    this.generateRandomArray();
   }

   generateSteps = ()=>{
     let array = this.state.array.slice();
     let steps = this.state.arraySteps.slice();
     let colorSteps = this.state.colorSteps.slice();

     this.ALGORITHMS[this.state.algorithm](array, 0, steps, colorSteps);

     this.setState({
      arraySteps: steps,
      colorSteps : colorSteps
     })
   }
   clearTimeouts = () =>{
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.setState({
      timeouts:[]
    });
   }

   clearColorKey = () =>{
    let blankKey = new Array(this.state.count.fill(0));
    this.setState({
      colorKey: blankKey,
      colorSteps: {blankKey}
    })
   }
   generateRandomNumber =(min,max)=>{
    return Math.floor(Math.random() * (max-min) + min);

   }
   generateRandomArray = ()=>{
    this.clearTimeouts();
    this.clearColorKey();
     const count = this.state.count;
     const temp = [];

     for(let i=0; i<count; i++){
      temp.push(this.generateRandomNumber(50,200));
     }
     
     this.setState({
      array: temp,
      arraySteps: [temp],
      currentStep: 0
     }, () =>{
      this.generateSteps();
     });
   };

   changeArray = (index, value) =>{
    let arr = this.state.array;
    arr[index] = value;
    this.setState({
      array: arr,
      arraySteps: [arr],
      currentStep: 0
    }, () =>{
      this.generateSteps();
     });
   };

   previosStep = () =>{
    let currentStep = this.state.currentStep;
    if(currentStep === 0) return;
    currentStep = 1;
    this.setState({
      currentStep: currentStep,
      array : this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep]
    });
   }

   nextStep = () =>{
    let currentStep = this.state.currentStep;
    if(currentStep > this.state.arraySteps.length - 1) return;
    currentStep += 1;
    this.setState({
      currentStep: currentStep,
      array : this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep]
    });

   }

   start = () =>{
     let steps = this.state.arraySteps;
     let colorSteps = this.state.colorSteps;

    this.clearTimeouts();
    
     let timeouts = [];
     let i =0;

     while( i< steps.length - this.state.currentStep){
      let timeout = setTimeout(() => {
        let currentStep = this.state.currentStep;
        this.setState({
          array: steps[currentStep],
          colorKey: colorSteps[currentStep],
          currentStep: currentStep + 1,
        });
        timeouts.push(timeout);
      }, this.state.delay * i);
      i++;
     }
   }
  render() { 
    let myBars = this.state.array.map((value, index) =>(
    <Bars
      key={index}
       index={index} 
       length={value} 
       color={this.state.colorKey[index]} 
       changeArray={this.changeArray}/>
    ));

    let playButton;

    if(this.state.arraySteps.length === this.state.currentStep){
      playButton =(
        <button className="controller" onClick={this.generateRandomArray}>
          <Rotate />
        </button>
      )
    }else{
      playButton = (
        <button className='controller' onClick={this.start}>
          <Play />
        </button>
      )
    }
    return (
      <div className="app">
        <div className="frame">
          <div className="barsDiv container card" >
            {myBars}
          </div>
        </div>
        <div className="control-panel">
          <div className="control-buttons">
          <button className="controller" onClick={this.previosStep}>
            <Backward />
          </button>
            {playButton}
          <button className="controller" onClick={this.nextStep}>
          <Forward />
          </button>
          
          </div> 
        </div>
        <div className="panel">

        </div>
      </div>
    );
  }
}
 
export default App;
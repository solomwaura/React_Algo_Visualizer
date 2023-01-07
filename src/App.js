import react, {Component} from 'react'
import './App.css';
import Bars from './components/Bars';

// icons

import Play from "@mui/icons-material/Play"; 
import Forward from "@mui/icons-material/Forward";
import Backward from "@mui/icons-material/Backward";
import RotateLeft from "@mui/icons-material/RotateLeft";

class App extends Component {
  state = { 
    array:[],
    arraySteps: [],
    colorKey: [], 
    currentStep :0,
    count :10,
    delay: 100,
    algorithm: '', 
    timeouts:[],
   }; 
   componentDidMount(){
    this.generateRandomArray();
   }
   generateRandomNumber =(min,max)=>{
    return Math.floor(Math.random() * (max-min) + min);

   }
   generateRandomArray = ()=>{
     const count = this.state.count;
     const temp = [];

     for(let i=0; i<count; i++){
      temp.push(this.generateRandomNumber(50,200));
     }
     
     this.setState({
      array: temp,
      arraySteps: [temp],
      currentStep: 0
     })
   };

   changeArray = (index, value) =>{
    let arr = this.state.array;
    arr[index] = value;
    this.setState({
      array: arr,
      arraySteps: [arr],
      currentStep: 0
    })
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

    if(this.state.arraySteps.length == this.state.currentStep){
      playButton =(
        <button className="controller">
          <RotateLeft />
        </button>
      )
    }else{
      playButton = (
        <button>
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
          <div className="panel"></div>
        </div>
      </div>
    );
  }
}
 
export default App;
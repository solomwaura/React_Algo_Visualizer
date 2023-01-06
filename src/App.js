import react, {Component} from 'react'
import './App.css';
import Bars from './components/Bars';

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
      arraySteps: [temp]
     })
   };
  render() { 
    let myBars = this.state.array.map((value, index) =>(<Bars
      key={index}
       index={index} 
       length={value} 
       color={this.state.colorKey[index]} />
    ));
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
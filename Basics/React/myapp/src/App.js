import React from 'react';
import './App.css';
import Newcomp from './components/NewComp';
/*import FunctionalComp from './components/FunctionalComp';
import { ClassComp, ClassComp1 } from './components/ClassComp';
import Click from './components/click';
import Counter from './components/Counter';

function App() {
  return (
    <div>
      <h1>Hello! Welcome to first react project...Rathi</h1>
      <h1>This video is about Components</h1>
      <FunctionalComp />
      <ClassComp />
      <ClassComp1 />
      <Click /> 
      <Counter/>
    </div>
  );
}*/

class App extends React.Component{

  styles={
    fontStyle: "bold",
    color: "teal"
  };
  render(){
    return (
    <div className="App">
     <h1 style={this.styles}> Welcome</h1>
     <Newcomp />
     </div>
     );
  }
}

export default App;




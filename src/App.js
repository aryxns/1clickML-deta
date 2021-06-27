import React from 'react';
import './App.css';
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Home from "./components/HomePage";
import Experiment from "./components/experiment";
import * as dfd from "danfojs/src/index";

function App() {
 
  return (
    <div className="App w-4/5">
      <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/ex" component={Experiment}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
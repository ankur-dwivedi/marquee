import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./Home"
import List from "./List"


function App() {
  return (<Router>
      <div>
        <main>
          <Switch>
           
            <Route exact path="/" render={props =>  <Home {...props} key={props.key}/>}></Route>
            <Route exact path="/list" render={props =>  <List {...props} key={props.key}/>}></Route>
          </Switch>
        </main>
      </div>
     
    </Router>);
}

export default App;

import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ComponentsTesterPage from './components/Test/ComponentsTesterPage';
import AssetCardTester from './components/Assets/AssetCardTester';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/testers"><ComponentsTesterPage /></Route>
          <Route path="/testers/asset"><AssetCardTester /></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

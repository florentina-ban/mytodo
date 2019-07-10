import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from "./comp.js";

function App() {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="myCss">
      <Layout />
      </div>
    </div>
  );
}

export default App;

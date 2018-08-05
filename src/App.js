import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import NintendoMap from './nintendoMap'

class App extends Component {


  componentDidMount () {
    
  const script = document.createElement("script");

  // script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC-06UeTK6ZdjEr7eoblkbIosKnddwrPyg&v=3";
  // script.async = true;
  // script.defer = true;

  document.getElementById('root').appendChild(script);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      <Route path='/' render={() => (
        // see - https://www.npmjs.com/package/google-maps-react#manually-loading-the-google-api
        <NintendoMap google={window.google}/>
      )}/>
 
      </div>

    );
  }
}

export default App;

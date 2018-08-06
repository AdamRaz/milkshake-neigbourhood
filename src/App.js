import React, { Component } from 'react';
import { Route } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import NintendoMap from './nintendoMap'
import LocationList from './LocationList'
// import InfoPanel from './Sidebar.js'

class App extends Component {

  state = {
    target: {}
  }

  componentDidMount () {
    
  const script = document.createElement("script");

  // script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC-06UeTK6ZdjEr7eoblkbIosKnddwrPyg&v=3";
  // script.async = true;
  // script.defer = true;

  document.getElementById('root').appendChild(script);
  }

  updateSidebarInfoTarget(target) {
    console.log(`from App component, new sidebar target is: ${target}`)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Neighbourhood Map - New York & Coffee</h1>
        </header>
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
      <Route path='/' render={() => (
        // see - https://www.npmjs.com/package/google-maps-react#manually-loading-the-google-api
        <div id="map3">
        <NintendoMap google={window.google} updateSidebar={(target) => this.updateSidebarInfoTarget(target)}/>
        <LocationList/>
        {/* <InfoPanel/> */}
        </div>
      )}/>
 
      </div>

    );
  }
}

export default App;

import React, { Component } from 'react';
import { Route } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import NintendoMap from './nintendoMap'
import LocationList from './LocationList'
// import InfoPanel from './Sidebar.js'

class App extends Component {

  state = {
    target: {},
    locations: [
      {id: 1, title: 'Park Ave Penthouse', lowerCaseName: 'park ave penthouse' , location: {lat: 40.7713024, lng: -73.9632393}},
      {id: 2, title: 'Chelsea Loft', lowerCaseName: 'chelsea loft', location: {lat: 40.7444883, lng: -73.9949465}},
      {id: 3, title: 'Union Square Open Floor Plan', lowerCaseName: 'union square open floor plan', location: {lat: 40.7347062, lng: -73.9895759}},
      {id: 4, title: 'East Village Hip Studio', lowerCaseName: 'east village hip studio', location: {lat: 40.7281777, lng: -73.984377}},
      {id: 5, title: 'TriBeCa Artsy Bachelor Pad', lowerCaseName: 'tribeca artsy bachelor pad', location: {lat: 40.7195264, lng: -74.0089934}},
      {id: 6, title: 'Chinatown Homey Space', lowerCaseName: 'chinatown homey space', location: {lat: 40.7180628, lng: -73.9961237}}
    ],
    filteredLocations: []
  }

  componentDidMount () {
    // TODO -remove
    // this.locations = [
    //   {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
    //   {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
    //   {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
    //   {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
    //   {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
    //   {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
    // ];
    
  const script = document.createElement("script");

  // script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC-06UeTK6ZdjEr7eoblkbIosKnddwrPyg&v=3";
  // script.async = true;
  // script.defer = true;

  document.getElementById('root').appendChild(script);
  }

  updateSidebarInfoTarget(target) {
    console.log(`from App component, new sidebar target is: ${target}`)
  }

  updateAppFilteredLocations = (filteredLocations) => {
    // AR - declare as arrow function to maintain context without binding, see: https://medium.com/@ruthmpardee/passing-data-between-react-components-103ad82ebd17
    console.log(`from App component, updating filtered locations: ${filteredLocations}`);

    this.setState({filteredLocations: filteredLocations});
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
        <NintendoMap google={window.google} locations={this.state.locations} updateSidebar={(target) => this.updateSidebarInfoTarget(target)}/>
        <LocationList locations={this.state.locations} updateAppFilteredLocations={this.updateAppFilteredLocations}/>
        {/* <InfoPanel/> */}
        </div>
      )}/>
 
      </div>

    );
  }
}

export default App;

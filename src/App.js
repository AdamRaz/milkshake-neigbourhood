import React, { Component } from 'react';
import './App.css';
import Map from './Map'
import LocationList from './LocationList'

class App extends Component {

  state = {
    locations: [
      {id: 0, title: 'Park Ave Penthouse', lowerCaseName: 'park ave penthouse' , location: {lat: 40.7713024, lng: -73.9632393}},
      {id: 1, title: 'Chelsea Loft', lowerCaseName: 'chelsea loft', location: {lat: 40.7444883, lng: -73.9949465}},
      {id: 2, title: 'Union Square Open Floor Plan', lowerCaseName: 'union square open floor plan', location: {lat: 40.7347062, lng: -73.9895759}},
      {id: 3, title: 'East Village Hip Studio', lowerCaseName: 'east village hip studio', location: {lat: 40.7281777, lng: -73.984377}},
      {id: 4, title: 'TriBeCa Artsy Bachelor Pad', lowerCaseName: 'tribeca artsy bachelor pad', location: {lat: 40.7195264, lng: -74.0089934}},
      {id: 5, title: 'Chinatown Homey Space', lowerCaseName: 'chinatown homey space', location: {lat: 40.7180628, lng: -73.9961237}}
    ],
    filteredLocations: [
      {id: 0, title: 'Park Ave Penthouse', lowerCaseName: 'park ave penthouse' , location: {lat: 40.7713024, lng: -73.9632393}},
      {id: 1, title: 'Chelsea Loft', lowerCaseName: 'chelsea loft', location: {lat: 40.7444883, lng: -73.9949465}},
      {id: 2, title: 'Union Square Open Floor Plan', lowerCaseName: 'union square open floor plan', location: {lat: 40.7347062, lng: -73.9895759}},
      {id: 3, title: 'East Village Hip Studio', lowerCaseName: 'east village hip studio', location: {lat: 40.7281777, lng: -73.984377}},
      {id: 4, title: 'TriBeCa Artsy Bachelor Pad', lowerCaseName: 'tribeca artsy bachelor pad', location: {lat: 40.7195264, lng: -74.0089934}},
      {id: 5, title: 'Chinatown Homey Space', lowerCaseName: 'chinatown homey space', location: {lat: 40.7180628, lng: -73.9961237}}
    ],
    target: [],
  }

  updateSidebarInfoTarget = (target) => {
    // console.log(`from App component, new sidebar target is: ${target.id} with ${target.title} at ${target.position}`)
    this.target = [target.id, target.title];
    // this.updateStateTarget(this.target);
    // TODO - addition of setState here causes error - markers no longer animate
    this.setState({
      target:{
        id: target.id,
        // title: target.title,
        // position: target.position,
      }
    });
  }

  updateSidebarInfoFromList = (event, target) => {
    // console.log(`from App component, clicking on list, new sidebar target is: ${target}`)
    this.setState({
      target:{
        id: target,
        // title: target.title,
        // position: target.position,
      }
    });
  }

  updateAppFilteredLocations = (filteredLocations) => {
    // AR - declare as arrow function to maintain context without binding, see: https://medium.com/@ruthmpardee/passing-data-between-react-components-103ad82ebd17
    // console.log(`from App component, updating filtered locations: ${filteredLocations}`);

    this.setState({filteredLocations: filteredLocations});
    this.setState({searchInput: true})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Neighbourhood Map - New York & Milkshakes</h1>
        </header>
        {/* AR, using 'window.google' below, see - https://www.npmjs.com/package/google-maps-react#manually-loading-the-google-api */}
          <div id="map3">
          <Map 
            google={window.google}
            locations={this.state.locations}
            updateSidebar={this.updateSidebarInfoTarget}
            filteredLocations={this.state.filteredLocations}
            searchInput={this.state.searchInput}
            mapTarget={this.state.target}
          />
          <LocationList 
            locations={this.state.locations} 
            updateAppFilteredLocations={this.updateAppFilteredLocations}
            mapTarget={this.state.target}
            updateSidebarFromList={this.updateSidebarInfoFromList}
          />
          </div>
 
      </div>
    );
  }
}

export default App;

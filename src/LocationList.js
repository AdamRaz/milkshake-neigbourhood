import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
// import './App.css';

class LocationList extends Component {

  state = {
    locations: ['york', 'london', 'londonderry', 'new york', 'yorkshire']

  }

  filterLocations = (event) => {
    let searchTerm = event.target.value;
    let trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm) {
      console.log(trimmedSearchTerm);
      this.filteredLocations = this.state.locations.filter((location) => location.includes(trimmedSearchTerm));
      console.log(this.filteredLocations);
      this.setState({filteredLocations: this.filteredLocations});

    } else {
      this.setState({filteredLocations: this.state.locations});
    }
  }

  componentWillMount () {
    this.setState({filteredLocations: this.state.locations});
    this.filteredLocations = this.state.locations;
  }

  render() {
    this.locations = this.state.filteredLocations;
    return (
      <div className="location-list">
        <div className="location-list-items">
        <h2>locations</h2>
        <input onChange={(event) => this.filterLocations(event)} type='text' placeholder='search locations'/>
        {/* made h2 as h1 taken by main app heading */}
        <div className="location-list-elements-container">
        <ul className="location-list-elements">
          {this.locations.map((location) => (
            <li key={location}>{location}</li>
          ))}
          <li></li>
          <li>location 2</li>
          <li>location 3</li>
          <li>location 4</li>
          <li>location 5</li>
          <li>location 6</li>
          <li>location 7</li>
          <li>location 8</li>
          <li>location 9</li>
          <li>location 10</li>
          <li>location 11</li>
        </ul>
        </div>
        </div>
        <div className="location-list-info">
        <h2>location info</h2>
        </div>
      </div>
    );
  }
}

export default LocationList;

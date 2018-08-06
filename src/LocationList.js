import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
// import './App.css';

class LocationList extends Component {

  state = {
    locations: ['york', 'london', 'londonderry', 'new york', 'yorkshire']

  }

  filterLocations = (event) => {
    // AR - does not work for search key words in opposite order
    let searchTerm = event.target.value;
    let trimmedSearchTerm = searchTerm.trim().toLowerCase();
    if (trimmedSearchTerm) {
      console.log(trimmedSearchTerm);
      this.filteredLocations = this.state.locations.filter((location) => location.lowerCaseName.includes(trimmedSearchTerm));
      console.log(this.filteredLocations);
      this.setState({filteredLocations: this.filteredLocations});
      this.props.updateAppFilteredLocations(this.filteredLocations);
    } else {
      this.setState({filteredLocations: this.state.locations});
      this.props.updateAppFilteredLocations(this.filteredLocations);
    }
  }

  componentWillMount () {
    this.setState({locations: this.props.locations})
    this.setState({filteredLocations: this.props.locations});
    this.filteredLocations = this.props.locations;
    console.log("location list data from props:")
    console.log(this.props.locations);

    // console.log(this.state.locations);
    // console.log(this.props.locations[0].title);
  }

  render() {
    this.locations = this.state.filteredLocations;
    console.log("location render function");
    // console.log(this.state.locations);
    // this.locations = this.props.locations;
    // console.log(this.locations[0].title);
    return (
      <div className="location-list">
        <div className="location-list-items">
        <h2>locations</h2>
        <input onChange={(event) => this.filterLocations(event)} type='text' placeholder='search locations'/>
        {/* made h2 as h1 taken by main app heading */}
        <div className="location-list-elements-container">
        <ul className="location-list-elements">
          {this.locations.map((location) => (
            <li key={location.id}>{location.title}</li>
          ))}
          <li>location 1</li>
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

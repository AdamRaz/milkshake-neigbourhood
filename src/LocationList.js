import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
// import './App.css';

class LocationList extends Component {
  render() {
    return (
      <div className="location-list">
        <div className="location-list-items">
        <h2>locations</h2>
        <input type='text' placeholder='search locations'/>
        {/* made h2 as h1 taken by main app heading */}
        <div className="location-list-elements-container">
        <ul className="location-list-elements">
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

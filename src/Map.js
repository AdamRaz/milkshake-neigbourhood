import React, { Component } from 'react';
import './App.css';

class Map extends Component {
  state = {
    markers: []
  }

  componentWillMount () {
    // console.log("will mount map component");
    let google = this.props.google;
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7413549, lng: -73.9980244},
      zoom: 11,
      mapTypeControl: false
    });
    let locations = this.props.locations; 
    this.markers = [];
    for (let i = 0; i < locations.length; i++) {
      let position = locations[i].location;
      let title = locations[i].title;
      let marker = new google.maps.Marker({
        position: position,
        title: title,
        map: this.map,
        animation: google.maps.Animation.DROP,
        id: i
      });
      // console.log(`marker ${i} data - id: ${marker.id}, title: ${marker.title}, icon: ${marker.icon}`);
      // see - https://developers.google.com/maps/documentation/javascript/markers       
      this.markers.push(marker);
    }
    // console.log(`marker array: ${this.markers}`);
    this.setState({markers: this.markers});
    this.showMarkerButton(this.markers);
  }

  addClickEventToMarkers (i) {
    let markers = this.markers;
    // setting to this.state.markers raised errors when accessing id etc.

    // can pass info up to app state (function from app that passes update function down to here, then call that to update which marker info should be shown by another component)

    this.props.updateSidebar(markers[i]);
  }

  showMarkerButton = function(markers) {
    let google = this.props.google;
    let functionTest = this.addClickEventToMarkers.bind(this);
    // issues with calling a function without binding 'this' first
    // console.log(functionTest);
    // functionTest();
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(this.map);
      markers[i].addListener('click', function() {
        if (markers[i].getAnimation() !== null) {
          markers[i].setAnimation(null);
        } else {
          markers[i].setAnimation(google.maps.Animation.BOUNCE);
          functionTest(i);
          for (let j = 0; j < markers.length; j++) {
            if (i !== j) {
              // console.log("set null animation!");
              // console.log(`marker: ${markers[i]}, id: ${markers[i].id}, i is ${i}, j is ${j}`);
              markers[j].setAnimation(null);
            }
          }
        } 
        // see https://developers.google.com/maps/documentation/javascript/markers       
      });
    }
  // console.log("showMark function");
  };

  hideMarkerButton = function(locations, markers) {
    if (markers.length > locations.length) {
   
      // AR - create array of ids to compare against:
      let filteredIdsArray = [];

      locations.map((location) => filteredIdsArray.push(location.id));
      // console.log(`hiding function, filtered markers id array: ${filteredIdsArray}`);

      for (let i = 0; i < markers.length; i++) {
        if (filteredIdsArray.includes(markers[i].id)) {
          markers[i].setMap(this.map);
        } else {
          markers[i].setMap(null); 
        }
      }
    }
  };

  componentWillReceiveProps () {
    // AR - tried setting function in willRecieveProps to avoid the problem causing map markers not to animate

    // AR - previously had function called from render() function, not sure how best to keep marker display up-to-date

    let markers = this.state.markers;
    let filteredLocations = this.props.filteredLocations;

    // AR - to fix animatin bug: can check event to make sure only does this when keyboard event is ocurring?

    this.hideMarkerButton(filteredLocations, markers);
  }

  animateMarker = (i) => {
    let google = this.props.google;
    let markers = this.state.markers;
    markers.map((marker) => {
      if (i === marker.id) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      } else {
        marker.setAnimation(null);
      }
    });
  }

  render() {
    let mapTarget=this.props.mapTarget;
    // console.log(`receiving props in map component, target id is: ${mapTarget.id}`);
    if (mapTarget.id) {
      this.animateMarker(mapTarget.id);
    }
    // let markers = this.state.markers;
    // let filteredLocations = this.props.filteredLocations;
    // console.log ("we have markers: " + markers);
    return (
      // AR - nothing rendered here as the map is attached to index.html
      <div className="map-container">
      </div>
    );
  }
}

export default Map;
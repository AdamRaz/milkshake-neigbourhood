import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './App.css';
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
// import scriptLoader from 'react-async-script-loader';

class NintendoMap extends Component {
  state = {
    markers: []
  }

  initMap() {
    console.log("init map inside nintendo component");

  }  

  componentWillMount () {
    console.log("will mount map component");
    console.log(this.props.google);
    let google = this.props.google;

    // TODO - reference
    this.map = new google.maps.Map(document.getElementById('map'), {
      //TODO = update this
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
        console.log(`marker ${i} data - id: ${marker.id}, title: ${marker.title}, icon: ${marker.icon}`);

        // marker.addListener('mousedown', function() {
        //   console.log(`marker: ${marker}`);
        //   // marker.setMap(null);
        //   if (marker.getAnimation() !== null) {
        //     // TODO - set a different colour image ... setIcon method???
        //     marker.setAnimation(null);
        //   } else {
        //     marker.setAnimation(google.maps.Animation.BOUNCE);
        //     // this.deselectOtherMarkers(marker);
        //   } 
        //   // see https://developers.google.com/maps/documentation/javascript/markers       
        // });

        this.markers.push(marker);
        // markers[i].setMap(this.map);
      }
    console.log(`marker array: ${this.markers}`);
    this.setState({markers: this.markers});
  // let showMarkerButton = document.querySelector('.addMarkers');
  // let hideMarkerButton = document.querySelector('.removeMarkers');
      // this.addClickEventToMarkers();
  }

  addClickEventToMarkers (i) {
    let markers = this.markers;
    // setting to this.state.markers raised errors when accessing id etc.
    // can pass info up to app state (function from app that passes update function down to here, then call that to update which marker info should be shown by another component)
    console.log (`i is ${i}`)
    console.log(`deselecting markers: ${markers[i].id} ${markers[i].position}`);
    console.log (`this is ${this}`)
    console.log (`this.state is ${this.state}`)
    this.props.updateSidebar(markers[i]);
    // console.log(`marker ${i} data - id: ${markers[i].id}, title: ${markers[i].title}`);
    // for (let i = 0; i < markers.length ; i++) {
    //   markers[i].addListener('click', function() {
    //     console.log("adding events to markers");
    //   });
    // }

  }

  deselectOtherMarkers (markers, i) {
    // let markers = this.state.markers;
    console.log (`this is ${this}`)
    console.log (`this.state is ${this.state}`)
    console.log(`deselecting all markers apart from: ${markers[i].id}`);
    // for (let i = 0; i < markers.length ; i++) {

    // }
  }

  componentDidMount () {
    console.log("mounted map component");
    // see - https://developer.foursquare.com/docs/api/getting-started
    const request = require('request');

    request({
      url: 'https://api.foursquare.com/v2/venues/explore',
      method: 'GET',
      qs: {
        client_id: 'JIN1RTWFVHTESSF0J51MA2R3POD12X4OEI0LFR4I0YBUHMAJ',
        client_secret: 'PD4XAVZK5ADSLYJORCUGK3JKJEWCPANFKIENMGG3NZYW03V1',
        ll: '40.7243,-74.0018',
        query: 'coffee',
        v: '20180323',
        limit: 1
      }
    }, function(err, res, body) {
      if (err) {
        console.error(err);
        // TODO link to error display in UI
      } else {
        let jsonBody = JSON.parse(body);
        let items = jsonBody.response.groups;
        console.log(items);
        console.log(jsonBody);
        // let venues = body['response']['groups'][0]['items'];
      }
    });

  }

  showMarkerButton = function(markers) {
    console.log (`showMarker this is ${this}`)
    console.log (`this.state is ${this.state}`)
    let google = this.props.google;
    let functionTest = this.addClickEventToMarkers.bind(this);
    // issues with calling a function without binding 'this' first
    console.log(functionTest);
    // functionTest();
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(this.map);

      markers[i].addListener('click', function() {
        // console.log(`marker: ${marker}`);
        // marker.setMap(null);
        if (markers[i].getAnimation() !== null) {
          // TODO - set a different colour image ... setIcon method???
          markers[i].setAnimation(null);
          console.log (`this is ${this}`)
          console.log (`this.state is ${this.state}`)
        } else {
          markers[i].setAnimation(google.maps.Animation.BOUNCE);
          functionTest(i);
          for (let j = 0; j < markers.length; j++) {
            if (i !== j) {
              console.log("set null animation!");
              console.log(`marker: ${markers[i]}, id: ${markers[i].id}, i is ${i}, j is ${j}`);

              markers[j].setAnimation(null);
            }
          }

          // this.deselectOtherMarkers(markers[i]);
        } 
        // see https://developers.google.com/maps/documentation/javascript/markers       
      });
    }

  console.log("showMark function");
  };

  hideMarkerButton = function(locations, markers) {
    // console.log(NintendoMap.state);
    // AR - create array of ids to compare against:
    let filteredIdsArray = [];
    // for (let j = 0; j < locations.length; j++) {
    //   filteredIdsArray.push(locations[j].id)
    // }

    locations.map((location) => filteredIdsArray.push(location.id));
    console.log(`hiding function, filtered markers id array: ${filteredIdsArray}`);

    for (let i = 0; i < markers.length; i++) {

     

        // let id = this.props.filteredLocations[j].id;

        if (filteredIdsArray.includes(markers[i].id)) {
          markers[i].setMap(this.map);
          console.log(`showing marker id: ${markers[i].id}`);
        } else {
          markers[i].setMap(null); 
          console.log(`hiding marker id: ${markers[i].id}`);

        }

 

    }
  };

  render() {
    let markers = this.state.markers;
    let filteredLocations = this.props.filteredLocations;
    this.hideMarkerButton(filteredLocations, markers);
    console.log ("we have markers: " + markers);
    return (
      <div className="map-container">
        {/* <br/> */}
        {/* <p>map component content</p> */}
        {/* <button className="removeMarkers" onClick={() => this.hideMarkerButton(markers)}>hide markers</button> */}
        <button className="addMarkers" onClick={() => this.showMarkerButton(markers)}>set markers</button>

        {/* <div id="map2"></div> */}
        {/* <br/> */}
      </div>
    );
  }
}

export default NintendoMap;
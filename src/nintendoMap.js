import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './nintendoMap.css';
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
      center: {lat: 40.7413549, lng: -73.9980244},
      zoom: 12,
      mapTypeControl: false
    });

    let locations = [
      {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
      {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
      {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
      {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
      {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
      {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
    ];

  
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

        marker.addListener('click', function() {
          console.log(`marker: ${marker}`);
          // marker.setMap(null);
          if (marker.getAnimation() !== null) {
            // TODO - set a different colour image ... setIcon method???
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          } 
          // see https://developers.google.com/maps/documentation/javascript/markers       
        });

        this.markers.push(marker);
        // markers[i].setMap(this.map);
      }
    console.log(`marker array: ${this.markers}`);
    this.setState({markers: this.markers});
  // let showMarkerButton = document.querySelector('.addMarkers');
  // let hideMarkerButton = document.querySelector('.removeMarkers');

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
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(this.map);
    }
    console.log(markers);
  };

  hideMarkerButton = function(markers) {
    // console.log(NintendoMap.state);
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  };

  render() {
    let markers = this.state.markers;
    console.log ("we have markers: " + markers);
    return (
      <div>
        <br/>
        <p>map component content</p>
        <button className="removeMarkers" onClick={() => this.hideMarkerButton(markers)}>hide markers</button>
        <button className="addMarkers" onClick={() => this.showMarkerButton(markers)}>set markers</button>

        <div id="map2"></div>
        <br/>
      </div>
    );
  }
}

export default NintendoMap;
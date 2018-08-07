import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
// import './App.css';

class LocationList extends Component {

  state = {
    locations: ['york', 'london', 'londonderry', 'new york', 'yorkshire'],
    drinkPlaces: [{
      name: 'click a marker/location to find out!',
      address: 'nowhere'
    }],
    extraData: []
    
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
      console.log("resetting filtered locations");
      this.setState({filteredLocations: this.props.locations});
      this.props.updateAppFilteredLocations(this.props.locations);
    }
  }

  // updateSidebar = (event) => {

  //   this.props.updateSidebar(markers[i]);
  // }

  getDrinkPlaceData = (position) => {
    console.log("before making foursquare request");

    console.log(position);
    console.log(position.id);
    console.log(position.title);

    console.log(this.props.locations[0].location)

    if (position.title) {
      let index = position.id;
      // let latlng = this.props.locations[index].location;
      console.log("making main foursquare requests");
      console.log(position.title);
      console.log(position.position);
      const request = require('request');
      // let lat = position.lat;
      // let long = position.lng;
      // console.log(lat);
      // console.log(long);
      let lat = 40.7713024;
      let lng = -73.9632393;
      request({
        url: 'https://api.foursquare.com/v2/venues/explore',
        method: 'GET',
        qs: {
          client_id: 'JIN1RTWFVHTESSF0J51MA2R3POD12X4OEI0LFR4I0YBUHMAJ',
          client_secret: 'PD4XAVZK5ADSLYJORCUGK3JKJEWCPANFKIENMGG3NZYW03V1',
          ll: `${lat},${lng}`,
          query: 'milkshake',
          v: '20180323',
          limit: 2
        }
      }, function(err, res, body) {
        if (err) {
          console.error(err);
          // TODO link to error display in UI
        } else {
          let jsonBody = JSON.parse(body);
          let items = jsonBody.response.groups;
          console.log(items);
          console.log(items[0].items[0].venue.name);
          console.log(items[0].items[0].venue.location.address);
          console.log(items[0].items[0].venue.location.formattedAddress);

          console.log(items[0].items[1].venue.name);
          console.log(items[0].items[1].venue.location.address);
          console.log(items[0].items[1].venue.location.formattedAddress);
          // this.drinkPlaces = [
          //   {
          //     name: items[0].venue.name,
          //     address: items[0].venue.location.address
          //   }, 
          //   {
          //     name: items[1].venue.name,
          //     address: items[2].venue.location.address
          //   }
          // ]
          // this.setState({drinkPlaces: this.drinkPlaces})
          // let venues = body['response']['groups'][0]['items'];
        }
      });
    }
  }

  componentWillReceiveProps(newProps)  {
    console.log("list component recieving props");
    console.log(this.props.mapTarget);
    //  console.log(newProps.maindata)
    // TODO - strange bug where must click marker a few times before props update, even though devTools react show state/props are fine!!!
  }
  

  componentWillMount () {
    this.setState({locations: this.props.locations})
    this.setState({filteredLocations: this.props.locations});
    this.filteredLocations = this.props.locations;
    console.log("location list data from props:")
    console.log(this.props.locations);
    let locations = this.props.locations;
    let extraDataArray =[1,2,3];
    
    for (let i = 0; i < locations.length; i++) {
      let lat2 = locations[i].location.lat;
      let lng2 = locations[i].location.lng;
      console.log(`latlng 2: ${lat2},${lng2}`)
     
      // let lat = position.lat;
      // let long = position.lng;
      // console.log(lat);
      // console.log(long);
      let lat = 40.7713024;
      let lng = -73.9632393;

      fetch(`https://api.foursquare.com/v2/venues/explore?&client_id=JIN1RTWFVHTESSF0J51MA2R3POD12X4OEI0LFR4I0YBUHMAJ&client_secret=PD4XAVZK5ADSLYJORCUGK3JKJEWCPANFKIENMGG3NZYW03V1&query=milkshake&limit=2&v=20180323&ll= ${lat2},${lng2}`)
      .then(body => body.json())
      // .then(response => console.log(`fetch: ${response.meta.code}`))
      .then(response => 
        
        this.setState( state => ({
        extraData: state.extraData.concat([response])
        }
      
    )
  )
  )
      // const request = require('request');
      // request({
      //   url: 'https://api.foursquare.com/v2/venues/explore',
      //   method: 'GET',
      //   qs: {
      //     client_id: 'JIN1RTWFVHTESSF0J51MA2R3POD12X4OEI0LFR4I0YBUHMAJ',
      //     client_secret: 'PD4XAVZK5ADSLYJORCUGK3JKJEWCPANFKIENMGG3NZYW03V1',
      //     ll: `${lat2},${lng2}`,
      //     query: 'milkshake',
      //     v: '20180323',
      //     limit: 2
      //   }
      // }, function(err, res, body) {
      //   if (err) {
      //     console.error(err);
      //     // TODO link to error display in UI
      //   } else {
      //     let jsonBody = JSON.parse(body);
      //     let items = jsonBody.response.groups;

      //     console.log(items);
      //     console.log(items[0].items[0].venue.name);
      //     console.log(items[0].items[0].venue.location.address);
      //     console.log(items[0].items[0].venue.location.formattedAddress);

      //     console.log(items[0].items[1].venue.name);
      //     console.log(items[0].items[1].venue.location.address);
      //     console.log(items[0].items[1].venue.location.formattedAddress);
      //     // let extraData = {id: i, placeName: items[0].items[0].venue.name, address: items[0].items[0].venue.location.address};
      //     let extraDataArray =[];
      //     let extraData = {id: i, day: 'sat'};
      //     extraDataArray.push(extraData);
      //     console.log(`extraDataArray: ${extraDataArray[0].day}`);
          // console.log(this.props.locations)
          // this.drinkPlaces = [
          //   {
          //     name: items[0].venue.name,
          //     address: items[0].venue.location.address
          //   }, 
          //   {
          //     name: items[1].venue.name,
          //     address: items[2].venue.location.address
          //   }
          // ]
          // this.setState({drinkPlaces: this.drinkPlaces})
          // let venues = body['response']['groups'][0]['items'];
      //   }
      // });


    }
    // console.log(`extraDataArray 2: ${extraDataArray}`);
    // console.log(this.state.locations);
    // console.log(this.props.locations[0].title);
  }

  render() {
    this.locations = this.state.filteredLocations;
    this.drinkPlaces = this.state.drinkPlaces;
    this.mapTarget = this.props.mapTarget;
    this.updateSidebar = this.props.updateSidebarFromList;
    // this.updateDateSidebar = this.props.updateSidebar(markers[i]);

    let showingExtraData;
    let id = this.mapTarget.id;
    let locationName;
    // this.getDrinkPlaceData(this.mapTarget);
    console.log("location render function");
    if (id >= 0) {
      // console.log(this.state.extraData[id].response.groups.items[0].venue.name);
      let item = this.state.extraData[id].response.groups;
      console.log(item[0].items[0].venue.name);
      console.log(item[0].items[0].venue.location.address);
      this.drinkPlaces[0].name = item[0].items[0].venue.name;
      this.drinkPlaces[0].address = item[0].items[0].venue.location.address;
      locationName = 'near ' +this.locations[id].title;

    }
    console.log(`target id is ${id}`);
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
            <li key={location.id}>
            {location.title}
              <br/>
              <button onClick={(event) => this.updateSidebar(event, location.id)} className='see-sidebar-info'>
                Info
              </button>
            </li>
          ))}
          <li  onClick={(event) => this.updateSidebar(event)}>location 1</li>
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
          <h3>where to get a milkshake {locationName}:</h3>
          <ul className="drink-list-elements">
            {this.drinkPlaces.map((place) => (
            <li key={place.name}>{place.name},<br/> {place.address}</li>
            ))}
          </ul>
          <p className="api-credit">using Foursquare data</p>
        </div>
      </div>
    );
  }
}

export default LocationList;

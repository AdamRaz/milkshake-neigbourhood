import React, { Component } from 'react';

class LocationList extends Component {

  state = {
    locations: ['york', 'london', 'londonderry', 'new york', 'yorkshire'],
    drinkPlaces: [{
      name: '',
      address: ''
    }],
    extraData: [],
    fetchError: "",
  }

  filterLocations = (event) => {
    // AR - does not work for search key words in opposite/wrong order
    let searchTerm = event.target.value;
    let trimmedSearchTerm = searchTerm.trim().toLowerCase();
    if (trimmedSearchTerm) {
      // console.log(trimmedSearchTerm);
      this.filteredLocations = this.state.locations.filter((location) => location.lowerCaseName.includes(trimmedSearchTerm));
      // console.log(this.filteredLocations);
      this.setState({filteredLocations: this.filteredLocations});
      this.props.updateAppFilteredLocations(this.filteredLocations);
    } else {
      // console.log("resetting filtered locations");
      this.setState({filteredLocations: this.props.locations});
      this.props.updateAppFilteredLocations(this.props.locations);
    }
  }

  componentWillMount () {
    this.setState({locations: this.props.locations})
    this.setState({filteredLocations: this.props.locations});
    this.filteredLocations = this.props.locations;
    // console.log("location list data from props:")
    // console.log(this.props.locations);
    let locations = this.props.locations;
    
    for (let i = 0; i < locations.length; i++) {
      let lat2 = locations[i].location.lat;
      let lng2 = locations[i].location.lng;
     
      // see - https://developer.foursquare.com/docs/api/getting-started
      fetch(`https://api.foursquare.com/v2/venues/explore?&client_id=JIN1RTWFVHTESSF0J51MA2R3POD12X4OEI0LFR4I0YBUHMAJ&client_secret=PD4XAVZK5ADSLYJORCUGK3JKJEWCPANFKIENMGG3NZYW03V1&query=milkshake&limit=2&v=20180323&ll=${lat2},${lng2}`)
      .catch(() => this.setState({fetchError: "foursquare api data incomplete/not available"})) 
      .then(body => body.json())
      .then(response => 
        this.setState( state => ({
            extraData: state.extraData.concat([response])
          })
        )
      )
    }
    // console.log(this.state.locations);
    // console.log(this.props.locations[0].title);
  }

  render() {
    this.locations = this.state.filteredLocations;
    // console.log(this.locations);
    // AR - 'drinkPlaces' is foursquare API data
    this.drinkPlaces = this.state.drinkPlaces;
    this.mapTarget = this.props.mapTarget;
    this.updateSidebar = this.props.updateSidebarFromList;
    this.errorMessage = this.state.fetchError;
    this.errorMessage2 = "";
    let id = this.mapTarget.id;
    // console.log(id);
    let locationName;
    // console.log("location render function");

    // AR - get location with correct id:

    let locationFromId = this.locations.filter(location => location.id === id);
    // console.log(locationFromId);
    
    let locationTitleFromId;

    if (locationFromId.length > 0) {
      // console.log("locationFromId array has length")
      locationTitleFromId = locationFromId[0].title;
      // console.log(locationTitleFromId);
    } else {
      locationTitleFromId = "...pick a location on-screen!";
    }
    // AR - build string to fit in html heading below
    locationName = 'near ' + locationTitleFromId;

    // AR - just check id is assigned a number from props first (marker ids are 1 to 5)

    if (id >= 0) {

    // AR - check foursquare data is ready, needs a better check?
    // AR - need to handle 404 fetch error
      if (this.state.extraData[0].meta.code === 200) {
        // AR - extract data from fourSquare API response
        let item = this.state.extraData[id].response.groups[0].items[0].venue;
        this.drinkPlaces[0].name = item.name || 'data error, please try again later';
        this.drinkPlaces[0].address = item.location.address || 'data unavailable';
 
      } else {
        this.errorMessage = "foursquare api data incomplete/not available";
        this.errorMessage2 = "please try again later";
      }
    }
 

    return (
      <div className="location-list">
        <div className="location-list-items">
        <h2>locations</h2>
        {/* made h2 as h1 taken by main app heading */}
        <input onChange={(event) => this.filterLocations(event)} type='text' placeholder='search locations' aria-label="search box for location list"/>
          <div className="location-list-elements-container">
          <ul className="location-list-elements" aria-label="selectable location list">
            {this.locations.map((location) => (
              <li  onClick={(event) => this.updateSidebar(event, location.id)} key={location.id} role="button" className="location-list-options" tabIndex="0">
              {location.title}
                <br/>
                {/* AR - buttons replaced with onClick events on list items abov */}

                {/* <button onClick={(event) => this.updateSidebar(event, location.id)} className='see-sidebar-info'>
                  Info
                </button> */}

              </li>
            ))}
          </ul>
          </div>
        </div>
        <div className="location-list-info">
          <h2>location info</h2>
          <h3>click a marker/location!</h3>
          <h3>where to get a milkshake {locationName}:</h3>
          <ul className="drink-list-elements" tabIndex="0">
          {/* mapping so could add/display more items to places in future */}
            {this.drinkPlaces.map((place) => (
            <li key={place.name || 1}>{this.errorMessage || place.name + ' '}<br/> {this.errorMessage2 || place.address}</li>
            ))}
          </ul>
          <a className="api-credit" href="https://developer.foursquare.com/docs/api/venues/details">using Foursquare data</a>
        </div>
      </div>
    );
  }
}

export default LocationList;
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// GET SCRIPT LOADER!
// ONLY LOAD IN MAP AFTER GOOGLE SCRIPT HAS LOADED
// ONLY LOAD IN TABLE AFTER PIKADAY AND ZERO
// GET THEM OUT OF THE INDEX FILE
// REORGANIZE THIS SHIT
//   - Get Everything out of Index and get it into App.js (see template for example)
//   - Convert Map.js to native googlemaps
//   - Move all Map specific and table Specific functions into files


// import google map
import {ReactMap} from './Map.js'

//import handsontable
import {Table} from './Table.js';

class Application extends React.Component {

  constructor(){
    super();
    this.state = {
      path: [],
      markers: [],
      tableValues: []
    };
  }

  handleMapLoad = this.handleMapLoad.bind(this);
  handleMapClick = this.handleMapClick.bind(this);
  changeTable = this.changeTable.bind(this)
  updatePathFromTable = this.updatePathFromTable.bind(this)
  updatePathFromMarkers = this.updatePathFromMarkers.bind(this)
  createTrailPoly = this.createTrailPoly.bind(this)

  updatePathFromTable(){
    if (!this.state.trailPoly){
      this.createTrailPoly()
    }
    let newPath = [];
    this.state.tableValues.forEach(function(element){
      let pathValue = new window.google.maps.LatLng(
        parseFloat(element[0]), 
        parseFloat(element[1])
      )
      newPath.push(pathValue)
    })

    let trailPoly = this.state.trailPoly
    trailPoly.setPath(newPath)
    this.setState({
      path: newPath,
      trailPoly: trailPoly
    })
  }

  updatePathFromMarkers(){
    console.log(this.state.trailPoly)
    if (!this.state.trailPoly){
      this.createTrailPoly()
    }
    let newPath = []
    this.state.markers.forEach(function(element){
      let pathValue = element.getPosition()
      newPath.push(pathValue)
    })
    let trailPoly = this.state.trailPoly
    trailPoly.setPath(newPath)
    this.setState({
      path: newPath,
      trailPoly: trailPoly
    })
  }

  changeTable(changeArray, source){
    var newMarkers = this.state.markers
    var tabVal = this.state.tableValues
    if (changeArray != null) {
      this.updatePathFromTable();
      for (var i=0; i<changeArray.length; i++){
        var change = changeArray[i]
        var tabIndex = change[0]
        var targetMarker = newMarkers[tabIndex]
        if (targetMarker) {
          var position = new window.google.maps.LatLng(
            parseFloat(tabVal[tabIndex][0]),
            parseFloat(tabVal[tabIndex][1]))
          targetMarker.setPosition(position)
        } else if (tabVal[tabIndex][0] && tabVal[tabIndex][1]){
          var map = this.refs.rmap.state.map
          var marker
          marker = new window.google.maps.Marker({
            position: {
              lat: parseFloat(tabVal[tabIndex][0]),
              lng: parseFloat(tabVal[tabIndex][1])
            },
            defaultAnimation: 2,
            draggable: true,
            map: map
          })
          newMarkers.push(marker)
        }
      }

      this.setState({
        markers:newMarkers
      })
    }
  }

  createTrailPoly(){
    console.log(this.path)
    let map = this.refs.rmap.state.map
    var trailPoly = new window.google.maps.Polyline({
      path: this.state.path,
      // geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });
    trailPoly.setMap(map);

    this.setState({
      trailPoly: trailPoly
    })
  }

  handleMapLoad(map) {
    // this._mapComponent = map;
    // if (map) {
    //   // console.log(map.getZoom());
    // }
  }

  handleMapClick(event) {
    const position = event.latLng

    var map = this.refs.rmap.state.map
    var marker
    marker = new window.google.maps.Marker({
      position: {lat: position.lat(), lng: position.lng()},
      defaultAnimation: 2,
      draggable: true,
      map: map
    })

    var newMarkers = this.state.markers
    newMarkers.push(marker)

    var newTableValues = this.state.tableValues
    newTableValues.push([position.lat(), position.lng()])

    this.setState({
      markers: newMarkers,
      tableValues: newTableValues
    })

    this.updatePathFromMarkers();

  }


  render() {
    return (
      <div style={{ height: '100%' }}>
        <ReactMap
          ref="rmap"
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
          //onMarkerRightClick={this.handleMarkerRightClick}
          //onMarkerClick={this.handleMarkerLeftClick}
        ></ReactMap>
        <Table tableChange={this.changeTable} data={this.state.tableValues}></Table>
        <div></div>
      </div>
    );
  }


}

//
//===============================================================================================

ReactDOM.render(<Application />, document.getElementById('root'));

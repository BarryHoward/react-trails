import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import google map
import {ReactMap} from './Map.js'

//import handsontable
import {Table} from './Table.js';

class Application extends React.Component {

  state = {
    markers: [],
    tableValues: []
  };

  handleMapLoad = this.handleMapLoad.bind(this);
  handleMapClick = this.handleMapClick.bind(this);
  changeTable = this.changeTable.bind(this)


  changeTable(changeArray, source){
    var key;
    var change;
    var position;
    var targetMarker
    var newMarkers = this.state.markers
    if (changeArray) {
      for (var i=0; i<changeArray.length; i++){
        change = changeArray[i]
        targetMarker = newMarkers[change[0]]
        if (change[1] === 0) {
          position = new window.google.maps.LatLng(change[3], targetMarker.position.lng())
        } else {
          position = new window.google.maps.LatLng(change[3], targetMarker.position.lng())
        }
        targetMarker.setPosition(position)
      }

      this.setState({
        markers:newMarkers
      })
    }
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  handleMapClick(event) {
    const position = event.latLng
    console.log(position)

    var map = this.refs.rmap.state.map
    var marker
    marker = new window.google.maps.Marker({
      position: {lat: position.lat(), lng: position.lng()},
      defaultAnimation: 2,
      draggable: true,
      map: map
    })
    console.log(marker)

    var newMarkers = this.state.markers
    newMarkers.push(marker)

    var newTableValues = this.state.tableValues
    newTableValues.push([position.lat(), position.lng()])

    this.setState({
      markers: newMarkers,
      tableValues: newTableValues
    })

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


//===============================================================================================

ReactDOM.render(<Application />, document.getElementById('root'));

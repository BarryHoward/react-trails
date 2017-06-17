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
    data: [],
    tableValues: []
  };

  handleMapLoad = this.handleMapLoad.bind(this);
  handleMapClick = this.handleMapClick.bind(this);
  handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
  handleMarkerLeftClick = this.handleMarkerLeftClick.bind(this);
  // updateData = this.updateData.bind(this);
  changeTable = this.changeTable.bind(this)
  updateTable = this.updateTable.bind(this)
  updateMap = this.updateMap.bind(this)


  changeTable(change, source){
    let new_data = this.state.data.slice()
    if (change) {
      if (change[0][1] === 0) {
        var key = 'lat'
      } else {
        var key = 'lng'
      }

      console.log(change[0][1], key)

      const array = change[0]
      new_data[array[0]][key] = parseFloat(array[3])
      console.log(new_data)

      this.setState({
        data: new_data
      })
      this.updateTable()
      this.updateMap()
    }
  }

  updateMap(){
    for (var i=0; i<this.state.markers.length; i++){
      this.state.markers[i].setMap(null)
    }
    let newMarkers = []
    var map = this.refs.rmap.state.map
    var marker
    for (var i=0; i<this.state.data.length; i++){
      marker = new window.google.maps.Marker({
        position: this.state.data[i],
        defaultAnimation: 2,
        draggable: true,
        map: map
      })
      newMarkers.push(marker)
    }

    console.log(newMarkers)
    this.setState({
      markers: newMarkers,
    })

    // for (var i=0; i<newMarkers.length; i++){
    //   this.refs.rmap.props.markers.map(marker => newMarkers[i])
    // }
    

  }

  updateTable(){
    let newTable = []
    for (var i=0; i<this.state.data.length; i++){
      newTable.push([this.state.data[i].lat, this.state.data[i].lng])
    }
    this.setState({
      tableValues: newTable,
    })
  }

  // addData(data){

  // }
  // updateData(data){
  //   const newData = [
  //     ...this.state.data,
  //     data
  //   ]

  //   const newMarkers = [
  //     ...this.state.markers,
  //     {
  //       position: data,
  //       defaultAnimation: 2,
  //       draggable: true,
  //     },
  //   ];
  //   const newTable = [
  //     ...this.state.tableValues,
  //     [data.lat, data.lng]
  //   ]

  //   this.setState({
  //     data: newData,
  //     markers: newMarkers,
  //     tableValues: newTable
  //   })

  // }



  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  handleMapClick(event) {
    const position = event.latLng
    const data =
      {
        lat: position.lat(),
        lng: position.lng()
      }
      const newData = [
        ...this.state.data,
        data
      ]

    this.setState({
      data:newData
    })

    this.updateTable()
    this.updateMap()


  }

  handleMarkerLeftClick(targetMarker) {
    var newMarker = targetMarker;
    newMarker.icon = { url: "http://maps.google.com/mapfiles/ms/icons/green.png"}
    var newMarkers = this.state.markers.slice()
    newMarkers.map(function(marker){
      if (marker === targetMarker){
        console.log('yes')
        return newMarker
      } else {
        console.log('no')
        return marker
      }
    })

    this.setState({
      markers: newMarkers,
    })
  }

  handleMarkerRightClick(targetMarker) {
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers,
    });
  }

  tableChange(change, source){
    console.log(change, source)
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

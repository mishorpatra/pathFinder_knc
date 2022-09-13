import React from "react";
import L from "leaflet";
import { Map, TileLayer, withLeaflet,Marker,Popup, MapControl } from "react-leaflet";
import { buildingList,floorList,imgList } from '../store/actions/index';
import {connect} from 'react-redux';
import AntPath from "react-leaflet-ant-path";

const height = { height: "100vh" };
// const center = { lat: 51.5, lng: 0.12 };
// 28.5454733, 77.1902633

class MapComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 28.54544972556531,
      lng: 77.19036860053308,
      zoom: 7,
      isMapInit: false,
      buildCoord:[],
      minLat:null,
      minLng:null,
      selectedBuilding:false,
      currentBuilding:'SIT'
    };
    // this.getLocation = this.getLocation.bind(this);
  }

  getLocation = () =>{
      if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(this.getCoordinates)
      }else{
          alert("geolocation not supported by your browser")
      }
  }
  getCoordinates = (position)=>{
      this.setState({
          lat:position.coords.latitude,
          lng:position.coords.longitude
      },()=>{
        let {lat} = this.state;
        let {lng} = this.state;
        let distMatrx = this.state.buildCoord.map(r=>{

           let p =  this.distance(lat,lng,r[0],r[1])
           return p
        })

        let min = distMatrx[0];
        let ind = 0;
        for (let i = 1; i < distMatrx.length; ++i) {
          if (distMatrx[i] < min) {
            min = distMatrx[i];
            ind = i;
          }
        }
        let {buildCoord} = this.state;
        if(buildCoord.length>0){
          let mnLat = buildCoord[ind][0];
        let mnLng = buildCoord[ind][1];
        this.setState({
          minLat:mnLat,
          minLng:mnLng,
        },()=>{
          console.log("min dista",this.state.minLat,this.state.minLng)
        })
        }
      })
  }

   distance = (lat1, lon1, lat2, lon2, unit)=> {
    if ((lat1 === lat2) && (lon1 === lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit==="K") { dist = dist * 1.609344 }
      if (unit==="N") { dist = dist * 0.8684 }
      return dist;
    }
  }

  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true
    });
  };

  componentDidMount(){
    this.props.buildingList(()=>{
        let bCoord;
        bCoord = this.props.bList.map(r=>{
            return [parseFloat(r.lat),parseFloat(r.lng)]
        })
        this.setState({
            buildCoord: bCoord
        },()=>{
          this.getLocation();
            // console.log("b coords",this.state.buildCoord)
        })
    })
  }

  handleBuildingChange = (event)=>{
    console.log("value",event.target.value,this.props.bList)
    localStorage.setItem('blockName',event.target.value)      
    let bname = event.target.value;
    for(let i=0;i<this.props.bList.length;i++){
      if(bname === this.props.bList[i].buildingName){
        console.log("building",this.props.bList[i])
        this.setState({
          lat:parseFloat(this.props.bList[i].lat),
          lng:parseFloat(this.props.bList[i].lng),
          selectedBuilding:true,
          currentBuilding:bname
        })
      }
    }                      
    //   this.setState({
    //       buildingName: event.target.value,
    //       selectedBuilding:true
    //   })
  }

  goToBuilding = ()=>{
    this.props.history.push({
      pathname: '/wayfinding',
      search: `${this.state.currentBuilding}`,
  })
  }

  selectBuilding = (buildingName)=>{
    this.props.history.push({
      pathname: '/wayfinding',
      search: `${buildingName}`,
  })
  }

  render() {
    const { lat, lng, zoom } = this.state;
    const position = [lat, lng];
    this.getLocation()

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
                            <div className="form-group p-2 mb-0">
                               <select className="form-control" id="exampleFormControlSelect1" value={this.state.buildingName} onChange={this.handleBuildingChange} required >
                               <option value="" selected disabled hidden> Select Building </option> 
                                   {this.props.bList.map((building,i)=>{
                                       return(<option value={building.buildingName} key={i}>{building.buildingName}</option>)
                                   })}
                               </select>
                            </div>
                            </form>
        <Map
        style={height}
        center={{lat:this.state.lat,lng:this.state.lng}}
        zoom={18}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
        ref={m => {
          this.leafletMap = m;
        }}
        onClick={this.handleClick}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {!this.state.selectedBuilding && this.props.bList.map((position, idx) => 
          <Marker key={`marker-${idx}`} position={[parseFloat(position.lat),parseFloat(position.lng)]} onClick={this.selectBuilding.bind(this,position.buildingName)}>
          <Popup>
        <span>{position.buildingName}</span>
          </Popup>
        </Marker>
        )}

        <Marker position={position} onClick={this.goToBuilding}>
          <Popup>
            <span>{this.state.currentBuilding}</span>
          </Popup>
        </Marker>
      </Map>
      </div>

    );
  }
}


const mapStateToProps = (state) => {
    return {
          bList: state.buildingList,
          fList: state.floorList
      }
  }

export default connect(mapStateToProps, { floorList,buildingList,imgList })(MapComponent);

// export default MapComponent;

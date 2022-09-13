import React, { Component } from "react";
import { withLeaflet, MapControl } from "react-leaflet";
import L from "leaflet";
import { OpenStreetMapProvider,GeoSearchControl } from "leaflet-geosearch";
// import { connect } from "react-redux";
// import {
//   uploadMap,
//   submitMap,
//   createBuilding,
//   geoLocation,
// } from "../../store/actions/index";

class GeoSearch extends MapControl {
  constructor(props, context) {
    super(props);
  }

  createLeafletElement(opts) {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      position: "topleft",
      showMarker: false,      
      popupFormat: ({ query, result }) =>{ 
        this.props.geoLocation(result.label)
        return result.label},  
      autoClose: true,
      keepResult: true   
    });
    return searchControl;
  }

  componentDidMount() {
    const { map } = this.props.leaflet;
    map.addControl(this.leafletElement);
    const containerDiv = this.leafletElement.getContainer();    
    L.DomEvent.disableClickPropagation(containerDiv);
  }

}

// const mapStateToProps = state => {
//   return {
//     uploadImg: state.uploadImg,
//     user: state.users,
//     resBuilding: state.uploadBuilding,
//     gl:state.geoLocation
//   };
// };

// export default connect(mapStateToProps, { uploadMap, submitMap, createBuilding,geoLocation })(
 export default withLeaflet(GeoSearch)
    // );



// export default withLeaflet(GeoSearch);

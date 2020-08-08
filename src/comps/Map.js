import React from 'react';
import "./Map.css";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { dataAppearOnMap } from "../utils";

function Map({ countries, casesType, center, zoom }) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer 
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'  
                />

                {/* need a func to loop through and draw circles on screen */}
                {dataAppearOnMap(countries, casesType)}
            </LeafletMap>            
        </div>
    );
}

export default Map

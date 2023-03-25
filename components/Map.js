import React, { useEffect, useRef } from "react";
import { View, Text} from "react-native";
import MapView, {Marker, Callout, Polygon}from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import {GOOGLE_MAPS_APIKEY} from "@env";
import {selectDestination, selectOrigin, setTravelTimeInformation} from "../slices/navSlice";
const Map = ()=>{
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch  = useDispatch();

    useEffect(()=>{
      if(!origin || !destination) return;

      //zoom y fit to markers
      /*mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50}
      });
      */

          /*<Callout onPress={() => console.log('Callout pressed')}>
              <Text>Click me!</Text>
            </Callout>*/
     mapRef.current.animateToRegion({
  latitude: (origin.location.lat + destination.location.lat) / 2,
  longitude: (origin.location.lng + destination.location.lng) / 2,
  latitudeDelta: Math.abs(origin.location.lat - destination.location.lat) + 0.005,
  longitudeDelta: Math.abs(origin.location.lng - destination.location.lng) + 0.005,
}, 1000); 
      
    }, [origin, destination]);

    useEffect(()=>{
      if(!origin || !destination) return; 
      const getTravelTime = async () => {       
        
        fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.description}&origins=${origin.description}&units=imperial&key=${GOOGLE_MAPS_APIKEY}`)
        .then((res) => res.json())
        .then((data) => { 
          dispatch(setTravelTimeInformation(data.rows[0].elements[0])); 
        });
      };
      
      getTravelTime();
    },[origin, destination, GOOGLE_MAPS_APIKEY]);


    return   (<MapView
    ref = {mapRef}
    style = {tw`flex-1`}
    mapType = 'mutedStandard'

    initialRegion={{
      latitude: origin.location.lat,
      longitude: origin.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }}
     
  >

    {origin && destination && (
      <MapViewDirections
      origin={origin.description}
      destination = {destination.description}
      apikey = {GOOGLE_MAPS_APIKEY}
      strokeWidth = {6}
      strokeColor = "black"
      />
    )}


    {origin?.location && (
        <Marker
            coordinate={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
            }}
            title = "Origen"
            description = {origin.description}
            identifier = "origin"
           
            />
          
    )}

    
  {destination?.location && (
        <Marker
            coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
            }}
            title = "Destino"
            description = {destination.description}
            identifier = "destination"
          
        />
    )}
  </MapView>
    );



}

export default Map;
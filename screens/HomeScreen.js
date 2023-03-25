

import React from "react";
import { View, Text, StyleSheet, Image} from "react-native";

import Constants from "expo-constants"; 
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import NavFavourites from "../components/NavFavourities";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env";
import { useDispatch } from "react-redux";
import {setDestination, setOrigin} from "../slices/navSlice";
const HomeScreen= () => {

  const dispatch = useDispatch();

    return (
             <View style = {[tw`bg-white h-full`, {marginTop: Constants.statusBarHeight, flexGrow: 1}]}>

               <View style = {tw`p-5`}>
                  <Image style = {
                    {width: 100, height: 100, resizeMode: "contain"}
                    } 
                    source={{
                   uri: 'https://links.papareact.com/gzs'}}
                   
                   />

                   <GooglePlacesAutocomplete 

                    styles={{
                      container: {flex: 0},
                      textInput: {fontSize: 18,  backgroundColor: "white", borderRadius: 20}
                    }}

                    placeholder="De Donde ?"
                    
                    onPress={(data, details = null)=>{
                      dispatch(setOrigin({
                        location: details.geometry.location,
                        description: data.description
                      }));

                      dispatch(setDestination(null));
                    }}
                    fetchDetails = {true}
                    
                    enablePoweredByContainer = {false}
                    minLength={2}
                    returnKeyType = {"search"}
                    query= {
                      {
                        key: GOOGLE_MAPS_APIKEY,
                        language: "es"
                      }
                    }


                    nearbyPlacesAPI="GooglePlaceSearch"
                    debounce={400}

                    

                   
                   />


                   <NavOptions/>
                   <NavFavourites/>
                   </View>
             </View>
       );
}


export default HomeScreen;


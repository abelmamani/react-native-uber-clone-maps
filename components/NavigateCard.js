import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import tw from "tailwind-react-native-classnames";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env";
import { useDispatch, useSelector } from "react-redux";


import {selectDestination, selectOrigin, setDestination, setOrigin} from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourities";
import { Icon } from "react-native-elements";
const NavigateCard = ()=>{
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    return   (
        <SafeAreaView  style = {tw`bg-white flex-1`}>
            <Text style = {tw`text-center py-0 text-xl`}>Good Moorning, Abel</Text>
           
                <View>
                    <GooglePlacesAutocomplete
                        placeholder="Hasta Donde?"
                        styles={toInputboxStyles}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}
                        enablePoweredByContainer = {false}
                        fetchDetails = {true}
                        returnKeyType = {"search"}

                        query= {
                            {
                              key: GOOGLE_MAPS_APIKEY,
                              language: "es"
                            }
                          }

                        onPress = {(data, details = null)=>{
                            dispatch(setDestination({
                                location: details.geometry.location,
                                description: data.description, 
                                })
                            );

                            navigation.navigate("RideOptionsCard");


                        }}

                    />
                </View>
                <NavFavourites/>

                <View style = {tw`flex-row bg-white justify-evenly py-2 mt-0 border-t border-gray-200`}>
                    <TouchableOpacity  disabled = {!origin || !destination} onPress={()=> navigation.navigate('RideOptionsCard')} style = {tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full `}>
                        <Icon name = "car" type = "font-awesome" color="white" size = {16} />
                    <Text  style = {tw`text-white text-center`}>Rides</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full `}>
                        <Icon name = "car" type = "font-awesome" color="black" size = {16} />
                    <Text  style = {tw`text-center text-black`}>Eats</Text>
                    </TouchableOpacity>

               
            </View>
        </SafeAreaView>
       
    );

}

export default NavigateCard;

const toInputboxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 10,
        flex: 0
    }, 
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 20,
        fontSize: 18
    },
    textInputContainer: {
        paddingHorizontal: 15,
        paddingBottom: 0
    }
});
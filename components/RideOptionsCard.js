import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image } from "react-native";
import { FlatList } from "react-native";
import { View, Text, SafeAreaView, TouchableOpacity} from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";

import tw from "tailwind-react-native-classnames";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
    {
        id: "Uber-X-123",
        title: "UberX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn"
    },
    {
        id: "Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8"
    },
    {
        id: "Uber-lux-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/5w8"
    }
];

const SURGE_CHANGE_RATE = 1.5;

const RideOptionsCard = ()=>{

    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    const getDistanciaMetrosKilometros = (metros) =>{
        if(metros < 1000)
            return metros + " Mts";
        
        const kilometros = Math.floor(metros /1000);
        const mts = metros % 1000;
        return kilometros + " Km " + mts + " Mts";
    }
    
    return   (
        <SafeAreaView style = {tw`flex-1 bg-white`}>
            <View >
                <TouchableOpacity  onPress ={()=> navigation.navigate('NavigateCard')} style = {tw`absolute top-2 left-0 z-50 p-3 rounded-full`}>
                <Icon name = "chevron-left" type="fontawesome"/>
                </TouchableOpacity>
                <Text style = {tw`text-center py-5 text-sm font-semibold`}>Selecciona un Vehiculo - {

                    travelTimeInformation ? (travelTimeInformation.duration ? (getDistanciaMetrosKilometros(travelTimeInformation.distance.value)) : " - ") : " - "
                }</Text>
            </View>

            <FlatList 
            data = {data}  
            keyExtractor = {item => item.id}
            renderItem = {({item})=>(
                <TouchableOpacity onPress={()=> setSelected(item)} style ={ tw`flex-row justify-around items-center ${item.id == selected?.id && "bg-gray-300"}`}>
                    <Image
                    style = {{
                        width: 100,
                        height: 100,
                        resizeMode: "contain"
                    }}
                    source={{uri: item.image
                    }}
                    />

                    <View >
                        <Text style ={ tw`text-xl font-semibold`} >{item.title}</Text>
                        <Text>En {travelTimeInformation ? (travelTimeInformation.duration ? travelTimeInformation.duration.text : "-") : "-" 
                        }</Text>
                    </View>
                    <Text  style ={ tw`text-xl`}>{
                    new Intl.NumberFormat("en-gb", {
                        style: "currency",
                        currency: "GBP"
                    }).format(
                        travelTimeInformation ? (travelTimeInformation.duration?  (travelTimeInformation.duration.value * SURGE_CHANGE_RATE* item.multiplier /100 ): 0) : 0
                    )
                    }</Text>
                </TouchableOpacity>
            )}
            
            />

            <View>
                    <TouchableOpacity  disable = {!selected} style ={ tw`bg-black py-3 m-5 mt-2 rounded-full ${!selected&&"bg-gray-300"}`}>
                        <Text  style ={ tw`text-center text-white text-xl`}>Ir con {selected?.title}</Text>
                    </TouchableOpacity>
            </View>
            

        </SafeAreaView>
    );

}

export default RideOptionsCard;
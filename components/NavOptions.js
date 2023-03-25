

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity} from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";

import tw from "tailwind-react-native-classnames";
import { selectOrigin } from "../slices/navSlice";

const data = [{
    id: "123",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen:"MapScreen"
}, {
    id: "456",
    title: "Orde food",
    image: "https://links.papareact.com/28w",
    screen:"EatsScreen"
}];

const NavOptions= () => {

    const navigation = useNavigation(); 
    
    const origin = useSelector(selectOrigin);
    return (
            <FlatList  data = {data} horizontal keyExtractor = {(item) => item.id}
            renderItem = {({item})=>(
                <TouchableOpacity 
                onPress={()=>{
                    navigation.navigate(item.screen);
                }}
                
                style = {tw`pr-3 pl-3 pb-8 pt-4 bg-gray-300 m-2`}
                disabled = {!origin}
                >
                
                <View   style = {tw`${!origin && "opacity-100"}`}>
                    <Image source={{uri: item.image}} style = {{width: 120, height: 120, resizeMode: "contain"}}></Image>
                    <Text style = {tw` text-center mt-2 text-lg font-semibold`}>{item.title}</Text>

                    <Icon style={tw`p-2 bg-black rounded-full mt-4 ml-6 w-10`} name = 'arrowright' color= 'white' type='antdesign'></Icon>
                
                </View>

                </TouchableOpacity>
    )}
            
            />
       );
}


export default NavOptions;


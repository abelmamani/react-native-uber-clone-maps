

import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import { Icon } from "react-native-elements";

import tw from "tailwind-react-native-classnames";
import Map from "../components/Map";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";

const EatsScreen= () => {

    const stack = createStackNavigator();
    const navigation = useNavigation();
    return (
             <View>
                <TouchableOpacity onPress={()=>{
                  navigation.navigate("HomeScreen");
                }} style = {tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}>
                  <Icon name = "menu" />
                </TouchableOpacity>
                <View style = {tw`h-1/2 bg-blue-200`}>
                  <Map/>
                </View >
                
                <View style = {tw`h-1/2 bg-blue-100`}>
                  <stack.Navigator>
                      <stack.Screen name = 'NavigateCard' component={NavigateCard} options = {{headerShown: false}}/>

                      <stack.Screen name = 'RideOptionsCard' component={RideOptionsCard} options = {{headerShown: false}}/>

                  </stack.Navigator>
                </View >
             </View>
       );
}


export default EatsScreen;


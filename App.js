
import {StyleSheet, Text, View, KeyboardAvoidingView, Platform} from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen.js';
import MapScreen from './screens/MapScreen.js';
import EatsScreen from './screens/EatsScreen.js';
import { store } from './store.js';


import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  const stack = createStackNavigator();

  return (
       <Provider store={store} >
        <NavigationContainer>
          <SafeAreaProvider>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding': 'height'} style = {{flex: 1}}  keyboardVerticalOffset={Platform.OS == 'ios' ? -64: 0}>  
              <stack.Navigator>
                  <stack.Screen name = 'HomeScreen' component={HomeScreen} options = {{headerShown: false}}/>

                  <stack.Screen name = 'MapScreen' component={MapScreen} options = {{headerShown: false}}/>

                  <stack.Screen name = 'EatsScreen' component={EatsScreen} options = {{headerShown: false}}/>

                  
                </stack.Navigator>
            </KeyboardAvoidingView>
            
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

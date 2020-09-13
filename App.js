import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

import Home from './src/views/Home';
import Library from './src/views/Library';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: 'Principal'}}
      />
      <Stack.Screen name="Library" component={Library} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;

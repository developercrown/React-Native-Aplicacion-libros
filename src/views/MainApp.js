import React, {useEffect, useContext} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {LibraryContextProvider} from '../contexts/LibraryContext';
import {LibraryRootStackScreen} from '../Navigation';
import AddBook from '../views/AddBook/AddBook';
import GlobalState from '../contexts/GlobalStateContext';
import ConfigApp from '../views/ConfigApp/ConfigApp';

const Tab = createBottomTabNavigator();

const MainApp = ({}) => {
  const [appConfiguration] = useContext(GlobalState);
  return (
    <LibraryContextProvider>
      <NavigationContainer>
        <StatusBar
          hidden={false}
          backgroundColor="#eee"
          barStyle="dark-content"
        />
        <Tab.Navigator
          style={styles.tab}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              if (route.name === 'Biblioteca') {
                iconName = focused ? 'book' : 'bookmarks';
              } else if (route.name === 'Agregar') {
                iconName = focused ? 'add-circle' : 'add';
              } else if (route.name === 'Configuración') {
                iconName = focused ? 'settings' : 'settings';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Biblioteca" component={LibraryRootStackScreen} />
          <Tab.Screen name="Agregar" component={AddBook} />
          <Tab.Screen name="Configuración" component={ConfigApp} />
        </Tab.Navigator>
      </NavigationContainer>
    </LibraryContextProvider>
  );
};

const styles = StyleSheet.create({
  tab: {
    padding: 20,
  },
});

export default MainApp;
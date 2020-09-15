import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-ionicons';

import BookList from './src/views/Library/BooksList';
import BookDetails from './src/views/Library/BookDetails';
import AddBook from './src/views/AddBook/AddBook';
import {StyleSheet} from 'react-native';

import {LibraryContextProvider} from './src/contexts/LibraryContext';

const Tab = createBottomTabNavigator();

const LibraryStack = createStackNavigator();

const LibraryStackScreen = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name="BookList"
        component={BookList}
        options={{title: 'Listado de libros'}}
      />
      <LibraryStack.Screen
        name="BookDetails"
        component={BookDetails}
        options={{title: 'Detalles'}}
      />
    </LibraryStack.Navigator>
  );
};

const styles = StyleSheet.create({
  tab: {
    padding: 20,
  },
});

const App = () => (
  <LibraryContextProvider>
    <NavigationContainer>
      <Tab.Navigator
        style={styles.tab}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Biblioteca') {
              iconName = focused ? 'book' : 'bookmarks';
            } else if (route.name === 'Agregar') {
              iconName = focused ? 'add-circle' : 'add';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Biblioteca" component={LibraryStackScreen} />
        <Tab.Screen name="Agregar" component={AddBook} />
      </Tab.Navigator>
    </NavigationContainer>
  </LibraryContextProvider>
);

export default App;

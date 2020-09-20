import React, {useEffect, useState} from 'react';
import {StyleSheet, StatusBar, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ionicons';
import BookList from './src/views/Library/BooksList';
import BookDetails from './src/views/Library/BookDetails';
import BookEdit from './src/views/Library/BookEdit';
import AddBook from './src/views/AddBook/AddBook';
import SelectCategory from './src/views/Category/SelectCategory';
import {LibraryContextProvider} from './src/contexts/LibraryContext';

import {useAsyncStorage} from '@react-native-community/async-storage';

import ConfigApp from './src/views/ConfigApp/ConfigApp';

const Tab = createBottomTabNavigator();
const LibraryRootStack = createStackNavigator();
const LibraryStack = createStackNavigator();

const LibraryRootStackScreen = () => {
  return (
    <LibraryRootStack.Navigator mode="modal">
      <LibraryRootStack.Screen
        name="LibraryStackScreen"
        component={LibraryStackScreen}
        options={{headerShown: false}}
      />
      <LibraryRootStack.Screen
        name="SelectCategoryModal"
        component={SelectCategory}
      />
    </LibraryRootStack.Navigator>
  );
};

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
      <LibraryStack.Screen
        name="BookEdit"
        component={BookEdit}
        options={{title: 'Modo de edición'}}
      />
    </LibraryStack.Navigator>
  );
};


const App = () => {
  const {getItem} = useAsyncStorage('server');
  const [server, setServer] = useState(null);

  const init = async () => {
    console.log('inicializando');
    let tmp = await getItem();
    setServer(tmp);
    
    setTimeout(() => {
      hideSplash();
    }, 1000);

    
  };

  const hideSplash = () => {
    SplashScreen.hide();
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <LibraryContextProvider>
      <NavigationContainer>
        <StatusBar hidden={true} />
        {!server ? <ConfigApp handleCallback={init}/> : (
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
            <Tab.Screen name="Biblioteca" component={LibraryRootStackScreen} />
            <Tab.Screen name="Agregar" component={AddBook} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </LibraryContextProvider>
  );
};

const styles = StyleSheet.create({
  tab: {
    padding: 20,
  },
});

export default App;

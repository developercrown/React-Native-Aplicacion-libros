import React from 'react';

import BookList from '../views/Library/BooksList';
import BookDetails from '../views/Library/BookDetails';
import BookEdit from '../views/Library/BookEdit';

import SelectCategory from '../views/Category/SelectCategory';
import {createStackNavigator} from '@react-navigation/stack';

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

export {
    LibraryRootStackScreen,
    LibraryStackScreen
}
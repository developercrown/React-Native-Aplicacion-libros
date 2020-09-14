import React, { useEffect, useState} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import BookListItem from '../components/Book/BookListItem';

import { useQuery } from 'react-query'

const styles = StyleSheet.create({
  results: {
    padding: 10,
  },
  rowHeader: {
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: 6,
  },
});

const GET_BOOKS = 'GET_BOOKS';

async function fetchData() {
  // const response = await fetch('http://archivos.upn164.edu.mx/develop/books.json');
  const response = await fetch('https://www.etnassoft.com/api/v1/get/?category=libros_programacion');
  const json = await response.json();
  return json;
}


const Home = ({navigation}) => {
  const handleOnPress = () => {
    navigation.navigate('Library');
  }

  const {status, data, error} = useQuery(GET_BOOKS, fetchData);
  console.log(data);

  return (
    <View style={styles.results}>
      <FlatList
        data={status === 'success' ? data : []}
        renderItem={({item}) => <BookListItem book={item} onPress={handleOnPress}/>}
        keyExtractor={(item, index) => `list-item${item}${index}`}
        ListHeaderComponent={
          <View style={styles.rowHeader}>
            <Text>Mi lista de libros</Text>
          </View>
        }
        ListEmptyComponent={
          <View>
            {
              status === 'loading' && <View><Text>Cargando Libros...</Text></View>
            }
          </View>
        }
        ></FlatList>
    </View>
  );
};

export default Home;

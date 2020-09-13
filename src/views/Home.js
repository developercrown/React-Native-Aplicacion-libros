import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import BookListItem from '../components/Book/BookListItem';

const styles = StyleSheet.create({
    results: {
        padding: 10
    },
    rowHeader: {
      marginBottom: 10,
      backgroundColor: 'rgba(0,0,0,0.05)',
      padding: 6
  }
})

const BOOK_LIST = [
  {
    id: 1,
    title: 'El cid',
  },
  {
    id: 2,
    title: 'Un mexicano más',
  },
  {
      id: 3,
      title: 'Cosmos'
  }
];

const Home = ({navigation}) => {
  return (
    <View style={styles.results}>
      <FlatList
            data={BOOK_LIST}
            renderItem={({item}) => <BookListItem book={item} />}
            keyExtractor={item => item.id}
            ListHeaderComponent={<View style={styles.rowHeader}><Text>Mi lista de libros</Text></View>}
        >

        </FlatList>
    </View>
  );
};

export default Home;

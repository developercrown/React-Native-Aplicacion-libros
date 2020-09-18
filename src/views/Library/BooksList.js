import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import BookListItem from '../../components/Book/BookListItem';

import useLibraryContext from '../../hooks/useLibraryContext';

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

const Home = ({navigation}) => {
  const handleOnPress = ({ bookId }) => {
    navigation.navigate('BookDetails', { bookId });
  }

  const {isSuccess, isLoading, books} = useLibraryContext();

  return (
    <View style={styles.results}>
      <FlatList
        data={isSuccess ? books : []}
        renderItem={({item}) => <BookListItem book={item} onPress={()=>handleOnPress({bookId: item.id})}/>}
        keyExtractor={(item, index) => `list-item${item}${index}`}
        ListHeaderComponent={
          <View style={styles.rowHeader}>
            <Text>Mi lista de libros</Text>
          </View>
        }
        ListEmptyComponent={
          <View>
            {
              isLoading && <View><Text>Cargando Libros...</Text></View>
            }
          </View>
        }
        ></FlatList>
    </View>
  );
};

export default Home;

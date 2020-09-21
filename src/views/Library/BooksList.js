import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import BookListItem from '../../components/Book/BookListItem';
import GenericLoading from '../../components/GenericLoading';
import ViewFullsize from '../../components/ViewFullsize';
import useLibraryContext from '../../hooks/useLibraryContext';
import GlobalState from '../../contexts/GlobalStateContext';

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
  const [appConfiguration] = useContext(GlobalState);

  const handleOnPress = ({bookId}) => {
    navigation.navigate('BookDetails', {bookId});
  };

  const {isSuccess, isLoading, books} = useLibraryContext(appConfiguration);

  if (isLoading) {
    return (
      <ViewFullsize>
        <GenericLoading label="Cargando libros" />
      </ViewFullsize>
    );
  } else if (isSuccess && !isLoading) {
    return (
      <View style={styles.results}>
        <FlatList
          data={isSuccess ? books : []}
          renderItem={({item}) => (
            <BookListItem
              book={item}
              onPress={() => handleOnPress({bookId: item.id})}
            />
          )}
          keyExtractor={(item, index) => `list-item${item}${index}`}
          ListHeaderComponent={
            <View style={styles.rowHeader}>
              <Text>Mi lista de libros</Text>
            </View>
          }
          ListEmptyComponent={
            <View>
              {isLoading && (
                <View>
                  <Text>Cargando Libros...</Text>
                </View>
              )}
            </View>
          }></FlatList>
      </View>
    );
  } else {
    return <ViewFullsize>
      <Text>No hay resultados</Text>
    </ViewFullsize>
  }
};

//TODO: Siguiente objetivo recarga de la lista jalando
//TODO: Mover todo lo de vibracion a un hook y reutilizar
//TODO: cambiar la flatlist a scrollview para tener un refresh control

export default Home;

import React, {useContext, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  RefreshControl,
  ScrollView,
} from 'react-native';
import BookListItem from '../../components/Book/BookListItem';
import GenericLoading from '../../components/GenericLoading';
import ViewFullsize from '../../components/ViewFullsize';
import useLibraryContext from '../../hooks/useLibraryContext';
import GlobalState from '../../contexts/GlobalStateContext';
import ViewHeaderTitle from '../../components/UI/ViewHeaderTitle';
import Icon from 'react-native-ionicons';
import ListadoLibrosComponent from './ListadoLibrosComponent';

const styles = StyleSheet.create({
  results: {
    backgroundColor: '#efefef',
  },
  rowHeader: {
    marginBottom: 10,
    backgroundColor: 'red',
    padding: 6,
  },
  content: {
    paddingTop: 0,
    paddingBottom: 100,
    height: '86%',
  },
  searchBarContainer: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputBox: {
    backgroundColor: '#fff',
    width: '95%',
    height: 36,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  iconSearchBox: {
    backgroundColor: 'transparent',
    fontSize: 28,
    color: '#666',
    marginLeft: 12,
    marginTop: 4,
    width: 32,
    flex: 1,
  },
  inputSearchBox: {
    flex: 1,
    width: '85%',
    minWidth: '93%',
    alignSelf: 'flex-start',
    padding: 4,
    textAlign: 'left',
  },
  labelResults: {
    marginLeft: 32,
    marginTop: 4,
    marginBottom: 8,
    fontSize: 24,
    fontWeight: 'bold',
  },
  loadingContainerSection: {
    margin: 0,
    padding: 0,
  },
  loadingView: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    width: '100%',
  },
  loadingContainer: {
    width: '100%',
    height: '92%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  notResults: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notResultsText: {
    fontSize: 28,
  },
});

const Home = ({navigation}) => {
  const [appConfiguration] = useContext(GlobalState);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      console.log('recargando');
      invalidateBooksListCache();
      setRefreshing(false);
    }, 2000);
  });

  const handleOnPress = ({bookId}) => {
    navigation.navigate('BookDetails', {bookId});
  };

  const {
    isSuccess,
    isLoading,
    books,
    invalidateBooksListCache,
  } = useLibraryContext(appConfiguration);

  if (isLoading) {
    return (
      <View style={[styles.loadingContainerSection]}>
        <StatusBar
          backgroundColor="#132430"
          animated={true}
          hidden={false}
          barStyle={'light-content'}
        />
        <ViewHeaderTitle label="Listado general"></ViewHeaderTitle>
        <View style={styles.loadingContainer}>
          <GenericLoading label="Cargando libros" />
        </View>
      </View>
    );
  } else if (isSuccess && !isLoading) {
    return (
      <View style={styles.results}>
        <StatusBar
          backgroundColor="#132430"
          animated={true}
          hidden={false}
          barStyle={'light-content'}
        />
        <ViewHeaderTitle label="Listado general"></ViewHeaderTitle>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchInputBox}>
            <View>
              <Icon
                name={'search'}
                size={10}
                color={'#333'}
                style={styles.iconSearchBox}
              />
            </View>
            <View>
              <TextInput
                onChangeText={(text) => setSearchText(text)}
                style={styles.inputSearchBox}
                value={searchText}
                placeholder="Buscar"
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.labelResults}>Resultados:</Text>
        </View>
        <View style={styles.content}>
          {isLoading ? (
            <GenericLoading>Cargando información</GenericLoading>
          ) : (
            <ListadoLibrosComponent
              data={isSuccess ? books : []}
              onRefresh={onRefresh}
              refreshing={refreshing}
              navigation={navigation}
            />
          )}
        </View>
      </View>
    );
  } else {
    return (
      <View style={[styles.loadingContainerSection]}>
        <StatusBar
          backgroundColor="#132430"
          animated={true}
          hidden={false}
          barStyle={'light-content'}
        />
        <ViewHeaderTitle label="Listado general"></ViewHeaderTitle>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.notResults}>
            <Icon name="alert" size={100} color="#333"></Icon>
            <Text style={styles.notResultsText}>Sin resultados</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
};

//TODO: aplicar hook de vibración

export default Home;

import React, {useContext, useLayoutEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar
} from 'react-native';
import Icon from 'react-native-ionicons';
import useBook from '../../hooks/useBook';
import GlobalState from '../../contexts/GlobalStateContext';
import nofile from '../../assets/nofile.jpg';
import GenericLoading from '../../components/GenericLoading';
import ViewFullsize from '../../components/ViewFullsize';
import ViewHeaderTitle from '../../components/UI/ViewHeaderTitle';

const BookDetails = ({navigation, route}) => {
  const [appConfiguration] = useContext(GlobalState);
  const {serverURL: server} = appConfiguration;
  const {bookId} = route.params;
  const {data: book, isLoading, isSuccess} = useBook({bookId, server});

  useLayoutEffect(() => {
    if (isSuccess) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('BookEdit', {bookId: book.id})}>
            <Icon name="create" size={25} color="#002347" />
          </TouchableOpacity>
        ),
        title: book.titulo,
      });
    }
  }, [book]);

  if (isLoading) {
    return (
      <ViewFullsize>
        <GenericLoading label="Cargando" />
      </ViewFullsize>
    );
  }

  if (!isLoading && isSuccess) {
    return (
      <SafeAreaView>
        <StatusBar backgroundColor="#132430" animated={true} hidden={false} barStyle={'light-content'} />
        <ScrollView>
          <ViewHeaderTitle>Detalles del libro</ViewHeaderTitle>
          <View style={styles.imageSelectorContainer}>
            {book.uri && (
              <Image
                source={{
                  uri: `${server}/libros/image/${book.id}/${book.uri}/${book.uri_key}/thumb`,
                }}
                style={styles.image}
              />
            )}
            {!book.uri && <Image source={nofile} style={styles.image} />}
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>Nombre del libro</Text>
            <Text style={styles.label}>{book.titulo}</Text>
            <Text style={styles.label}>Nombre del autor</Text>
            <Text style={styles.label}>{book.autor}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <View>
        <Text>Sin contenido</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  label: {
    marginTop: 10,
  },
  form: {
    paddingHorizontal: 16,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 10,
    borderRadius: 200 / 2,
  },
  choseImageButton: {
    marginVertical: 10,
    backgroundColor: '#ffb300',
    padding: 10,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
  },
  choseImageButtonText: {
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  imageSelectorContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  editButton: {
    marginRight: 16,
  },
});

export default BookDetails;

import React, {useLayoutEffect} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-ionicons';
import useBook from '../../hooks/useBook';

const SERVER_URI = 'http://192.168.10.100:8088/api';

const BookDetails = ({navigation, route}) => {
  const {bookId} = route.params;
  const {data: book, isLoading, isSuccess} = useBook({bookId});
  console.log(book);

  useLayoutEffect(() => {
    if (isSuccess) {
      console.log('success', book);
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
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" animating={true} color="#0ff" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.imageSelectorContainer}>
        {book.uri && (
          <Image
            source={{
              uri: `${SERVER_URI}/libros/image/${book.id}/${book.uri}/${book.uri_key}/thumb`,
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
    </SafeAreaView>
  );
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

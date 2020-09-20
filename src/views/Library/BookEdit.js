import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import useBook from '../../hooks/useBook';
import nofile from '../../assets/nofile.jpg';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SERVER_URI = 'http://192.168.10.101:8088/api';

const BookEdit = ({navigation, route}) => {
  const [title, setTitle] = useState('');
  const [autor, setAutor] = useState('');
  const {bookId} = route.params;
  const {data: book, isLoading} = useBook({bookId});

  if (isLoading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" animating={true} color="#0373fc" />
      </View>
    );
  }

  useEffect(() => {
    setTitle(book.titulo);
    setAutor(book.autor);
    console.log('actualizando contenido');
  }, [book, navigation]);

  let categorias = [
    {
      id: 1,
      name: 'educación',
    },
    {
      id: 2,
      name: 'enseñanza',
    },
    {
      id: 3,
      name: 'pedagogía',
    },
    {
      id: 4,
      name: 'conocimiento',
    },
  ];

  const handleSelectCategories = (newCategories) => {
    alert('seleccionado');
    console.log(newCategories);
  }

  const addCategoria = () => {
    navigation.navigate('SelectCategoryModal', {
      category: categorias,
      onChange: handleSelectCategories
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
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
          <TextInput
            onChangeText={(text) => setTitle(text)}
            style={styles.textInput}
            value={title}
          />
          <Text style={styles.label}>Nombre del autor</Text>
          <TextInput
            onChangeText={(text) => setAutor(text)}
            style={styles.textInput}
            value={autor}
          />

          <View style={styles.categoriasContainer}>
            <Text style={styles.categoriasTitle}>Categorias:</Text>
            {categorias.map((item, key) => {
              return (
                <Text key={key} style={styles.categoriasText}>
                  {item.name}
                </Text>
              );
            })}
            <TouchableOpacity onPress={addCategoria}>
              <Text>Agregar nueva categoria</Text>
            </TouchableOpacity>
          </View>

          <Button title="Actualizar" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  categoriasContainer: {
    marginVertical: 20,
  },
  categoriasTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  categoriasText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 20,
    textTransform: 'capitalize',
  },
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
});

export default BookEdit;
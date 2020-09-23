import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar
} from 'react-native';
import useBook from '../../hooks/useBook';
import nofile from '../../assets/nofile.jpg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GlobalState from '../../contexts/GlobalStateContext';
import GenericLoading from '../../components/GenericLoading';
import ViewFullsize from '../../components/ViewFullsize';

const BookEdit = ({navigation, route}) => {
  const [appConfiguration] = useContext(GlobalState);
  const [title, setTitle] = useState('');
  const [autor, setAutor] = useState('');
  const {serverURL: server} = appConfiguration;
  const {bookId} = route.params;
  const {data: book, isLoading, isSuccess} = useBook({bookId, server});

  if (isLoading) {
    return (
      <ViewFullsize>
        <GenericLoading label="Cargando libro" />
      </ViewFullsize>
    );
  }

  useEffect(() => {
    setTitle(book.titulo);
    setAutor(book.autor);
  }, [book]);

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
  };

  const addCategoria = () => {
    navigation.navigate('SelectCategoryModal', {
      category: categorias,
      onChange: handleSelectCategories,
    });
  };

  if (!isLoading && isSuccess) {
    return (
      <SafeAreaView>
        <StatusBar backgroundColor="#132430" animated={true} hidden={false} barStyle={'light-content'} />
        <ScrollView>
          <View style={styles.imageSelectorContainer}>
            {book.uri && (
              <Image
                source={{
                  uri: `${appConfiguration.serverURL}/libros/image/${book.id}/${book.uri}/${book.uri_key}/thumb`,
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
  } else {
    return <View><Text>Sin contenido</Text></View>
  }
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

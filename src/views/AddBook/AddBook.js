import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { useMutation } from 'react-query';
import Icon from 'react-native-ionicons';

import ImagePicker from 'react-native-image-picker';

import useLibraryContext from '../../hooks/useLibraryContext';

import RNFetchBlob from 'react-native-fetch-blob'

import nofile from '../../assets/nofile.jpg';

const styles = StyleSheet.create({
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
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 100 / 2,
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

const options = {
  title: 'Elije la portada',
  cancelButtonTitle: 'Cancelar',
  takePhotoButtonTitle: 'Capturar Fotografia',
  chooseFromLibraryButtonTitle: 'Elegir desde la galeria',
  mediaType: 'photo',
  noData: false,
  customButtons: [],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const SERVER_URI = 'http://192.168.10.101:8088/api';

async function postData(data) {
  return await RNFetchBlob.fetch(
    'POST',
    `${SERVER_URI}/libros`,
    {
      'Content-Type': 'multipart/form-data',
    }, [
    { name: 'portada', filename: 'portada.jpg', type: 'image/jpg', data: data.image.data },
    { name: 'titulo', data: data.titulo },
    { name: 'autor', data: data.autor }
  ]).uploadProgress({ interval: 250 }, (written, total) => {
    console.log('uploaded', written / total)
  }).then((response) => {
    // console.log('response', response);
    return response;
  }).catch((err) => {
    console.log('error', err);
    return error
  });
}

const notEmptyText = (text = '') => text.trim() != '';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [autor, setAutor] = useState('');
  const [image, setImage] = useState(null);

  const { invalidateBooksListCache } = useLibraryContext();

  async function handleSubmit() {
    if (notEmptyText(title) && notEmptyText(autor)) {
      mutate({
        titulo: title,
        autor,
        image: image ? image : nofile
      });
    } else {
      alert('No haz completado la información');
    }
  }

  const [mutate, { isLoading }] = useMutation(postData, {
    onSuccess: (result) => {
      const {status} = result.respInfo;
      console.log('success', result);
      if (status ===200 || status == 201) {
        invalidateBooksListCache();
        setTitle('');
        setAutor('');
        setImage(null);
        alert('Registrado correctamente');
      } else {
        alert('Error al registrar');
      }
    },
  });

  const launchImagePicker = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        alert('Proceso cancelado');
      } else if (response.error) {
        alert('Ocurrio un error al elegir la imagen');
        console.log(response.error);
      } else if (response.customButton) {
        alert('El usuario eligio un boton personalizado');
        console.log(response.customButton);
      } else {
        const source = { uri: `data:${response.type};base64,${response.data}`, data: response.data };
        setImage(source);
      }
    });
  };

  return (
    <SafeAreaView>
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

        <View style={styles.imageSelectorContainer}>
          {image && <Image source={image} style={styles.image} />}
          {!image && <Image source={nofile} style={styles.image} />}
          <TouchableOpacity
            onPress={launchImagePicker}
            style={styles.choseImageButton}>
            <Icon name="image" size={30} color="#222" />
            <Text style={styles.choseImageButtonText}>
              Seleccionar caratula
            </Text>
          </TouchableOpacity>
        </View>

        <Button onPress={handleSubmit} title="Guardar" />
        {isLoading && <Text>Guardando...</Text>}
      </View>
    </SafeAreaView>
  );
};

export default AddBook;

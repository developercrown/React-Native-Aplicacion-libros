import React, {useState} from 'react';
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

import {useMutation} from 'react-query';
import Icon from 'react-native-ionicons';

import ImagePicker from 'react-native-image-picker';

import useLibraryContext from '../../hooks/useLibraryContext';

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
  const body = new FormData();

  // console.log('testing', data.image);

  body.append('titulo', data.titulo);
  body.append('autor', data.autor);
  // body.append('image', data.image);

  let res = await fetch(`${SERVER_URI}/libros`, {
    method: 'post',
    body: body,
    headers: {
      'Content-Type': 'multipart/form-data; ',
    },
  });
  let responseJson = await res.json();
  if (responseJson.status == 1) {
    alert('Upload Successful');
  }

  // const response = await fetch(`${SERVER_URI}/libros`, {
  //   method: 'POST',
  //   body,
  //   headers: {
  //     'Content-Type': 'multipart/form-data; ',
  //   },
  // });
  // const json = await response.json();
  // return json;
}

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [autor, setAutor] = useState('');
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const {invalidateBooksListCache} = useLibraryContext();

  async function handleSubmit() {
    mutate({
      titulo: title,
      autor: autor,
      image: imageFile, //TODO: Pendiente subir la imagen al servidor
    });
  }

  const [mutate, {isLoading}] = useMutation(postData, {
    onSuccess: () => {
      invalidateBooksListCache();
      setTitle('');
      setAutor('');
    },
  });

  const launchImagePicker = () => {
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response: ', response);

      if (response.didCancel) {
        console.log('Cancelada la selección');
      } else if (response.error) {
        console.log('Ocurrio un error al elegir la imagen', response.error);
      } else if (response.customButton) {
        console.log(
          'El usuario eligio un boton personalizado',
          response.customButton,
        );
      } else {
        console.log('fotografia capturada', response);
        const source = {uri: `data:${response.type};base64,${response.data}`};
        // const file = response;
        setImageFile(response);
        setImage(source);

        // console.log('archivo', file);
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

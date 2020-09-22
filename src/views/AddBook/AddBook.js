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
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {useMutation} from 'react-query';
import Icon from 'react-native-ionicons';
import ImagePicker from 'react-native-image-picker';
import useLibraryContext from '../../hooks/useLibraryContext';
import RNFetchBlob from 'react-native-fetch-blob';
import nofile from '../../assets/nofile.jpg';
import useVibration from '../../hooks/useVibration';

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

const SERVER_URI = 'http://192.168.10.100:8088/api';

async function postData(data) {
  return await RNFetchBlob.fetch(
    'POST',
    `${SERVER_URI}/libros`,
    {
      'Content-Type': 'multipart/form-data',
    },
    [
      {
        name: 'portada',
        filename: 'portada.jpg',
        type: 'image/jpg',
        data: data.image.data,
      },
      {name: 'titulo', data: data.titulo},
      {name: 'autor', data: data.autor},
    ],
  )
    .uploadProgress({interval: 250}, (written, total) => {
      console.log('uploaded', written / total);
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log('error', err);
      return error;
    });
}

const toastMessage = (message = 'hello') =>
  ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);

const notEmptyText = (text = '') => text.trim() != '';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [autor, setAutor] = useState('');
  const [image, setImage] = useState(null);
  const {vibrateTap, vibrateSuccess, vibrateError} = useVibration();
  const {invalidateBooksListCache} = useLibraryContext();

  async function handleSubmit() {
    vibrateTap();
    if (notEmptyText(title) && notEmptyText(autor)) {
      mutate({
        titulo: title,
        autor,
        image: image ? image : nofile,
      });
    } else {
      vibrateError();
      toastMessage('No haz completado la información');
    }
  }

  const [mutate, {isLoading}] = useMutation(postData, {
    onSuccess: (result) => {
      const {status} = result.respInfo;
      console.log('success', result);
      if (status === 200 || status == 201) {
        invalidateBooksListCache();
        setTitle('');
        setAutor('');
        setImage(null);
        vibrateSuccess();
        toastMessage('Registrado correctamente');
      } else {
        toastMessage('Error al registrar');
        vibrateError();
      }
    },
  });

  const launchImagePicker = () => {
    vibrateTap();
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        toastMessage('Proceso cancelado');
      } else if (response.error) {
        toastMessage('Ocurrio un error al elegir la imagen');
        vibrateError();
      } else if (response.customButton) {
        toastMessage('El usuario eligio un boton personalizado');
      } else {
        const source = {
          uri: `data:${response.type};base64,${response.data}`,
          data: response.data,
        };
        setImage(source);
        vibrateTap();
      }
    });
  };

  //TODO: mejorar funcionamiento del store implementando mejoras

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Registro de libro</Text>
        </View>
        <View style={styles.portada}>
          <View style={styles.portadaContainer}>
            {image && <Image source={image} style={styles.portadaImage} />}
            {!image && <Image source={nofile} style={styles.portadaImage} />}
          </View>
          <View style={styles.imageSelectorContainer}>
            <TouchableOpacity
              onPress={launchImagePicker}
              style={styles.imageSelectorButton}>
              <Text style={styles.imageSelectorText}>SELECCIONAR CARATULA</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.form}>
          <View style={styles.inputTextContainer}>
            <Text style={styles.inputTextLabel}>Nombre del libro</Text>
            <TextInput
              onChangeText={(text) => setTitle(text)}
              style={styles.inputTextBox}
              value={title}
            />
          </View>
          <View style={styles.inputTextContainer}>
            <Text style={styles.inputTextLabel}>Nombre del autor</Text>
            <TextInput
              onChangeText={(text) => setAutor(text)}
              style={styles.inputTextBox}
              value={autor}
            />
          </View>
          <View style={styles.controlsSection}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Registrar Libro</Text>
            </TouchableOpacity>
          </View>
          {isLoading && <Text>Guardando...</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#e8e8e8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  headerTitle: {
    color: '#333',
    fontSize: 28,
  },
  portada: {
    backgroundColor: '#d9d9d9',
    width: '100%',
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
    marginBottom: 10,
  },
  portadaContainer: {
    backgroundColor: '#fff',
    padding: 10,
    width: 170,
    height: 170,
    borderRadius: 170 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  portadaImage: {
    width: 160,
    height: 160,
    borderRadius: 160 / 2,
  },
  imageSelectorContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSelectorButton: {
    backgroundColor: '#ffc60d',
    width: '60%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: '#aaa',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },
  imageSelectorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    paddingHorizontal: 20,
    minHeight: 250,
    paddingTop: 10,
  },
  inputTextContainer: {
    marginTop: 20,
  },
  inputTextLabel: {
    fontSize: 16,
  },
  inputTextBox: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderColor: '#bbb',
    borderBottomWidth: 2,
    marginTop: 10,
  },
  controlsSection: {
    marginVertical: 20,
  },
  submitButton: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#189e00',
    padding: 30,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#333',
    textTransform: 'uppercase',
    color: '#eee',
    fontSize: 20,
  },
});

export default AddBook;

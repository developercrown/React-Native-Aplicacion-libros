import React, {useContext, useLayoutEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-ionicons';
import useBook from '../../hooks/useBook';
import GlobalState from '../../contexts/GlobalStateContext';
import nofile from '../../assets/nofile.jpg';
import GenericLoading from '../../components/GenericLoading';
import ViewFullsize from '../../components/ViewFullsize';
import ViewHeaderTitle from '../../components/UI/ViewHeaderTitle';
import LinearGradient from 'react-native-linear-gradient';

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
        <StatusBar
          backgroundColor="#132430"
          animated={true}
          hidden={false}
          barStyle={'light-content'}
        />
        <ScrollView>
          <ViewHeaderTitle label="Detalles del libro">
            <TouchableOpacity onPress={()=>navigation.navigate('BookEdit', {bookId: book.id})}>
              <Icon name="create" color="#fff" size={28} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginLeft: 32}}>
              <Icon name="arrow-back" color="#fff" size={28} />
            </TouchableOpacity>
          </ViewHeaderTitle>
          <LinearGradient
            colors={['#e3981b', '#e39e2b', '#faa200']}
            style={styles.portada}>
            <View style={styles.portadaContainer}>
              {book.uri && <Image source={{
                  uri: `${server}/libros/image/${book.id}/${book.uri}/${book.uri_key}/thumb`,
                }} style={styles.portadaImage} />}
              {!book.uri && <Image source={nofile} style={styles.portadaImage} />}
            </View>
          </LinearGradient>
          <View style={styles.form}>
            <Text style={styles.label}>Nombre del libro</Text>
            <Text style={styles.valueText}>{book.titulo}</Text>
            <Text style={styles.label}>Nombre del autor</Text>
            <Text style={styles.valueText}>{book.autor}</Text>
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
  portada: {
    backgroundColor: '#e39f17',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    top: -100,
    zIndex: 1,
    width: '94%',
    alignSelf: 'center',
    height: 380,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
    alignItems: 'center'
  },
  portadaContainer: {
    backgroundColor: '#fff',
    width: 240,
    height: 240,
    borderRadius: 240 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  portadaImage: {
    width: 220,
    height: 220,
    borderRadius: 220 / 2,
  },
  form: {
    top: -80,
    paddingHorizontal: 20,
    minHeight: 250,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10
  },
  valueText: {
    fontSize: 18,
    marginBottom: 14,
    textAlign: 'center'
  }
});

export default BookDetails;

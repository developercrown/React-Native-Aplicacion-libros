import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator, ToastAndroid, StatusBar
} from 'react-native';
import { useAsyncStorage } from '@react-native-community/async-storage';
import Logo from '../../assets/logo.png';
import useVibration from '../../hooks/useVibration';
import GlobalState from '../../contexts/GlobalStateContext';
import RNRestart from 'react-native-restart';
import AwesomeAlert from 'react-native-awesome-alerts';
import ViewHeaderTitle from '../../components/UI/ViewHeaderTitle';

const ConfigApp = ({ null: handleCallback }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [appConfiguration, setAppConfiguration] = useContext(GlobalState);
  const { getItem, setItem } = useAsyncStorage('server');
  const [server, setServer] = useState('');
  const [serverFactory, setServerFactory] = useState('');
  const [process, setProcess] = useState(false);

  const { vibrateTap, vibrateSuccess } = useVibration();
  const notEmptyText = (text = '') => text.trim() != '';

  const handleSubmit = async () => {
    if (notEmptyText(server) && server != serverFactory) {
      setProcess(true);
      const appConfiguration = {
        serverURL: server,
      };

      await setItem(JSON.stringify(appConfiguration));
      let check = await getItem();
      check = JSON.parse(check);
      if (server == check.serverURL) {
        if (handleCallback) {
          setShowAlert(true);
        } else {
          setAppConfiguration(appConfiguration);
          setServerFactory(appConfiguration.serverURL);
          setShowAlert(true);
          vibrateSuccess();
        }
      }
    } else {
      ToastAndroid.show('Ingresa una dirección valida', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let check = await getItem();
      check = JSON.parse(check);
      if (check && !(Object.keys(check).length === 0 && check.constructor === Object)) {
        check = check.serverURL;
        setServer(check);
        setServerFactory(check);
      } else {
        setServer('http://');
        setServerFactory('http://');
      }
    };
    fetchData();
  }, []);

  const checker = () => {
    return server != serverFactory
  };

  const handleConfirmStoredConfig = () => {
    ToastAndroid.show("Aplicando cambios en la app", ToastAndroid.SHORT);
    RNRestart.Restart();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#132430" animated={true} hidden={false} barStyle={'light-content'} />
      <ScrollView>
        <ViewHeaderTitle>Configuración</ViewHeaderTitle>
        <View>
          <Image source={Logo} style={styles.logo} />
        </View>
        {process ? (
          <View style={styles.processContainer}>
            <ActivityIndicator size="large" animating={true} color="#3aa30d" />
            <Text style={styles.processContainerText}>
              Guardando configuración
            </Text>
          </View>
        ) : (
            <View style={styles.mainContainer}>
              <Text>URL del servidor</Text>
              <TextInput
                style={styles.serverInput}
                maxLength={100}
                onChangeText={(text) => setServer(text)}
                autoFocus={false}
                value={server}
                keyboardType="email-address"
                onKeyPress={vibrateTap}
                placeholder="Dirección del servidor de datos"
                onSubmitEditing={handleSubmit}
              />
              <TouchableOpacity onPress={checker() ? handleSubmit : null}>
                <View style={checker() ? styles.buttonSubmitEnabled : styles.buttonSubmitDisabled}>
                  <Text style={styles.buttonSubmitText}>
                    Guardar configuración
                </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
      </ScrollView>

      <AwesomeAlert
        show={showAlert}
        title="Exito!"
        message="Configuración actualizada"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        confirmText="Continuar"
        confirmButtonColor="#25b04b"
        onConfirmPressed={handleConfirmStoredConfig}
        onDismiss={handleConfirmStoredConfig}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  logo: {
    width: 180,
    height: 180,
    alignSelf: 'center',
  },
  mainContainer: {
    backgroundColor: '#fff',
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 4,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  processContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 4,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    alignItems: 'center',
  },
  processContainerText: {
    fontSize: 16,
    marginTop: 20,
  },
  serverInput: {
    borderColor: '#1888b5',
    borderWidth: 0,
    borderBottomWidth: 2,
    borderRadius: 0,
    marginTop: 10,
    paddingHorizontal: 6,
    paddingVertical: 10,
  },
  buttonSubmitEnabled: {
    backgroundColor: '#3cb55c',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    borderRadius: 4,
  },
  buttonSubmitDisabled: {
    backgroundColor: '#81cc94',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    borderRadius: 4,
  },
  buttonSubmitText: {
    color: '#fff',
    padding: 20,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default ConfigApp;

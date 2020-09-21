import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator, ToastAndroid
} from 'react-native';
import {useAsyncStorage} from '@react-native-community/async-storage';
import Logo from '../../assets/logo.png';
import useVibration from '../../hooks/useVibration';
import GlobalState from '../../contexts/GlobalStateContext';

import RNRestart from 'react-native-restart';

const ConfigApp = ({handleCallback}) => {
  const [appConfiguration, setAppConfiguration] = useContext(GlobalState);
  const {getItem, setItem} = useAsyncStorage('server');
  const [server, setServer] = useState('');
  const [serverFactory, setServerFactory] = useState('');
  const [process, setProcess] = useState(false);
  
  const {vibrateTap, vibrateSuccess} = useVibration();
  const notEmptyText = (text = '') => text.trim() != '';

  const handleSubmit = async () => {
    if (notEmptyText(server)) {
      setProcess(true);
      const appConfiguration = {
        serverURL: server,
      };

      await setItem(JSON.stringify(appConfiguration));
      let check = await getItem();
      check = JSON.parse(check);
      if (server == check.serverURL) {
        if(handleCallback){
          handleCallback(0);
        } else{
          setAppConfiguration(appConfiguration);
          setServerFactory(appConfiguration.serverURL);
          alert('Configuración actualizada');
          vibrateSuccess();

          setTimeout(()=>{
            ToastAndroid.show("Aplicando cambios en la app", ToastAndroid.SHORT);
            RNRestart.Restart();
          }, 1000)
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let check = await getItem();
      check = JSON.parse(check);
      if (!(Object.keys(check).length === 0 && check.constructor === Object)) {
        check = check.serverURL;
        setServer(check);
        setServerFactory(check);
      } else {
        setServer('http://192.168.10.100:8088');
        setServerFactory('http://192.168.10.100:8088');
      }
    };
    fetchData();
  }, []);

  const checker = () => {
    return server != serverFactory
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.configTitle}>Configuración</Text>
        </View>
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
              dataDetectorTypes="link"
              onKeyPress={vibrateTap}
              placeholder="Dirección del servidor de datos"
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    paddingTop: 10,
    paddingHorizontal: 4,
  },
  logo: {
    width: 180,
    height: 180,
    alignSelf: 'center',
  },
  configTitle: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 32,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 20,
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

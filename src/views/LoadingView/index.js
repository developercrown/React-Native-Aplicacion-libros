import React, {useEffect, useContext} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Logo from '../../assets/logo.png';
import {useAsyncStorage} from '@react-native-community/async-storage';
import GlobalState from '../../../src/contexts/GlobalStateContext';

import GenericLoading from '../../components/GenericLoading'

const LoadingView = ({callbackFunction, onlyView, label}) => {
  const {getItem} = useAsyncStorage('server');
  const [appConfiguration, setAppConfiguration] = useContext(GlobalState);

  const gotoCallback = (phaseCode) => {
    setTimeout(() => {
      callbackFunction(phaseCode);
    }, 250);
  }

  useEffect(() => {
    const fetchData = async () => {
      let cfg = await getItem();
      if (cfg) {
        cfg = JSON.parse(cfg);
        if (!(Object.keys(cfg).length === 0 && cfg.constructor === Object)) {
          setAppConfiguration(cfg);
          gotoCallback(2);
        } else {
          gotoCallback(1);
        }
      } else {
        gotoCallback(1);
      }
    };

    if(!onlyView){
      fetchData();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.loaderContainer}>
        <GenericLoading label={!label ? "Cargando configuración" : label}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 250,
    height: 250,
  },
  logoContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
  },
  loaderContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: 50,
  },
});

export default LoadingView;

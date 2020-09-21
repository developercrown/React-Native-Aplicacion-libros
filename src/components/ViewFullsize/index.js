import React from 'react';
import {View, StyleSheet} from 'react-native';

const ViewFullsize = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    width: '100%',
    height: '100%',
  }
});

export default ViewFullsize;
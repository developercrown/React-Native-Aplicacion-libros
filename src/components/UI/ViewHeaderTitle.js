import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#132430',
    paddingVertical: 14,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
    zIndex: 2,
  },
  headerTitle: {
    width: '70%',
    color: '#eee',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  controlsSection: {
    flexDirection: 'row',
    width: '30%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
});

const ViewHeaderTitle = (props) => {
    const {label, children} = props;
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{label}</Text>
      <View style={styles.controlsSection}>{children}</View>
    </View>
  );
};

export default ViewHeaderTitle;

import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

const GenericLoading = ({label, color}) => {
  return (
    <View>
      <ActivityIndicator
        size="large"
        animating={true}
        color={color ? color : '#000'}
      />
      {label && <Text style={styles.loaderText}>{label}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  loaderText: {
    color: '#444',
    fontSize: 20,
    marginTop: 20,
  },
});

export default GenericLoading;

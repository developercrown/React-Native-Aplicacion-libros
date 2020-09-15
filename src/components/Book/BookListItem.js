import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Icon from 'react-native-ionicons';
import {startClock} from 'react-native-reanimated';

const styles = StyleSheet.create({
  row: {
    marginBottom: 4,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    paddingVertical: 4,
    paddingLeft: 4
  },
  firstRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: 50,
    marginRight: 8,
  },
  secondRow: {
    flexDirection: 'column',
    flex: 7,
  },

  thirdRow: {
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    paddingRight: 10,
    paddingTop: 8
  },

  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0,
    margin: 0
  },

  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  icon: {
    color: '#000',
    marginLeft: 'auto',
  },
  boldText: {
    fontWeight: 'bold',
  },
  noMargin: {
      margin: 0,
      padding: 0,
      backgroundColor: '#f00'
  }
});

const BookListItem = ({book, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.firstRow}>
          <Image source={{uri: book.uri}} style={styles.image} />
        </View>
        <View style={styles.secondRow}>
          <View style={styles.contentRow}>
            <Text>{book.titulo}</Text>
          </View>
          <View style={styles.contentRow}>
            <Icon name="library-outline" />
            <Text style={styles.boldText}>Author: {book.autor}</Text>
          </View>
        </View>
        <View style={styles.thirdRow}>
          <Icon name="arrow-dropright" style={styles.icon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookListItem;

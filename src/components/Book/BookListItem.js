import React, {useContext} from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GlobalState from '../../contexts/GlobalStateContext';
import nofile from '../../assets/nofile.jpg';

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderColor: '#e6e6e6',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100
  },
  firstRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: 60,
    marginRight: 8,
  },
  secondRow: {
    flexDirection: 'column',
    width: '75%',
  },

  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0,
    margin: 0
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
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

  const [appConfiguration] = useContext(GlobalState);

  let uri = book.uri;

  if(!uri || uri == "") {
    uri = null;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.firstRow}>
          {uri && <Image source={{uri: `${appConfiguration.serverURL}/libros/image/${book.id}/${uri}/${book.uri_key}/thumb`}} style={styles.image} />}
          {!uri && <Image source={nofile} style={styles.image} />}
        </View>
        <View style={styles.secondRow}>
          <View style={styles.contentRow}>
            <Text>{book.titulo}</Text>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.boldText}>Author: {book.autor}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookListItem;

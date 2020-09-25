import React, {useContext} from 'react';
import {Animated, Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import GlobalState from '../../contexts/GlobalStateContext';
import nofile from '../../assets/nofile.jpg';
import Icon from 'react-native-ionicons';

const stylesItemFront = StyleSheet.create({
  row: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderColor: '#e6e6e6',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
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
    margin: 0,
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
  },
});

const BookListItem = ({book, onPress}) => {
  const [appConfiguration] = useContext(GlobalState);
  let uri = book.uri;
  if (!uri || uri == '') {
    uri = null;
  }
  return (
    <View style={stylesItemFront.row}>
      <View style={stylesItemFront.firstRow}>
        {uri && (
          <Image
            source={{
              uri: `${appConfiguration.serverURL}/libros/image/${book.id}/${uri}/${book.uri_key}/thumb`,
            }}
            style={stylesItemFront.image}
          />
        )}
        {!uri && <Image source={nofile} style={stylesItemFront.image} />}
      </View>
      <View style={stylesItemFront.secondRow}>
        <View style={stylesItemFront.contentRow}>
          <Text>{book.titulo}</Text>
        </View>
        <View style={stylesItemFront.contentRow}>
          <Text style={stylesItemFront.boldText}>Author: {book.autor}</Text>
        </View>
      </View>
    </View>
  );
};

/***************************************************************** */

const stylesLayerBack = StyleSheet.create({
  row: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
  },
  firstRow: {
    flex: 1,
    height: 100,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  secondRow: {
    flex: 1,
    height: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  backOption: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  showOption: {
    backgroundColor: '#429bf5',
  },
  editOption: {
    backgroundColor: '#db9704',
  },
  deleteOption: {
    backgroundColor: '#b50e0b',
  },
});

const BookListItemBack = ({
  book,
  onDelete,
  onEdit,
  onShow,
  swipeAnimatedValue,
}) => {
  const animationIconLeft = {
    transform: [
      {
        scale: swipeAnimatedValue.interpolate({
          inputRange: [0, 75],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const animationIconRight = {
    transform: [
      {
        scale: swipeAnimatedValue.interpolate({
          inputRange: [-190, -45],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <View style={stylesLayerBack.row}>
      <View style={stylesLayerBack.firstRow}>
        <TouchableOpacity
          style={[stylesLayerBack.backOption, stylesLayerBack.showOption]}
          onPress={() => onShow(book)}>
          <Animated.View style={animationIconLeft}>
            <Icon name="eye" size={50} color="#fff" />
          </Animated.View>
        </TouchableOpacity>
      </View>
      <View style={stylesLayerBack.secondRow}>
        <TouchableOpacity
          style={[stylesLayerBack.backOption, stylesLayerBack.editOption]}
          onPress={() => onEdit(book)}>
          <Animated.View style={animationIconRight}>
            <Icon name="create" size={50} color="#fff" />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[stylesLayerBack.backOption, stylesLayerBack.deleteOption]}
          onPress={() => onDelete(book)}>
          <Animated.View style={animationIconRight}>
            <Icon name="trash" size={50} color="#fff" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export {BookListItem, BookListItemBack};

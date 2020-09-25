import React, {useState} from 'react';
import {RefreshControl} from 'react-native';
import {
  BookListItem,
  BookListItemBack,
} from '../../../components/Book/BookListItem';
import {SwipeListView} from 'react-native-swipe-list-view';

const ListadoLibrosComponent = ({data, onRefresh, refreshing, navigation}) => {
  const [listData] = useState(
    data.map((item, index) => {
      return {
        key: `${index}`,
        id: item.id,
        titulo: item.titulo,
        autor: item.autor,
        uri: item.uri,
        uri_key: item.uri_key,
      };
    }),
  );

  const onShow = (book) => {
    navigation.navigate('BookDetails', {bookId: book.id});
  };

  const onEdit = (book) => {
    navigation.navigate('BookEdit', {bookId: book.id});
  };

  const onDelete = (book) => {
    console.log('solicitando borrar a', book);
  };

  const renderItem = ({item}) => {
    return (
      <BookListItem
        book={item}
        onPress={(book) => {
          console.log('presiono al item', book);
        }}
      />
    );
  };

  const renderHiddenItem = ({item}) => {
    return (
      <BookListItemBack
        book={item}
        onDelete={onDelete}
        onEdit={onEdit}
        onShow={onShow}
      />
    );
  };

  return (
    <SwipeListView
      data={listData}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={100}
      rightOpenValue={-200}
      stopLeftSwipe={100}
      stopRightSwipe={-200}
      useNativeDriver={true}
      useAnimatedList={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default ListadoLibrosComponent;

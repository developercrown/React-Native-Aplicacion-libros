import React, {useState} from 'react';
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-ionicons';
import {SwipeListView} from 'react-native-swipe-list-view';

export const ListadoLibrosComponent = ({data}) => {
  console.log(data);

  const [listData, setListData] = useState(
    data.map((item, index) => {
      return {
        key: `${index}`,
        title: item.titulo,
        autor: item.autor,
      };
    }),
  );

  const closeRow = (rowMap, key) => {
    if (rowMap[key]) {
      rowMap[key].closeRow();
    }
  };

  const deleteRow = (rowMap, key) => {
    closeRow(rowMap, key);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === key);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const VisibleItem = ({data, rowHeightAnimatedValue, removeRow, leftActionState, rightActionState}) => {

    if(rightActionState){
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start(() => {
        removeRow();
      });
    }

    return (
      <View style={[styles.rowFront]}>
        <TouchableHighlight style={styles.rowFrontVisible}>
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {data.item.title}
            </Text>
            <Text style={styles.autor} numberOfLines={1}>
              {data.item.autor}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  const HiddenItemWithActions = ({
    data,
    rowMap,
    swipeAnimatedValue,
    leftActionActivated,
    rightActionActivated,
    rowActionAnimatedValue,
    rowHeightAnimatedValue,
    onClose,
    onDelete,
  }) => {
    if (rightActionActivated) {
      // Animated.spring(rowHeightAnimatedValue, {
      //   toValue: 500
      // }).start();
    }

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
      <Animated.View style={[styles.rowBack, { height: rowHeightAnimatedValue }]}>
        <TouchableOpacity style={[styles.backLefttBtnLeft]}>
          <Animated.View style={[styles.trash, animationIconLeft]}>
            <Icon name="eye" size={40} color="#fff" />
          </Animated.View>
        </TouchableOpacity>

          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => onClose(rowMap, data.item.key)}>
            <Animated.View style={[styles.trash, animationIconRight]}>
              <Icon name="close" size={40} color="#fff" />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={() => onDelete(rowMap, data.item.key)}>
            <Animated.View style={[styles.trash, animationIconRight]}>
              <Icon name="trash" size={40} color="#fff" />
            </Animated.View>
          </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(60);
    return <VisibleItem data={data} rowMap={rowMap} rowHeightAnimatedValue={rowHeightAnimatedValue} removeRow={()=>deleteRow(rowMap, data.item.key)}/>
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  const onRowDidOpen = () => {
    console.log('Action from: onRowDidOpen');
  };

  const onLeftActionStatusChange = () => {
    console.log('Action from: onLeftActionStatusChange');
  };

  const onRightActionStatusChange = () => {
    console.log('Action from: onRightActionStatusChange');
  };

  const onRightAction = () => {
    console.log('Action from: onRightAction');
  };

  const onLeftAction = () => {
    console.log('Action from: onLeftAction');
  };

  // console.log(database);
  return (
    <View>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        // disableLeftSwipe // Lock right swipe
        // disableRightSwipe  // Lock left swipe
        leftActivationValue={150}
        rightActivationValue={-240}
        leftActionValue={0}
        rightActionValue={0}
        onRowDidOpen={onRowDidOpen}
        onLeftActionStatusChange={onLeftActionStatusChange}
        onRightActionStatusChange={onRightActionStatusChange}
        onLeftAction={onLeftAction}
        onRightAction={onRightAction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 0,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backLefttBtnLeft: {
    backgroundColor: '#02a62d',
    width: 75,
    padding: 0,
    margin: 0,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 0,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    margin: 0,
    padding: 0,
    alignSelf: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  autor: {
    fontSize: 12,
    color: '#999',
  },
});

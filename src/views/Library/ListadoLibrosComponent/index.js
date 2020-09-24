import React, { useState } from 'react'
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native'
import data from './data';

import { SwipeListView } from 'react-native-swipe-list-view';

export const ListadoLibrosComponent = () => {

    const [listData, setListData] = useState(
        data.map((item, index) => {
            return {
                key: `${index}`,
                title: item.title,
                details: item.details,
            };
        })
    );

    const closeRow = (rowMap, key) => {
        if (rowMap[key]) {
            rowMap[key].closeRow();
        }
    }

    const deleteRow = (rowMap, key) => {
        closeRow(rowMap, key);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === key);
        newData.splice(prevIndex, 1);
        setListData(newData);
    }

    const VisibleItem = ({ data }) => {
        return (
            <View style={styles.rowFront}>
                <TouchableHighlight style={styles.rowFrontVisible}>
                    <View>
                        <Text style={styles.title} numberOfLines={1}>{data.item.title}</Text>
                        <Text style={styles.details} numberOfLines={1}>{data.item.details}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    const HiddenItemWithActions = ({ data, rowMap, onClose, onDelete }) => {
        return (
            <View style={styles.rowBack}>
                <TouchableOpacity style={[]}>
                    <Text>Abrir</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={()=>onClose(rowMap, data.item.key)}>
                    <Text>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={()=>onDelete(rowMap, data.item.key)}>
                    <Text>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const renderItem = (data, rowMap) => <VisibleItem data={data} rowMap={rowMap} />

    const renderHiddenItem = (data, rowMap) => <HiddenItemWithActions data={data} rowMap={rowMap} onClose={() => closeRow(rowMap, data.item.key)} onDelete={() => deleteRow(rowMap, data.item.key)} />

    // console.log(database);
    return <View>
        <SwipeListView
            data={listData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-150}
            // disableLeftSwipe // Lock right swipe
            // disableRightSwipe  // Lock left swipe
        />
    </View>
}

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
        shadowOffset: { width: 0, height: 1 },
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
        paddingLeft: 15,
        margin: 5,
        marginBottom: 15,
        borderRadius: 5,
    },
    backRightBtn: {
        alignItems: 'flex-end',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        paddingRight: 17,
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
        height: 25,
        width: 25,
        marginRight: 7,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#666',
    },
    details: {
        fontSize: 12,
        color: '#999',
    },
});
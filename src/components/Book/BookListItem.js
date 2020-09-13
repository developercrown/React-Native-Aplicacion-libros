import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    row: {
        marginBottom: 4,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1,
        padding: 6
    }
})

const BookListItem = ({book}) => {
    return (
        <View style={styles.row}>
            <Text>{book.title}</Text>
        </View>
    )
}

export default BookListItem;
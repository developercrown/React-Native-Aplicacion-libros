import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import useBook from '../../hooks/useBook';

const BookDetails = ({ route }) => {
    const { bookId } = route.params;
    const { data: book, isLoading, isSuccess } = useBook({ bookId });
    // console.log(book);

    if (isLoading) {
        return <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" animating={true} color="#0373fc"/>
        </View>
    }

    return (
        <View>
            <Text>Soy el libro {book.titulo}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

export default BookDetails;
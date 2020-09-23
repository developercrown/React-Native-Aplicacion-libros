import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    header: {
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
        zIndex: 2
    },
    headerTitle: {
        color: '#eee',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left'
    },
});

const ViewHeaderTitle = ({children}) => {
    return <View style={styles.header}>
        <Text style={styles.headerTitle}>{children}</Text>
    </View>;
}

export default ViewHeaderTitle;

import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';

export const InputTextBox = ({ label = 'Hola!', handleChangeText = () => { }, value = '' }) => {
    return <View style={styles.inputTextContainer}>
        <Text style={styles.inputTextLabel}>{label}</Text>
        <TextInput
            onChangeText={handleChangeText}
            style={styles.inputTextBox}
            value={value}
        />
    </View>
}

const styles = StyleSheet.create({
    inputTextContainer: {
        marginTop: 20,
    },
    inputTextLabel: {
        fontSize: 16,
    },
    inputTextBox: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderColor: '#e8ba23',
        borderBottomWidth: 2,
        marginTop: 10,
    }
});

export default InputTextBox;

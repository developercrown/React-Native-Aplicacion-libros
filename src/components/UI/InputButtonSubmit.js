import React from 'react'
import {
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    submitButton: {
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#132430',
        padding: 30,
        marginTop: 20,
        borderRadius: 4
    },
    submitButtonText: {
        textTransform: 'uppercase',
        color: '#ffc04d',
        fontSize: 20,
        fontWeight: 'bold'
    },
});

const InputButtonSubmit = ({ handleClick = () => { }, label='Registrar'}) => {
    return <TouchableOpacity
        onPress={handleClick}
        style={styles.submitButton}>
        <Text style={styles.submitButtonText}>{label}</Text>
    </TouchableOpacity>
}

export default InputButtonSubmit;

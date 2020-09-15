import React, {useState} from 'react';
import {View, Text, SafeAreaView, TextInput, Button, StyleSheet} from 'react-native';

import { useMutation } from 'react-query'

import useLibraryContext from '../../hooks/useLibraryContext';

const styles = StyleSheet.create({
    label: {
      marginTop: 10 
    },
    form: {
        paddingHorizontal: 16,

    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 20
    }
});

const SERVER = 'https://crud.upn164.edu.mx/api'

async function postData(data) { 
    const response = await fetch(`${SERVER}/libros`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type' : 'application/json',
        },
    });
    const json = await response.json();
    return json;
}


const AddBook = () => {
  const [title, setTitle] = useState(null);
  const [autor, setAutor] = useState(null);
  const {invalidateBooksListCache} = useLibraryContext();

  async function handleSubmit() {
    mutate({
      titulo: title,
      autor: autor
    });
  }

  const [ mutate, {isLoading} ] = useMutation(postData, {
      onSuccess: () => {
        invalidateBooksListCache();
        setTitle('');
        setAutor('');
      }
  });

  return (
    <SafeAreaView>
      <View style={styles.form}>
        <Text style={styles.label}>Nombre del libro</Text>
        <TextInput onChangeText={text=>setTitle(text)} style={styles.textInput} value={title}/>
        <Text style={styles.label}>Nombre del autor</Text>
        <TextInput onChangeText={text=>setAutor(text)} style={styles.textInput} value={autor}/>
        <Button onPress={handleSubmit} title="Guardar"/>
        {isLoading && <Text>Guardando...</Text>}
      </View>
    </SafeAreaView>
  );
};

export default AddBook;

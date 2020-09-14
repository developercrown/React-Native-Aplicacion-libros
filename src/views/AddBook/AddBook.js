import React, {useState} from 'react';
import {View, Text, SafeAreaView, TextInput, Button, StyleSheet} from 'react-native';

import { useQuery, useMutation, queryCache } from 'react-query'

const styles = StyleSheet.create({
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

const GET_BOOKS = 'GET_BOOKS';

async function postData(data) { 
    const response = await fetch('http://127.0.0.1:8000/api/books', {
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

  async function handleSubmit() {
    //   mutate(title);
    alert(title)
  }

  const [ mutate, {isLoading} ] = useMutation(postData, {
      onSuccess: queryCache.invalidateQueries('GET_BOOKS')
  });

  return (
    <SafeAreaView>
      <View style={styles.form}>
        <TextInput onChangeText={text=>setTitle(text)} style={styles.textInput} value={title}/>
        <Button onPress={handleSubmit} title="Guardar"/>
        {isLoading && <Text>Guardando...</Text>}
      </View>
    </SafeAreaView>
  );
};

export default AddBook;

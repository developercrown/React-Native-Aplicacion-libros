import AsyncStorage from '@react-native-community/async-storage';

const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return await AsyncStorage.getItem(key);
    } catch (e) {
      return false;
    }
}

const getData = async (key) => {
    const value = await AsyncStorage.getItem(key);
    if(value !== null) {
      return value;
    }
    return null;
}

export {
    storeData,
    getData
}
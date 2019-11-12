import AsyncStorage from '@react-native-community/async-storage';

export const storeAuthKey = async data => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const removeAuthKey = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error) {
    console.log(error);
  }
};

export const getAuthKey = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return JSON.parse(user);
  } catch (error) {
    console.log(error);
  }
};

export const storeIntroKey = async () => {
  try {
    await AsyncStorage.setItem('intro', 'keystored');
  } catch (error) {
    console.log(error);
  }
};

export const getIntroKey = async () => {
  try {
    const intro = await AsyncStorage.getItem('intro');
    return intro;
  } catch (error) {
    console.log(error);
  }
};

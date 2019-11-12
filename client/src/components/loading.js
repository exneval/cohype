import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  ImageBackground,
} from 'react-native';

import loadImg from '../assets/images/loading.png';
import background from '../assets/images/background.jpg';

import strings from '../config/strings';

export default class loading extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
          <Image source={loadImg} style={styles.loading} />
          <Text style={styles.loadingTxt}>{strings.LOADING}</Text>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  loading: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  loadingTxt: {
    fontFamily: strings.FONT,
    fontSize: 20,
  },
});

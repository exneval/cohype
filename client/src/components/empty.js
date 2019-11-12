import React, {Component} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';

import strings from '../config/strings';

import emptyLogo from '../assets/images/empty.png';
import background from '../assets/images/background.jpg';

export default class empty extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
          <Image source={emptyLogo} style={styles.empty} />
          <Text style={styles.emptyTxt}>{strings.EMPTY_DATA}</Text>
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
  empty: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  emptyTxt: {
    fontFamily: strings.FONT,
    fontSize: 20,
  },
});

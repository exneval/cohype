import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import colors from '../../../config/colors';
import strings from '../../../config/strings';
import {storeIntroKey} from '../../../config/auth';

import background from '../../../assets/images/background.jpg';

import image1 from '../../../assets/images/growing.png';
import image2 from '../../../assets/images/functional.png';
import image3 from '../../../assets/images/friendly.png';

export default class Intro extends Component {
  constructor(props) {
    super(props);
    this.slides = [
      {
        key: 'growing',
        title: strings.INTRO_TITLE1,
        text: strings.INTRO_DESC1,
        image: image1,
      },
      {
        key: 'functional',
        title: strings.INTRO_TITLE2,
        text: strings.INTRO_DESC2,
        image: image2,
      },
      {
        key: 'friendly',
        title: strings.INTRO_TITLE3,
        text: strings.INTRO_DESC3,
        image: image3,
      },
    ];
  }

  _renderItem = ({item}) => {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
          <Text style={styles.title}>{item.title}</Text>
          <Image source={item.image} style={styles.imgSlide} />
          <Text style={styles.text}>{item.text}</Text>
        </ImageBackground>
      </SafeAreaView>
    );
  };

  _onSkip = async () => {
    try {
      await storeIntroKey();
      this.props.navigation.navigate('Auth');
    } catch (error) {
      console.log(error);
    }
  };

  _onDone = async () => {
    try {
      await storeIntroKey();
      this.props.navigation.navigate('Auth');
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <AppIntroSlider
        slides={this.slides}
        renderItem={this._renderItem}
        onSkip={this._onSkip}
        onDone={this._onDone}
        showNextButton={false}
        showSkipButton={true}
        dotStyle={styles.inactiveDot}
        activeDotStyle={styles.activeDot}
        buttonTextStyle={styles.btnStyle}
        doneLabel={strings.DONE}
        skipLabel={strings.SKIP}
      />
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
  inactiveDot: {
    minWidth: 15,
    maxWidth: 15,
    minHeight: 15,
    maxHeight: 15,
    borderRadius: 7,
    backgroundColor: colors.DARK_SILVER,
  },
  activeDot: {
    minWidth: 15,
    maxWidth: 15,
    minHeight: 15,
    maxHeight: 15,
    borderRadius: 7,
    backgroundColor: colors.GREEN,
  },
  btnStyle: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 18,
    color: colors.BLACK,
  },
  imgSlide: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 20,
    fontSize: 22,
    color: colors.BLACK,
    textAlign: 'center',
    marginBottom: 16,
  },
  text: {
    fontFamily: strings.FONT,
    fontSize: 18,
    color: colors.BLACK,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

import {MaterialIndicator} from 'react-native-indicators';

import colors from '../../config/colors';
import strings from '../../config/strings';

export default class Button extends Component {
  render() {
    const {disabled, label, isLoading, onPress} = this.props;
    const buttonStyle = disabled ? styles.btnDisabled : styles.btnEnabled;
    let content;

    if (isLoading) {
      return (
        <View style={styles.indicatorCont}>
          <MaterialIndicator color={colors.WHITE} size={30} />
        </View>
      );
    } else {
      content = <Text style={styles.text}>{label}</Text>;
    }

    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={onPress}
        disabled={disabled}>
        <View style={styles.container}>{content}</View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  indicatorCont: {
    flex: 1,
    backgroundColor: colors.GREEN,
    paddingVertical: 22,
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.GREEN,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 12,
  },
  btnEnabled: {
    opacity: 1,
  },
  btnDisabled: {
    opacity: 0.3,
  },
  text: {
    color: colors.WHITE,
    fontFamily: strings.FONT_BOLD,
    fontSize: 16,
  },
});

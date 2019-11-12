import React, {Component} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import colors from '../../config/colors';
import strings from '../../config/strings';

export default class FormTextInput extends Component {
  textInputRef = React.createRef();

  focus = () => {
    if (this.textInputRef.current) {
      this.textInputRef.current.focus();
    }
  };

  render() {
    const {style, ...otherProps} = this.props;

    return (
      <View style={[styles.container, style]}>
        <TextInput
          ref={this.textInputRef}
          selectionColor={colors.DODGER_BLUE}
          style={[styles.textInput]}
          {...otherProps}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    maxHeight: 40,
    minHeight: 40,
  },
  textInput: {
    borderColor: colors.SILVER,
    borderBottomWidth: 3,
    fontFamily: strings.FONT,
    fontSize: 16,
  },
});

import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Icon extends Component {
  render() {
    const {name, size, color, onPress} = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <FontAwesome name={name} size={size} color={color} />
      </TouchableOpacity>
    );
  }
}

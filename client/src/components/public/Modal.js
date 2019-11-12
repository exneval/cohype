import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import ReactModal from 'react-native-modal';

import styles from '../../screens/public/styles';
import strings from '../../config/strings';

export default class Modal extends Component {
  render() {
    const {isVisible, message, onPress} = this.props;

    return (
      <ReactModal isVisible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{message}</Text>
          </View>
          <View style={styles.modalMsgContainer}>
            <Text style={styles.modalMsg}>{strings.MODALMSG}</Text>
          </View>
          <View style={styles.modalTextContainer}>
            <TouchableOpacity onPress={onPress}>
              <Text style={styles.modalText}>{strings.TRYAGAIN}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReactModal>
    );
  }
}

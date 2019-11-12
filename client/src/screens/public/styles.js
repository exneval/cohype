import {StyleSheet} from 'react-native';

import colors from '../../config/colors';
import strings from '../../config/strings';

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
  formContainer: {
    width: '85%',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 40,
  },
  passContainer: {
    flexDirection: 'row',
  },
  password: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: colors.WHITE,
    padding: 16,
    justifyContent: 'center',
  },
  modalTitleContainer: {
    alignItems: 'center',
    borderColor: colors.SILVER,
    borderBottomWidth: 3,
  },
  modalTitle: {
    fontFamily: strings.FONT,
    fontSize: 16,
    marginBottom: 12,
  },
  modalMsgContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  modalMsg: {
    fontFamily: strings.FONT,
    fontSize: 16,
    opacity: 0.3,
  },
  modalTextContainer: {
    alignItems: 'center',
    borderColor: colors.SILVER,
    borderTopWidth: 3,
  },
  modalText: {
    fontFamily: strings.FONT,
    color: colors.BLUE,
    fontSize: 16,
    marginTop: 12,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  text1: {
    fontFamily: strings.FONT,
    fontSize: 16,
    opacity: 0.3,
  },
  text2: {
    fontFamily: strings.FONT,
    fontSize: 16,
    color: colors.BLUE,
  },
});

export default styles;

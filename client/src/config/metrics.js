import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const metrics = {
  DEVICE_WIDTH: width,
  DEVICE_HEIGHT: height,
  BANNER: width - width / 7.5,
};

export default metrics;

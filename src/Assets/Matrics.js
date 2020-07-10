import { Dimensions, Platform } from 'react-native';
import { scale } from '@Components/Helpers/function';
import { Header } from 'react-navigation'

const { width, height } = Dimensions.get('window');
// alert(Header.HEIGHT)

let screenHeight = width < height ? height : width
let screenWidth = width < height ? width : height

const metrics = {

  screenWidth: screenWidth,
  screenHeight: screenHeight,

  navBarHeight: Platform.OS == 'ios' ? (screenHeight >= 812 ? 44 : 20) : 0,
  headerTotalHeight: Platform.OS == 'ios' ? (screenHeight >= 812 && Header.HEIGHT == 64 ? 88 : Header.HEIGHT) : Header.HEIGHT,
  CountScale: (val) => {
    return scale(val)
  },
  HeaderFontSize: scale(18),
  HeaderRightFontSize: scale(17),
  HeaderLeftFontSize: scale(17),
  headerHeight: Header.HEIGHT
};

export default metrics;

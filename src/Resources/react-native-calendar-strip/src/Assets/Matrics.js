import { Dimensions, Platform } from 'react-native';
import { scale } from '@Components/Helpers/function';

const { width, height } = Dimensions.get('window');

const metrics = {
  // section: scale(25),
  // smallSection: scale(12.5),
  // baseSection: scale(40),
  // doubleBaseSection: scale(80),
  // baseMargin: scale(10),
  // mediumBaseMargin: scale(15),
  // bigMargin: scale(40),
  // doubleBaseMargin: scale(20),
  // tinyMargin: scale(2),
  // miniMargin: scale(3),
  // maxMargin: scale(55),
  // smallMargin: scale(5),
  // mediumMargin: scale(8),
  // mediumSize: scale(18),
  // doubleSection: scale(52),
  // horizontalLineHeight: 1,
  // fontScale: scale(50),
  // bigMediumMargin: scale(35),
  // barHeight: scale(30),
  // rowHeight: scale(60),
  // scalingHeight: scale(45),
  // profileIconSection: scale(60),
  // imageProfileSection: scale(130),
  // imageProfileSmallSection: scale(100),
  // inputHeight: scale(50),

  // buttonHeight: scale(50),
  // buttonRadius: scale(5),
  // borderRadius: scale(5),
  // borderDoubleRadius: scale(10),
  // borderTripleRadius: scale(15),
  // fontMediumScale: scale(17),
  // borderWidth: 1, //scale(2),
  // borderDoubleWidth: scale(4),
  // borderThick: 4, //scale(5),
  // thinBorder: 1,
  // widthBox: scale(300),
  // compaignItemHeight: scale(200),
  // channelImage: scale(210),
  // brandItemHeight: scale(80),
  // smallBrandHeight: scale(70),
  // inspireImageHeight: scale(125),
  // inspireImageWidth: scale(210),
  // icons: {
  //   extraTiny: scale(10),
  //   tiny: scale(15),
  //   small: scale(20),
  //   medium: scale(30),
  //   large: scale(45),
  //   xl: scale(50)
  // },
  // images: {
  //   small: scale(20),
  //   mediumSmall: scale(35),
  //   medium: scale(50),
  //   large: scale(90),
  //   logo: scale(200)
  // },
  // fontBold: "bold",
  // keyboardVerticalOffset: 64,
  // keyboardShouldPersistTaps: "handled",
  // headerHeight: scale(75),
  // padding25: scale(25),
  // padding15: scale(15),

  // FontSize: scale(15),
  // padding5: scale(5),
  // padding10: scale(10),
  // padding5: scale(5),
  // iconHeight: scale(20),
  // iconWidth: scale(18),


  navBarHeight: Platform.OS === "ios" ? scale(64) : scale(54),
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  CountScale: (val) => {
    return scale(val)
  },
  HeaderFontSize: scale(18),
  HeaderRightFontSize: scale(17),
  HeaderLeftFontSize: scale(17),
};

export default metrics;

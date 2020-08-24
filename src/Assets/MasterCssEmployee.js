import { Dimensions, Platform } from 'react-native';
import { scale } from '@Components/Helpers/function';
import { Colors, Fonts, Matrics } from '@Assets'
import { Header } from 'react-navigation';

const d = Dimensions.get("window")
const isX = Platform.OS === "ios" && (d.height == 812 || d.width == 812) ? true : false

//  ====>>>>>>>>>>> Global Style For Header Text Style <<<<<<<<<<==========> 
const MasterCss = {
    headerTextContainerStyle: {
        justifyContent: 'center',
        flex: 0.40,
        // borderWidth: 1,
    },
    iconContainerStyle: {
        justifyContent: 'center',
        flex: 0.25,
    },
    headerLeftTextStyle: {
        color: Colors.APPCOLOR,
        fontSize: Matrics.HeaderLeftFontSize,
        //marginVertical: Matrics.CountScale(10),
        marginHorizontal: Matrics.CountScale(15),
        alignSelf: 'flex-start'
    },
    headerRightTextStyle: {
        color: Colors.APPCOLOR,
        fontSize: Matrics.HeaderLeftFontSize,
        //marginVertical: Matrics.CountScale(10),
        marginHorizontal: Matrics.CountScale(15),
        alignSelf: 'flex-end'
    },

    // leftTextStyle: {
    //     color: Colors.APPCOLOR,
    //     fontSize: Matrics.HeaderLeftFontSize,
    //     alignSelf: 'flex-start'
    // },
    centerStyle: {
        justifyContent: 'center',
        flex: 1,
        // backgroundColor:'red',
        alignItems: 'center'
    },
    centerTextStyle: {
        fontSize: Matrics.CountScale(18),
        fontFamily: Fonts.NunitoSansRegular,
        color: 'black'
    },
    leftStyle: {
        flex: 0
    },
    rightStyle: {
        flex: 0
    },
    iconStyle: {
        margin: Matrics.CountScale(18),
    },
    // rightTextStyle: {
    //     color: Colors.APPCOLOR,
    //     fontSize: Matrics.HeaderRightFontSize,
    //     alignSelf: 'flex-end'
    // },
    headerContainer: {
        //resizeMode: 'contain',
        backgroundColor: 'white',
        height: isX ? 88 : Header.HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderBottomColor: Colors.LIGHTGREY,
        paddingTop: Platform.OS === "ios" ? (isX ? 44 : 20) : 0,
        // paddingLeft: Matrics.CountScale(15),
        // paddingRight: Matrics.CountScale(15),
    },
}
export default MasterCss
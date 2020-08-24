import { Dimensions, Platform } from 'react-native';
import { scale } from '@Components/Helpers/function';
import { Colors, Fonts, Matrics } from '@Assets'

//  ====>>>>>>>>>>> Global Style For Header Text Style <<<<<<<<<<==========> 
const MasterCss = {
    headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
        fontWeight: 'normal',
        fontSize: Matrics.CountScale(18),
        fontFamily: Fonts.NunitoSansRegular,
        color: 'black',
    },
    headerIconStyle: {
        margin: Matrics.CountScale(15),
        height: Matrics.CountScale(20),
        width: Matrics.CountScale(15),
        resizeMode: 'contain'
    },
    basicIconStyle: {
        margin: Matrics.CountScale(15),
        height: Matrics.CountScale(25),
        width: Matrics.CountScale(25),
        resizeMode: 'contain'
    },

    headerTextContainerStyle: {
        justifyContent: 'center',
        flex: 0.40,
    },
    iconContainerStyle: {
        justifyContent: 'center',
        flex: 0.25,
    },
    headerLeftTextStyle: {
        color: Colors.APPCOLOR,
        fontSize: Matrics.HeaderLeftFontSize,
        marginVertical: Matrics.CountScale(10),
        marginLeft: Matrics.CountScale(15),
        alignSelf: 'flex-start'
    },
    headerRightTextStyle: {
        color: Colors.APPCOLOR,
        fontSize: Matrics.HeaderLeftFontSize,
        marginVertical: Matrics.CountScale(10),
        marginHorizontal: Matrics.CountScale(15),
        alignSelf: 'flex-end',
    },

    headerTextIconStyle: {
        justifyContent: 'center',
        flex: 0.40,
        alignItems: 'flex-end'
    },

    headerStyle: {
        borderBottomWidth: 0,
        elevation: 0
    },

    // headerLeftStyle:{
    //     alignSelf:'flex-start',flexDirection:'row',padding:10,position:'absolute'
    //   },
    //   headerCenterStyle:{
    //     //width,
    //     //borderWidth:1,
    //     justifyContent:'center',
    //     alignItems:'center',
    //     flex:1
    //   },
    //   headerRightStyle:{
    //     alignSelf:'flex-end',flexDirection:'row',padding:10,position:'absolute'
    //   },

    leftStyle: {
        flex: 0,
        // justifyContent: 'center',
        // flex: 0.5,
    },
    leftTextStyle: {
        color: Colors.APPCOLOR,
        fontSize: Matrics.HeaderLeftFontSize,
        alignSelf: 'flex-start'
    },
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
    rightStyle: {
        // justifyContent: 'center',
        // // alignSelf: 'flex-end',   
        // alignItems: 'flex-end',
        // // borderWidth: 1,
        // flex: 0.5
        flex: 0,
    },
    rightTextStyle: {
        color: Colors.APPCOLOR,
        fontSize: Matrics.HeaderRightFontSize,
        alignSelf: 'flex-end'
    },
    headerContainer: {
        backgroundColor: 'white',
        height: Matrics.headerTotalHeight,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderBottomColor: Colors.LIGHTGREY,
        paddingTop: Platform.OS == 'ios' ? (Matrics.screenHeight > 810 ? 44 : 20) : 0,
        // paddingTop: Platform.OS === "ios" ? scale(20) : scale(0),
        // paddingLeft: Matrics.CountScale(15),
        // paddingRight: Matrics.CountScale(15),
    },
}
export default MasterCss
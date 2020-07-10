import { Dimensions, Platform } from 'react-native';
import { scale } from '@Components/Helpers/function';
import { Colors, Fonts, Matrics } from '@Assets'

//  ====>>>>>>>>>>> Global Style For Header Text Style <<<<<<<<<<==========> 
const MasterCss = {
    leftStyle: {
        justifyContent: 'center',
        flex: 0.5,
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
        fontFamily: Fonts.NunitoSansSemiBold,
        color:'black'
    },
    rightStyle: {
        justifyContent: 'center',
        // alignSelf: 'flex-end',   
        alignItems: 'flex-end',
        flex: 0.5
    },
    rightTextStyle: {
        color: Colors.APPCOLOR,
        fontSize: Matrics.HeaderRightFontSize,
        alignSelf: 'flex-end'
    },
    headerContainer: {
        resizeMode: 'contain',
        backgroundColor: 'white',
        height: Platform.OS === "ios" ? scale(64) : scale(54),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth:0.5,
        borderBottomColor:Colors.LIGHTGREY,
        paddingTop: Platform.OS === "ios" ? scale(18) : scale(0),
        paddingLeft: Matrics.CountScale(15),
        paddingRight: Matrics.CountScale(15),
    },
}
export default MasterCss
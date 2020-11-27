/* ====>>>>>>>>>>>  Libraires  <<<<<<<<<<========== */
import React from 'react';
import { View, Image, TouchableOpacity, Text, WebView } from 'react-native';
import HTML from 'react-native-render-html';

/* ====>>>>>>>>>>>  Assets  <<<<<<<<<<========== */
import { Colors, Fonts, Matrics, Images } from '@Assets'

/* ====>>>>>>>>>>>  Class Declaration  <<<<<<<<<<========== */
class NotificationCard extends React.Component {
    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate(this.props.root);
                }}
                style={[Styles.notificationCard, { backgroundColor: this.props.isRead ? 'yellow' : 'white' }]}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.2 }}></View>
                    <Text style={Styles.dateText}>
                        {this.props.time}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Image style={Styles.imgStyle} source={this.props.imgSrc != '' ? { uri: this.props.imgSrc } : Images.ProfileIconPlaceholder} />
                    </View>

                    <View style={{ flex: 1 }}>
                        <HTML html={this.props.text} />
                    </View>


                </View>
                {this.renderBtn()}
            </TouchableOpacity >
        );
    }

    /* ====>>>>>>>>>>> Offer Button Class <<<<<<<<<<========== */
    renderBtn() {
        if (this.props.button) {
            return (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 0.2 }}>
                    </View>
                    <View style={Styles.offerBtnContainer}>
                        <Text style={{ color: 'white' }}>View Offer</Text>
                    </View>
                    <View style={{ flex: 0.5 }}>

                    </View>
                </View >
            );
        }
    }
}

/* ====>>>>>>>>>>> StyleSheet <<<<<<<<<<========== */
const Styles = {
    notificationCard: {
        margin: Matrics.CountScale(8),
        marginTop: Matrics.CountScale(12),
        marginBottom: Matrics.CountScale(0),
        borderRadius: Matrics.CountScale(3),
        padding: Matrics.CountScale(10),
        paddingTop: Matrics.CountScale(20),
        backgroundColor: 'white',
    },
    dateText: {
        flex: 1,
        color: 'grey',
        fontSize: 11,
        fontFamily: Fonts.NunitoSansSemiRegular
    },
    imgStyle: {
        margin: Matrics.CountScale(10),
        borderRadius: Matrics.CountScale(18),
        height: Matrics.CountScale(35),
        width: Matrics.CountScale(35)
    },
    contentTextStyle: {
        flex: 1,
        fontSize: Matrics.CountScale(15),
        padding: Matrics.CountScale(5),
        fontFamily: Fonts.NunitoSansSemiRegular,
        fontWeight: '300',
        lineHeight: Matrics.CountScale(20)
    },
    offerBtnContainer: {
        flex: 0.35,
        borderRadius: Matrics.CountScale(4),
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: Matrics.CountScale(14),
        padding: Matrics.CountScale(5),
        backgroundColor: Colors.APPCOLOR,
        height: Matrics.CountScale(25),
        width: Matrics.CountScale(65)
    }
}
export default NotificationCard;
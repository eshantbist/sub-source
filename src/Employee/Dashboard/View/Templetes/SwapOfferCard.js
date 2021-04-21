/* ====>>>>>>>>>>> Libraries <<<<<<<<<<========== */
import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

/* ====>>>>>>>>>>> Assets <<<<<<<<<<========== */
import { Colors, Fonts, Matrics, Images } from '@Assets'

/* ====>>>>>>>>>>> Class Declaration <<<<<<<<<<========== */
class SwapOfferCard extends React.Component {
    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('NotificationDetail',{MessageGuid: ''});
                }}
                style={Styles.swapOfferCard}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 0.2 }}>
                        <Image style={Styles.imgStyle} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2zMDwXULD5zYP3wAFrRdhcCBqj6YMFDLRAzyb1lMPnvcwc0NW' }} ></Image>
                    </View>
                    <View style={Styles.cardContainer}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={Styles.nameTextStyle} >
                                {this.props.name}
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={Styles.processingIcon} source={Images.ProcessingDotIcon}></Image>
                                <Text style={{ fontSize: 11, color: 'grey' }}>Processing</Text>
                            </View>
                        </View>
                        <Text style={Styles.shopNameText} >Shop #133A23</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image style={Styles.storeIcon} source={Images.StoreGrey}></Image>
                    <Text style={Styles.timeTextStyle} >
                        Mar, 12 Fri at 12:30pm ~ 1334
                        </Text>
                </View>
            </TouchableOpacity >
        );
    }
}

/* ====>>>>>>>>>>> StyleSheet <<<<<<<<<<========== */
const Styles = {
    swapOfferCard: {
        marginTop: Matrics.CountScale(8),
        marginBottom: Matrics.CountScale(0),
        borderRadius: Matrics.CountScale(3),
        padding: Matrics.CountScale(10),
        backgroundColor: Colors.WHITE,

    },
    imgStyle: {
        margin: Matrics.CountScale(10),
        alignSelf: 'flex-start',
        borderRadius: Matrics.CountScale(18),
        height: Matrics.CountScale(35),
        width: Matrics.CountScale(35)
    },
    cardContainer: {
        flex: 1,
        paddingTop: Matrics.CountScale(10),
        justifyContent: 'center',
        alignSelf: 'center'
    },
    nameTextStyle: {
        flex: 1,
        justifyContent: 'center',
        fontSize: Matrics.CountScale(14),
        fontFamily: Fonts.NunitoSansSemiRegular,
        fontWeight: '300',
        lineHeight: Matrics.CountScale(20),
    },
    processingIcon: {
        height: Matrics.CountScale(7),
        width: Matrics.CountScale(7),
        alignItems: 'center',
        marginLeft: Matrics.CountScale(1),
        marginRight: Matrics.CountScale(5)
    },
    shopNameText: {
        flex: 1,
        justifyContent: 'center',
        color: 'grey',
        fontSize: Matrics.CountScale(11),
        fontFamily: Fonts.NunitoSansRegular
    },
    storeIcon: {
        height: Matrics.CountScale(15),
        width: Matrics.CountScale(13),
        alignItems: 'center',
        marginLeft: Matrics.CountScale(15),
        marginRight: Matrics.CountScale(15)
    },
    timeTextStyle: {
        flex: 1,
        fontSize: Matrics.CountScale(13),
        fontWeight: '200',
        fontFamily: Fonts.NunitoSansSemiRegular
    }
}
export default SwapOfferCard;
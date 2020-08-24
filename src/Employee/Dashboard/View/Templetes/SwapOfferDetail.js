/* ====>>>>>>>>>>> Libraries <<<<<<<<<<========== */
import React from 'react';
import { View, Image, StatusBar, BackHandler, TouchableOpacity, ScrollView, Text } from 'react-native';

/* ====>>>>>>>>>>> Assets <<<<<<<<<<========== */
import { Colors, Fonts, Matrics, Images, MasterCssEmployee } from '@Assets'
import SwapOfferCard from './SwapOfferCard';

/* ====>>>>>>>>>>> Class Declaration <<<<<<<<<<========== */
class SwapOfferDetails extends React.Component {
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.pop();
            // this.goBack(); // works best when the goBack is async
            return true;
        });
    }
    componentWillUnmount() {
        this.backHandler = BackHandler.removeEventListener('hardwareBackPress', () => {
            return true;
        });
    }
    render() {
        return (
            <View style={Styles.pageBody}>
                {/* <StatusBar barStyle="dark-content"></StatusBar> */}

                {/* ====>>>>>>>>>>> Header Start <<<<<<<<<<========== */}
                < View style={MasterCssEmployee.headerContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        style={MasterCssEmployee.iconContainerStyle}>
                        <Image style={[Styles.backImgStyle, MasterCssEmployee.iconStyle]} source={Images.EmpBackIcon}></Image>
                    </TouchableOpacity>
                    <View style={MasterCssEmployee.centerStyle}>
                        <Text style={MasterCssEmployee.centerTextStyle}>Swap Offers</Text>
                    </View>
                    <View style={MasterCssEmployee.iconContainerStyle}>
                        <Image style={[Styles.optionImgStyle, MasterCssEmployee.iconStyle]} source={Images.HeaderDots}></Image>
                    </View>
                </View>

                {/*  ====>>>>>>>>>>> Header End <<<<<<<<<<========== */}

                {this.renderPageContent()}
            </View >
        );
    }
    renderPageContent() {
        return (
            <ScrollView style={{ padding: Matrics.CountScale(10) }}>

                {/* ====>>>>>>>>>>> Shift Card <<<<<<<<<<========== */}
                <View style={Styles.CardContainer}>
                    <Text style={Styles.CardHeader}>My Shift</Text>
                    <View style={Styles.Card}>
                        <View style={{ flex: 0.2, justifyContent: "center", alignItems: 'center' }}>
                            <View>
                                <Text style={Styles.monthTextStyle}>
                                    Aug
                                </Text>
                            </View>
                            <View>
                                <Text style={Styles.dateTextStyle}>
                                    1
                                </Text>
                            </View>
                            <View>
                                <Text style={Styles.dayTextStyle}>
                                    <Text>Mon</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View>
                                <Text style={Styles.timeTextStyle}>
                                    8:00am - 2:00pm
                                </Text>
                            </View>
                            <View>
                                <Text style={Styles.shopNameTextStyle}>
                                    Shop #133A23
                                </Text>
                            </View>
                            <View>
                                <Text style={Styles.swapOfferTextStyle}>
                                    2 swap Offers
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* ====>>>>>>>>>>> Render Swaps Offers Card Class <<<<<<<<<<========== */}
                {this.rederCard()}
            </ScrollView >
        );
    }

    // ====>>>>>>>>>>> Swaps Offers Card Class <<<<<<<<<<========== 
    rederCard() {
        return (
            <View>
                <View>
                    <Text style={{ color: Colors.GREY, paddingTop: Matrics.CountScale(10), paddingLeft: Matrics.CountScale(10), fontFamily: Fonts.NunitoSansRegular, fontSize: Matrics.CountScale(13) }}>Offers</Text>
                </View>
                <SwapOfferCard navigation={this.props.navigation} name={'John Doe'}></SwapOfferCard>
                <SwapOfferCard navigation={this.props.navigation} name={'John Doe'}></SwapOfferCard>
                <SwapOfferCard navigation={this.props.navigation} name={'John Doe'}></SwapOfferCard>
                <SwapOfferCard navigation={this.props.navigation} name={'John Doe'}></SwapOfferCard>
            </View>
        );
    }
}

// ====>>>>>>>>>>> StyleSheet <<<<<<<<<<========== 
export default SwapOfferDetails;
const Styles = {
    pageBody: {
        flex: 1, backgroundColor: Colors.BODYBACKGROUND
    },
    HeaderContainer: {
        resizeMode: 'contain',
        backgroundColor: 'white',
        height: Matrics.headerHeight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Matrics.CountScale(15),
        paddingLeft: Matrics.CountScale(15),
        paddingRight: Matrics.CountScale(15),
    },
    leftStyle: {
        justifyContent: 'center',
        flex: 0.5,
    },
    centerStyle: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    },
    rightStyle: {
        justifyContent: 'center',
        flex: 0.5
    },
    CardHeader: {
        color: 'grey', fontSize: Matrics.CountScale(13), fontFamily: Fonts.NunitoSansRegular
    },
    Card: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 3,
        padding: Matrics.CountScale(15),
        borderRightWidth: Matrics.CountScale(7),
        borderRightColor: '#f0d57e',
        marginTop: Matrics.CountScale(10),
        marginBottom: Matrics.CountScale(10),
    },
    backImgStyle: {
        height: Matrics.CountScale(20),
        width: Matrics.CountScale(10)
    },
    optionImgStyle: {
        height: Matrics.CountScale(5),
        alignSelf: 'flex-end',
        width: Matrics.CountScale(20)
    },
    CardContainer: {
        borderBottomColor: '#ccc',
        borderBottomWidth: Matrics.CountScale(1)
    },
    monthTextStyle: {
        fontSize: Matrics.CountScale(13),
        color: 'grey'
    },
    dateTextStyle: {
        fontSize: Matrics.CountScale(14)
    },
    dayTextStyle: {
        fontSize: Matrics.CountScale(13),
        color: 'grey'
    },
    timeTextStyle: {
        padding: Matrics.CountScale(3),
        fontFamily: Fonts.NunitoSansRegular
    },
    shopNameTextStyle: {
        padding: Matrics.CountScale(3),
        color: 'grey',
        fontSize: Matrics.CountScale(13),
        fontFamily: Fonts.NunitoSansRegular
    },
    swapOfferTextStyle: {
        padding: Matrics.CountScale(3),
        color: Colors.APPCOLOR,
        fontFamily: Fonts.NunitoSansRegular
    }
}
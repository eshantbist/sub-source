{/*  =============>>>>>>>>> Libraries <<<<<<<<<<============= */ }
import React from 'react'
import { View, FlatList, SectionList, TouchableOpacity, Image, Text } from 'react-native'
// import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import _ from 'lodash'
import moment from "moment";

{/*  =============>>>>>>>>> Assets <<<<<<<<<<============= */ }
import { Colors, Fonts, Matrics, Images, MasterCssEmployee } from '@Assets'
import { offerOpenedShiftRequest } from '@Redux/Actions/StoreScheduleAction';
import { LoadWheel, CustomModal } from "@Components";
import Global from '../../../GlobalFunction'

{/*  =============>>>>>>>>> Class Declaration <<<<<<<<<<============= */ }
class StoreSchedule extends React.Component {

    state = {
        selectedCard: '',
        loading: false,
        offers: [],
        userInfo: {},
        userShiftInfo: {},
        loading: false,
        msgModal: false,
        msg: '',
    }

    componentDidMount() {
        const { offers, userShiftInfo, userInfo } = this.props.navigation.state.params
        console.log(userShiftInfo)
        this.setState({ offers, userShiftInfo, userInfo })
        this.offerLength = 0
        _.forEach(offers, (res) => {
            this.offerLength = this.offerLength + res.data.length
        })
        //console.log('*****', this.props.navigation.state.params.offers)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('.........', nextProps)
        if (nextProps.storeSchedule.offerOpenedShiftSuccess && this.state.loading) {
            this.setState({ loading: false })
            let response = nextProps.storeSchedule.data
            console.log("offer....4", response)

            if (response.Status != 0) {
                this.setState({ msg: response.Message, msgModal: true })
            }
            else {
                this.setState({ msg: response.Message, msgModal: true })
            }
        }
        else if (nextProps.storeSchedule.offerOpenedShiftFailed) {
            this.setState({ loading: false, msg: Global.error_msg, msgModal: true })
        }
    }

    render() {
        let { userShiftInfo, userInfo } = this.state
        let data = [];
        return (
            <View style={Styles.pageBody}>

                {/*  =============>>>>>>>>> Header Start <<<<<<<<<<============= */}
                <View style={MasterCssEmployee.headerContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            // const setParamsAction = this.props.navigation.setParams({
                            //     params: { tabBarVisible: true },
                            //     key: 'AllStore',
                            // });
                            // this.props.navigation.dispatch(setParamsAction)
                            this.props.navigation.navigate('AllStore');
                        }}
                        style={MasterCssEmployee.headerTextContainerStyle}>
                        <Text style={MasterCssEmployee.headerLeftTextStyle}>Cancel</Text>
                    </TouchableOpacity>
                    <View style={MasterCssEmployee.centerStyle}>
                        {/* <Dropdown
                            containerStyle={{ width: 150 }}
                            pickerStyle={{ top: 105 }}
                            data={data}
                            value={'All Shops'}
                            inputContainerStyle={{ borderBottomColor: 'transparent', }}
                            overlayStyle={{ borderWidth: 2 }}
                            dropdownOffset={{ top: 32, left: 0 }}
                            // dropdownPosition={5}
                            fontSize={17}
                            itemCount={8}
                            rippleCentered={true}
                            onChangeText={(val) => {
                                console.log(val, "selected");
                            }} /> */}
                    </View>
                    <TouchableOpacity style={MasterCssEmployee.headerTextContainerStyle}
                        onPress={() => {
                            // const setParamsAction = this.props.navigation.setParams({
                            //     params: { tabBarVisible: true },
                            //     key: 'AllStore',
                            // });
                            // this.props.navigation.dispatch(setParamsAction)
                            //this.props.navigation.navigate('AllStore');
                            console.log(this.state.selectedCard)

                            if (this.state.selectedCard == '') {
                                this.setState({ msgModal: true, msg: 'Please select offer from available offer' })
                            }
                            else {
                                console.log('***', this.state.userShiftInfo)
                                //console.log(moment(this.state.selectedCard.InDateTime).format('DD/MM/YYYY'))
                                this.setState({ loading: true })
                                this.props.offerOpenedShiftRequest({
                                    OfferedShiftScheduleID: this.state.selectedCard.DailyScheduleID,
                                    RequestedShiftScheduleID: this.state.userShiftInfo.DailyScheduleID,
                                    OfferedScheduleDate: moment(this.state.selectedCard.InDateTime).format('DD/MM/YYYY'),
                                    RequestedScheduleDate: moment(this.state.userShiftInfo.InDateTime).format('DD/MM/YYYY'),
                                })
                            }
                        }}
                    >
                        <Text style={MasterCssEmployee.headerRightTextStyle}>Offer</Text>
                    </TouchableOpacity>
                </View>

                {/*  =============>>>>>>>>> User Details Content <<<<<<<<<<============= */}
                <View>

                    <View style={Styles.swapOfferCard}>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Image style={{ margin: Matrics.CountScale(10), alignSelf: 'center', borderRadius: 18, height: 35, width: 35 }} source={{ uri: userInfo.ProfilePicture }} ></Image>
                            </View>
                            <View style={{ flex: 1, paddingTop: Matrics.CountScale(10) }}>

                                <Text style={{ flex: 1, justifyContent: 'center', fontSize: Matrics.CountScale(16), fontFamily: Fonts.NunitoSansSemiRegular, fontWeight: '300', lineHeight: 20 }}>
                                    {userInfo.FirstName}
                                </Text>

                                <Text style={{ flex: 1, justifyContent: 'center', color: 'grey', fontSize: Matrics.CountScale(14), fontFamily: Fonts.NunitoSansRegular }}>Shop #133A23</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: Matrics.CountScale(10) }}>
                            <Image style={{ height: 15, width: 13, alignItems: 'center', marginLeft: 15, marginRight: 15 }} source={Images.StoreGrey}></Image>
                            <Text style={{ flex: 1, fontSize: Matrics.CountScale(13), fontWeight: '200', fontFamily: Fonts.NunitoSansSemiRegular }}>
                                {`${moment(userShiftInfo.InDateTime).format('MMM DD, ddd')}  ${Global.getTime24to12(this.props.navigation.state.params.userShiftInfo.InTime)} - ${Global.getTime24to12(this.props.navigation.state.params.userShiftInfo.OutTime)}`}
                            </Text>
                        </View>
                    </View >

                </View>

                {/*  =============>>>>>>>>> Header End <<<<<<<<<<============= */}

                <View style={{ margin: Matrics.CountScale(10) }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: Colors.GREY }}>You have <Text style={{ color: Colors.APPCOLOR }}>{this.offerLength}</Text> shift, available to offer:</Text>
                    </View>
                    {/* <View>
                        <Text style={{ color: Colors.GREY, fontSize: Matrics.CountScale(13) }}>
                            March
                    </Text>
                    </View> */}
                    {/* <FlatList
                        data={this.state.offers}
                        renderItem={this.renderAvailableOffers}
                    /> */}
                    <SectionList
                        ListEmptyComponent={() => <View>
                            <Text style={Styles.errMsgStyle}>No data found!</Text>
                        </View>}
                        //refreshing={this.state.refreshing}
                        //onRefresh={this.pullToRefresh}
                        renderItem={this.renderAvailableOffers}
                        renderSectionHeader={this.renderHeader}
                        sections={this.state.offers}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                {/* <ScrollView>
                    {this.renderPageContainer()}
                </ScrollView> */}

                <LoadWheel visible={this.state.loading} />
                <CustomModal visible={this.state.msgModal} title={this.state.msg}
                    ButtonText={'OK'} onPress={() => this.setState({ msgModal: false })} />
            </View >
        );
    }

    renderHeader = ({ section: { title } }) => (
        <Text style={Styles.monthTextStyle} >
            {title}
        </Text>
    )

    renderAvailableOffers = ({ item }) => {
        console.log("*******item", item)

        //ShopName = '12'
        return (
            <TouchableOpacity style={[this.state.selectedCard == item ? Styles.activeDayCard : Styles.dayCard]}
                onPress={() => {
                    this.setState({ selectedCard: item })
                }}
            >
                <View style={{ paddingBottom: Matrics.CountScale(15), paddingTop: Matrics.CountScale(15), flex: 0.2, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'column' }}>
                    <Text style={[{ color: 'grey', paddingBottom: Matrics.CountScale(5), fontSize: Matrics.CountScale(14), fontFamily: Fonts.NunitoSansRegular }, this.state.selectedCard == item ? { color: Colors.WHITE } : { color: Colors.GREY }]}>
                        {`${Global.getDayValue(item.InDateTime)}`}
                    </Text>
                    <View style={[this.state.selectedCard == item ? {} : { backgroundColor: 'white', borderRadius: Matrics.CountScale(15), }]}>
                        <Text style={[{ padding: Matrics.CountScale(5) }, this.state.selectedCard == item ? { color: Colors.WHITE } : { color: Colors.BLACK }]}>
                            {`${Global.getDateFromDate(item.InDateTime)}`}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1, paddingBottom: Matrics.CountScale(20), paddingTop: Matrics.CountScale(20), flexDirection: 'column' }}>
                    <Text style={[this.state.selectedCard == item ? { color: Colors.WHITE } : { color: Colors.BLACK }]}>
                        {`${Global.getTime24to12(item.InTime)} - ${Global.getTime24to12(item.OutTime)}`}
                    </Text>
                    <Text style={[{ color: 'grey', fontSize: Matrics.CountScale(15), paddingTop: Matrics.CountScale(10), fontFamily: Fonts.NunitoSansRegular }, this.state.selectedCard == item ? { color: Colors.WHITE } : { color: 'grey' }]}>
                        Shop {'#123'}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }


}

{/*  =============>>>>>>>>> StyleSheet <<<<<<<<<<============= */ }
const Styles = {
    pageBody: {
        flex: 1,
        backgroundColor: Colors.BODYBACKGROUND
    },
    swapOfferCard: {

        borderRadius: Matrics.CountScale(3),
        padding: Matrics.CountScale(10),
        backgroundColor: 'white',

    },
    HeaderContainer: {
        resizeMode: 'contain',
        backgroundColor: 'white',
        height: Matrics.headerHeight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Matrics.CountScale(25),
        paddingLeft: Matrics.CountScale(15),
        paddingRight: Matrics.CountScale(15)
    },
    leftStyle: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 0.5,
    },
    centerStyle: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    },
    rightStyle: {
        // backgroundColor:'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 0.5
    },
    dayCard: {
        backgroundColor: 'white',
        borderRadius: Matrics.CountScale(3),
        flexDirection: 'row',
        marginTop: Matrics.CountScale(5),
        marginBottom: Matrics.CountScale(5),
    },
    activeDayCard: {
        backgroundColor: Colors.ACTIVESTORE,
        borderRadius: Matrics.CountScale(3),
        flexDirection: 'row',
        marginTop: Matrics.CountScale(5),
        marginBottom: Matrics.CountScale(5),
    },
    errMsgStyle: {
        fontFamily: Fonts.NunitoSansRegular,
        textAlign: 'center',
        fontSize: Matrics.CountScale(16),
        color: 'grey',
        margin: Matrics.CountScale(10),
    },
    monthTextStyle: {
        color: 'grey',
        backgroundColor: Colors.BODYBACKGROUND,
        fontSize: Matrics.CountScale(15),
        padding: Matrics.CountScale(5),
        fontFamily: Fonts.NunitoSansSemiBold
    },
}

const mapStateToProps = (state) => {
    return {
        storeSchedule: state.StoreSchedule,
    };
}
//======>>>>>>>> Redux Connection <<<<<<=======  
export default connect(mapStateToProps, {
    offerOpenedShiftRequest,
})(StoreSchedule);
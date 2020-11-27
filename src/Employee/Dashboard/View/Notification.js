{/* ====>>>>>>>>>>> Libraries <<<<<<<<<<==========>  */ }
import React from 'react';
import { View, ScrollView, BackHandler, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import moment from "moment";

{/* ====>>>>>>>>>>> Assets <<<<<<<<<<==========>  */ }
import { Colors, Fonts, Matrics, Images } from '@Assets'
import Header from './Templetes/Header';
import NotificationCard from './Templetes/NotificationCard';
import {
    getNotificationListDetails
} from '@Redux/Actions/DashboardEmployeeActions'
import { LoadWheel, LoadMore, CustomModal } from "@Components";
import Global from '../../../GlobalFunction'

{/* ====>>>>>>>>>>> Class Declaration <<<<<<<<<<==========>  */ }
class Notification extends React.Component {

    state = {
        loading: true,
        msgModal: false,
        msg: '',
        notifications: [],
        notificationTotal: 0,
        loadmore: false,
        pageSize: 10,
        pageNo: 1,
    }

    callGetNotifications() {
        console.log('api call-->', this.state.pageNo)
        this.props.getNotificationListDetails({
            MessageType: 4,
            IsInbox: true, PageSize: this.state.pageSize, PageNo: this.state.pageNo
        })
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.callGetNotifications()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.data.getNotificationDetailsSuccess) {
            this.setState({ loading: false, loadmore: false })

            let response = nextProps.data.notificationDetailsdata
            console.log('response-->',response)
            console.log(response)
            if (response.Status == 1) {
                this.setState({ notificationTotal: response.Data.TotalRecords, notifications: [...this.state.notifications, ...response.Data.Messages] })
                console.log(response.Data)
            }
            else {
                this.setState({ loading: false, loadmore: false, msg: response.Message, msgModal: true })
            }
        }
        else if (nextProps.data.getNotificationDetailsFail && this.state.loading) {
            this.setState({ loading: false, msg: Global.error_msg, msgModal: true, loadmore: false })
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    async loadMoreNotification() {
        if(!this.state.loading && !this.state.loadmore && this.state.notificationTotal > this.state.notifications.length && this.state.notifications.length > 0){
            await this.setState({ loadmore: true, pageNo: this.state.pageNo + 1 })
            this.callGetNotifications();
        }
    }

    handleBackPress = () => {
        global.tabHide = false
        console.log(this.props)
        this.props.navigation.navigate('EmployeeDashboard', { changeData: true });
        // BackHandler.exitApp();
        return true;
    }

    renderNotifications = ({ item, index}) => {
        return (
            <NotificationCard
                root={'NotificationDetail'}
                navigation={this.props.navigation}
                imgSrc={item.ProfilePicture}
                text={item.MessageSubject}
                time={moment.parseZone(item.MessageDate).format('DD MMMM, hh:mm a')}
                isRead={item.IsRead}
            />
        )
    }

    render() {
        console.log('len-->', this.state.notifications.length)
        console.log('notificationTotal-->', this.state.notificationTotal)
        console.log('loadmore-->', this.state.loadmore )
        return (
            <View style={Styles.pageBody}>
                <Header titleText={'Notification'} navigation={this.props.navigation}></Header>
                {/* {this.renderNotificationCards()} */}
                <FlatList
                    ListEmptyComponent={() => !this.state.loading &&
                        <View>
                            <Text style={Styles.errMsgStyle}>No data found!</Text>
                        </View>}
                    data={this.state.notifications}
                    renderItem={this.renderNotifications}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={Platform.OS == "android" ? 1 : 0}
                    // onEndReachedThreshold={0.5}
                    onEndReached={() => this.loadMoreNotification()}
                    extraData={this.state.notifications}
                    // onEndReached={() => 
                    //     this.state.notifications.length > 0 && 
                    //     this.state.notifications.length != this.state.notificationTotal && !this.state.loadmore 
                    //     ? this.loadMoreNotification() : null}
                />
                {this.state.loadmore ?
                    <LoadMore />
                    : null}
                <LoadWheel visible={this.state.loading} />
                <CustomModal visible={this.state.msgModal} title={this.state.msg}
                    ButtonText={'OK'} onPress={() => this.setState({ msgModal: false })} />
            </View>
        );
    }

    //  ====>>>>>>>>>>> Render Class for Notification Card <<<<<<<<<<==========
    renderNotificationCards() {
        return (
            <ScrollView>
                <NotificationCard root={'NotificationDetail'} navigation={this.props.navigation} text={'approve your day off request'} name={'Cameron Peters'} ></NotificationCard>
                <NotificationCard root={'SwapOfferDetails'} navigation={this.props.navigation} text={'approve swap request between you and'} name={'Justin Collins'} name2={'Sarah Conner'}></NotificationCard>
                <NotificationCard root={'SwapOfferDetails'} navigation={this.props.navigation} text={'offer you a shift to switch'} button={true} name={'Martha  Brayan'}></NotificationCard>
                <NotificationCard root={'NotificationDetail'} navigation={this.props.navigation} text={'approve your day off request'} name={'Bradley neal'}></NotificationCard>
            </ScrollView>
        );
    }
}


{/* ====>>>>>>>>>>> Stylesheet <<<<<<<<<<==========>  */ }
const Styles = {
    pageBody: {
        flex: 1, backgroundColor: Colors.BODYBACKGROUND
    },
    errMsgStyle: {
        fontFamily: Fonts.NunitoSansRegular,
        textAlign: 'center',
        fontSize: Matrics.CountScale(16),
        color: 'grey',
        margin: Matrics.CountScale(10),
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.DashboardEmployee,
    };
}

export default connect(mapStateToProps, {
    getNotificationListDetails
})(Notification);
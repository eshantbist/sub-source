{/* ====>>>>>>>>>>> Libraries <<<<<<<<<<==========>  */ }
import React from 'react';
import { View, ScrollView, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import moment from "moment";

{/* ====>>>>>>>>>>> Assets <<<<<<<<<<==========>  */ }
import { Colors, Fonts, Matrics, Images } from '@Assets'
import Header from './Templetes/Header';
import { LoadWheel, LoadMore } from "@Components";
import {
    getEmployeeGuestFeedback
} from '@Redux/Actions/DashboardEmployeeActions'


{/* ====>>>>>>>>>>> Class Declaration <<<<<<<<<<==========>  */ }

class FeedbackHistory extends React.Component {
    state = {
        loading: true,
        feedBackType: '1',
        pageSize: '10',
        pageNo: 1,
        historyData: [],
        feedbackTotal: 0,
        loadmore: false,
        alldata: false
    }

    callGetEmployeeGuestFeedback() {
        this.props.getEmployeeGuestFeedback({
            FeedBackType: this.state.feedBackType,
            PageSize: this.state.pageSize, PageNo: this.state.pageNo.toString()
        })
    }

    componentDidMount() {
        this.callGetEmployeeGuestFeedback()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.employeeGuestFeedbackSuccess) {
            let data = nextProps.data.employeeGuestFeedbackdata
            //historyData:[...this.state.historyData, ...data.FeedBack]
            console.log('data-->hs-->', data)
            if(data.Status === 1){
                if (data.Data.FeedBack.length == 0) {
                    this.setState({ alldata: true, loadmore: false, loading: false })
                }
                else {
                    this.setState({ feedbackTotal: data.Data.TotalRecords, historyData: [...this.state.historyData, ...data.Data.FeedBack], loading: false, loadmore: false })
                }
            } else {
                this.setState({ alldata: true, loadmore: false, loading: false })
            }
            console.log(this.state.historyData)
        }
        else if (nextProps.data.employeeGuestFeedbackFail) {
            this.setState({ loading: false })
            setTimeout(() => { alert(Global.error_msg) }, Global.alert_timeout)
        }
    }

    renderFeedbackHistory = ({ item }) => {
        return (
            <FeedbackHistoryCard
                date={`${moment.parseZone(item.FeedbackDate).format('MMM DD, ddd [at] hh:mma')}  •  Shop #${item.StoreNumber}`}
                text={item.Feedback}
            />
        )
    }

    loadMoreHistoryFeedback() {
        this.setState({ loadmore: true })
        this.setState({
            pageNo: this.state.pageNo + 1,
        }, () => {
            this.callGetEmployeeGuestFeedback();
        });
    }

    render() {
        return (
            <View style={Styles.pageBody}>
                <Header titleText={'Feedback History'} navigation={this.props.navigation}></Header>
                <FlatList
                    data={this.state.historyData}
                    renderItem={this.renderFeedbackHistory}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => this.state.historyData.length > 0 && this.state.historyData.length != this.state.feedbackTotal && !this.state.alldata ? this.loadMoreHistoryFeedback() : null}
                    ListEmptyComponent={() => <Text style={{ marginTop: Matrics.CountScale(20), textAlign: 'center', fontSize: Matrics.CountScale(16), fontFamily:  Fonts.NunitoSansRegular }}>No Data Found!</Text>}
                />

                {this.state.loadmore ?
                    <LoadMore />
                    : null}


                <LoadWheel visible={this.state.loading} />
            </View >
        );
    }
}

{/* ====>>>>>>>>>>> Feedback Card Component <<<<<<<<<<==========>  */ }
class FeedbackHistoryCard extends React.Component {
    render() {
        return (
            <View style={Styles.feedbackCard}>
                <Text style={Styles.dateStyle} >
                    {this.props.date}
                    {/* Mar, 12 Fri at 12:30pm ~ #1334 */}
                </Text>
                <Text style={Styles.msgText} >
                    {this.props.text}</Text>
            </View>
        );
    }
}


{/* ====>>>>>>>>>>> Stylesheet for Both Component <<<<<<<<<<==========>  */ }
const Styles = {
    pageBody: {
        flex: 1,
        backgroundColor: Colors.BODYBACKGROUND
    },
    feedbackCard: {
        margin: Matrics.CountScale(8),
        marginTop: Matrics.CountScale(12),
        marginBottom: 0,
        borderRadius: Matrics.CountScale(3),
        padding: Matrics.CountScale(10),
        backgroundColor: 'white',
    },
    dateStyle: {
        flex: 1,
        color: 'grey',
        padding: Matrics.CountScale(5),
        fontSize: Matrics.CountScale(14),
        fontFamily: Fonts.NunitoSansRegular
    },
    msgText: {
        flex: 1,
        fontSize: Matrics.CountScale(17),
        padding: Matrics.CountScale(5),
        color: Colors.BLACK,
        fontFamily: Fonts.NunitoSansRegular,
        // fontWeight: '300',
        lineHeight: Matrics.CountScale(20)
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.DashboardEmployee,
    };
}

export default connect(mapStateToProps, {
    getEmployeeGuestFeedback,
})(FeedbackHistory);
// =======>>>>>>>>  Libraries   <<<<<<<<<<<=========
import React from 'react';
import { View, BackAndroid, Platform, Dimensions, TouchableOpacity, Modal, ScrollView, TouchableWithoutFeedback, Image, Text, RefreshControl } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import moment from 'moment'
import {Picker} from '@react-native-community/picker';

{/* ====>>>>>>>>>>>    Assets   <<<<<<<<<<========== */ }
import { Colors, Fonts, Matrics, Images } from '@Assets';
import { LoadWheel, CustomModal } from "@Components";
import DashboardHeader from './Templetes/Header';
import Header from '../../../Components/Common/Header';
import { getDashBoardDataRequest, getUserRoleRequest, getFinancialReportRequest, getSalesBuildingReportRequest, getCustomerCommentsCountRequest } from '@Redux/Actions/DashboardActions'
import { getHeaderFilterValuesRequest } from '@Redux/Actions/HirePacketsActions';
import Global from '../../../GlobalFunction';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CalendarPicker from '../../../CustomComponent/react-native-calendar-picker';

const { width } = Dimensions.get('window');

let NOD = ['20', '21', '22', '23', '24', '25']
let status = ['All status', 'Pending', 'Approved', 'Completed']

export const InfoViewContainer = ({ labelText, imgSrc, contentText, bgColor }) => {
    return (
        <View style={[Styles.infoContainer, { backgroundColor: bgColor }]}>
            <Text style={Styles.mainContainerLabel}>{labelText}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={imgSrc} />
                <Text style={Styles.mainContainerContent}>{contentText}</Text>
            </View>
        </View>
    )
}

export const OperationOverViewContainer = ({ labelText, imgSrc, onPress, textValue, fontStyle, contentStyle, children }) => {
    return (
        <TouchableOpacity 
            style={Styles.OperationOVContainer} 
            disabled={labelText === 'Employees Needed' ? false : true}
            onPress={() => onPress()}
        >
            <Image source={imgSrc} style={{ margin: Matrics.CountScale(7) }} />

            <View style={{ marginLeft: Matrics.CountScale(5), flex: 1 }}>
                {children ? children :
                    <Text style={[Styles.labelValueStyle, fontStyle]}>{textValue}</Text>}

                <Text style={[Styles.labelText, contentStyle]}>{labelText}</Text>

            </View>
        </TouchableOpacity>
    )
}

export const HRTextContent = ({ labelText, textValue, bulletColor }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: Matrics.CountScale(10) }}>
            <View style={{ height: Matrics.CountScale(10), width: Matrics.CountScale(10), borderRadius: 8, backgroundColor: bulletColor }}></View>
            <Text style={[Styles.HRTextStyle, { flex: 1 }]}>{labelText}</Text>
            <Text style={Styles.HRTextStyle}>{textValue}</Text>
        </View>
    )
}

let self;

{/* ====>>>>>>>>>>>    Class Declaration   <<<<<<<<<<========== */ }
class Dashboard extends React.Component {
    state = {
        entries: [
            {
                title: 'Main',
            },
            {
                title: 'Human Resource',
            },
            // {
            //     title: 'White Pocket Sunset',
            //     subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
            //     illustration: 'https://i.imgur.com/MABUbpDl.jpg'
            // },
        ],
        filterModal: false,
        selectedRoleId: 0,
        selectedUsers: 0,
        selectedStores: -1,
        isDateTimePickerVisible: false,
        selectedNOD: '',
        selectedStatus: '',
        activeSlide: 0,
        activeCommentSlide: 0,
        loading: true,
        userRole: [],
        Users: [],
        Stores: [],
        msgModal: false,
        msg: '',
        customerComments: [],
        customerCommentsMonth: [],
        customerCommentsQTD: [],
        customerCommentsYTD: [],
        cmComments: 0,
        qtdComments: 0,
        ytdComments: 0,
        activePage: 1,
        scrollEnabled: true,
        current: 0,
        total: 0,
        employeeNeed: 0,
        NPSDisplay: 'Month',
        weekEndDateError: '',
        WeekEndingDate: '',
        currentWeekEndDate: '',
        lastFilterselectedRoleId: 0,
        lastFilterselectedStores: -1,
        refreshing: false,
        selectedRoleName: '',
        lastFilterselectedUserId: 0,
    }
    // ======>>>>>>> Life Cycle Methods  <<<<<<<========
    async UNSAFE_componentWillMount() {
        self = this
        this.roleFlag = false;
        this.dashboardDataFlag = false;
        // this.financialReportFlag = false;
        // this.salesbuildingReportFlag = false;
        // this.customerCommentsCount = false;

        // const currentDate = moment().format("MM/DD/YYYY");
        let WeekEndingDate =  moment().format("MM/DD/YYYY");
        console.log('weekending date-->', WeekEndingDate);
        // if(moment(currentDate).format('dddd') === 'Tuesday'){
        //     WeekEndingDate = currentDate;
        // } else if(moment(currentDate).format('dddd') === 'Monday'){
        //     WeekEndingDate = moment(currentDate).add(0,'weeks').isoWeekday(2).format("MM/DD/YYYY")
        // } else {
        //     WeekEndingDate = moment(currentDate).add(1,'weeks').isoWeekday(2).format("MM/DD/YYYY")
        // }
        // console.log('currentDate-->', currentDate) ;
        // console.log('currentDate-->', moment(currentDate).add(0,'weeks').isoWeekday(2).format("MM/DD/YYYY")) ;
        // console.log('currentDate-->', moment(currentDate).format('dddd')) ;
        

        
        // this.setState({ WeekEndingDate: '11/20/2018'});
        await this.setState({ WeekEndingDate, currentWeekEndDate: WeekEndingDate, lastFilterWeekEndingDate: WeekEndingDate });
        global.selectedStore = this.state.selectedStores;
        global.WeekendDate = WeekEndingDate;
        // console.log('WeekEndingDate-->', this.state.WeekEndingDate) ;
        // console.log('WeekEndingDate-->', this.state.selectedRoleId) ;
        // console.log('WeekEndingDate-->', this.state.selectedStores) ;
        // this.props.getUserRoleRequest({ UserTypeID: '9253' })
        this.props.getHeaderFilterValuesRequest({ StoreId: -1, RoleId: 0, FilterId: -1, BusinessTypeId: 1 });
        this.props.getDashBoardDataRequest({
            RoleId: this.state.selectedRoleId,//this.state.selectedRoleId, 0
            StoreId: this.state.selectedStores,//this.state.StoreID, -1
            FilterId: -1,
            BusinessTypeId: 1,
            WeekEnding: this.state.WeekEndingDate // this.state.weekEnding
        })
        // this.props.getFinancialReportRequest({
        //     RoleId: this.state.selectedRoleId,
        //     FilterId: -1, StoreId: global.loginResponse.StoreID, RangeId: 1,
        //     BusinessTypeId: 1, WeekEnding: '11/22/2016', Quarter: '1',
        //     Year: 0, FromWeekEnding: '11/22/2016',
        //     ToWeekEnding: '11/22/2016'
        // })
        // this.props.getSalesBuildingReportRequest({
        //     RoleId: this.state.selectedRoleId,
        //     FilterId: -1, StoreId: global.loginResponse.StoreID, RangeId: 1,
        //     BusinessTypeId: 1, WeekEnding: '11/22/2016', Quarter: '1',
        //     Year: 0, FromWeekEnding: '11/22/2016',
        //     ToWeekEnding: '11/22/2016'
        // })
        // this.props.getCustomerCommentsCountRequest({
        //     RoleId: this.state.selectedRoleId,
        //     StoreId: global.loginResponse.StoreID,
        //     FilterId: -1,
        //     BusinessTypeId: 1,
        //     WeekEnding: '11/22/2016'
        // })

        console.log(global.loginResponse)
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', this.state.loading);
        console.log('componentWillReceiveProps', nextProps.response.getDashboardDataSuccess);
        // console.log('componentWillReceiveProps', nextProps.headerFiltervalues.getHeaderFilterValuesSuccess);
       
        if (nextProps.headerFiltervalues.getHeaderFilterValuesSuccess && this.state.loading && !this.roleFlag) {
            this.roleFlag = true
            if (this.dashboardDataFlag && this.roleFlag)
                this.setState({ loading: false })

            let data = nextProps.headerFiltervalues.data;
            console.log('filterdata-->', data);
            if(data.Status == 1)
            {
                const storeselect = {
                    StoreID: -1,
                    StoreNumber: 'Select Store'
                }
                const roleSelect = {
                    RoleID: 0,
                    RoleName: 'shops'
                }
                if(data.Report.user_list.length > 0){
                    const userSelect = {
                        UserID: 0,
                        // UserName: 'Select User'
                        UserName: `Select ${this.state.selectedRoleName} User`
                    }
                    data.Report.user_list.unshift(userSelect);
                }
                data.Report.store_list.unshift(storeselect);
                data.Report.role_list.unshift(roleSelect);
                // data.Report.user_list.unshift(userSelect);
                // console.log("StoreList", data.Report.store_list);
                // console.log("RoleList",  data.Report.role_list);
                // console.log("UserList-->",  data.Report.user_list);
                await this.setState({ userRole: data.Report.role_list, Users: data.Report.user_list, Stores: data.Report.store_list })
            }
            // console.log(data)
        }
        if (nextProps.response.getDashboardDataSuccess && (this.state.loading || this.state.refreshing)) {
            this.dashboardDataFlag = true

            if (this.dashboardDataFlag && this.roleFlag)
                this.setState({ loading: false, refreshing: false })
            let data = nextProps.response.data // this.setState({ userRole: data.UserRoleList })
            // console.log('Data***', JSON.stringify(data));
            if (data.Status == 1) {
                let keyFinancialData = data.Data._keyFinacialObj;
                let salesBuilding = data.Data._saleBuildingList ? data.Data._saleBuildingList[0] : [];
                let customerServices = data.Data._customerServiceObj ? data.Data._customerServiceObj : [];
                let humanResource = data.Data._humanResourceObj ? data.Data._humanResourceObj : [];
                let operationOverview = data.Data._complianeOverviewObj ? data.Data._complianeOverviewObj : [];
                let customerComments = data.Data._customerCommentsList ? data.Data._customerCommentsList : [];
                let total =  humanResource ? parseFloat(humanResource.ActiveEmployee * 4) : 0;
                let current = operationOverview ? parseFloat(operationOverview.UosAvgValue) : 0;
                let showCurrent = (current > total) ? total : current;
                // let empNeed =  keyFinancialData ? Math.abs(Math.ceil((keyFinancialData.Sales / 1000)-humanResource.ActiveEmployee)) : 0 ;
                let empNeed =  keyFinancialData ? Math.abs(Math.ceil((keyFinancialData.SixWeekSales / 1000))) : 0 ;
                // let progressPercentage =  humanResource ? (humanResource.ActiveEmployee * 100) / (humanResource.ActiveEmployee + humanResource.RequiredMore) : 0; 
                // let progressPercentage =  humanResource ? Math.round((humanResource.ActiveEmployee-empNeed * 100) / (empNeed)) : 0; 
                let progressPercentage =  humanResource ? Math.round(100-(empNeed/humanResource.ActiveEmployee)*100) : 0; 
                await this.setState({
                    //             salesPercentage: regionReport.SaleVariance,
                    nonSubSales: salesBuilding ? salesBuilding.TotalNonSubSales : 0,
                    totalSales: keyFinancialData ? keyFinancialData.Sales : 0,
                    labourPercentage: keyFinancialData ? keyFinancialData.LaborCostPerc : 0,
                    productivityPercentage: keyFinancialData ? keyFinancialData.Productivity : 0,
                    foodCostPercentage: keyFinancialData ? keyFinancialData.FoodCostPer : 0,
                    overTimePercentage: keyFinancialData ? keyFinancialData.OTDThours : 0,
                    breakViolationPercentage: keyFinancialData ? keyFinancialData.BreakViolation : 0,
                    customerServices: customerServices,
                    humanResource: humanResource,
                    operationOverview: operationOverview,
                    customerComments: customerComments,
                    current: showCurrent,
                    total: total,
                    employeeNeed: empNeed,
                    progressPercentage
                });
                if(customerComments.length > 0) {
                    this.filterCustomerComments();
                }
            }
        }
        // else if (nextProps.response.getFinancialReportSuccess && this.state.loading) {
        //     this.financialReportFlag = true

        //     if (this.financialReportFlag && this.roleFlag && this.salesbuildingReportFlag && this.customerCommentsCount)
        //         this.setState({ loading: false })

        //     let data = nextProps.response.data

        //     if (data.Status == 1) {
        //         let regionReport = data.Report.RegionReport[0].RegionView
        //         console.log(regionReport)
        //         this.setState({
        //             salesPercentage: regionReport.SaleVariance,
        //             totalSales: this.kFormatter(regionReport.Sales),
        //             labourPercentage: regionReport.LaborCostPerc,
        //             productivityPercentage: regionReport.Productivity,
        //             foodCostPercentage: regionReport.FoodCostPer,
        //             overTimePercentage: regionReport.OTDThours,
        //             breakViolationPercentage: regionReport.SaleVariance,
        //         })
        //     }
        //     else {
        //         this.setState({ loading: false, msg: data.Message, msgModal: true })
        //     }

        // }
        // else if (nextProps.response.getSalesBuildingReportSuccess && this.state.loading) {
        //     this.salesbuildingReportFlag = true

        //     if (this.financialReportFlag && this.roleFlag && this.salesbuildingReportFlag && this.customerCommentsCount)
        //         this.setState({ loading: false })

        //     let data = nextProps.response.data

        //     if (data.Status == 1) {
        //         console.log(data)
        //         // let regionReport = data.Report.RegionReport[0].RegionView
        //         // console.log(regionReport)
        //     }
        //     else {
        //         this.setState({ loading: false, msg: data.Message, msgModal: true })
        //     }

        // }
        // else if (nextProps.response.getCustomerCommentsCountSuccess && this.state.loading) {
        //     this.customerCommentsCount = true;
        //     console.log("=====>>>")

        //     if (this.financialReportFlag && this.roleFlag && this.salesbuildingReportFlag && this.customerCommentsCount)
        //         this.setState({ loading: false })

        //     let data = nextProps.response.data
        //     console.log(data)
        //     this.setState({ cmComments: data.Count.CurrentMonthCount, qtdComments: data.Count.QuarterMonthCount, ytdComments: data.Count.CurrentYearCount })
        // }
        else if (nextProps.response.isRequestFailed) {
            console.log('error')
            this.setState({ loading: false, msg: Global.error_msg, msgModal: true })
        } 

    }

    filterCustomerComments() {
        const WeekEndingDateArr = this.state.WeekEndingDate.split('/');
        let CurrentMonth = WeekEndingDateArr[0];
        let QuaterMonthArr = [];
        // console.log('filter comment-->', WeekEndingDateArr);
        console.log('filter comment-->', CurrentMonth);
        // console.log('filter commentList-->', this.state.customerComments);
        // console.log('filter commentList-->',JSON.stringify(this.state.customerComments));
        // let QuaterMonthdate1 = moment(this.state.WeekEndingDate).subtract(1, 'months').format('MM/DD/YYYY').split('/');
        // let QuaterMonthdate2 = moment(this.state.WeekEndingDate).subtract(2, 'months').format('MM/DD/YYYY').split('/');
        // let QuaterMonthdate3 = moment(this.state.WeekEndingDate).subtract(3, 'months').format('MM/DD/YYYY').split('/');
        // let QuarterMonth1 = QuaterMonthdate1[0];
        // let QuarterMonth2 = QuaterMonthdate2[0];
        // let QuarterMonth3 = QuaterMonthdate3[0];
        // console.log('in filter-->QuaterMonth1-->', QuarterMonth1);
        // console.log('in filter-->QuaterMonth2-->', QuarterMonth2);
        // console.log('in filter-->QuaterMonth3-->', QuarterMonth3);

        console.log('in filter-->CurrentMonth-->', CurrentMonth);
        // if(CurrentMonth == 1 || CurrentMonth == 2 || CurrentMonth == 3 || CurrentMonth == 4) {
        //     QuaterMonthArr = ['01','02','03','04'];
        // } else if (CurrentMonth == 5 || CurrentMonth == 6 || CurrentMonth == 7 || CurrentMonth == 8) {
        //     QuaterMonthArr = ['05','06','07','08'];
        // } else if(CurrentMonth == 9 || CurrentMonth == 10|| CurrentMonth == 11 || CurrentMonth == 12) {
        //     QuaterMonthArr = ['09','10','11','12'];
        // }
        QuaterMonthArr = Global.getQuaterMonth(CurrentMonth);
        console.log('QuaterMonthArr-->', QuaterMonthArr);

        let QuaterMonthfinalArr = QuaterMonthArr.filter(e => e != CurrentMonth);
        let customerCommentsMonth = [];
        let customerCommentsQTD = [];
        let customerCommentsYTD = this.state.customerComments;

        console.log('QuaterMonthfinalArr-->', QuaterMonthfinalArr);
        customerCommentsMonth = this.state.customerComments.filter((e) => {
            const date = e.VisitTimeStamp.split('T');
            return (date[0].split('-')[1] == CurrentMonth)
        });

        customerCommentsQTD = this.state.customerComments.filter(e => 
            e.VisitTimeStamp.split('T')[0].split('-')[1] == QuaterMonthfinalArr[0] ||
            e.VisitTimeStamp.split('T')[0].split('-')[1] == QuaterMonthfinalArr[1] ||
            e.VisitTimeStamp.split('T')[0].split('-')[1] == QuaterMonthfinalArr[2]
        );

        for(let i=0; i < customerCommentsYTD.length; i++ ){
            for(let j=0; j < customerCommentsMonth.length; j++){
                if(customerCommentsYTD[i].CommentID === customerCommentsMonth[j].CommentID){
                    customerCommentsYTD.splice(i,1);
                 }
            }
        }

        for(let i=0; i < customerCommentsYTD.length; i++ ){
            for(let j=0; j < customerCommentsQTD.length; j++){
                if(customerCommentsYTD[i].CommentID === customerCommentsQTD[j].CommentID){
                    customerCommentsYTD.splice(i,1);
                 }
            }
        }
        // console.log('in filter-->month-->',customerCommentsMonth);
        // console.log('in filter-->qtd-->',customerCommentsQTD);
        // console.log('in filter-->ytd-->',customerCommentsYTD);

        var sortBy = (function () {
            var toString = Object.prototype.toString,
                // default parser function
                parse = function (x) { return x; },
                // gets the item to be sorted
                getItem = function (x) {
                  var isObject = x != null && typeof x === "object";
                  var isProp = isObject && this.prop in x;
                  return this.parser(isProp ? x[this.prop] : x);
                };
            return function sortby (array, cfg) {
              if (!(array instanceof Array && array.length)) return [];
              if (toString.call(cfg) !== "[object Object]") cfg = {};
              if (typeof cfg.parser !== "function") cfg.parser = parse;
              cfg.desc = !!cfg.desc ? -1 : 1;
              return array.sort(function (a, b) {
                a = getItem.call(cfg, a);
                b = getItem.call(cfg, b);
                return cfg.desc * (a < b ? -1 : +(a > b));
              });
            };
        }());
        const sortedCommentsMonth = sortBy(customerCommentsMonth, {
            prop: "VisitTimeStamp",
            desc: true,
            parser: function(item) { return new Date(item); }
        });
        const sortedCommentsQTD = sortBy(customerCommentsQTD, {
            prop: "VisitTimeStamp",
            desc: true,
            parser: function(item) { return new Date(item); }
        });
        const sortedCommentsYTD = sortBy(customerCommentsYTD, {
            prop: "VisitTimeStamp",
            desc: true,
            parser: function(item) { return new Date(item); }
        });
        // console.log('in filter-->month-->',sortedCommentsMonth);
        // console.log('in filter-->qtd-->',sortedCommentsQTD);
        // console.log('in filter-->ytd-->',sortedCommentsYTD);
        this.setState({ 
            customerCommentsMonth : sortedCommentsMonth, 
            customerCommentsQTD : sortedCommentsQTD, 
            customerCommentsYTD : sortedCommentsYTD
        });

        // this.state.customerComments.forEach(child => {
        //     console.log('in filter-->child-->',child.VisitTimeStamp );
        // });
    }
    kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    _handleDatePicked = (date) => {
        // console.log('weekdate-->', date);
        // console.log('weekdate-->', moment(date).format('dddd'));
        // console.log('A date has been picked: ', moment(date).format('MMM DD, ddd'));
        this.setState({ WeekEndingDate: moment(date).format('MM/DD/YYYY'), weekEndDateError: '' });
        global.WeekendDate=moment(date).format('MM/DD/YYYY');
        // if(moment(date).format('dddd') === 'Tuesday') {
        //     this.setState({ WeekEndingDate: moment(date).format('MM/DD/YYYY'), weekEndDateError: '' })
        // } else {
        //     this.setState({ WeekEndingDate: moment(date).format('MM/DD/YYYY'), weekEndDateError: 'Please Select Valid Weekend Date'})
        // }
        this._hideDateTimePicker();
    };
    getRole() {
        let data = []
        for (i = 0; i < this.state.userRole.length; i++) {
            data.push(<Picker.Item label={this.state.userRole[i].RoleName} value={this.state.userRole[i].RoleID} />)
        }
        return data
    }

    getUsers() {
        let data = []
        for (i = 0; i < this.state.Users.length; i++) {
            data.push(<Picker.Item label={this.state.Users[i].UserName} value={this.state.Users[i].UserID} />)
        }
        return data
    }

    getStores() {
        let data = []
        for (i = 0; i < this.state.Stores.length; i++) {
            data.push(<Picker.Item label={this.state.Stores[i].StoreNumber.toString()} value={this.state.Stores[i].StoreID.toString()} />)
        }
        return data
    }

    getNOD() {
        let data = []
        for (i = 0; i < NOD.length; i++) {
            data.push(<Picker.Item label={NOD[i]} value={NOD[i]} />)
        }
        return data
    }

    getStatus() {
        let data = []
        for (i = 0; i < status.length; i++) {
            data.push(<Picker.Item label={status[i]} value={status[i]} />)
        }
        return data
    }

    renderIndicator(len) {
        index = this.state.activeSlide
        var ovals = [];
        for (let i = 0; i < len; i++) {
            ovals.push(
                <View style={[Styles.dotStyle, { backgroundColor: i === index ? Colors.DARK_GREY : Colors.LIGHTGREY }]} />
            );
        }
        return ovals;

    }

    onResetFilterClick() {
        this.setState({
            selectedRoleId : 0,
            selectedStores : -1,
            WeekEndingDate : this.state.currentWeekEndDate,
            selectedUsers: 0,
        })
    }

    // ==========>>>>> Render Method  <<<<<<<===========
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.BODYBACKGROUND }}>

                {/* ==========>>>>> Header For Dashboard  <<<<<<<=========== */}
                <DashboardHeader
                    // centerText={`W/E ${this.state.WeekEndingDate}`}
                    centerText={`W/E ${moment(this.state.WeekEndingDate).format('MM/DD/YY')}`}
                    // leftText={'Profile'}
                    rightImage={Images.FilterIcon}
                    onRightPress={(val) => {
                        this.setState({ filterModal: true, isDateTimePickerVisible: false })
                    }}
                    onLeftPress={(val) => {
                        this.props.navigation.navigate('Profile');
                    }}
                // rightImageStyle={{ height: 15, width: 25, top: -7 }}
                // leftImageStyle={{ height: 15, width: 25 }}
                />

                {/* ==========>>>>> Page Container  <<<<<<<=========== */}

                {/* <View style={{ alignItems: 'center' }}>
                    <Text style={Styles.slideTitleStyle}>{this.state.entries[this.state.activeSlide].title}</Text>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        {this.renderIndicator(this.state.entries.length)}
                    </View>
                </View> */}
                <View style={{  }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>

                        <TouchableOpacity 
                            style={{  flex: 1, flexDirection: 'row',justifyContent: 'flex-start'}}
                            onPress={() => {this.setState({ activeSlide: 0})}}
                        > 
                            <Text style={[Styles.slideTitleStyle,{color: 'rgb(171,208,190)', marginLeft: Matrics.CountScale(10)}]}>
                                {   
                                    this.state.entries.length - 1 === this.state.activeSlide
                                    ? this.state.entries[this.state.activeSlide - 1].title
                                    : null
                                }
                            </Text>
                        </TouchableOpacity>
                        <Text style={Styles.slideTitleStyle}>{this.state.entries[this.state.activeSlide].title}</Text>
                        
                        <TouchableOpacity 
                            style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1, marginRight: Matrics.CountScale(10)}}
                            onPress={() => {this.setState({ activeSlide: 1 })}}
                        >
                            <Text style={[Styles.slideTitleStyle,{ color: 'rgb(171,208,190)'}]}>
                                {
                                    this.state.entries.length - 1 !== this.state.activeSlide
                                    ? this.state.entries[this.state.entries.length - 1].title
                                    : null
                                }
                            </Text>
                        </TouchableOpacity>
                           
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        {this.renderIndicator(this.state.entries.length)}
                    </View>
                </View>

                <Carousel
                    scrollEnabled={this.state.scrollEnabled}
                    removeClippedSubviews={true}
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.entries}
                    renderItem={this._renderItem}
                    sliderWidth={Matrics.screenWidth}
                    itemWidth={Matrics.screenWidth}
                    onSnapToItem={(index) => {
                        this.setState({ activeSlide: index })
                        index == 1 && !this.state.scrollEnabled ? this.setState({ scrollEnabled: true }) : null
                    }}
                />
                <Modal
                    visible={this.state.filterModal}
                // transparent={'true'}
                >
                    <View style={{ flex: 1 }}>
                        <Header centerText='Filter'
                            rightText='Save'
                            leftText='Cancel'
                            onLeftPress={() => {
                                this.setState({ 
                                    filterModal: false,
                                    WeekEndingDate: this.state.lastFilterWeekEndingDate,
                                    selectedRoleId: this.state.lastFilterselectedRoleId,
                                    selectedStores: this.state.lastFilterselectedStores,
                                    selectedUsers: this.state.lastFilterselectedUserId,
                                    Users: this.state.lastFilterselectedUserId == 0 ? [] : this.state.Users,
                                });
                                global.selectedStore = this.state.lastFilterselectedStores;
                            }}
                            onRightPress={() => { 
                                // console.log('save'); 
                                // console.log('save', this.state.WeekEndingDate); 
                                // console.log('save', this.state.selectedRoleId); 
                                // console.log('save', this.state.selectedStores); 
                                this.dashboardDataFlag = false;
                                this.props.getDashBoardDataRequest({
                                    RoleId: this.state.selectedRoleId,//this.state.selectedRoleId,
                                    StoreId: this.state.selectedStores,//this.state.StoreID,
                                    FilterId: -1,
                                    BusinessTypeId: 1,
                                    WeekEnding: this.state.WeekEndingDate // this.state.weekEnding
                                });
                                this.setState({ 
                                    loading: true ,
                                    filterModal: false,
                                    lastFilterWeekEndingDate: this.state.WeekEndingDate,
                                    lastFilterselectedRoleId: this.state.selectedRoleId,
                                    lastFilterselectedStores: this.state.selectedStores,
                                    lastFilterselectedUserId: this.state.selectedUsers,

                                })
                            }}
                        />
                        {console.log('save', this.state.WeekEndingDate)}
                        <View style={{ flex: 1, padding: Matrics.CountScale(10) }}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={[Styles.pickerLabelStyle, { paddingVertical: Matrics.CountScale(10) }]}>W/E</Text>
                                    <TouchableOpacity onPress={() => this._showDateTimePicker()}>
                                        <Text>{this.state.WeekEndingDate ? this.state.WeekEndingDate : 'Select Date'}</Text>
                                    </TouchableOpacity>
                                </View>
                                {
                                    this.state.isDateTimePickerVisible
                                    ?
                                    <CalendarPicker
                                        onDateChange={this._handleDatePicked}
                                        // enableWeek="Tue"
                                        selectedDayColor={Colors.APPCOLOR}
                                        selectedDayTextColor={Colors.WHITE}
                                        previousTitle="<"
                                        nextTitle=">"
                                        initialDate={this.state.WeekEndingDate}
                                        customDatesStyles={[
                                            {date: this.state.WeekEndingDate,
                                            style: {backgroundColor: Colors.APPCOLOR},
                                            textStyle: {color: Colors.WHITE}, 
                                            containerStyle: [],
                                        }]}
                                    />
                                    : null
                                } 
                                <Text style={[Styles.errorText, { textAlign: 'right'}]}>{this.state.weekEndDateError}</Text>
                                <View style={Styles.labelBorderStyle}>
                                    <Text style={Styles.pickerLabelStyle}>Role</Text>
                                </View>
                                <Picker
                                    itemStyle={Styles.pickerItemStyle}
                                    selectedValue={this.state.selectedRoleId}
                                    onValueChange={value => {
                                        const roleNameArr = this.state.userRole.filter(R => R.RoleID == value);
                                        this.setState({ selectedRoleId: value, loading: true, selectedRoleName: roleNameArr.length > 0 && roleNameArr[0].RoleName });
                                        this.roleFlag = false;
                                        this.props.getHeaderFilterValuesRequest({
                                            StoreId: -1, RoleId: value, FilterId: -1, BusinessTypeId: 1
                                        });
                                    }}
                                >
                                    {this.getRole()}
                                </Picker>
                                {
                                    this.state.Users != '' &&
                                    <View>
                                        <View style={Styles.labelBorderStyle}>
                                            <Text style={Styles.pickerLabelStyle}>Users</Text>
                                        </View>
                                        <Picker
                                            itemStyle={Styles.pickerItemStyle}
                                            selectedValue={this.state.selectedUsers}
                                            onValueChange={value => {
                                                this.setState({ selectedUsers: value, loading: true })
                                                this.roleFlag = false;
                                                this.props.getHeaderFilterValuesRequest({
                                                    StoreId: -1, RoleId: this.state.selectedRoleId, FilterId: value, BusinessTypeId: 1
                                                });
                                            }}
                                        >
                                            {this.getUsers()}
                                        </Picker>
                                    </View>
                                }
                                <Text style={Styles.pickerLabelStyle}>Stores</Text>
                                <Picker
                                    itemStyle={Styles.pickerItemStyle}
                                    selectedValue={this.state.selectedStores}
                                    onValueChange={value => {
                                        console.log('value-->', value);
                                        this.setState({ selectedStores: value });
                                        global.selectedStore = value;
                                    }}
                                >
                                    {this.getStores()}
                                </Picker>
                                {/* <Text style={Styles.pickerLabelStyle}>No. Of Days</Text>
                                <Picker
                                    itemStyle={Styles.pickerItemStyle}
                                    selectedValue={this.state.selectedNOD}
                                    onValueChange={value => this.setState({ selectedNOD: value })}
                                >
                                    {this.getNOD()}
                                </Picker>
                                <Text style={Styles.pickerLabelStyle}>Status</Text>
                                <Picker
                                    itemStyle={Styles.pickerItemStyle}
                                    selectedValue={this.state.selectedStatus}
                                    onValueChange={value => this.setState({ selectedStatus: value })}
                                >
                                    {this.getStatus()}
                                </Picker> */}

                                <TouchableOpacity 
                                    onPress={() => this.onResetFilterClick()}
                                    style={{ alignSelf: 'center', flexDirection: 'row',justifyContent: 'space-between', borderWidth: 1, borderColor: 'red', borderRadius: 5, padding: 10, marginVertical: 40 }}
                                >
                                    <Image source={Images.Close} style={{ tintColor: 'red', marginHorizontal: 10 }} />
                                    <Text style={{ color: 'red' }}>Reset Filter</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                        {/* <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                        /> */}
                        <LoadWheel visible={this.state.loading} />
                    </View>
                </Modal>
                <LoadWheel visible={this.state.loading} />
                <CustomModal visible={this.state.msgModal} title={this.state.msg}
                    ButtonText={'OK'} onPress={() => this.setState({ msgModal: false })} />
            </View>
        )
    }

    // get pagination() {
    //     const { customerComments, activeSlide } = this.state;
    //     return (
    //         <Pagination
    //             dotsLength={customerComments.length}
    //             activeDotIndex={activeSlide}
    //             dotContainerStyle={{ height: Matrics.CountScale(10), padding: 0 }}
    //             containerStyle={{ paddingTop: 0, paddingBottom: Matrics.CountScale(10) }}
    //             tappableDots={true}
    //             dotStyle={{
    //                 width: Matrics.CountScale(10),
    //                 height: Matrics.CountScale(10),
    //                 borderRadius: Matrics.CountScale(5),
    //                 marginHorizontal: Matrics.CountScale(-10),
    //                 backgroundColor: 'grey'
    //             }}
    //             inactiveDotStyle={{
    //                 width: Matrics.CountScale(10),
    //                 height: Matrics.CountScale(10),
    //                 borderRadius: Matrics.CountScale(5),
    //                 marginHorizontal: Matrics.CountScale(-10),
    //                 borderWidth: 1,
    //                 borderRadius: Matrics.CountScale(5),
    //                 backgroundColor: 'white'
    //             }}
    //             inactiveDotOpacity={0.6}
    //             inactiveDotScale={0.9}
    //         />
    //     );
    // }

    // _renderCustomerComments({ item, index }) {
    //     return (
    //         <View>
    //             <Text>{item.Comments}</Text>
    //         </View>

    //     );
    // }

    // _onMomentumScrollEnd = (e, state, context) => {
    //     console.log('asvdhj jkasbdjk jdbfjkbdf bdfjk')
    //     console.log(context.state.index)

    //     this.setState({ activePage: context.state.index })

    // }

    // renderComments(){
    //     let comments = []
    //     for(i=0; i< this.state.customerComments.length; i++)
    //     {
    //         comments.push(
    //             <View>
    //             <Text numberOfLines={4} style={[Styles.pickerLabelStyle, { marginVertical: Matrics.CountScale(20) }]}>
    //                 {this.state.customerComments[i].Comments}
    //             </Text>
    //             </View>
    //         );

    //     }
    //     return comments;
    // }
    onRefresh = () => {
        this.setState({refreshing: true});
        this.props.getDashBoardDataRequest({
            RoleId: this.state.selectedRoleId,//this.state.selectedRoleId, 0
            StoreId: this.state.selectedStores,//this.state.StoreID, -1
            FilterId: -1,
            BusinessTypeId: 1,
            WeekEnding: this.state.WeekEndingDate // this.state.weekEnding
        })
    }

    _renderItem = ({ item, index }) => {
            let len = 0 ;
            this.state.NPSDisplay === 'QTD'  && this.state.customerServices && this.state.customerServices.QuarterMonthCount !== 0
            ? len = this.state.customerCommentsQTD.length
            : this.state.NPSDisplay === 'YTD' && this.state.customerServices && this.state.customerServices.CurrentYearCount !== 0
                ? len = this.state.customerCommentsYTD.length
                : len = this.state.customerCommentsMonth.length;

        return (
            this.state.activeSlide == 0 ?
            // index == 0 ?
                <View style={Styles.slideStyle}>
                    <ScrollView showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                              refreshing={this.state.refreshing}
                              onRefresh={this.onRefresh}
                            />
                        }
                    >
                        <Text style={Styles.labelText}>Financial</Text>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
                            <InfoViewContainer bgColor={Colors.PARROT} labelText={'SALES'} imgSrc={Images.Sales} contentText={this.state.totalSales} />
                            <InfoViewContainer bgColor={Colors.ORANGE} labelText={'LABOR'} imgSrc={Images.Labor} contentText={this.state.labourPercentage != undefined && `${this.state.labourPercentage}%`} />
                            <InfoViewContainer bgColor={Colors.PURPLE} labelText={'PRODUCTIVITY'} imgSrc={Images.Productivity} contentText={this.state.productivityPercentage} />
                            <InfoViewContainer bgColor={Colors.SKY} labelText={'FOOD COST'} imgSrc={Images.FoodCost} contentText={this.state.foodCostPercentage != undefined && `${this.state.foodCostPercentage}%`} />
                            <InfoViewContainer bgColor={Colors.ORANGERED} labelText={'OVERTIME'} imgSrc={Images.Overtime} contentText={this.state.overTimePercentage} />
                            <InfoViewContainer bgColor={Colors.DARKAPPCOLOR} labelText={'BREAK VIOLATION'} imgSrc={Images.BreakViolation} contentText={this.state.breakViolationPercentage} />

                        </View>
                        <Text style={Styles.labelText}>Sales Building</Text>
                        <View style={[Styles.contentContainerStyle, { flexDirection: 'row' }]}>
                            <View style={{ flex: 1, alignItems: 'center' }} >
                                <Image source={Images.SalesBuilding} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={Styles.salesBuildingText}>{this.state.nonSubSales !== undefined ? `${this.state.nonSubSales}%` : null}</Text>
                                <Text style={Styles.labelText}>Non-Sub Sales</Text>
                            </View>

                        </View>
                        <Text style={Styles.labelText}>Customer Services</Text>
                        <View style={Styles.contentContainerStyle}>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => { this.setState({ NPSDisplay: 'Month'}) }}>
                                    <Text style={[Styles.serviceLabelStyle, { color: this.state.NPSDisplay === 'Month' ? Colors.DARKAPPCOLOR : null }]}>Current Month <Text style={{ color: Colors.ORANGE }}>{this.state.customerServices && this.state.customerServices.CurrentMonthCount}</Text></Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.setState({ NPSDisplay: 'QTD'}) }}>
                                    <Text style={[Styles.serviceLabelStyle, { color: this.state.NPSDisplay === 'QTD' ? Colors.DARKAPPCOLOR : null }]}>QTD <Text style={{ color: Colors.ORANGE }}>{this.state.customerServices && this.state.customerServices.QuarterMonthCount}</Text></Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.setState({ NPSDisplay: 'YTD'}) }}>
                                    <Text style={[Styles.serviceLabelStyle, { color: this.state.NPSDisplay === 'YTD' ? Colors.DARKAPPCOLOR : null }]}>YTD <Text style={{ color: Colors.ORANGE }}>{this.state.customerServices && this.state.customerServices.CurrentYearCount}</Text></Text>
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.borderStyle}>
                                <Image source={Images.Excellent} />
                            </View>
                            <View style={{ flexDirection: 'row', paddingVertical: Matrics.CountScale(10) }}>
                                <View style={{ flex: 1 }}>
                                    <View style={Styles.serviceRowStyle}>
                                        <Image source={Images.NPSScore} />
                                        <Text style={[Styles.salesBuildingText, { marginLeft: Matrics.CountScale(15) }]}>
                                            {
                                                this.state.NPSDisplay === 'QTD'
                                                ? this.state.customerServices && this.state.customerServices.NPSQuarterScore
                                                : this.state.NPSDisplay === 'YTD'
                                                 ? this.state.customerServices && this.state.customerServices.NPSYearScore
                                                 : this.state.customerServices && this.state.customerServices.NPSScore
                                            }
                                        </Text>
                                    </View>
                                    <Text style={[Styles.labelText, { textAlign: 'left' }]}>OSAT Score</Text>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <View style={Styles.serviceRowStyle}>
                                        <Image source={Images.NPSCount} />
                                        <Text style={[Styles.salesBuildingText, { marginLeft: Matrics.CountScale(15) }]}>
                                            {
                                                this.state.NPSDisplay === 'QTD'
                                                ? this.state.customerServices && this.state.customerServices.NPSQuarterCount
                                                : this.state.NPSDisplay === 'YTD'
                                                    ? this.state.customerServices && this.state.customerServices.NPSYearCount
                                                    : this.state.customerServices && this.state.customerServices.NPSCount
                                            }
                                        </Text>
                                    </View>
                                    <Text style={[Styles.labelText, { textAlign: 'left' }]}>OSAT Count</Text>
                                </View>
                            </View>
                        </View>
                        <View style={Styles.contentContainerStyle}>

                            {/* <Text numberOfLines={4} style={[Styles.pickerLabelStyle, { marginVertical: Matrics.CountScale(20) }]}>
                                Once the printer ink run dry it has to be replaced with another inkjet cattridge. There are  many  reputed companies  like canon, epson, Dell mndbf dsfhjgf sndbf fjhbdfj sjf jhd kdsv jkhfe rhf
                                </Text> */}

                            {/* <Carousel
                                // style={Styles.guestHeader}
                                ref={(c) => { this._carousels = c; }}
                                data={this.state.customerComments}
                                renderItem={this._renderCustomerComments}
                                sliderWidth={width - Matrics.CountScale(20)}
                                itemWidth={width - Matrics.CountScale(20)}
                            // onSnapToItem={(index) => this.setState({ activeCommentSlide: index })}
                            /> */}
                            <View style={{ overflow: 'hidden' }}>
                                <Swiper height={Matrics.CountScale(160)} showsPagination={false}
                                    key={
                                        this.state.NPSDisplay === 'QTD'
                                        ? this.state.customerCommentsQTD.length
                                        : this.state.NPSDisplay === 'YTD'
                                            ? this.state.customerCommentsYTD.length
                                            : this.state.customerCommentsMonth.length
                                    }
                                    scrollEnabled={true}

                                    onTouchStart={() => {
                                        if (Platform.OS == 'android') {
                                            console.log('touchstart');
                                            // if(this.sta)
                                            this.setState({ scrollEnabled: false })
                                            clearTimeout(this.state.clearId)
                                            clearTimeout(this.state.clearscrollId)
                                            var clearscrollId = setTimeout(() => {
                                                console.log('done..');
                                                if (!this.state.scrollEnabled)
                                                    this.setState({ scrollEnabled: true })
                                            }, 1000)
                                            this.setState({ clearscrollId: clearscrollId });
                                        }
                                    }}

                                    onTouchEnd={() => {
                                        if (Platform.OS == 'android') {
                                            // console.log('touch end');
                                            var clearId = setTimeout(() => {
                                                console.log('touch end');
                                                this.setState({ scrollEnabled: true })
                                            }, 1000)
                                            this.setState({ clearId: clearId });
                                            // this.setState({ scrollEnabled: true })
                                            // if (!this.state.scrollEnabled)
                                            // setTimeout(() => { this.setState({ scrollEnabled: true }) }, 100)

                                        }
                                    }}
                                    onPageScrollStateChanged={(e) => { console.log(e) }}
                                    onMomentumScrollEnd={(e, state, context) => {
                                        console.log('active page-->',context.state.index);

                                        this.setState({ activePage: context.state.index + 1 })

                                    }} >
                                    {/* {this.renderComments()} */}
                                    {
                                        this.state.NPSDisplay === 'QTD'
                                        ? this.state.customerCommentsQTD.length > 0 && this.state.customerServices && this.state.customerServices.QuarterMonthCount !== 0
                                            ? this.state.customerCommentsQTD.map((res, index) => {
                                                return (
                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerComments', { commentsData: this.state.customerComments })}>
                                                        <View style={Styles.bottomBorderStyle}>
                                                            <Text style={[Styles.labelText, { color: Colors.PARROT }]}>{res.DisplayStoreNumber} - <Text style={Styles.labelText}>{moment(res.VisitTimeStamp).format('MM/DD/YY, hh:mm a')}</Text></Text>

                                                        </View>
                                                        <Text numberOfLines={4} style={[Styles.pickerLabelStyle, { marginVertical: Matrics.CountScale(20) }]}>
                                                            {res.Comments}
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                            : <Text style={Styles.labelText}>No comments available for Quater-To-Date.</Text>
                                        : this.state.NPSDisplay === 'YTD' && this.state.customerServices && this.state.customerServices.CurrentYearCount !== 0
                                            ?
                                                this.state.customerCommentsYTD.length > 0
                                                ? this.state.customerCommentsYTD.map((res, index) => {
                                                    return (
                                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerComments', { commentsData: this.state.customerComments })}>
                                                            <View style={Styles.bottomBorderStyle}>
                                                                <Text style={[Styles.labelText, { color: Colors.PARROT }]}>{res.DisplayStoreNumber} - <Text style={Styles.labelText}>{moment(res.VisitTimeStamp).format('MM/DD/YY, hh:mm a')}</Text></Text>
        
                                                            </View>
                                                            <Text numberOfLines={4} style={[Styles.pickerLabelStyle, { marginVertical: Matrics.CountScale(20) }]}>
                                                                {res.Comments}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                                : <Text style={Styles.labelText}>No comments available for Year-To-Date.</Text>
                                            : this.state.customerCommentsMonth.length > 0
                                                ? this.state.customerCommentsMonth.map((res, index) => {
                                                    return (
                                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerComments', { commentsData: this.state.customerComments })}>
                                                            <View style={Styles.bottomBorderStyle}>
                                                                <Text style={[Styles.labelText, { color: Colors.PARROT }]}>{res.DisplayStoreNumber} - <Text style={Styles.labelText}>{moment(res.VisitTimeStamp).format('MM/DD/YY, hh:mm a')}</Text></Text>
        
                                                            </View>
                                                            <Text numberOfLines={4} style={[Styles.pickerLabelStyle, { marginVertical: Matrics.CountScale(20) }]}>
                                                                {res.Comments}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                                : <Text style={Styles.labelText}>No comments available for Current Month.</Text>
                                    }
                                    {/* <View>
                                    <Text>slide 1</Text>
                                    </View>
                                    <View>
                                    <Text>slide 2</Text>
                                    </View>
                                    <View>
                                    <Text>slide 3</Text>
                                    </View> */}
                                </Swiper>
                            </View>

                            <View>
                                {/* {this.pagination} */}
                            </View>
                                
                            {
                                len > 0
                                ? <Text style={[Styles.labelText, { textAlign: 'center' }]}>{this.state.activePage}/ {len}</Text>
                                : null
                            }
                        </View>
                        <Text style={Styles.labelText}>Operation Overview</Text>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
                            <OperationOverViewContainer labelText={'University of Subway'}
                                imgSrc={Images.University} ><Text style={[Styles.labelValueStyle, { color: Colors.PARROT }]}>{this.state.current}
                                    <Text style={{ color: 'black', fontSize: Matrics.CountScale(16) }}> / {this.state.total}</Text></Text></OperationOverViewContainer>
                            <OperationOverViewContainer labelText={'Employees Needed'} fontStyle={{ color: Colors.ORANGE }}
                                textValue={this.state.employeeNeed} imgSrc={Images.EmpNeed} onPress={() => {this.setState({ activeSlide: 1 })}} />
                            <OperationOverViewContainer labelText={'In Full Compliance'}
                                textValue={this.state.operationOverview && this.state.operationOverview.InFullCompliance} imgSrc={Images.FullComp} />
                            <OperationOverViewContainer labelText={'Out of Compliance'} fontStyle={{ fontWeight: 'bold' }}
                                textValue={this.state.operationOverview && this.state.operationOverview.OutOfCompliance} imgSrc={Images.OutOfComp} />
                        </View>
                    </ScrollView>
                </View >
                :
                <View style={Styles.slideStyle}>
                    <ScrollView showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                              refreshing={this.state.refreshing}
                              onRefresh={this.onRefresh}
                            />
                        }
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <View style={[Styles.contentContainerStyle, { paddingHorizontal: 0, alignItems: 'center', borderWidth: 2, borderColor: Colors.ORANGE }]}>
                                    {/* <Text style={Styles.empNeedTextStyle}>{this.state.humanResource && this.state.humanResource.RequiredMore}</Text> */}
                                    <Text style={Styles.empNeedTextStyle}>{this.state.humanResource && this.state.employeeNeed >= this.state.humanResource.ActiveEmployee ? this.state.employeeNeed-this.state.humanResource.ActiveEmployee : 0}</Text>
                                    <Text style={[Styles.labelText, { fontSize: Matrics.CountScale(14) }]}>Employees needed</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1 }}>
                                <View style={[Styles.contentContainerStyle, { flex: 1, justifyContent: 'space-around' }]}>
                                    <Text style={Styles.progressText}><Text style={{ color: Colors.PARROT }}>{this.state.humanResource && this.state.humanResource.ActiveEmployee}</Text> of {this.state.employeeNeed}</Text>
                                    <View style={{ height: 10, backgroundColor: Colors.LIGHTGREY, borderRadius: 10 }}>
                                        <View style={{ height: 10, width: `${this.state.progressPercentage}%`, borderRadius: 10, backgroundColor: Colors.PARROT }}></View>
                                    </View>
                                    <Text style={[Styles.labelText, { fontSize: Matrics.CountScale(14) }]}>Active Employees</Text>
                                </View></View>
                        </View>
                        <View style={Styles.contentContainerStyle}>
                            <HRTextContent labelText={'Onborading issues'} textValue={this.state.humanResource && this.state.humanResource.OnBoardingIssues} bulletColor={Colors.RED} />
                            <HRTextContent labelText={'Exp. Work Permits'} textValue={this.state.humanResource && this.state.humanResource.ExpiredWorkPermits} bulletColor={Colors.PURPLE} />
                            <HRTextContent labelText={'Exp. 1-9 Documents'} textValue={this.state.humanResource && this.state.humanResource.ExpiredI9Documents} bulletColor={Colors.SKY} />
                            <HRTextContent labelText={'Anti-Harassment Cert.'} textValue={this.state.humanResource && this.state.humanResource.AntiHarassmentCertification} bulletColor={Colors.YELLOW} />
                        </View>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                            <OperationOverViewContainer labelText={'Onboarding'} contentStyle={{ fontSize: Matrics.CountScale(14) }}
                                textValue={this.state.humanResource && this.state.humanResource.OnBoarding} imgSrc={Images.Onboarding} />
                            <OperationOverViewContainer labelText={'Ready to Work'} contentStyle={{ fontSize: Matrics.CountScale(14) }}
                                textValue={this.state.humanResource && this.state.humanResource.ReadyToWork} imgSrc={Images.ReadyToWork} />
                            <OperationOverViewContainer labelText={'Employees over 30 hours'} contentStyle={{ fontSize: Matrics.CountScale(14) }}
                                textValue={this.state.humanResource && this.state.humanResource.EmployeeOver30Hours} imgSrc={Images.EmpOverHour} />
                            <OperationOverViewContainer labelText={'Unknown Employees'} contentStyle={{ fontSize: Matrics.CountScale(14) }}
                                textValue={this.state.humanResource && this.state.humanResource.UnknownEmployeesCount} imgSrc={Images.UnknownEmp} />
                        </View>
                    </ScrollView>


                </View >
        );
    }
}

const Styles = {
    pageContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    slideStyle: {
        flex: 1,
        padding: Matrics.CountScale(10),
    },
    pickerItemStyle: {
        fontSize: Matrics.CountScale(18),
        fontFamily: Fonts.NunitoSansRegular
    },
    pickerLabelStyle: {
        fontSize: Matrics.CountScale(16),
        fontFamily: Fonts.NunitoSansRegular
    },
    dotStyle: {
        height: Matrics.CountScale(10),
        width: Matrics.CountScale(10),
        marginVertical: Matrics.CountScale(6),
        marginHorizontal: Matrics.CountScale(5),
        backgroundColor: Colors.LIGHTGREY,
        borderRadius: Matrics.CountScale(5),
    },
    slideTitleStyle: {
        fontSize: Matrics.CountScale(16),
        fontFamily: Fonts.NunitoSansRegular,
        color: Colors.DARKAPPCOLOR,
        marginTop: Matrics.CountScale(10),
    },
    labelText: {
        fontSize: Matrics.CountScale(16),
        fontFamily: Fonts.NunitoSansRegular,
        color: Colors.GREY,
        margin: Matrics.CountScale(3),
    },
    infoContainer: {
        backgroundColor: Colors.GREY,
        height: Matrics.CountScale(100),
        width: (Matrics.screenWidth / 2) - Matrics.CountScale(22),
        margin: Matrics.CountScale(5),
        borderRadius: 6,
        padding: Matrics.CountScale(10),
        justifyContent: 'space-between'
    },
    mainContainerLabel: {
        fontSize: Matrics.CountScale(14),
        fontFamily: Fonts.NunitoSansRegular,
        color: 'white'
    },
    mainContainerContent: {
        color: 'white',
        fontSize: Matrics.CountScale(24),
        fontFamily: Fonts.NunitoSansRegular,
        marginLeft: Matrics.CountScale(5),
    },
    salesBuildingText: {
        fontSize: Matrics.CountScale(26),
        fontFamily: Fonts.NunitoSansRegular,
    },
    contentContainerStyle: {
        backgroundColor: 'white',
        margin: Matrics.CountScale(5),
        borderRadius: 5,
        padding: Matrics.CountScale(20),

    },
    serviceLabelStyle: {
        fontSize: Matrics.CountScale(16),
        fontFamily: Fonts.NunitoSansRegular,
        marginHorizontal: Matrics.CountScale(10),
    },
    serviceRowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Matrics.CountScale(5),
    },
    borderStyle: {
        alignItems: 'center', borderColor: Colors.BORDERCOLOR, borderBottomWidth: 2, marginVertical: Matrics.CountScale(10), borderTopWidth: 2, paddingVertical: Matrics.CountScale(25)
    },

    bottomBorderStyle: {
        borderColor: Colors.BORDERCOLOR,
        borderBottomWidth: 2,
        paddingBottom: Matrics.CountScale(5)
    },
    OperationOVContainer: {
        backgroundColor: 'white',
        height: Matrics.CountScale(100),
        width: (Matrics.screenWidth / 2) - Matrics.CountScale(22),
        margin: Matrics.CountScale(5),
        borderRadius: 6,
        padding: Matrics.CountScale(10),
        flexDirection: 'row',
    },
    labelValueStyle: {
        fontSize: Matrics.CountScale(26),
        fontFamily: Fonts.NunitoSansRegular,
    },
    HRTextStyle: {
        fontSize: Matrics.CountScale(14),
        fontFamily: Fonts.NunitoSansRegular,
        marginLeft: Matrics.CountScale(5),
    },
    empNeedTextStyle: {
        color: Colors.ORANGE,
        fontSize: Matrics.CountScale(60),
        fontFamily: Fonts.NunitoSansRegular
    },
    progressText: {
        fontSize: Matrics.CountScale(22),
        fontFamily: Fonts.NunitoSansRegular,
        color: Colors.GREY,
    },
    labelBorderStyle: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.BORDERCOLOR,
        paddingVertical: Matrics.CountScale(15),
    },
    errorText: {
        color: 'red',
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: 14,
        marginLeft: Matrics.CountScale(15)
    },
}
// export default Dashboard
//Props Connection
const mapStateToProps = (state) => {
    console.log(state, "sstates");

    return {
        response: state.Dashboard,
        headerFiltervalues: state.HirePacket,
    };
}
//Redux Connection  
export default connect(mapStateToProps, { getHeaderFilterValuesRequest, getUserRoleRequest, getDashBoardDataRequest, getFinancialReportRequest, getCustomerCommentsCountRequest, getSalesBuildingReportRequest })(Dashboard);


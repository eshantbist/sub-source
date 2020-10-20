// ======>>>>> Libraries <<<<<=========
import React from 'react';
import {
    View, ScrollView, Text, TouchableOpacity, FlatList, StyleSheet,
    Image, Modal, Platform, Dimensions, RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CalendarPicker from '../../../CustomComponent/react-native-calendar-picker';
import moment from 'moment';
import _ from 'lodash';
import {Picker} from '@react-native-community/picker';

// ======>>>>> Assets <<<<<=========
import { Colors, Fonts, Matrics, Images, MasterCss } from '@Assets'
import { TextInputView, Button, LoadWheel } from "@Components";
import Header from '../../../Components/Common/Header';
import Card from './Templetes/Card';
import { Dropdown } from 'react-native-material-dropdown';
import CheckDocumentStatusHeader from './Templetes/Header';
import { getHeaderFilterValues, getCheckDocumentStatusHiringReturnRequest, getCheckDocumentStatusEnvelopVoidRequest } from '../../../Redux/Actions/DocumentStatusActions';



let self;
let NOD = ['30', '60', '90', 'All'];
let status = ['All status', 'Declined', 'Delivered', 'Created','Completed','Voided', 'Exception','Sent'];
let perPageRecord = 10;
let empListData = [];
let pageNumArr = [];
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const SLIDER_WIDTH = viewportWidth;
// ======>>>>> Class Declaration <<<<<=========
class CheckDoucmentStatus extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,
        // headerTitle: <CheckDocumentStatusHeader />,
        // headerTitleStyle: MasterCss.headerTitleStyle,
        // headerLeft: <View />,
        // headerRight:
        //     <TouchableOpacity onPress={() => { self.setState({ filterModal: true }) }} >
        //         <Image source={Images.FilterIcon} style={MasterCss.basicIconStyle} />
        //     </TouchableOpacity>
    })

    //--------->>>State Initilization----------->>>
    state = {
        selected: "ActionRequired",
        filterModal: false,
        selectedRoleId: 0,
        selectedNOD: -1,
        selectedStatus: 'All Status',
        userRoleList: [],
        userList: [],
        storeList: [],
        loading: true,
        selectedUsers: '',
        selectedIndex: 0,
        selectedStores: -1,
        // weekendDate: '',
        TitlesArr: [],
        empListArr: [],
        TotalEmployeeCount: 0,
        // weekEndDateError: '',
        numberOfPage: 0,
        empListArr1: [],
        lastFilterselectedRoleId: 0,
        lastFilterselectedStores: -1,
        lastFilterselectedNOD: 30,
        lastFilterselectedStatus: 'All Status',
        recipientsListArr: [],
        selctedTileID: 0,
        selctedPageNumber: 1,
        refreshing: false,
        // isDateTimePickerVisible: false,
    };

    //------------>>>LifeCycle Methods------------->>>

    UNSAFE_componentWillMount() {
        self = this;
        this.filterValFlag = false;
        this.docStatusFlage = false;

        console.log(this.props, "=====>>>>>> Props IN Check Document Status <<<<<=====")
        this.props.getHeaderFilterValues({
            RoleId: global.loginResponse.RoleID,
            FilterId: -1,
            StoreId: -1,
            BusinessTypeId: global.loginResponse.DefaultBusinessTypeID
        });
        pageNumArr.push(1);
        this.props.getCheckDocumentStatusHiringReturnRequest({
            RoleId: this.state.selectedRoleId,
            FilterId: -1,
            StoreId: this.state.selectedStores,
            BusinessTypeId: 1,
            NoOfDays: this.state.selectedNOD,
            TileID: 2,
            StatusType: this.state.selectedStatus,
            PageNumber: 1,
            PageSize: perPageRecord,
        });
    }


    componentWillUnmount() { }

    async UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps, "=====>>>>>> Next Props IN Check Document Status <<<<<=====")
        if (nextProps.response.CheckDocumentStatus.getHeaderFilterValuesSucess && this.state.loading && !this.filterValFlag) {
            this.filterValFlag = true;
            if (this.filterValFlag && this.docStatusFlage)
                this.setState({ loading: false });

            let data = nextProps.response.CheckDocumentStatus.data;
            // console.log(data)
            if (data.Status == 1) {
                console.log('filter success');
                const roleSelect = {
                    RoleID: 0,
                    RoleName: 'Select Role'
                }
                const storeselect = {
                    StoreID: -1,
                    DisplayStoreNumber: 'Select Store'
                }
                data.Report.store_list.unshift(storeselect);
                data.Report.role_list.unshift(roleSelect);
                console.log('filter success store-->', data.Report.store_list);
                console.log('filter success role-->', data.Report.role_list);
                this.setState({
                    userRoleList: data.Report.role_list,
                    userList: data.Report.user_list,
                    storeList: data.Report.store_list,
                    selectedStoreId: data.Report.store_list[0].StoreID,
                    selectedStoreName: data.Report.store_list[0].DisplayStoreNumber
                });
            }
        } else if (nextProps.response.CheckDocumentStatus.GetCheckDocumentStatusHiringReturnSucess && (this.state.loading || this.state.refreshing)) {
            this.docStatusFlage = true;
            if (this.filterValFlag && this.docStatusFlage)
                this.setState({ loading: false, refreshing: false });

            let data = nextProps.response.CheckDocumentStatus.data;

            console.log('data-->emp-->', data);
            // console.log('data-->emp-->', data.Report._list);
            // console.log('data-->emp-->',typeof data.Report._list);
            // console.log('data-->emp-->', [data.Report._list]);
            if (data.Status == 1) {
                empListData[this.state.selectedIndex] = data.Report._list;
                await this.setState({
                    TitlesArr: data.Report._tilesObj,
                    // empListArr: [data.Report._list], 
                    empListArr: empListData,
                    TotalEmployeeCount: data.Report.PagingStats.TotalCount,
                    recipientsListArr : data.Report._recipientsList
                });
                this.getNumberOfPage();
            } else {
                // console.log('else-->',data.Message)
                // console.log('else-->',empListData)
                this.setState({ empListArr: empListData, TitlesArr: [] });
            }
        } else if (nextProps.response.CheckDocumentStatus.GetCheckDocumentStatusEnvelopVoidSuccess) {
            let data = nextProps.response.CheckDocumentStatus.data;
            // console.log('data-->', data);
            if (data.Status == 1) {
                this.props.getCheckDocumentStatusHiringReturnRequest({
                    RoleId: this.state.selectedRoleId,
                    FilterId: -1,
                    StoreId: this.state.selectedStores,
                    BusinessTypeId: 1,
                    NoOfDays: this.state.selectedNOD,
                    TileID: 2,
                    StatusType: this.state.selectedStatus,
                    PageNumber: 1,
                    PageSize: 20,
                });
                this.setState({ loading: true });
            } else {
                alert('Something Wrong Try Again!');
            }
        }
    }

    //------------->>>Controllers/Functions------------>>>>

    getNumberOfPage() {
        let Totalpage = this.state.TotalEmployeeCount / perPageRecord;
        // let Totalflag = Number.isInteger(Totalflag);
        // console.log('TotalEmployeeCount-->', this.state.TotalEmployeeCount);
        // console.log('perPageRecord-->', perPageRecord);
        // console.log('Totalpage--1>', Totalpage);
        if (Number.isInteger(Totalpage)) {
            Totalpage
        } else {
            let temp = Totalpage.toString().split('.');
            temp[1] >= 5
                ? Totalpage = Math.round(Totalpage)
                : Totalpage = parseInt(temp[0]) + 1;
        }
        console.log('Totalpage--2>', Totalpage);
        this.setState({ Totalpage });
    }

    // _showDateTimePicker = (val) => this.setState({ isDateTimePickerVisible: true });

    // _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    // _handleDatePicked = (date) => {
    //     // console.log('date-->', date);
    //     if (moment(date).format('dddd') === 'Tuesday') {
    //         this.setState({ weekendDate: moment(date).format('MM/DD/YYYY'), weekEndDateError: '' })
    //     } else {
    //         this.setState({ weekendDate: moment(date).format('MM/DD/YYYY'), weekEndDateError: 'Please Select Valid Weekend Date' })
    //     }
    //     this._hideDateTimePicker();
    // };

    async onSelectStore(value, index, data) {
        await this.setState({ selectedStoreId: data[index].StoreID, selectedStoreName: value });
    }

    getRole() {
        let data = []
        for (i = 0; i < this.state.userRoleList.length; i++) {
            data.push(<Picker.Item label={this.state.userRoleList[i].RoleName} value={this.state.userRoleList[i].RoleID} />)
        }
        return data
    }

    getUsers() {
        let data = []
        for (i = 0; i < this.state.userList.length; i++) {
            data.push(<Picker.Item label={this.state.userList[i].UserName} value={this.state.userList[i].UserID} />)
        }
        return data
    }

    getStores() {
        let data = []
        for (i = 0; i < this.state.storeList.length; i++) {
            data.push(<Picker.Item label={this.state.storeList[i].DisplayStoreNumber} value={this.state.storeList[i].StoreID} />)
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

    onClickedCompleted() {
        this.setState({ selected: 'Completed', loading: true, selectedIndex: 0, selctedTileID: 1  });
        empListData = [];
        pageNumArr = [1];
        this.props.getCheckDocumentStatusHiringReturnRequest({
            RoleId: this.state.selectedRoleId,
            FilterId: -1,
            StoreId: this.state.selectedStores,
            BusinessTypeId: 1,
            NoOfDays: this.state.selectedNOD,
            TileID: 1,
            StatusType: this.state.selectedStatus,
            PageNumber: 1,
            PageSize: perPageRecord,
        });
    }

    onClickedTotal() {
        this.setState({ selected: 'Total', loading: true, selectedIndex: 0, selctedTileID: 0 });
        empListData = [];
        pageNumArr = [1];
        this.props.getCheckDocumentStatusHiringReturnRequest({
            RoleId: this.state.selectedRoleId,
            FilterId: -1,
            StoreId: this.state.selectedStores,
            BusinessTypeId: 1,
            NoOfDays: this.state.selectedNOD,
            TileID: 0,
            StatusType: this.state.selectedStatus,
            PageNumber: 1,
            PageSize: perPageRecord,
        });
    }
    onClickedActionRequired() {
        this.setState({ selected: 'ActionRequired', loading: true, selectedIndex: 0, selctedTileID: 2 });
        empListData = [];
        pageNumArr = [1];
        this.props.getCheckDocumentStatusHiringReturnRequest({
            RoleId: this.state.selectedRoleId,
            FilterId: -1,
            StoreId: this.state.selectedStores,
            BusinessTypeId: 1,
            NoOfDays: this.state.selectedNOD,
            TileID: 2,
            StatusType: this.state.selectedStatus,
            PageNumber: 1,
            PageSize: perPageRecord,
        });
    }
    onClickedInProgress() {
        this.setState({ selected: 'InProgress', loading: true, selectedIndex: 0, selctedTileID: 3 });
        empListData = [];
        pageNumArr = [1];
        this.props.getCheckDocumentStatusHiringReturnRequest({
            RoleId: this.state.selectedRoleId,
            FilterId: -1,
            StoreId: this.state.selectedStores,
            BusinessTypeId: 1,
            NoOfDays: this.state.selectedNOD,
            TileID: 3,
            StatusType: this.state.selectedStatus,
            PageNumber: 1,
            PageSize: perPageRecord,
        });
    }

    async onSwipe(Index) {
        this.setState({ selectedIndex: Index })
        let apiCall = pageNumArr.indexOf(Index + 1);
        let TileID = 0;
        if (this.state.selected === 'Completed') {
            TileID = 1;
        } else if (this.state.selected === 'ActionRequired') {
            TileID = 2;
        } else if (this.state.selected === 'InProgress') {
            TileID = 3;
        }
        // console.log('TileID-->', TileID);   
        if (apiCall === -1) {
            this.setState({ loading: true, selctedPageNumber: Index + 1 });
            pageNumArr.push(Index + 1);
            this.props.getCheckDocumentStatusHiringReturnRequest({
                RoleId: this.state.selectedRoleId,
                FilterId: -1,
                StoreId: this.state.selectedStores,
                BusinessTypeId: 1,
                NoOfDays: this.state.selectedNOD,
                TileID: TileID,
                StatusType: this.state.selectedStatus,
                PageNumber: Index + 1,
                PageSize: perPageRecord,
            });
        }
    }


    //----------->>>Render Method-------------->>>

    render() {
        const { selected } = this.state,
            EmployeeData = [
                [
                    {
                        FirstName: 'Mathhew S Tribley',
                        DisplayStoreNumber: '1289',
                        DisplayStatusName: 'HR Rep',
                        SentBy: 'Diana Gomez',
                        sentTime: '06.22.2017',
                        StatusName: 'Pending',
                        CreatedOn: '2019-07-31T08:38:45.56'
                    },
                    {
                        FirstName: 'Paola E Herra',
                        DisplayStoreNumber: '1289',
                        DisplayStatusName: 'Employee Created',
                        SentBy: 'Diana Gomez',
                        sentTime: '06.22.2017',
                        StatusName: 'completed',
                        CreatedOn: '2019-07-31T08:38:45.56'
                    },
                    {
                        FirstName: 'Angel A Soto',
                        DisplayStoreNumber: '1289',
                        sendStatus: 'Employee',
                        SentBy: 'Diana Gomez',
                        sentTime: '06.22.2017',
                        StatusName: 'Pending',
                        CreatedOn: '2019-07-31T08:38:45.56'
                    },
                    {
                        FirstName: 'Mathhew S Tribley',
                        DisplayStoreNumber: '1289',
                        DisplayStatusName: 'HR Rep',
                        SentBy: 'Diana Gomez',
                        sentTime: '06.22.2017',
                        StatusName: 'Pending',
                        CreatedOn: '2019-07-31T08:38:45.56'
                    },
                    {
                        FirstName: 'Paola E Herra',
                        DisplayStoreNumber: '1289',
                        DisplayStatusName: 'Employee Created',
                        SentBy: 'Diana Gomez',
                        sentTime: '06.22.2017',
                        StatusName: 'completed',
                        CreatedOn: '2019-07-31T08:38:45.56'
                    },
                    {
                        FirstName: 'Angel A Soto',
                        DisplayStoreNumber: '1289',
                        DisplayStatusName: 'Employee',
                        SentBy: 'Diana Gomez',
                        sentTime: '06.22.2017',
                        StatusName: 'Pending',
                        CreatedOn: '2019-07-31T08:38:45.56'
                    }
                ],
                [
                    {
                        FirstName: 'Angel A Soto',
                        DisplayStoreNumber: '1289',
                        DisplayStatusName: 'Employee',
                        SentBy: 'Diana Gomez',
                        sentTime: '06.22.2017',
                        StatusName: 'Pending',
                        CreatedOn: '2019-07-31T08:38:45.56'
                    },
                    {
                        FirstName: 'Mathhew S Tribley',
                        DisplayStoreNumber: '1289',
                        DisplayStatusName: 'HR Rep',
                        SentBy: 'Diana Gomez',
                        sentTime: '06.22.2017',
                        StatusName: 'Pending',
                        CreatedOn: '2019-07-31T08:38:45.56'
                    },
                    {
                        FirstName: 'Paola E Herra',
                        DisplayStoreNumber: '1289',
                        DisplayStatusName: 'Employee Created',
                        SentBy: 'Diana Gomez',
                        sentTime: '06.22.2017',
                        StatusName: 'completed',
                        CreatedOn: '2019-07-31T08:38:45.56'
                    },
                    {
                        FirstName: 'Angel A Soto',
                        DisplayStoreNumber: '1289',
                        DisplayStatusName: 'Employee',
                        SentBy: 'Diana Gomez',
                        sentTime: '06.22.2017',
                        StatusName: 'Pending',
                        CreatedOn: '2019-07-31T08:38:45.56'
                    },
                    {
                        FirstName: 'Mathhew S Tribley',
                        DisplayStoreNumber: '1289',
                        DisplayStatusName: 'HR Rep',
                        SentBy: 'Diana Gomez',
                        sentTime: '06.22.2017',
                        StatusName: 'Pending',
                        CreatedOn: '2019-07-31T08:38:45.56'
                    },
                    {
                        FirstName: 'Paola E Herra',
                        DisplayStoreNumber: '1289',
                        DisplayStatusName: 'Employee Created',
                        SentBy: 'Diana Gomez',
                        sentTime: '06.22.2017',
                        StatusName: 'completed',
                        CreatedOn: '2019-07-31T08:38:45.56'
                    },
                ]
            ];
        let pagination = [];
        for (let i = 0; i < this.state.Totalpage; i++) {
            pagination.push(
                <TouchableOpacity onPress={() => this.onSwipe(i)}>
                    <View
                        style={{
                            width: 14,
                            height: 14,
                            borderRadius: 7,
                            marginHorizontal: 5,
                            backgroundColor: i === this.state.selectedIndex ? Colors.GREY : Colors.LIGHTGREY
                        }}
                    />
                </TouchableOpacity>
            )
        }
        // console.log('storeList-->', this.state.storeList)
        // console.log('storeList-->', this.state.selectedStoreName)
        // console.log('storeList-->', this.state.selectedStoreId)
        return (
            <View style={Styles.pageContainer}>
                <View style={{ backgroundColor: Colors.WHITE, paddingTop: Platform.OS == 'ios' ? (Matrics.screenHeight == 812 ? 30 : 20) : 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }} />
                    <View>
                        <Text style={{ textAlign: 'center', fontSize: Matrics.CountScale(18), top: 5, fontFamily: Fonts.NunitoSansRegular }}>Hire Packets</Text>
                        {/* <Dropdown
                            containerStyle={{ justifyContent: 'center' }}
                            pickerStyle={{ top: Matrics.headerHeight }}
                            data={this.state.storeList}
                            value={this.state.selectedStoreName}
                            onChangeText={(value, index, data) => this.onSelectStore(value, index, data)}
                            valueExtractor={({ DisplayStoreNumber }) => DisplayStoreNumber}
                            inputContainerStyle={{ borderBottomColor: 'transparent' }}
                            overlayStyle={{ borderWidth: 2 }}
                            dropdownOffset={{ left: 0 }}
                            // dropdownPosition={5}
                            fontSize={17}
                            itemCount={8}
                            rippleColor='white'
                            rippleCentered={true}
                            selectedTextStyle={{ textAlign: 'center'}}
                        /> */}
                        <Text style={{ textAlign: 'center', fontSize: Matrics.CountScale(18), top: 5, marginBottom: 10, fontFamily: Fonts.NunitoSansRegular }}>{this.state.selectedStoreName}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => { self.setState({ filterModal: true }) }}
                        style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1, marginRight: Matrics.CountScale(10) }}
                    >
                        <Image source={Images.FilterIcon} style={{ height: Matrics.CountScale(25), width: Matrics.CountScale(25), resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                {/* header end */}
                <View >
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity onPress={() => { this.onClickedActionRequired() }} >
                            <View style={[Styles.statusCardContainer, selected == 'ActionRequired' ? { backgroundColor: Colors.ACTIONREQUIRE } : { borderColor: Colors.ACTIONREQUIRE, borderWidth: 1.5 }]}>
                                <Text style={[Styles.countTextStyle, selected == 'ActionRequired' ? { color: Colors.WHITE } : { color: Colors.ACTIONREQUIRE }]}>{Object.keys(this.state.TitlesArr).length > 0 ? this.state.TitlesArr.ActionRequired : 0}</Text>
                                <Text style={[Styles.labelTextStyle, selected == 'ActionRequired' ? { color: Colors.WHITE } : { color: Colors.ACTIONREQUIRE }]}>Action Required</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.onClickedInProgress() }} >
                            <View style={[Styles.statusCardContainer, selected == 'InProgress' ? { backgroundColor: Colors.INPROGRESS } : { borderColor: Colors.INPROGRESS, borderWidth: 1.5 }]}>
                                <Text style={[Styles.countTextStyle, selected == 'InProgress' ? { color: Colors.WHITE } : { color: Colors.INPROGRESS }]}>{Object.keys(this.state.TitlesArr).length > 0 ? this.state.TitlesArr.InProcess : 0}</Text>
                                <Text style={[Styles.labelTextStyle, selected == 'InProgress' ? { color: Colors.WHITE } : { color: Colors.INPROGRESS }]}>In Process</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.onClickedCompleted() }} >
                            <View style={[Styles.statusCardContainer, selected == 'Completed' ? { backgroundColor: Colors.COMPLETED } : { borderColor: Colors.COMPLETED, borderWidth: 1.5 }]}>
                                <Text style={[Styles.countTextStyle, selected == 'Completed' ? { color: Colors.WHITE } : { color: Colors.COMPLETED }]}>{Object.keys(this.state.TitlesArr).length > 0 ? this.state.TitlesArr.Completed : 0}</Text>
                                <Text style={[Styles.labelTextStyle, selected == 'Completed' ? { color: Colors.WHITE } : { color: Colors.COMPLETED }]}>Completed</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.onClickedTotal() }} >
                            <View style={[Styles.statusCardContainer, selected == 'Total' ? { backgroundColor: Colors.TOTAL } : { borderColor: Colors.TOTAL, borderWidth: 1.5 }]}>
                                <Text style={[Styles.countTextStyle, selected == 'Total' ? { color: Colors.WHITE } : { color: Colors.TOTAL }]}>{Object.keys(this.state.TitlesArr).length > 0 ? this.state.TitlesArr.Total : 0}</Text>
                                <Text style={[Styles.labelTextStyle, selected == 'Total' ? { color: Colors.WHITE } : { color: Colors.TOTAL }]}>Total</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                {/* Filter end */}

                <View style={{ flex: 1 }}>
                    {
                        this.state.empListArr.length > 0
                            ?
                            // this.state.empListArr.map((res, index) => {
                            //     return(
                            //         <View style={{ flex: 1 }}>
                            //             <FlatList 
                            //                 data={res}
                            //                 renderItem={this._renderItem}
                            //             />
                            //         </View>
                            //     )
                            // })
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    extraData={this.state}
                                    data={this.state.empListArr[this.state.selectedIndex]}
                                    renderItem={this._renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    refreshControl={
                                        <RefreshControl
                                          refreshing={this.state.refreshing}
                                          onRefresh={this.onRefresh}
                                        />
                                    }
                                />
                                {
                                    this.state.Totalpage >  1
                                    ?  
                                        <View style={{ flexDirection: 'row', alignSelf: 'center', bottom: Matrics.CountScale(10), position: 'absolute' }}>
                                            {pagination}
                                        </View>
                                    : null
                                   
                                }
                            </View>
                            : <View style={{ flex: 1,justifyContent: 'center' }}>
                                {!this.state.loading
                                    ?
                                    <View style={{ alignItems: 'center' }}>
                                        <Text>No Data Found!!</Text>
                                    </View>
                                    : null
                                }
                            </View>

                    }
                </View>
                <Modal visible={this.state.filterModal}>
                    <View style={{ flex: 1 }}>
                        <Header centerText='Filter'
                            rightText='Save'
                            leftText='Cancel'
                            onLeftPress={() => this.setState({ 
                                filterModal: false,
                                selectedRoleId: this.state.lastFilterselectedRoleId,
                                selectedStores: this.state.lastFilterselectedStores, 
                                selectedStoreName: this.state.lastFilterselectedselectedStoreName,
                                selectedNOD: this.state.lastFilterselectedNOD,
                                selectedStatus: this.state.lastFilterselectedStatus
                            })}
                            onRightPress={() => {
                                console.log('save NOD->', this.state.selectedNOD);
                                console.log('save STATUS->', this.state.selectedStatus);
                                console.log('save ROLE->', this.state.selectedRoleId);
                                console.log('save STORE->',this.state.selectedStores);
                                empListData = [];
                                pageNumArr = [1];
                                let TileID = 0;
                                if (this.state.selected === 'Completed') {
                                    TileID = 1;
                                } else if (this.state.selected === 'ActionRequired') {
                                    TileID = 2;
                                } else if (this.state.selected === 'InProgress') {
                                    TileID = 3;
                                }
                                this.props.getCheckDocumentStatusHiringReturnRequest({
                                    RoleId: this.state.selectedRoleId,
                                    FilterId: -1,
                                    StoreId: this.state.selectedStores,
                                    BusinessTypeId: 1,
                                    NoOfDays: this.state.selectedNOD,
                                    TileID: TileID,
                                    StatusType: this.state.selectedStatus,
                                    PageNumber: 1,
                                    PageSize: perPageRecord,
                                });
                                this.setState({ 
                                    loading: true ,
                                    selectedIndex: 0,
                                    filterModal: false, 
                                    lastFilterselectedRoleId: this.state.selectedRoleId,
                                    lastFilterselectedStores: this.state.selectedStores,
                                    lastFilterselectedNOD: this.state.selectedNOD,
                                    lastFilterselectedStatus: this.state.selectedStatus,
                                    lastFilterselectedselectedStoreName: this.state.selectedStoreName,
                                })
                            }}
                        />
                        <View style={{ flex: 1, padding: Matrics.CountScale(10) }}>
                            <ScrollView>
                                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={[Styles.pickerLabelStyle, { paddingVertical: Matrics.CountScale(10) }]}>W/E</Text>
                                    <TouchableOpacity onPress={() => this._showDateTimePicker()}>
                                        <Text>{this.state.weekendDate ? this.state.weekendDate : 'Select Date'}</Text>
                                    </TouchableOpacity>
                                </View>
                                {
                                    this.state.isDateTimePickerVisible
                                    ?
                                    <CalendarPicker
                                        onDateChange={this._handleDatePicked}
                                        enableWeek="Tue"
                                        selectedDayColor="#139a46"
                                        previousTitle="<"
                                        nextTitle=">"
                                    />
                                    : null
                                }
                                <Text style={[Styles.errorText, { textAlign: 'right' }]}>{this.state.weekEndDateError}</Text> */}
                                <Text style={Styles.pickerLabelStyle}>Role</Text>
                                <Picker
                                    // mode={'dropdown'}
                                    // selectedValue={this.selectHours()}
                                    itemStyle={Styles.pickerItemStyle}
                                    // onValueChange={async (itemValue, itemIndex) => {
                                    //     if (this.state.Active == 'from') {
                                    //         await this.setState({ InHours: itemValue })
                                    //         this.updateValue()
                                    //     }
                                    //     else {
                                    //         await this.setState({ OutHours: itemValue })
                                    //         this.updateValue()
                                    //     }
                                    // }}
                                    selectedValue={this.state.selectedRoleId}
                                    onValueChange={value => this.setState({ selectedRoleId: value })}
                                >
                                    {this.getRole()}
                                </Picker>
                                <Text style={Styles.pickerLabelStyle}>Users</Text>
                                <Picker
                                    itemStyle={Styles.pickerItemStyle}
                                    selectedValue={this.state.selectedUsers}
                                    onValueChange={value => this.setState({ selectedUsers: value })}
                                >
                                    {this.getUsers()}
                                </Picker>
                                <Text style={Styles.pickerLabelStyle}>Stores</Text>
                                <Picker
                                    itemStyle={Styles.pickerItemStyle}
                                    selectedValue={this.state.selectedStores}
                                    onValueChange={value => { 
                                        const selectedStoreNameArr =  this.state.storeList.filter(s => s.StoreID == value);
                                        this.setState({ selectedStores: value, selectedStoreName: selectedStoreNameArr[0].DisplayStoreNumber })
                                    }}
                                >
                                    {this.getStores()}
                                </Picker>
                                <Text style={Styles.pickerLabelStyle}>No.OfDays</Text>
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
                                </Picker>
                            </ScrollView>
                        </View>
                        {/* <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                            date={this.state.weekendDate ? new Date(this.state.weekendDate) : new Date()}
                        /> */}
                    </View>
                </Modal>
                <LoadWheel visible={this.state.loading} />
            </View>
        );
    }

    cardPress() {

    }

    onRefresh = () => {
        let TileID = 0;
        if (this.state.selected === 'Completed') {
            TileID = 1;
        } else if (this.state.selected === 'ActionRequired') {
            TileID = 2;
        } else if (this.state.selected === 'InProgress') {
            TileID = 3;
        }
        this.setState({refreshing: true});
        this.props.getCheckDocumentStatusHiringReturnRequest({
            RoleId: this.state.selectedRoleId,
            FilterId: -1,
            StoreId: this.state.selectedStores,
            BusinessTypeId: 1,
            NoOfDays: this.state.selectedNOD,
            TileID: TileID,
            StatusType: this.state.selectedStatus,
            PageNumber: 1,
            PageSize: perPageRecord,
        });
    }

    _renderItem = ({ item, index }) => {
        // console.log('item-->', item);
        // console.log('recipientsListArr-->', this.state.recipientsListArr);
        const HiringData = {
            RoleId: this.state.selectedRoleId,
            FilterId: -1,
            StoreId: this.state.selectedStores,
            BusinessTypeId: 1,
            NoOfDays: this.state.selectedNOD,
            TileID: this.state.selctedTileID,
            StatusType: this.state.selectedStatus,
            PageNumber: this.state.selctedPageNumber,
            PageSize: perPageRecord,
        }
        return (
            <TouchableOpacity onPress={() => console.log(this.props)}>
                <Card
                    item={item}
                    recipientsListArr={this.state.recipientsListArr}
                    HiringData={HiringData}
                    navigation={this.props.navigation}
                    onVoidPress={(data) => {
                        this.props.getCheckDocumentStatusEnvelopVoidRequest({
                            DocusignEnvelopeID: data.DocusignEnvelopeID,
                            EnvelopeID: data.EnvelopeID,
                            UserStoreID: data.UserStoreID,
                            FormName: 'hiring'
                        });
                    }}
                    onResendPress={() => {  }}
                >
                </Card>
            </TouchableOpacity>
        );
    }
}

//======STYLES DECLARATION======//

const Styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        // justifyContent: "center",
        backgroundColor: Colors.BODYBACKGROUND
    },
    labelTextStyle: {
        fontSize: Matrics.CountScale(14),
        fontFamily: Fonts.NunitoSansRegular
    },
    countTextStyle: {
        fontSize: Matrics.CountScale(20),
        fontFamily: Fonts.NunitoSansRegular
    },
    statusCardContainer: {
        height: Matrics.CountScale(90),
        width: Matrics.CountScale(120),
        padding: Matrics.CountScale(15),
        marginLeft: Matrics.CountScale(10),
        marginTop: Matrics.CountScale(10),
        borderRadius: 4,
        backgroundColor: 'white'
    },
    pickerItemStyle: {
        fontSize: Matrics.CountScale(18),
        fontFamily: Fonts.NunitoSansRegular
    },
    pickerLabelStyle: {
        fontSize: Matrics.CountScale(16),
        fontFamily: Fonts.NunitoSansRegular
    },
    errorText: {
        color: 'red',
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: 14,
        marginLeft: Matrics.CountScale(15)
    },
});

//Props Connection
const mapStateToProps = (state) => {
    return {
        response: state,
        HirePacket: state.HirePacket,
    };
}
//Redux Connection  
export default connect(mapStateToProps, { getHeaderFilterValues, getCheckDocumentStatusHiringReturnRequest, getCheckDocumentStatusEnvelopVoidRequest })(CheckDoucmentStatus);


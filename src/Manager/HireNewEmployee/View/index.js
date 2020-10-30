// ======>>>>> Libraries <<<<<=========
import React from 'react';
import { View, Text, Platform, Switch, ScrollView, Image, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
// import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import DocumentPicker from 'react-native-document-picker';
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment';
import {Picker} from '@react-native-community/picker';
import { getStoreListWithSettingRequest, getStoreSettingDetailsListRequest, EmployeeExistenceCheckOnHiringRequest, HireNewEmployeeManageRequest } from '@Redux/Actions/HirePacketsActions';
import { getUserRoleRequest } from '@Redux/Actions/DashboardActions'
// ======>>>>> Assets <<<<<=========
import { Colors, Fonts, Matrics, Images, MasterCss } from '@Assets'
import { TextInputView, Button, LoadWheel } from "@Components";

// ======>>>>> Class Declaration <<<<<=========
class HireNewEmployee extends React.Component {
    
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Hire New Employee',
        headerTitleStyle: MasterCss.headerTitleStyle,
        headerRight: navigation.state.params && navigation.state.params.headerRight,
        headerLeft:
            <View />
    })

    //--------->>>State Initilization----------->>>
    state = {
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        store: "",
        posId: "",
        wageTypes: [{ type: 'Hourly', value: 3901 }, { type: 'Salary', value: 3902 }],
        wageRate: "",
        month: 'September',
        year: '2015',
        day: '25',
        position: '',
        process: false,
        EVerify: false,
        topSpace: 0,
        topStoreSpace: 0,
        loading: true,
        roleList: [],
        selectedStore: '',
        selectedStoreId: '',
        selectedStoreName: '',
        selectedWages: '',
        dateOfBirth: '',
        wageType: '',
        wageTypeId: '',
        selectedShopArr: [],
        MinorAge: '',
        isMinor: false,
        roleId: '',
        isBGCAutomated: false,
        isEverifyAutomated: false,
        PositionType: '',
        attachFile: '',
    };

    //------------>>>LifeCycle Methods------------->>>

    UNSAFE_componentWillMount() {
        this.roleListFlage = false;
        this.storeList = false;
       
        this.props.getUserRoleRequest({ UserTypeID: '9253', BusinessTypeId: 1, UserRoleGuid: '' });
        this.props.getStoreListWithSettingRequest({ BusinessTypeID: 1 });
     }

    componentDidMount() {
        this.props.navigation.setParams({
                headerRight: (
                    <TouchableOpacity onPress={() => { this.onClickOfSend() }} >
                        <Text style={MasterCss.headerRightTextStyle}>Send</Text>
                    </TouchableOpacity>
                )
        });
        setTimeout(() => {
            this.myComponent.measure((fx, fy, width, height, px, py) => {
                this.topSpace = py - 20
                this.topStoreSpace = py - 90
                this.setState({ topSpace:  this.topSpace, topStoreSpace: this.topStoreSpace})
            })
        }, 100);
    }


    async UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.userRole.getUserRoleListSuccess && this.state.loading) {
            this.roleListFlage = true;
            if(this.roleListFlage && this.storeList) 
                this.setState({ loading: false });

            let data = nextProps.userRole.data;
            // console.log('data-->role-->', data);
            if(data.Status === 1){
                const roleList = data.UserRoleList;
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
                  const sortedRoleList = sortBy(roleList, {
                    prop: "RoleLevel",
                    desc: true,
                    parser: function(item) { return new Date(item); }
                  });

                console.log('data-->role-->', sortedRoleList);
                await this.setState({ roleList: sortedRoleList })
                if (this.state.roleList.length > 0) {
                    this.getSelectedWageType();
                }
            }
        }
        if (nextProps.response.GetStoreListWithSettingSuccess && this.state.loading) {
            this.storeList = true;
            if(this.roleListFlage && this.storeList) 
                this.setState({ loading: false });

            let data = nextProps.response.data;
            if (data.Status === 1) {
                console.log('data123-->', data)
                this.setState({ storeWithSettingArr: data.Data });
            }
        } else if(nextProps.response.GetStoreSettingDetailsListSuccess) {
            let data = nextProps.response.data;
            if (data.Status === 1) {
                await this.setState({ storeSetingDetailList: data.setting });
                if(this.state.storeSetingDetailList.length > 0 ){
                    this.getStoreidforMinorAge();
                }
            }
        } else if(nextProps.response.EmployeeExistenceCheckOnHiringSuccess) {
            let data = nextProps.response.data;
            // console.log('hdata-->', data);
            if(data.Status === 0 && data.Message === 'No Record found!'){
                // this.hireEmployeeSaveData(); 
            } else if(data.Status === 1 && data.Data.length > 0) {
                this.setState({ loading: false });
                Alert.alert(
                    '',
                    'Employee Already Exists.',
                    [
                        {text: 'OK', onPress: () => console.log('allready exists'),},
                    ]
                );
            } else {
                this.setState({ loading: false });
            }
        }
        else if(nextProps.response.HireNewEmployeeManageSuccess) {
            let data = nextProps.response.data;
            console.log('hiredata-->', data);
            if(data.Status === 1) {
                this.setState({ loading: false });
            } else {
                this.setState({ loading: false });
                Alert.alert(
                    '',
                    data.Message,
                    [
                        {text: 'OK', onPress: () => console.log('error'),},
                    ]
                );
            }
        }
    }


    //------------->>>Controllers/Functions------------>>>>

    getSelectedWageType() {
        const lastElement = Array.from(this.state.roleList).pop();
        const firstElement = this.state.roleList[0];
        // console.log('lastelement-->', lastElement);
        // console.log('firstElement-->', firstElement);
        const wageType = firstElement.WageTypeName;
        const wageTypeId = firstElement.WageTypeID;
        this.setState({ wageType, wageTypeId, position: firstElement.RoleName, roleId: firstElement.RoleID, PositionType: firstElement.PositionType });
    }

    getStoreidforMinorAge() {
        if(this.state.storeSetingDetailList.length > 0){
            const settingDetailArr = this.state.storeSetingDetailList.filter(S => S.SettingName === 'minor age restriction');
            const storeId = settingDetailArr[0].StoreID;
            const storeData = this.state.storeWithSettingArr.filter(R => R.StoreID === storeId);
            const minorAge = storeData[0].MinorAgeValue;
            console.log('minorAge-->', minorAge);
            this.setState({ minorAge });
        }
    }
   
    async onSelectWageType(value, index, data) {
        await this.setState({ selectedWages: data[index].type, errorWageType: '', wageTypeId: data[index].value });
    }

    async onSelectStore(value, index, data) {
        console.log('onSelectStore-->', data,'----', index)
        console.log('selectedStore-->', data[index].DisplayStoreNumber)
        await this.setState({ selectedStore: data[index].DisplayStoreNumber, selectedStoreName: data[index].StoreNumber, selectedStoreId: data[index].StoreID, errorStore: '', 
            // posId: `${data[index].DisplayStoreNumber}-` 
        });
        let selectedShopArr = this.state.storeWithSettingArr.filter(R => R.StoreID === data[index].StoreID);
        console.log('selectedShopArr-->', selectedShopArr);
        const EVerify = selectedShopArr[0].IsEverifyAutomatedEnabled ? selectedShopArr[0].IsEverifyAutomatedEnabled : false;
        const process = selectedShopArr[0].IsBGCAutomatedEnabled ? selectedShopArr[0].IsBGCAutomatedEnabled : false;
        const isBGCAutomated = selectedShopArr[0].IsBGCAutomated ? selectedShopArr[0].IsBGCAutomated : false;
        const isEverifyAutomated = selectedShopArr[0].IsEverifyAutomated ? selectedShopArr[0].IsEverifyAutomated : false;

        this.props.getStoreSettingDetailsListRequest({ StoreId: data[index].StoreID });

        await this.setState({ selectedShopArr, EVerify, process, isBGCAutomated, isEverifyAutomated });
        console.log('array-->', selectedShopArr);
        // console.log('array-->storeid-->', data[index].StoreID);
        // console.log('array-->shop-->', selectedShopArr);
        // console.log('array-->everify-->', EVerify);
        // console.log('array-->process-->', process);
    }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleDatePicked = (date) => {
        let age = this.getAge(moment(date).format('YYYY/MM/DD'));
        console.log('age-->',age);
        console.log('minorAge-->',this.state.minorAge);
        this.hideDateTimePicker();
        if(age < 12 ){
            this.setState({ errorDob: 'Please Select Valid Date Of Birth.'})
        }else if(this.state.selectedStore!== '' && age < this.state.minorAge) {
            this.setState({ errorDob: '', isMinor: true});
            setTimeout(() => {
                Alert.alert(
                    '',
                    'Please note that this employee is a Minor. Therefore, employee is required to have a work permit. To continue the process and enter work permit information, please click Ok.',
                    [
                        {text: 'OK', onPress: () => this.props.navigation.navigate('Minor', { callbackData: this.callbackFunction}),},
                    ],
                    { tintColor: 'green' }
                );
            }, 500);
        } else {
            this.setState({ errorDob: ''});
        }
        this.setState({ dateOfBirth: moment(date).format('MMM DD, YYYY'), age })
        
    };

    getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    async onSelectFile() {
        // DocumentPicker.show({
        //     filetype: [DocumentPickerUtil.allFiles()],
        // }, (error, res) => {
        //     console.log('***name', res);
        //     if (res != null)
        //         this.setState({ attachFile: res.fileName, attachFilePath: res.uri })
        // });
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log('***name', res);
            if (res != null)
                this.setState({ attachFile: res.name, attachFilePath: res.uri })
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('cancel');
            } else {
                throw err;
            }
        }
    }

    callbackFunction = minorData => {
        console.log('minorData-->', minorData);
        this.setState({ minorData });
    }

    getWageType(position) {
        // console.log('itemvalue--> pos-->', position);
        let roleArr = this.state.roleList.filter(R => R.RoleName === position);
        // console.log('itemvalue--> pos-->', roleArr);
        // console.log('itemvalue--> pos-->', roleArr[0].WageTypeName);
        this.setState({ wageType: roleArr[0].WageTypeName, wageTypeId: roleArr[0].WageTypeID });
    } 

    onClickOfSend() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

        if (this.state.position === ''){
            this.setState({ errorPosition: 'Please Select The Position' });
        } 
        else if( this.state.firstName === '') {
            this.setState({ errorFirstName: 'Please Enter The FirstName' });
        } else if (this.state.lastName === ''){
            this.setState({ errorLastName: 'Please Enter The LastName' });
        } else if (this.state.email === ''){
            this.setState({ errorEmail: 'Please Enter The Email' });
        } else if (reg.test(this.state.email) === false){
            this.setState({ errorEmail: 'Please Enter Valid Email' });
        } else if (this.state.selectedStore === '' || this.state.selectedStore === 'Selecte Shop'){
            this.setState({ errorStore: 'Please Select The Store' });
        } else if (this.state.posId === ''){
            this.setState({ errorPosId: 'Please Enter The PosId' });
        } else if (this.state.posId === `${this.state.StoreID}-`){
            this.setState({ errorPosId: 'Please Enter The PosId' });
        }
        else if (this.state.wageRate === ''){
            this.setState({ errorwageRate: 'Please Enter The WageRate' });
        } else if (this.state.dateOfBirth === ''){
            this.setState({ errorDob: 'Please Select DateOfBirth' });
        } else if(this.state.age < this.state.minorAge) {
            this.setState({ isMinor: true });
            Alert.alert(
                '',
                'Please note that this employee is a Minor. Therefore, employee is required to have a work permit. To continue the process and enter work permit information, please click NEXT, or click cancel if employee needs to apply for a work permit.',
                [
                    {text: 'OK', onPress: () => this.props.navigation.navigate('Minor', { callbackData: this.callbackFunction}),},
                ],
                { tintColor: 'green' }
            );
        }
        else if(this.state.wageType === 'Hourly/Salary') {
            if (this.state.selectedWages === '' || this.state.selectedWages === 'Select WageType'){
                this.setState({ errorWageType: 'Please Select The WageType' });
            } else {
                this.EmployeeExistenceCheck();
            }
        }
        else {
            this.EmployeeExistenceCheck();
        }
    }

    EmployeeExistenceCheck() {
        console.log('on EmployeeExistenceCheck');
        this.setState({
            errorFirstName: '',
            errorLastName: '',
            errorEmail: '',
            errorStore: '',
            errorPosId: '',
            errorWageType: '',
            errorwageRate: '',
            errorPosition: '',
            loading: true,
        });
        const jsonData = {
            "FirstName": this.state.firstName,
            "MiddleName": this.state.middleName,
            "LastName": this.state.lastName,
            "StoreID": this.state.selectedStoreId,
            "EmpNumber": this.state.posId,
            "EmailID": this.state.email,
            "DoB": moment(this.state.dateOfBirth).format(),
            "PositionName": this.state.position,
            "WageTypeID": this.state.wageTypeId,
            "WageRate": this.state.wageRate,
            "isBGCAutomated": this.state.process,
            "StoreNumber": this.state.selectedStoreName,
            "DisplayStoreNumber": this.state.selectedStore,
            "EmpID":"",
            "RoleID": this.state.roleId,
            "isMinor": this.state.isMinor,
            "EmployeeStatus":"",
            "TempPassKey":"",
            "SaltKey":"",
            "SaltKeyIV":""
        };
        console.log('jsonDta-->', jsonData);
        this.props.EmployeeExistenceCheckOnHiringRequest({
            BusinessTypeID: 1,
            jsonData,
        })
    }

    hireEmployeeSaveData() {
        console.log('hireEmployeeSaveData');
        let jsonData = {};
        if(this.state.isMinor){
            jsonData = {"_objEmpDetail":
                {
                    "FirstName": this.state.FirstName,
                    "MiddleName": this.state.middleName,
                    "LastName": this.state.LastName,
                    "StoreID": this.state.selectedStoreId,
                    "EmpNumber": this.state.posId,
                    "EmailID": this.state.email,
                    "DoB": moment(this.state.dateOfBirth).format('MM/DD/YYYY'),
                    "RoleID": this.state.roleId,
                    "WageTypeID": this.state.wageTypeId,
                    "SalaryWageTypeID":-1,
                    "WageTypeName": this.state.wageType,
                    "WageRate": this.state.wageRate,
                    "isBGCAutomated": this.state.process,
                    "isEverifyAutomated": this.state.EVerify,
                    "CreatedBy":"Rohit Marwaha",
                    "SalaryTypeID":0,
                    "SalaryAmount":"",
                    "StoreNumber": this.state.selectedStoreName,
                    "DisplayStoreNumber": this.state.selectedStore,
                    "EmpID":"",
                    "isMinor": this.state.isMinor,
                    "EmployeeStatus":"",
                    "TempPassKey":"",
                    "SaltKey":"",
                    "SaltKeyIV":"",
                    "OTRate":"1.50",
                    "CompanyName":"SDSR, LLC",
                    "PositionType": this.state.PositionType,
                    "RoleName": this.state.position,
                    "PositionName": this.state.position
                },
                "_objMinorDetail": this.state.minorData
            }
        } else {
            jsonData = {"_objEmpDetail":
                {
                    "FirstName": this.state.FirstName,
                    "MiddleName": this.state.middleName,
                    "LastName": this.state.LastName,
                    "StoreID": this.state.selectedStoreId,
                    "EmpNumber": this.state.posId,
                    "EmailID": this.state.email,
                    "DoB": moment(this.state.dateOfBirth).format('MM/DD/YYYY'),
                    "RoleID": this.state.roleId,
                    "WageTypeID": this.state.wageTypeId,
                    "SalaryWageTypeID":-1,
                    "WageTypeName": this.state.wageType,
                    "WageRate": this.state.wageRate,
                    "isBGCAutomated": this.state.process,
                    "isEverifyAutomated": this.state.EVerify,
                    "CreatedBy":"Rohit Marwaha",
                    "SalaryTypeID":0,
                    "SalaryAmount":"",
                    "StoreNumber": this.state.selectedStoreName,
                    "DisplayStoreNumber": this.state.selectedStore,
                    "EmpID":"",
                    "isMinor": this.state.isMinor,
                    "EmployeeStatus":"",
                    "TempPassKey":"",
                    "SaltKey":"",
                    "SaltKeyIV":"",
                    "OTRate":"1.50",
                    "CompanyName":"SDSR, LLC",
                    "PositionType": this.state.PositionType,
                    "RoleName": this.state.position,
                    "PositionName": this.state.position
                },
                "_objMinorDetail":{}
            }
        }
        // this.props.HireNewEmployeeManageRequest({
        //     BusinessTypeId: 1,
        //     jsonData,
        // });
        // this.setState({ loading: false });
    }

    //----------->>>Render Method-------------->>>

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView onScrollEndDrag={() => setTimeout(() => {
                    this.myComponent.measure((fx, fy, width, height, px, py) => {
                        this.setState({ topSpace: py - 20, topStoreSpace: py - 90 })
                        // console.log(height)
                        // console.log(fx)
                        // console.log(py)
                        // console.log(fy)
                        // console.log('112....', py)
                    })

                }, 100)}>
                    <View style={Styles.pageBody}>
                        <Text style={Styles.cardHeaderText}>Position *</Text>
                        {this.employeePosition()}

                        <Text style={Styles.cardHeaderText}>Employee Details</Text>
                        {this.employeeDetails()}
                        
                        <Text style={Styles.cardHeaderText}>Date of Birth *</Text>
                        {this.employeeDateOfBirth()}
                        {
                            this.state.isMinor
                            ?
                                // <Text style={Styles.cardHeaderText}>Attach Documents</Text>
                                this.employeeDocuments()
                            : null
                        }
                        

                        <Text style={Styles.cardHeaderText}>Additional Options</Text>
                        {this.employeeOptions()}
                    </View>
                </ScrollView>
                <LoadWheel visible={this.state.loading} />
            </View>
        );
    }

    employeeDetails() {
        return (
            <View style={[Styles.cardContainer, { paddingTop: Matrics.CountScale(20) }]}>
                <TextInputView
                    label="First Name *"
                    fontSize={18}
                    value={this.state.firstName}
                    returnKeyType={"next"}
                    labelFontSize={14}
                    containerStyle={Styles.Input}
                    onChangeText={val => this.setState({ firstName: val, errorFirstName: '' })}
                    error={this.state.errorFirstName}
                />
                <TextInputView
                    label="Middle Name"
                    fontSize={18}
                    value={this.state.middleName}
                    labelFontSize={14}
                    containerStyle={Styles.Input}
                    returnKeyType={"next"}
                    onChangeText={val => this.setState({ middleName: val, })}
                    maxLength = {1}
                />
                <TextInputView
                    label="Last Name *"
                    fontSize={18}
                    containerStyle={Styles.Input}
                    labelFontSize={14}
                    value={this.state.lastName}
                    returnKeyType={"next"}
                    onChangeText={val => this.setState({ lastName: val, errorLastName: '' })}
                    error={this.state.errorLastName}
                />
                <TextInputView
                    label="Email *"
                    fontSize={18}
                    containerStyle={Styles.Input}
                    value={this.state.email}
                    labelFontSize={14}
                    returnKeyType={"next"}
                    onChangeText={val => this.setState({ email: val, errorEmail: '' })}
                    error={this.state.errorEmail}
                />
                {/* <View style={{ flexDirection: 'row' }}> */}
                    {console.log('selectedStore-->', this.state.selectedStore)}
                    <Dropdown
                        containerStyle={{
                            // alignSelf: 'flex-start',
                            top: Matrics.CountScale(20), marginLeft: Matrics.CountScale(10),
                            borderBottomColor: Colors.LIGHTGREY, borderBottomWidth: 1,
                            // textAlign: 'left',
                            // width: '100%',
                            // backgroundColor: 'blue',
                            // marginTop: Matrics.CountScale(10),
                            marginHorizontal: Matrics.CountScale(10)
                        }}
                        containerWidth={(Dimensions.get('window').width-50)}
                        data={this.state.storeWithSettingArr}
                        label="Store # *"
                        value={'Select Store'}
                        onChangeText={(value, index, data) => this.onSelectStore(value, index, data)}
                        valueExtractor={({ DisplayStoreNumber }) => DisplayStoreNumber}
                        inputContainerStyle={{ borderBottomColor: 'transparent',padding: 0, margin: 0 }}
                        itemTextStyle={{ textAlign: 'left' }}
                        overlayStyle={{ top: this.state.topStoreSpace, borderWidth: 0,}}
                        dropdownOffset={{ top: 0, left: 0 }}
                        fontSize={17}
                        itemCount={8}
                        rippleCentered={true}
                        error={this.state.errorStore}
                        labelFontSize={18}
                        rippleColor='white'
                        animationDuration= {300}
                        selectedTextStyle={{ textAlign: 'left'}}
                    />
                    <TextInputView
                        label="POS ID *"
                        fontSize={18}
                        containerStyle={[Styles.Input]}
                        value={this.state.posId}
                        labelFontSize={14}
                        returnKeyType={"next"}
                        onChangeText={val => this.setState({ posId: val, errorPosId: '' })}
                        error={this.state.errorPosId}
                        keyboardType='numeric'
                    />
                {/* </View> */}

                <View renderToHardwareTextureAndroid={true} ref={view => { this.myComponent = view; }}
                style={{ flexDirection: 'row',paddingVertical: Matrics.CountScale(10) }}
                >
                    <Text style={[Styles.labelTextStyle, { width: '50%' }]}>Wage Type</Text>
                    <Text style={Styles.wageTextStyle}>{this.state.wageType}</Text>
                </View>
                <View style={{ borderBottomColor: Colors.LIGHTGREY, borderBottomWidth: 1, marginHorizontal: Matrics.CountScale(10) }} />
                {
                    this.state.wageType === 'Hourly/Salary'
                    ?   
                        <View>
                            <View renderToHardwareTextureAndroid={true} ref={view => { this.myComponent = view; }} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: Matrics.CountScale(10)}}>
                                <Text style={Styles.labelTextStyle}>Wage Type</Text>
                                <Dropdown
                                    containerStyle={{ alignSelf: 'center' }}
                                    containerWidth={180}
                                    data={this.state.wageTypes}
                                    value={'Select WageType'}
                                    onChangeText={(value, index, data) => this.onSelectWageType(value, index, data)}
                                    valueExtractor={({ type }) => type}
                                    inputContainerStyle={{ borderBottomColor: 'transparent', alignSelf: 'stretch', padding: 0, margin: 0 }}
                                    itemTextStyle={{ textAlign: 'left' }}
                                    overlayStyle={{ top: this.state.topSpace, borderWidth: 0 }}
                                    dropdownOffset={{ top: 0, left: 0 }}
                                    fontSize={17}
                                    itemCount={8}
                                    rippleCentered={true}
                                    error={this.state.errorWageType}
                                    rippleColor='white'
                                    selectedTextStyle={{ textAlign: 'center'}}
                                />
                            </View>
                            <View style={{ borderBottomColor: Colors.LIGHTGREY, borderBottomWidth: 1, marginHorizontal: Matrics.CountScale(10) }} />
                        </View>
                    : null
                } 
                

                <TextInputView
                    label="Wage Rate *"
                    fontSize={18}
                    containerStyle={Styles.Input}
                    value={this.state.wageRate}
                    labelFontSize={14}
                    returnKeyType={"next"}
                    onChangeText={val => this.setState({ wageRate: val, errorwageRate: '' })}
                    error={this.state.errorwageRate}
                    keyboardType='numeric'
                />
            </View>
        )
    }
    employeeDateOfBirth() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear() - 12;
        let twelYearAbove = `${yyyy}-${mm}-${dd}`;

        // console.log('5year-->',twelYearAbove);
        
        return (
            <View style={Styles.cardContainer}>
                <TouchableOpacity style={{ padding: Matrics.CountScale(15), borderBottomColor: Colors.LIGHTGREY, borderBottomWidth: 1, marginHorizontal: Matrics.CountScale(10) }} onPress={() => this.showDateTimePicker()}>
                    <Text style={{ color: Colors.APPCOLOR, fontSize: Matrics.CountScale(18) }}>{this.state.dateOfBirth == '' ? 'Select Date' : this.state.dateOfBirth}</Text>
                </TouchableOpacity>
                <Text style={Styles.errorText}>{this.state.errorDob}</Text>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    // date={this.state.dateOfBirth ? new Date(this.state.dateOfBirth) : new Date(twelYearAbove)}
                    date={this.state.dateOfBirth ? new Date(this.state.dateOfBirth): new Date()}
                    // maximumDate={new Date(twelYearAbove)}
                    // maximumDate={new Date('2015-07-15')}
                />
            </View>
        )
    }
    employeeDocuments() {
        return (
            <View>
                <Text style={Styles.cardHeaderText}>Attach Documents</Text>
                <View style={[Styles.cardContainer, { flexDirection: 'row'}]}>
                    <TouchableOpacity style={Styles.documentContainer} onPress={() => { this.onSelectFile() }}>
                        <Image source={Images.AttachIcon} style={Styles.attachIconStyle}></Image>
                        <Text style={Styles.attachTextStyle}>Attach file</Text>
                    </TouchableOpacity>
                    <Text style={{ alignSelf: 'flex-end', padding: Matrics.CountScale(20), marginRight: Matrics.CountScale(10)}}>{this.state.attachFile ? this.state.attachFile : null}</Text>
                </View>
            </View>
        )
    }
    employeePosition() {
        let positionItems = this.state.roleList.map( (key, val) => {
            return <Picker.Item key={val} value={key.RoleID} label={key.RoleName} />
        });
        return (
            <View style={Styles.cardContainer}>
                <Picker
                    selectedValue={this.state.roleId}
                    style={{ flex: 1 }}
                    onValueChange={(itemValue, itemIndex) => {
                        const roleArr = this.state.roleList.filter(R => R.RoleID === itemValue);
                        const position = roleArr[0].RoleName;
                        const PositionType = roleArr[0].PositionType;
                        this.setState({ roleId: itemValue, position, PositionType });
                        this.getWageType(position);
                    }}>
                    {positionItems}
                </Picker>
                <Text style={Styles.errorText}>{this.state.errorPosition}</Text>
            </View>
        )
    }

    employeeOptions() {
        return (
            <View style={Styles.cardContainer}>
                {
                     this.state.selectedShopArr.length > 0 
                     ?
                     <View style={{ flex: 1, flexDirection: 'row', padding: Matrics.CountScale(10) }}>
                        <Text style={{ flex: 8, color: Colors.APPCOLOR, alignSelf: 'center' }}>
                            Process BGC
                        </Text>
                        <Switch
                             value={this.state.process}
                             style={{ alignSelf: "flex-end", justifyContent: 'flex-end', flex: 2 }}
                             onValueChange={() => {
                                 this.setState({ process: !this.state.process })
                             }}></Switch>
                     </View>
                     : null
                }
                {
                    this.state.selectedShopArr.length > 0 
                    ?
                        <View style={{ flex: 1, flexDirection: 'row', padding: Matrics.CountScale(10), borderBottomColor: Colors.LIGHTGREY, borderBottomWidth: 1 }}>
                            <Text style={{ flex: 8, color: Colors.APPCOLOR, alignSelf: 'center' }}>
                                Process E-Verify
                            </Text>
                            <Switch
                                value={this.state.EVerify}
                                style={{ alignSelf: "flex-end", justifyContent: 'flex-end', flex: 2 }}
                                onValueChange={() => {
                                    this.setState({ EVerify: !this.state.EVerify })
                                }}></Switch>
                        </View>
                    : null
                }
                {
                    this.state.selectedShopArr.length === 0
                    ?
                        <View>
                            <View style={{ flex: 1, flexDirection: 'row', padding: Matrics.CountScale(10), borderBottomColor: Colors.LIGHTGREY, borderBottomWidth: 1 }}>
                                <Text style={{ flex: 8, color: Colors.APPCOLOR, alignSelf: 'center' }}>
                                    Process E-Verify
                                </Text>
                                <Switch
                                    value={this.state.EVerify}
                                    style={{ alignSelf: "flex-end", justifyContent: 'flex-end', flex: 2 }}
                                    onValueChange={() => {
                                        this.setState({ EVerify: !this.state.EVerify })
                                    }}></Switch>
                            </View>
                                <View style={{ flex: 1, flexDirection: 'row', padding: Matrics.CountScale(10) }}>
                                <Text style={{ flex: 8, color: Colors.APPCOLOR, alignSelf: 'center' }}>
                                    Process BGC
                                </Text>
                                <Switch
                                    value={this.state.process}
                                    style={{ alignSelf: "flex-end", justifyContent: 'flex-end', flex: 2 }}
                                    onValueChange={() => {
                                        this.setState({ process: !this.state.process })
                                    }}></Switch>
                            </View>
                        </View>
                    : null
                }
                
            </View>
        )
    }
    
}

//======STYLES DECLARATION======//

const Styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: Colors.WHITE
    },
    pageBody: {
        padding: Matrics.CountScale(10)
    },
    cardHeaderText: {
        fontFamily: Fonts.NunitoSansRegular,
        color: Colors.GREY,
        paddingTop: Matrics.CountScale(15),
        fontSize: Matrics.CountScale(15),
        paddingBottom: Matrics.CountScale(15)

    },
    cardContainer: {
        backgroundColor: Colors.WHITE,
        borderRadius: 3,
    },
    Input: {
        margin: Matrics.CountScale(10),
    },
    documentContainer: {
        flex: 1,
        padding: Matrics.CountScale(20),
        flexDirection: 'row'
    },
    labelTextStyle: {
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(18),
        paddingLeft: Matrics.CountScale(10),
        color: Colors.DARK_GREY,
        // color: Colors.APPCOLOR
    },
    wageTextStyle: {
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(18),
        width: '50%'
    },
    attachIconStyle: {
        height: 20,
        width: 18
    },
    attachTextStyle: {
        marginLeft: Matrics.CountScale(10),
        color: Colors.APPCOLOR,
    },
    pickerContainer: {
        borderTopColor: '#ccc',
        marginTop: Matrics.CountScale(5),
        // borderTopWidth: Matrics.CountScale(1)
    },
    picker: {
        flex: 1,
        flexDirection: "row",
        height: Platform.OS === "ios" ? Matrics.CountScale(220) : null,
        borderBottomColor: '#ccc',
        // borderBottomWidth: Matrics.CountScale(1)
    },
    errorText: {
        color: 'red',
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(18),
        marginLeft: Matrics.CountScale(10),
    }
});

const mapStateToProps = (state) => {
    return {
        response: state.HirePacket,
        userRole: state.Dashboard,
    };
}

// export default HireNewEmployee;
export default connect(mapStateToProps, { getUserRoleRequest, getStoreListWithSettingRequest, getStoreSettingDetailsListRequest, EmployeeExistenceCheckOnHiringRequest, HireNewEmployeeManageRequest })(HireNewEmployee);


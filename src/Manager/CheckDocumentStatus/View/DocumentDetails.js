// ======>>>>> Libraries <<<<<=========
import React from 'react';
import { View, Image, ScrollView, Text, TouchableOpacity, Alert, StyleSheet, TextInput, Modal } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import _, { keys } from 'lodash';
import HTML from 'react-native-render-html';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { LoadWheel } from "@Components";
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import EIcon from 'react-native-vector-icons/Entypo';
import { CheckDocumentStatusEnvelopRecipientsEmailUpdate, getCheckDocumentStatusHiringReturnRequest, UpdateBGCEverifyStatusRequest, ProcessBGCEverifyRequest, UpdatePhotoMatchingDataRequest } from '../../../Redux/Actions/DocumentStatusActions';

// ======>>>>> Assets <<<<<=========
import { Colors, Fonts, Matrics, Images, MasterCss } from '@Assets'
import Header from '../../../Components/Common/Header';

// ======>>>>> Class Declaration <<<<<=========
class DocumentDetails extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.data.FirstName + ' ' + navigation.state.params.data.LastName,
        headerTitleStyle: MasterCss.headerTitleStyle,
        headerTintColor: Colors.APPCOLOR,
        headerLeft:
            <TouchableOpacity onPress={() => { 
                navigation.goBack();
            }} >
                <Image source={Images.BackIcon} style={MasterCss.headerIconStyle} />
            </TouchableOpacity>,
        headerRight: <View />
    })
    //--------->>>State Initilization----------->>>
    state = {
        selected: "Total",
        processing: false,
        oldRoleEmail: '',
        oldRoleName: '',
        isEmailEditable: false,
        loading: false,
        hireStatuShow: false,
        showEmployeeInfo: false,
        emailHeight: 10,
    };

    //------------>>>LifeCycle Methods------------->>>

    UNSAFE_componentWillMount() {
        const Employeedata = this.props.navigation.getParam('data');
        const recipientsList = this.props.navigation.getParam('recipientsListArr');
        const isEditable = this.props.navigation.getParam('isEditable');
        const HiringData = this.props.navigation.getParam('HiringData');
        this.setRecipeentslist(recipientsList);
        
        this.setState({ Employeedata, isEditable, HiringData, isVisible: false });
    }

    componentWillUnmount() { }

    async UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.response.CheckDocumentStatus.CheckDocumentStatusEnvelopRecipientsEmailUpdateSuccess) {
            let data = nextProps.response.CheckDocumentStatus.data;
            if(data.Status == 1) {
                this.setState({ isEmailEditable: false });
                this.props.getCheckDocumentStatusHiringReturnRequest(this.state.HiringData);
            } else {
                Alert.alert(
                    '',
                    'Something Wrong Please Try Again!!',
                    [
                        {text: 'OK',onPress: () => this.setState({ isEmailEditable: false, loading: false })},
                    ],
                    {cancelable: false},
                );
            }
        } else if(nextProps.response.CheckDocumentStatus.GetCheckDocumentStatusHiringReturnSucess && this.state.loading) {
            this.setState({ loading: false });
            let data = nextProps.response.CheckDocumentStatus.data;
            if (data.Status == 1) {
                const empListData = data.Report._list;
                const recipientsListArr = data.Report._recipientsList;
                const empData = empListData.filter(E => E.DocusignEnvelopeID == this.state.Employeedata.DocusignEnvelopeID);
                if(empData.length > 0){
                    this.setState({ Employeedata: empData[0] })
                }
                this.setRecipeentslist(recipientsListArr);
            }
        } else if(nextProps.response.CheckDocumentStatus.UpdateBGCEverifyStatusSuccess) {
            let data = nextProps.response.CheckDocumentStatus.data;
            if(data.Status > 0) {
                this.props.getCheckDocumentStatusHiringReturnRequest(this.state.HiringData);
            } else {
                Alert.alert(
                    '',
                    'Something Wrong Please Try Again!!',
                    [
                        {text: 'OK',onPress: () => this.setState({ loading: false })},
                    ],
                    {cancelable: false},
                );
            }
        } else if(nextProps.response.CheckDocumentStatus.ProcessBGCEverifySuccess) {
            let data = nextProps.response.CheckDocumentStatus.data;
            if(data.Status == 1) {
                this.props.getCheckDocumentStatusHiringReturnRequest(this.state.HiringData);
            } else {
                Alert.alert(
                    '',
                    'Something Wrong Please Try Again!!',
                    [
                        {text: 'OK',onPress: () => this.setState({ loading: false })},
                    ],
                    {cancelable: false},
                );
            }
        } else if(nextProps.response.CheckDocumentStatus.UpdatePhotoMatchingDataSuccess) {
            let data = nextProps.response.CheckDocumentStatus.data;
            console.log('photomatchingdata-->', data);
            if(data.Status == 1) {
                // this.props.getCheckDocumentStatusHiringReturnRequest(this.state.HiringData);
            } else {
                Alert.alert(
                    '',
                    'Something Wrong Please Try Again!!',
                    [
                        {text: 'OK',onPress: () => this.setState({ loading: false })},
                    ],
                    {cancelable: false},
                );
            }
        }
    }

    //------------->>>Controllers/Functions------------>>>>

    setRecipeentslist(recipientsList){
        let recipientsData = [];
        _.forEach(recipientsList, (res) => {
            if (_.some(recipientsData, { 'DocusignEnvelopeID': res.DocusignEnvelopeID })) {
                var index = recipientsData.findIndex(data => data.DocusignEnvelopeID == res.DocusignEnvelopeID);
                recipientsData[index].data.push(res)
            }
            else {
                let tmproledata = []
                tmproledata.push(res)
                recipientsData.push({ 'DocusignEnvelopeID': res.DocusignEnvelopeID, 'data': tmproledata })
            }
        });
        this.setState({ recipientsData });
    }

    onDoneClick(recipientsArr) {
        this.setState({ loading: true });
        const newRecipientsArr = recipientsArr.map(obj =>
            obj.RoleEmail === this.state.oldRoleEmail && obj.RoleName === this.state.oldRoleName ? { ...obj, NewRoleEmail: this.state.newEmail } : obj.NewRoleEmail == null ? { ...obj, NewRoleEmail: "" } : obj
        );
        this.props.CheckDocumentStatusEnvelopRecipientsEmailUpdate({
            EnvelopeID: this.state.Employeedata.EnvelopeID,
            jsonData: newRecipientsArr,
        });
    }



    //----------->>>Render Method-------------->>>

    render() {
        return (
            <View style={Styles.pageContainer}>
                <ScrollView>
                    {this.renderHireEmployee()}
                    {this.renderStatusLine()}
                    {/* {this.renderHirePacketStatus()} */}
                    {this.renderHireStatus()}
                    {this.EVerifyStatus()}
                    {this.backgroundCheckStatus()}
                </ScrollView>
                <Modal 
                    visible={this.state.showEmployeeInfo}
                    transparent={true}
                >
                    <View style={Styles.modalContainer}>
                        <View style={Styles.InnerContainer}>
                            <View style={Styles.modalHeader}>
                                <Text style={Styles.titleFontStyle}>Emplyee Basic Information</Text>
                                <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => this.setState({ showEmployeeInfo: false })}>
                                    <Image source={Images.Close} style={{ margin: Matrics.CountScale(15) }} />
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.infoContainer}>
                                <Text style={Styles.TitleText}>Employee Name: </Text>
                                <Text style={Styles.DataText}>{this.state.Employeedata.FirstName} {this.state.Employeedata.LastName}</Text>
                            </View>
                            <View style={Styles.infoContainer}>
                                <Text style={Styles.TitleText}>POS ID: </Text>
                                <Text style={Styles.DataText}>{this.state.Employeedata.EmployeeNumber}</Text>
                            </View>
                            {/* <View style={Styles.infoContainer}>
                                <Text style={Styles.TitleText}>First Name: </Text>
                                <Text style={Styles.DataText}>{this.state.Employeedata.FirstName}</Text>
                            </View>
                            <View style={Styles.infoContainer}>
                                <Text style={Styles.TitleText}>Middle Name: </Text>
                                <Text style={Styles.DataText}>{this.state.Employeedata.MiddleName}</Text>
                            </View>
                            <View style={Styles.infoContainer}>
                                <Text style={Styles.TitleText}>Last Name: </Text>
                                <Text style={Styles.DataText}>{this.state.Employeedata.LastName}</Text>
                            </View>
                            <View style={Styles.infoContainer}>
                                <Text style={Styles.TitleText}>Address: </Text>
                                <View>
                                <Text style={Styles.DataText}>{this.state.Employeedata.AddressLine1}</Text>
                                {
                                    this.state.Employeedata.AddressLine2 != '' &&
                                    <Text style={Styles.DataText}>{this.state.Employeedata.AddressLine2}</Text>
                                }
                                </View>
                            </View>
                            <View style={Styles.infoContainer}>
                                <Text style={Styles.TitleText}>City: </Text>
                                <Text style={Styles.DataText}>{this.state.Employeedata.City}</Text>
                            </View>
                            <View style={Styles.infoContainer}>
                                <Text style={Styles.TitleText}>State: </Text>
                                <Text style={Styles.DataText}>{this.state.Employeedata.StateName}</Text>
                            </View>
                            <View style={Styles.infoContainer}>
                                <Text style={Styles.TitleText}>Country: </Text>
                                <Text style={Styles.DataText}>{this.state.Employeedata.CountyName}</Text>
                            </View> */}
                            <View style={Styles.infoContainer}>
                                <Text style={Styles.TitleText}>Position: </Text>
                                <Text style={Styles.DataText}>{this.state.Employeedata.Position}</Text>
                            </View>
                            <View style={Styles.infoContainer}>
                                <Text style={Styles.TitleText}>Wage Type: </Text>
                                <Text style={Styles.DataText}>{this.state.Employeedata.WageTypeName}</Text>
                            </View>
                            <View style={Styles.infoContainer}>
                                <Text style={Styles.TitleText}>Wage Rate: </Text>
                                <Text style={Styles.DataText}>{this.state.Employeedata.WageRate}</Text>
                            </View>
                            {/* <View style={Styles.infoContainer}>
                                <Text style={Styles.TitleText}>Employee Status: </Text>
                                <Text style={Styles.DataText}>{this.state.Employeedata.EmployeeStatus}</Text>
                            </View> */}
                        </View>
                    </View>
                </Modal>
                <LoadWheel visible={this.state.loading} />
            </View >
        );
    }
    renderHireEmployee() {
        return (
            <View style={Styles.hireEmployeeCard}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={Styles.userImg}>
                        <Image style={[Styles.userIconStyle,{
                            tintColor: this.state.Employeedata.DisplayStatusName == 'Hiring Packet in process' ? Colors.RED : Colors.APPCOLOR,
                        }]} source={Images.UserIcon}></Image>
                    </View>

                    <View style={Styles.employeeStyle}>
                        <Text style={[Styles.employeeTextStyle, { color: this.state.Employeedata.DisplayStatusName == 'Hiring Packet in process' ? Colors.RED : Colors.APPCOLOR }]}>{
                            this.state.Employeedata ? this.state.Employeedata.DisplayStatusName.toLocaleUpperCase() : null}
                        </Text>
                    </View>

                    <TouchableOpacity style={Styles.infoImg} onPress={() => this.setState({ showEmployeeInfo: true })}>
                        <Image style={[Styles.infoIconStyle,{
                            tintColor: this.state.Employeedata.DisplayStatusName == 'Hiring Packet in process' ? Colors.RED : Colors.APPCOLOR,
                        }]} source={Images.InfoIcon}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    renderStatusLine() {
        let CDate = '';
        let Time = '';
        let recipientArr = [];
        if(this.state.Employeedata) {
            const DateArr = this.state.Employeedata.CreatedOn.split('T');
            CDate = moment(DateArr[0]).format('MM.DD.YYYY');
            Time = moment(DateArr[1], "h:mm A").format('hh:mm a');
        }
        if(this.state.recipientsData.length > 0){
            recipientArr = this.state.recipientsData.filter(R => R.DocusignEnvelopeID == this.state.Employeedata.DocusignEnvelopeID);
        }
        return (
            <View style={Styles.statusLineCard}>
                <Text style={Styles.shopNameTextStyle}>{this.state.Employeedata ? `Shop #${this.state.Employeedata.DisplayStoreNumber}`: null}</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.LIGHTGREY}}>
                    <Text style={Styles.sentByStatusTextStyle}>{this.state.Employeedata ? `Sent by ${this.state.Employeedata.SentBy}`: null} {CDate}</Text>
                </View>
                <View style={[Styles.hireStatusContainer, { margin: Matrics.CountScale(0),}]}>
                    {/* <Text style={[Styles.headerTextStyle, { textAlign: 'center', marginBottom: Matrics.CountScale(10) }]}>
                        Hire Packet Status
                    </Text> */}
                    {
                        recipientArr.length > 0 
                        ?   recipientArr[0].data.map((child, index) => {
                                const DateArr = child.Updated.split('T');
                                const CDate = moment(DateArr[0]).format('MM.DD.YYYY');
                                const Time = moment(DateArr[1], "h:mm A").format('hh:mm a');
                                return (
                                    <View key={index}
                                        style={{ 
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <View 
                                             style={{
                                            }}
                                        >
                                            <Image 
                                                style={{ 
                                                    width: 8,
                                                    alignSelf: 'center',
                                                    height: 8,
                                                    marginTop: index == 0 ? Matrics.CountScale(5) : 0,
                                                    marginRight: Matrics.CountScale(10),
                                                    // tintColor: child.StatusName == 'completed' ? Colors.APPCOLOR : Colors.RED,
                                                    tintColor: child.StatusName == 'completed' ? Colors.APPCOLOR : child.StatusName != 'created' ? Colors.RED : 'black' ,
                                                }} 
                                                source={Images.GreenDotIcon}
                                            />
                                            { recipientArr[0].data.length-1 != index &&
                                                <Image 
                                                    style={{ 
                                                        width: 2,
                                                        alignSelf: 'center',
                                                        height: 
                                                        // this.state.isVisible[index] 
                                                        this.state.isVisible 
                                                        ?  Matrics.CountScale(65)
                                                        :  Matrics.CountScale(15),
                                                        marginRight: Matrics.CountScale(10),
                                                        // tintColor: child.StatusName == 'completed' ? Colors.APPCOLOR : Colors.RED,
                                                        tintColor: child.StatusName == 'completed' ? Colors.APPCOLOR : child.StatusName != 'created' ? Colors.RED : 'black' ,
                                                    }} 
                                                    source={Images.LineIcon}
                                                />
                                            }
                                        </View>
                                        <View 
                                            style={{
                                            }}
                                        >
                                            <Text 
                                                style={{ 
                                                    color: child.StatusName == 'completed' ? Colors.APPCOLOR : child.StatusName != 'created' ? Colors.RED : null, 
                                                    marginBottom: Matrics.CountScale(5),
                                                }}
                                                onPress={() => {
                                                    // let Arr = this.state.isVisible;
                                                    // Arr[index] = !this.state.isVisible[index];
                                                    // this.setState({ isVisible: Arr });
                                                    this.setState({ isVisible: !this.state.isVisible });
                                                }}
                                            >
                                                {
                                                    child.StatusName == 'completed'
                                                    ? `Completed by ${child.RoleName}`
                                                    : child.StatusName == 'sent'  
                                                        ? `Sent to ${child.RoleName}`
                                                        : child.StatusName == 'created'  
                                                        ?`${child.RoleName} waiting`
                                                        : `${child.RoleName} - Invalid Email`
                                                }
                                            </Text>
                                            {
                                                this.state.isVisible &&
                                                <View style={{ marginLeft: Matrics.CountScale(15) }}>
                                                    <View style={{ flexDirection: 'row'}}>
                                                        <Text style={Styles.headerTextStyle}>Email:</Text>
                                                        {
                                                            this.state.isEmailEditable && this.state.selectedIndex == index
                                                            ? 
                                                                <View style={{ flexDirection: 'row', marginLeft: Matrics.CountScale(5)}}>
                                                                    <TextInput 
                                                                        onChangeText={(value) => { this.setState({ newEmail: value })}}
                                                                        value={this.state.newEmail}
                                                                        editable={this.state.isEmailEditable}
                                                                        style={{
                                                                                borderRadius: Matrics.CountScale(10),
                                                                                borderColor: 'black',
                                                                                borderWidth: 1,
                                                                                padding: Matrics.CountScale(8),
                                                                                width: Matrics.CountScale(200),
                                                                            }}
                                                                    />
                                                                    <MIcon name="done" onPress={() => this.onDoneClick( recipientArr[0].data)} style={{ marginLeft: Matrics.CountScale(5)}} color={Colors.PARROT} size={20} />
                                                                    <MIcon name="close" onPress={() => {this.setState({isEmailEditable: false}) }} style={{ marginLeft: Matrics.CountScale(5)}} size={20} />
                                                                </View>
                                                            : 
                                                                <View style={{ flexDirection: 'row', marginLeft: Matrics.CountScale(5)}}>
                                                                    <Text style={{ alignSelf: 'center' }}>{child.RoleEmail}</Text>
                                                                    {
                                                                        this.state.isEditable && this.state.Employeedata.StatusName != 'voided' && child.StatusName != 'completed' &&
                                                                        <Icon name='pencil-alt' onPress={() => {
                                                                            this.setState({
                                                                                isEmailEditable: true,
                                                                                selectedIndex: index,
                                                                                newEmail: child.RoleEmail,
                                                                                oldRoleEmail: child.RoleEmail,
                                                                                oldRoleName: child.RoleName
                                                                            }) 
                                                                        }} style={{ marginLeft: Matrics.CountScale(15)}} color="#03AAEE" size={20} />
                                                                    }
                                                                </View>
                                                        }
                                                    </View>
                                                    <View style={{ flexDirection: 'row'}}>
                                                        <Text style={Styles.headerTextStyle}>On: </Text>
                                                        <Text style={{ fontFamily: Fonts.NunitoSansRegular, alignSelf: 'center', fontSize: Matrics.CountScale(14) }}>
                                                            {
                                                                (child.StatusName == 'completed' ||
                                                                child.StatusName == 'declined' ||
                                                                child.StatusName == 'voided')
                                                                ? `${CDate}@${Time.toLocaleUpperCase()}`
                                                                : (child.StatusName != 'completed' ||
                                                                child.StatusName != 'declined' ||
                                                                child.StatusName != 'voided')
                                                                    ? 'Pending'
                                                                    : null
                                                            }
                                                        </Text>
                                                    </View>
                                                </View>
                                            } 
                                        </View>
                                    </View>
                                )
                            })
                        : null
                    }
                
                </View>
            </View>
        )
    }
    async renderHirePacketStatus() {
        let recipientArr = [];
        if(this.state.recipientsData.length > 0){
            recipientArr = this.state.recipientsData.filter(R => R.DocusignEnvelopeID == this.state.Employeedata.DocusignEnvelopeID);
        }
        return (
            <View style={Styles.hireStatusContainer}>
                <Text style={[Styles.headerTextStyle, { textAlign: 'center', borderBottomColor: Colors.APPCOLOR, borderBottomWidth: 1 }]}>Hire Packet Status</Text>
                {
                    recipientArr.length > 0
                    ?   recipientArr[0].data.map((child, index) => {
                            return (
                                <View key={index} style={{ borderBottomWidth: 1, borderBottomColor: Colors.LIGHTGREY, padding: Matrics.CountScale(10)}}>
                                    <Text style={{ color: child.StatusName == 'completed' ? Colors.APPCOLOR : Colors.RED, marginBottom: Matrics.CountScale(5) }}>
                                        {
                                            child.StatusName == 'completed'
                                            ? `Completed by ${child.RoleName}`
                                            : child.StatusName == 'sent'  
                                                ? `Sent to ${child.RoleName}`
                                                : `${child.RoleName} waiting`
                                        }
                                    </Text>
                                    <View style={{ flexDirection: 'row'}}>
                                        <Text style={Styles.headerTextStyle}>Email:</Text>
                                        {
                                            this.state.isEmailEditable && this.state.selectedIndex == index
                                            ? 
                                                <View style={{ flexDirection: 'row', marginLeft: Matrics.CountScale(5)}}>
                                                    <TextInput 
                                                        onChangeText={(value) => { this.setState({ newEmail: value })}}
                                                        value={this.state.newEmail}
                                                        editable={this.state.isEmailEditable}
                                                        style={{
                                                                borderRadius: Matrics.CountScale(10),
                                                                borderColor: 'black',
                                                                borderWidth: 1,
                                                                padding: Matrics.CountScale(8),
                                                                width: Matrics.CountScale(200),
                                                            }}
                                                    />
                                                    <MIcon name="done" onPress={() => this.onDoneClick( recipientArr[0].data)} style={{ marginLeft: Matrics.CountScale(5)}} color={Colors.PARROT} size={20} />
                                                    <MIcon name="close" onPress={() => {this.setState({isEmailEditable: false}) }} style={{ marginLeft: Matrics.CountScale(5)}} size={20} />
                                                </View>
                                            : 
                                                <View style={{ flexDirection: 'row', marginLeft: Matrics.CountScale(5)}}>
                                                    <Text style={{ alignSelf: 'center' }}>{child.RoleEmail}</Text>
                                                    {
                                                        this.state.isEditable &&
                                                        <Icon name='pencil-alt' onPress={() => {
                                                            this.setState({
                                                                isEmailEditable: true,
                                                                selectedIndex: index,
                                                                newEmail: child.RoleEmail,
                                                                oldRoleEmail: child.RoleEmail,
                                                                oldRoleName: child.RoleName
                                                            }) 
                                                        }} style={{ marginLeft: Matrics.CountScale(15)}} color="#03AAEE" size={20} />
                                                    }
                                                </View>
                                        }
                                    </View>
                                </View>
                            )
                        })
                    : null
                }
               
            </View>
        )
    }

    renderHireStatus() {
        let pdf = this.state.Employeedata ? this.state.Employeedata.HiringFilePath ? true : false : false;
        const htmlContent = this.state.Employeedata ? this.state.Employeedata.LogValue : null;
        const tags = _.without(IGNORED_TAGS, 
            'table', 'caption', 'col', 'colgroup', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr'
        )
        
        const tableDefaultStyle = {
          flex: 1,
          justifyContent: 'flex-start',
        }
        
        const tableColumnStyle = {
          ...tableDefaultStyle,
          flexDirection: 'column',
          alignItems: 'stretch'
        }
        
        const tableRowStyle = {
          ...tableDefaultStyle,
          flexDirection: 'row',
          alignItems: 'stretch'
        }
        
        const tdStyle = {
          ...tableDefaultStyle,
          padding: 2
        }
        
        const thStyle = {
          ...tdStyle,
          backgroundColor: '#CCCCCC',
          alignItems: 'center',
        }
        
        const renderers = {
            table: (x, c) => <View style={tableColumnStyle}>{c}</View>,
            col: (x, c) => <View style={tableColumnStyle}>{c}</View>,
            colgroup: (x, c) => <View style={tableRowStyle}>{c}</View>,
            tbody: (x, c) => <View style={tableColumnStyle}>{c}</View>,
            tfoot: (x, c) => <View style={tableRowStyle}>{c}</View>,
            th: (x, c) => <View style={thStyle}>{c}</View>,
            thead: (x, c) => <View style={tableRowStyle}>{c}</View>,
            caption: (x, c) => <View style={tableColumnStyle}>{c}</View>,
            tr: (x, c) => <View style={tableRowStyle}>{c}</View>,
            td: (x, c) => <View style={tdStyle}>{c}</View>
          }

        return (
            <View style={Styles.hireStatusContainer}>
                <View style={Styles.hireStatusCardHeader}>
                    <View style={Styles.hireStatusHeaderCardPart1}>
                        {this.renderStatusIndicatorIcon(this.state.Employeedata.DisplayStatusName, 'Hirestatus')}
                    </View>
                    <View style={Styles.hireStatusHeaderCardPart2}>
                        <TouchableOpacity style={Styles.headerTextContainer} onPress={() => this.setState({ hireStatuShow: !this.state.hireStatuShow })}>
                            <Text style={Styles.headerTextStyle}>Hire Status</Text>
                            <Text style={Styles.headerSubTextStyle}>{this.state.Employeedata ? this.state.Employeedata.DisplayStatusName : null}</Text>
                        </TouchableOpacity>
                        <View style={Styles.pdfContainer}>

                            {this.renderPDFimg(pdf)}
                        </View>
                    </View>
                </View>
                {
                    this.state.hireStatuShow &&
                    <View style={{ flex: 1, marginTop: Matrics.CountScale(5) }}>
                        <HTML html={htmlContent} ignoredTags={tags} renderers={renderers} />
                    </View>
                }
            </View>
        );
    }
    renderStatusIndicatorIcon(val, status) {
        if (val == 'Employee Created' && status == 'Hirestatus' )
            return (<Image style={{ width: Matrics.CountScale(15), height: Matrics.CountScale(15), marginTop: Matrics.CountScale(6), marginRight: Matrics.CountScale(5) }} source={Images.RightIcon}></Image>)
        else if ((val == 'E-Verification completed' || val == 'Manually Approved') && status == 'E-Verify' ) 
            return (<Image style={{  width: Matrics.CountScale(15), height: Matrics.CountScale(15), marginTop: Matrics.CountScale(6), marginRight: Matrics.CountScale(5) }} source={Images.RightIcon}></Image>)
        else if ((val == 'Manually Approved' || val == 'BGC Approved')&& status == 'BGC' ) 
            return (<Image style={{  width: Matrics.CountScale(15), height: Matrics.CountScale(15), marginTop: Matrics.CountScale(6), marginRight: Matrics.CountScale(5) }} source={Images.RightIcon}></Image>)
        else
            return (<Image style={{ width: Matrics.CountScale(15), height: Matrics.CountScale(15), marginTop: Matrics.CountScale(6), marginRight: Matrics.CountScale(5) }} source={Images.ClockIcon} ></Image >)
    }
    renderPDFimg(val) {
        if (val)
            return <Image style={{ width: 25, height: 32 }} source={Images.GreenPDFIcon}></Image>
        else
            return <Image style={{ width: 25, height: 32 }} source={Images.GreyPDFIcon}></Image>
    }
    EVerifyStatus() {
        let EVerify = this.state.Employeedata ? this.state.Employeedata.EverifyFilePath ? true : false : false;
        console.log('Employeedata-->', this.state.Employeedata)
        return (
            <View style={Styles.hireStatusContainer}>
                <View style={Styles.hireStatusCardHeader}>
                    <View style={Styles.hireStatusHeaderCardPart1}>
                        {this.renderStatusIndicatorIcon(this.state.Employeedata.EverifyStatus, 'E-Verify')}
                    </View>
                    <View style={[Styles.hireStatusHeaderCardPart2, { borderBottomWidth: 0 }]}>
                        <View style={Styles.headerTextContainer}>
                            <Text style={Styles.headerTextStyle}>E-Verify Status :</Text>
                            <Text style={Styles.headerSubTextStyle}>{this.state.Employeedata.EverifyStatus !== null ? this.state.Employeedata.EverifyStatus : 'Do you want to process E-Verify ?'}</Text>
                        </View>
                        <View style={Styles.pdfContainer}>
                            {this.renderPDFimg(EVerify)}
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Menu
                            ref={(r) => this._Everifymenu = r}
                            button={<EIcon name="dots-three-vertical" color={Colors.GREY} size={25} onPress={() => this._Everifymenu.show()} />}
                        >
                            {this.state.Employeedata.EverifyStatus !== null 
                            ?
                                <View>
                                    <MenuItem onPress={() =>  {
                                        this.props.UpdateBGCEverifyStatusRequest({ EmpHiringID:this.state.Employeedata.EmpHiringID, IsEverify:true, IsApproved:true  });
                                        this.setState({ loading: true });
                                        this._Everifymenu.hide();
                                    }}>
                                        Manually Approve E-Verify
                                    </MenuItem>
                                    <MenuItem onPress={() => { 
                                        this.props.UpdateBGCEverifyStatusRequest({ EmpHiringID:this.state.Employeedata.EmpHiringID, IsEverify:true, IsApproved:false });
                                        this.setState({ loading: true });
                                        this._Everifymenu.hide()
                                    }}>
                                        Manually Disapprove E-Verify
                                    </MenuItem>
                                    
                                </View>
                               
                            :
                                <MenuItem onPress={() => {
                                    this.props.ProcessBGCEverifyRequest({ EmpHiringID:this.state.Employeedata.EmpHiringID ,IsBGCFlag: false });
                                    this.setState({ loading: true });
                                    this._Everifymenu.hide();
                                }}>Process E-Verify</MenuItem>
                            }
                            {
                                this.state.Employeedata.IsPhotoMatchingRequired && this.state.Employeedata.Photo &&
                                <MenuItem onPress={() =>  {
                                    this.props.UpdatePhotoMatchingDataRequest({ EmpHiringID: this.state.Employeedata.EmpHiringID, isPhotoMatched: true });
                                    this._Everifymenu.hide()
                                }}>Photo Match</MenuItem>
                            }
                        </Menu>
                    </View>
                </View>
            </View>
        )
    }
    backgroundCheckStatus() {
        let BGC = this.state.Employeedata ? this.state.Employeedata.BGCFilePath ? true : false : false;
        return (
            <View style={[Styles.hireStatusContainer, { bottom: Matrics.CountScale(20)}]}>
                <View style={Styles.hireStatusCardHeader}>
                    <View style={Styles.hireStatusHeaderCardPart1}>
                        {this.renderStatusIndicatorIcon(this.state.Employeedata.BGCStatus, 'BGC')}
                    </View>
                    <View style={[Styles.hireStatusHeaderCardPart2, { borderBottomWidth: 0 }]}>
                        <View style={Styles.headerTextContainer}>
                            <Text style={Styles.headerTextStyle}>Background Check Status :</Text>
                            <Text style={Styles.headerSubTextStyle}>{this.state.Employeedata.BGCStatus !== null ? this.state.Employeedata.BGCStatus : 'Do you want to process BGC ?'}</Text>
                        </View>
                        <View style={Styles.pdfContainer}>
                            {this.renderPDFimg(BGC)}
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', bottom: Matrics.CountScale(10) }}>
                        <Menu
                            ref={(r) => this._Bgcmenu = r}
                            button={<EIcon name="dots-three-vertical" color={Colors.GREY} size={25} onPress={() => this._Bgcmenu.show()} />}
                        >
                            {this.state.Employeedata.BGCStatus !== null 
                            ?
                            <View>
                                <MenuItem onPress={() =>  {
                                    this.props.UpdateBGCEverifyStatusRequest({EmpHiringID:this.state.Employeedata.EmpHiringID, IsEverify:false, IsApproved:true});
                                    this.setState({ loading: true });
                                    this._Bgcmenu.hide();
                                }}>Manually Approve BGC</MenuItem>
                                <MenuItem onPress={() =>  {
                                    this.props.UpdateBGCEverifyStatusRequest({ EmpHiringID:this.state.Employeedata.EmpHiringID, IsEverify:false, IsApproved:false });
                                    this.setState({ loading: true });
                                    this._Bgcmenu.hide();
                                }}>Manually Disapprove BGC</MenuItem>
                                
                            </View>
                           
                        :
                            <MenuItem onPress={() => {
                                    this.props.ProcessBGCEverifyRequest({ EmpHiringID:this.state.Employeedata.EmpHiringID ,IsBGCFlag: true });
                                    this.setState({ loading: true });
                                    this._Bgcmenu.hide();
                            }}>Process BGC</MenuItem>
                        }
                        </Menu>
                    </View>
                </View>
            </View>
        )
    }
}

//======STYLES DECLARATION======//

const Styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: Colors.BODYBACKGROUND
    },
    hireEmployeeCard: {
        margin: Matrics.CountScale(13),
        marginBottom: 0,
        borderRadius: 4,
        height: 45,
        backgroundColor: Colors.WHITE
    },
    userImg: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30, flex: 0.2
    },
    employeeStyle: {
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 30, flex: 1,
    },
    infoImg: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        height: 30, flex: 0.2,
    },
    employeeTextStyle: {
        fontFamily: Fonts.NunitoSansSemiBold,
        fontSize: Matrics.CountScale(15),
        color: Colors.APPCOLOR
    },
    userIconStyle: {
        height: 15,
        width: 13
    },
    infoIconStyle: {
        height: 20,
        width: 20
    },
    hiringTextStyle: {
        fontFamily: Fonts.NunitoSansSemiBold,
        fontSize: Matrics.CountScale(15),
        color: Colors.RED
    },
    statusLineCard: {
        margin: Matrics.CountScale(13),
        marginBottom: 0,
        padding: Matrics.CountScale(15),
        backgroundColor: Colors.WHITE
    },
    shopNameTextStyle: {
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(18),
    },
    sentByStatusTextStyle: {
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(13),
        color: Colors.GREY,
        paddingBottom: 5,
    },
    hireStatusContainer: {
        margin: Matrics.CountScale(13),
        marginBottom: 0,
        backgroundColor: Colors.WHITE,
        padding: Matrics.CountScale(15),
        borderRadius: 4
    },
    hireStatusCardHeader: {
        flex: 0.2,
        flexDirection: 'row',
    },
    headerTextStyle: {
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(18),
    },
    headerSubTextStyle: {
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(14),
        color: Colors.GREY
    },
    headerTextContainer: {
        flex: 1,
    },
    pdfContainer: {
        alignItems: 'center',
        flex: 0.2,
        padding: Matrics.CountScale(5)
    },
    hireStatusHeaderCardPart1: {
        // flex: 0.1,
    },
    hireStatusHeaderCardPart2: {
        borderBottomColor: Colors.LIGHTGREY,
        borderBottomWidth: 1,
        flex: 1, flexDirection: 'row'
    },
    TitleText: {
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(16),
        color: Colors.GREY,
        fontWeight: 'bold'
    },
    DataText: {
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(16),
        color: Colors.GREY
    },
    infoContainer: {
        flexDirection: 'row',
        padding: Matrics.CountScale(10),
        borderBottomColor: Colors.LIGHTGREY,
        borderBottomWidth: 1,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
    },
    InnerContainer: {
        backgroundColor: Colors.WHITE,
        marginHorizontal: Matrics.CountScale(20),
    },
    modalHeader: {
        backgroundColor: Colors.APPCOLOR,
        flexDirection: 'row'
    },
    titleFontStyle:{
        fontSize: Matrics.CountScale(15),
        color: 'white',
        paddingVertical: Matrics.CountScale(15),
        flex: 1,
        marginLeft: Matrics.CountScale(10),
        fontWeight: 'bold',
    }
});

const mapStateToProps = (state) => {
    return {
        response: state,
    };
}

export default connect(mapStateToProps, { CheckDocumentStatusEnvelopRecipientsEmailUpdate, getCheckDocumentStatusHiringReturnRequest, UpdateBGCEverifyStatusRequest, ProcessBGCEverifyRequest, UpdatePhotoMatchingDataRequest })(DocumentDetails);


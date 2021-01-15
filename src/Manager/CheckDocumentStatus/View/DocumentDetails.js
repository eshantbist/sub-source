// ======>>>>> Libraries <<<<<=========
import React from 'react';
import { View, Image, ScrollView, Text, TouchableOpacity, Alert, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
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
        //     headerStyle: styles.headerStyle,
        headerTintColor: Colors.APPCOLOR,
        headerLeft:
            <TouchableOpacity onPress={() => { navigation.goBack() }} >
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
    };

    //------------>>>LifeCycle Methods------------->>>

    UNSAFE_componentWillMount() {
        console.log(this.props.navigation.getParam('data'));
        Employeedata = this.props.navigation.getParam('data');
        recipientsList = this.props.navigation.getParam('recipientsListArr');
        isEditable = this.props.navigation.getParam('isEditable');
        HiringData = this.props.navigation.getParam('HiringData');
        console.log('HiringData-->',HiringData)
        // console.log('recipientsList-->', recipientsList)
        this.setRecipeentslist(recipientsList);
        
        this.setState({ Employeedata, isEditable, HiringData });
    }


    componentWillUnmount() { }

    async UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.response.CheckDocumentStatus.CheckDocumentStatusEnvelopRecipientsEmailUpdateSuccess) {
            // this.setState({ loading: false });
            let data = nextProps.response.CheckDocumentStatus.data;
            if(data.Status == 1) {
                console.log('success');
                this.setState({ isEmailEditable: false });
                console.log('HiringData-->',this.state.HiringData)
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
            // console.log('data-->', data);
        } else if(nextProps.response.CheckDocumentStatus.GetCheckDocumentStatusHiringReturnSucess && this.state.loading) {
            this.setState({ loading: false });
            let data = nextProps.response.CheckDocumentStatus.data;
            if (data.Status == 1) {
                const empListData = data.Report._list;
                const recipientsListArr = data.Report._recipientsList;
                console.log('after old DocusignEnvelopeID-->', this.state.Employeedata.DocusignEnvelopeID);
                console.log('after empList-->', empListData)
                console.log('after reciplist-->', recipientsListArr)
                empData = empListData.filter(E => E.DocusignEnvelopeID == this.state.Employeedata.DocusignEnvelopeID);
                console.log('after Employeedata-->', Employeedata)
                if(empData.length > 0){
                    this.setState({ Employeedata: empData[0] })
                }
                this.setRecipeentslist(recipientsListArr);
            }
        } else if(nextProps.response.CheckDocumentStatus.UpdateBGCEverifyStatusSuccess) {
            let data = nextProps.response.CheckDocumentStatus.data;
            // console.log('update manual data-->', data);
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
        } else if(nextProps.response.CheckDocumentStatus.ProcessBGCEverifySuccess) {
            let data = nextProps.response.CheckDocumentStatus.data;
            // console.log('processbgceverifydata-->', data);
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
        console.log('recipientsData-->', recipientsData)
        this.setState({ recipientsData });
    }

    onDoneClick(recipientsArr) {
        this.setState({ loading: true });
        console.log('envolopid-->', this.state.Employeedata.EnvelopeID);
        console.log('envolopid-->', recipientsArr);
        console.log('oldRoleEmail-->', this.state.oldRoleEmail);
        console.log('oldRoleName-->', this.state.oldRoleName);
        console.log('newEmail-->', this.state.newEmail);
        const newRecipientsArr = recipientsArr.map(obj =>
            obj.RoleEmail === this.state.oldRoleEmail && obj.RoleName === this.state.oldRoleName ? { ...obj, NewRoleEmail: this.state.newEmail } : obj.NewRoleEmail == null ? { ...obj, NewRoleEmail: "" } : obj
        );
        console.log('newRecipientsArr-->', newRecipientsArr);
        this.props.CheckDocumentStatusEnvelopRecipientsEmailUpdate({
            EnvelopeID: this.state.Employeedata.EnvelopeID,
            jsonData: newRecipientsArr,
        });
    }



    //----------->>>Render Method-------------->>>

    render() {
        console.log('kk-->', this.state.Employeedata)
        return (
            <View style={Styles.pageContainer}>
                {/* ----------->>> Header Start-------------->>> */}
                {/* <Header
                    centerText={data.name}
                    leftImage={Images.BackIcon}
                    onLeftPress={(val) => {
                        this.props.navigation.goBack();
                        console.log(this.props);
                    }}
                    leftImageStyle={{ top: -7, height: 20, width: 10 }}
                /> */}
                {/* ----------->>> Header End -------------->>> */}
                <ScrollView>
                    {this.renderHireEmployee()}
                    {this.renderStatusLine()}
                    {this.renderHirePacketStatus()}
                    {this.renderHireStatus()}
                    {this.EVerifyStatus()}
                    {this.backgroundCheckStatus()}
                </ScrollView>
                <LoadWheel visible={this.state.loading} />
            </View >
        );
    }
    renderHireEmployee() {
        return (
            <View style={Styles.hireEmployeeCard}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={Styles.userImg}>
                        <Image style={Styles.userIconStyle} source={Images.UserIcon}></Image>
                    </View>

                    <View style={Styles.employeeStyle}>
                        <Text style={[Styles.employeeTextStyle, { color: this.state.Employeedata.DisplayStatusName == 'Hiring Packet in process' ? Colors.DARKRED : Colors.APPCOLOR }]}>{
                            this.state.Employeedata ? this.state.Employeedata.DisplayStatusName.toLocaleUpperCase() : null}
                        </Text>
                    </View>

                    <TouchableOpacity style={Styles.infoImg}>
                        <Image style={Styles.infoIconStyle} source={Images.InfoIcon}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            // <TouchableOpacity style={Styles.hireEmployeeCard}
            //     onPress={() => {
            //         this.setState({
            //             processing: !this.state.processing
            //         })
            //     }}
            // >
            //     {!this.state.processing &&

            //         < View style={{ flex: 1, flexDirection: 'row' }}>
            //             <View style={Styles.userImg}>
            //                 <Image style={Styles.userIconStyle} source={Images.UserIcon}></Image>
            //             </View>

            //             <View style={Styles.employeeStyle}>
            //                 <Text style={Styles.employeeTextStyle}>EMPLOYEE CREATED</Text>
            //             </View>

            //             <View style={Styles.infoImg}>
            //                 <Image style={Styles.infoIconStyle} source={Images.InfoIcon}></Image>
            //             </View>
            //         </View>
            //     }
            //     {this.state.processing &&

            //         < View style={{ flex: 1, flexDirection: 'row' }}>
            //             <View style={Styles.userImg}>
            //                 <Image style={Styles.infoIconStyle} source={Images.LoadingIcon}></Image>
            //             </View>

            //             <View style={Styles.employeeStyle}>
            //                 <Text style={Styles.hiringTextStyle}>HIRING IN PROGRESS</Text>
            //             </View>

            //             <View style={Styles.infoImg}>
            //                 <Image style={Styles.infoIconStyle} source={Images.InfoIcon}></Image>
            //             </View>
            //         </View>
            //     }
            // </TouchableOpacity>
        )
    }
    renderStatusLine() {
        let CDate = '';
        let Time = '';
        if(this.state.Employeedata) {
            const DateArr = this.state.Employeedata.CreatedOn.split('T');
            CDate = moment(DateArr[0]).format('MM-DD-YYYY');
            Time = moment(DateArr[1], "h:mm A").format('hh:mm a');
        }
        return (
            <View style={Styles.statusLineCard}>
                <Text style={Styles.shopNameTextStyle}>{this.state.Employeedata ? `Shop #${this.state.Employeedata.DisplayStoreNumber}`: null}</Text>
                <Text style={Styles.sentByStatusTextStyle}>{this.state.Employeedata ? `SentBy ${this.state.Employeedata.SentBy}`: null} {CDate}@{Time.toLocaleUpperCase()}</Text>
                <View style={{ flexDirection: 'row',marginTop: Matrics.CountScale(10) }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Image style={{ width: 6, alignSelf: 'center', height: 6, marginTop: Matrics.CountScale(5), marginRight: Matrics.CountScale(10), marginBottom: Matrics.CountScale(2) }} source={Images.GreenDotIcon}></Image>
                        <Image style={{ width: 2, alignSelf: 'center', height: 10, marginRight: Matrics.CountScale(10) }} source={Images.LineIcon}></Image>
                    </View>
                    <View>
                        <Text style={{ color: Colors.APPCOLOR }}>Completed By Employee</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Image style={{ width: 2, alignSelf: 'center', height: 10, marginRight: Matrics.CountScale(10), marginBottom: Matrics.CountScale(2) }} source={Images.LineIcon}></Image>
                        <Image style={{ width: 6, alignSelf: 'center', height: 6, marginBottom: Matrics.CountScale(5), marginRight: Matrics.CountScale(10) }} source={Images.RedDotIcon}></Image>
                    </View>
                    <View>
                        <Text style={{ color: Colors.DARKRED }}>Send To HR Rep</Text>
                    </View>
                </View>
            </View>
        )
    }
    renderHirePacketStatus() {
        let recipientArr = [];
        if(this.state.recipientsData.length > 0){
            recipientArr = this.state.recipientsData.filter(R => R.DocusignEnvelopeID == this.state.Employeedata.DocusignEnvelopeID);
        }
        console.log('recipientArr-->', recipientArr);
        return (
            <View style={Styles.hireStatusContainer}>
                <Text style={[Styles.headerTextStyle, { textAlign: 'center', borderBottomColor: Colors.APPCOLOR, borderBottomWidth: 1 }]}>Hire Packet Status</Text>
                {
                    recipientArr.length > 0
                    ?   recipientArr[0].data.map((child, index) => {
                            return (
                                <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.LIGHTGREY, padding: Matrics.CountScale(10)}}>
                                    <Text style={{ color: child.StatusName == 'completed' ? Colors.APPCOLOR : Colors.DARKRED, marginBottom: Matrics.CountScale(5) }}>
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
                        {this.renderStatusIndicatorIcon(false)}
                    </View>
                    <View style={Styles.hireStatusHeaderCardPart2}>
                        <View style={Styles.headerTextContainer}>
                            <Text style={Styles.headerTextStyle}>Hire Status</Text>
                            <Text style={Styles.headerSubTextStyle}>{this.state.Employeedata ? this.state.Employeedata.DisplayStatusName : null}</Text>
                        </View>
                        <View style={Styles.pdfContainer}>

                            {this.renderPDFimg(pdf)}
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, marginTop: Matrics.CountScale(5) }}>
                    <HTML html={htmlContent} ignoredTags={tags} renderers={renderers} />
                </View>
                {/* <View style={Styles.hireStatusCardHeader}>
                    <View style={Styles.hireStatusHeaderCardPart1}>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ paddingTop: Matrics.CountScale(10), fontFamily: Fonts.NunitoSansRegular, fontSize: 13, color: Colors.GREY }}>06.22.2017 6:28 PM</Text>
                        <Text style={{ paddingTop: Matrics.CountScale(10), fontFamily: Fonts.NunitoSansRegular, fontWeight: "300", fontSize: 16 }}>Role Email has been changed from..</Text>
                    </View>
                </View>
                <View style={Styles.hireStatusCardHeader}>
                    <View style={Styles.hireStatusHeaderCardPart1}>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ paddingTop: Matrics.CountScale(10), fontFamily: Fonts.NunitoSansRegular, fontSize: 13, color: Colors.GREY }}>06.22.2017 6:28 PM</Text>
                        <Text style={{ paddingTop: Matrics.CountScale(10), fontFamily: Fonts.NunitoSansRegular, fontSize: 16, fontWeight: "300", }}>Hiring Envelop has been sent success...</Text>
                    </View>
                </View> */}
            </View>
        );
    }
    renderStatusIndicatorIcon(val) {

        if (val)
            return (<Image style={{ width: 15, margin: 5, marginLeft: 0, height: 15 }} source={Images.RightIcon}></Image>)
        else
            return (<Image style={{ width: 15, margin: 5, marginLeft: 0, height: 15 }} source={Images.ClockIcon} ></Image >)

    }
    renderPDFimg(val) {
        if (val)
            return <Image style={{ width: 25, height: 32 }} source={Images.GreenPDFIcon}></Image>
        else
            return <Image style={{ width: 25, height: 32 }} source={Images.GreyPDFIcon}></Image>
    }
    EVerifyStatus() {
        // console.log('Employeedata-->', this.state.Employeedata)
        let EVerify = this.state.Employeedata ? this.state.Employeedata.EverifyFilePath ? true : false : false;
        return (
            <View style={Styles.hireStatusContainer}>
                <View style={Styles.hireStatusCardHeader}>
                    <View style={Styles.hireStatusHeaderCardPart1}>
                        {this.renderStatusIndicatorIcon(false)}
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
                        {this.renderStatusIndicatorIcon(true)}
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
        // backgroundColor: 'red',
        height: 30, flex: 0.2
    },
    employeeStyle: {
        // backgroundColor: 'green',
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 30, flex: 1,
    },
    infoImg: {
        justifyContent: 'center',
        // backgroundColor: 'red',
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
        color: Colors.DARKRED
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
        color: Colors.GREY
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
        flex: 0.1
    },
    hireStatusHeaderCardPart2: {
        // paddingBottom: Matrics.CountScale(15),
        borderBottomColor: Colors.LIGHTGREY,
        borderBottomWidth: 1,
        flex: 1, flexDirection: 'row'
    }
});

const mapStateToProps = (state) => {
    return {
        response: state,
    };
}

// export default DocumentDetails;
export default connect(mapStateToProps, { CheckDocumentStatusEnvelopRecipientsEmailUpdate, getCheckDocumentStatusHiringReturnRequest, UpdateBGCEverifyStatusRequest, ProcessBGCEverifyRequest, UpdatePhotoMatchingDataRequest })(DocumentDetails);


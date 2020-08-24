{/* ====>>>>>>>>>>> Libraries <<<<<<<<<<==========>  */ }
import React from 'react';
import { View, Image, ScrollView, BackHandler, TouchableOpacity, Text } from 'react-native';

{/* ====>>>>>>>>>>> Assets <<<<<<<<<<==========>  */ }
import { Colors, Fonts, Matrics, MasterCssEmployee, Images } from '@Assets'
import Header from './Templetes/Header';

{/* ====>>>>>>>>>>> Class Declaration <<<<<<<<<<==========>  */ }
class NotificationDetail extends React.Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        global.tabHide = false
        console.log(this.props)
        this.props.navigation.navigate('Notification', { changeData: true });
        // BackHandler.exitApp();
        return true;
    }

    render() {
        return (
            <View style={Styles.pageBody}>
                <View style={MasterCssEmployee.headerContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        style={MasterCssEmployee.iconContainerStyle}>
                        <Image style={[Styles.backImgStyle, MasterCssEmployee.iconStyle]} source={Images.EmpBackIcon}></Image>
                    </TouchableOpacity>
                    <View style={MasterCssEmployee.centerStyle}>
                        <Text style={MasterCssEmployee.centerTextStyle}>Details</Text>
                    </View>
                    <View style={MasterCssEmployee.iconContainerStyle}>
                        {/* <Image style={Styles.optionImgStyle} source={Images.HeaderDots}></Image> */}
                    </View>
                </View>

                {/* ====>>>>>>>>>>> Rendering Notification Details <<<<<<<<<<==========>  */}
                {this.renderNotificationDetail()}
            </View>
        );
    }
    /* ====>>>>>>>>>>> Notification Detail Render Method <<<<<<<<<<==========>  */
    renderNotificationDetail() {
        return (
            <ScrollView style={{ padding: Matrics.CountScale(10) }}>
                {/* ====>>>>>>>>>>>    RequestApprove Button    <<<<<<<<<<========== */}
                <View style={Styles.requestBtn}>
                    <Image style={Styles.requestApproveImg} source={Images.RequestApprove}></Image>
                    <Text style={{ color: 'white', fontFamily: Fonts.NunitoSansSemiRegular, fontSize: Matrics.CountScale(17), alignSelf: 'center', flex: 2 }}>
                        Request approved</Text>
                </View>

                {/* ====>>>>>>>>>>>    Request dates container    <<<<<<<<<<========== */}
                <View style={{ paddingTop: Matrics.CountScale(20) }}>
                    <Text style={Styles.containerHeaders}>
                        Requested dates:
                    </Text>
                    <Text style={Styles.containerBody}>
                        Mar 12, Fri at 12:30pm</Text>
                </View>


                {/* ====>>>>>>>>>>>    Reason Container   <<<<<<<<<<========== */}
                <View style={{ paddingTop: Matrics.CountScale(20) }}>
                    <Text style={Styles.containerHeaders}>
                        Reason:
                    </Text>
                    <Text style={Styles.containerBody}>
                        Comment on the importantance ofan life.
                    </Text>
                </View>


                {/* ====>>>>>>>>>>>    Notes Container   <<<<<<<<<<========== */}
                <View style={{ paddingTop: Matrics.CountScale(20) }}>
                    <Text style={Styles.containerHeaders}>
                        Note:
                    </Text>
                    <Text style={Styles.containerBody}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged.
                      </Text>
                </View>

                {/* ====>>>>>>>>>>>    Document Download Container   <<<<<<<<<<========== */}

                <View style={Styles.documentContainer}>
                    <View style={{ justifyContent: 'center', flex: 0.2 }}>
                        <Image style={Styles.fileIconStyle} source={Images.FileIcon}></Image>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-start', flex: 1 }}>
                        <Text style={{ fontFamily: Fonts.NunitoSansSemiBold, fontSize: Matrics.CountScale(17), color: Colors.BLACK }}>
                            Document.pdf
                         </Text>
                    </View>
                    <View style={Styles.downloadIconContainer}>
                        <Image style={Styles.downloadIconStyle} source={Images.DownloadIcon}></Image>
                    </View>
                </View>
            </ScrollView >
        );
    }
}


{/* ====>>>>>>>>>>>  StylesSheets for Notification Details  <<<<<<<<<<========== */ }
const Styles = {
    pageBody: {
        flex: 1, backgroundColor: 'white'
    },
    feedbackCard: {
        margin: Matrics.CountScale(8),
        marginTop: Matrics.CountScale(12),
        marginBottom: 0,
        borderRadius: Matrics.CountScale(3),
        padding: Matrics.CountScale(10),
        backgroundColor: 'white',
    },
    requestBtn: {
        borderRadius: Matrics.CountScale(4),
        justifyContent: 'center',
        fontSize: Matrics.CountScale(15),
        padding: Matrics.CountScale(5),
        flexDirection: 'row',
        height: Matrics.CountScale(60),
        backgroundColor: Colors.APPCOLOR,
    },
    containerHeaders: {
        flex: 1,
        color: 'grey',
        padding: Matrics.CountScale(5),
        fontSize: Matrics.CountScale(15),
        fontFamily: Fonts.NunitoSansSemiBold
    },
    containerBody: {
        flex: 1,
        fontSize: Matrics.CountScale(17),
        padding: Matrics.CountScale(5),
        fontFamily: Fonts.NunitoSansSemiBold,
        fontWeight: '300',
        color: Colors.BLACK,
        lineHeight: Matrics.CountScale(25),
    },
    documentContainer: {
        fontFamily: Fonts.NunitoSansSemiBold,
        borderRadius: Matrics.CountScale(4),
        justifyContent: 'center',
        fontSize: Matrics.CountScale(17),
        padding: Matrics.CountScale(5),
        marginTop: Matrics.CountScale(20),
        flexDirection: 'row',
        height: Matrics.CountScale(55),
        borderColor: '#eee',
        flex: 1,
        borderWidth: 1
    },
    backImgStyle: {
        height: Matrics.CountScale(20),
        width: Matrics.CountScale(10)
    },
    optionImgStyle: {
        height: Matrics.CountScale(5),
        width: Matrics.CountScale(20),
        alignSelf: 'flex-end',
    },
    requestApproveImg: {
        height: Matrics.CountScale(25),
        justifyContent: 'center',
        alignSelf: 'center',
        margin: Matrics.CountScale(10),
        width: Matrics.CountScale(25)
    },
    fileIconStyle: {
        height: Matrics.CountScale(35),
        width: Matrics.CountScale(25),
        margin: Matrics.CountScale(5)
    },
    downloadIconContainer: {
        justiÎfyContent: 'center',
        alignItems: 'flex-end',
        margin: Matrics.CountScale(5),
        flex: 0.2
    },
    downloadIconStyle: {
        height: Matrics.CountScale(22),
        width: Matrics.CountScale(20)
    }
}
export default NotificationDetail;
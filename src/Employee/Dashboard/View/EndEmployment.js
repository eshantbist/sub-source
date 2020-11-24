/* ====>>>>>>>>>>> Libraries <<<<<<<<<<==========> */
import React from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Image, Text, Alert, Dimensions } from 'react-native';
import ImagePicker from "react-native-image-crop-picker";
import { connect } from 'react-redux';

/* ====>>>>>>>>>>> Assets <<<<<<<<<<==========> */
import { Colors, Fonts, Matrics, Images, MasterCssEmployee } from '@Assets'
import { TextInputView, Button, ImagePickerModal, LoadWheel, CustomModal } from "@Components";
import { getEndEmployeementReasonType } from '@Redux/Actions/DashboardEmployeeActions'
import Global from '../../../GlobalFunction';

const { width, height } = Dimensions.get('window')

/* ====>>>>>>>>>>> Class Declaration <<<<<<<<<<==========> */
class EndEmployment extends React.Component {

    state = {
        comment: '',
        imageFile: '',
        imagePickerModal: false,
        loading: true,
        msgModal: false,
        msg: '',
        reasonData: [],
        selectedReasonId: '',
        selectedReason: '',
        otherText: '',
    }

    componentDidMount() {
        this.props.getEndEmployeementReasonType({ ReasonID: -1 })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.data.getEndEmployeementReasonSuccess && this.state.loading) {
            this.setState({ loading: false })
            let response = nextProps.data.data
            console.log(response.Data)
            if (response.Status == 1) {
                this.setState({ reasonData: response.Data })
            }
            else {
                this.setState({ msg: response.Message, msgModal: true })
            }
        }
        else if (nextProps.data.getEndEmployeementReasonFail) {
            this.setState({ loading: false, msg: Global.error_msg, msgModal: true })
        }
    }

    TakePhoto() {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            let imgdata = {
                uri: image.path,
                type: image.mime,
                name: image.filename == null ? "IMG1.jpg" : image.filename,
                data: image.data
            };
            this.setState({ imageFile: imgdata });
            console.log(image);
        });
    }

    ChoosePhoto() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            let imgdata = {
                uri: image.path,
                type: image.mime,
                name: image.filename == null ? "IMG1.jpg" : image.filename,
                data: image.data
            };
            this.setState({ imageFile: imgdata });
            console.log(this.state.imageFile)
        });
    }

    onPressGallery() {
        this.setState({ imagePickerModal: false })
        setTimeout(() => { this.ChoosePhoto() }, 500)
    }

    onPressCamera() {
        this.setState({ imagePickerModal: false })
        setTimeout(() => { this.TakePhoto() }, 500)
    }


    render() {
        return (
            <View style={Styles.pageBody}>

                {/* ====>>>>>>>>>>> Header start <<<<<<<<<<==========> */}

                <View style={MasterCssEmployee.headerContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        style={MasterCssEmployee.headerTextContainerStyle}>
                        <Text style={MasterCssEmployee.headerLeftTextStyle}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <View style={MasterCssEmployee.centerStyle}>
                        <Text style={MasterCssEmployee.centerTextStyle}>
                            End Employment
                        </Text>
                    </View>
                    {/* <View style={MasterCssEmployee.headerTextContainerStyle} /> */}
                    <TouchableOpacity
                        onPress={() => {
                            if (this.state.selectedReasonId && this.state.comment) {
                                this.props.navigation.navigate('Signature');
                            } else if(this.state.comment === '') {
                                alert('Please enter comment for manager')
                            }
                            else
                                alert('Please select reason type')
                        }}
                        style={MasterCssEmployee.headerTextContainerStyle}>
                        <Text style={MasterCssEmployee.headerRightTextStyle}>
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* ====>>>>>>>>>>> Header End <<<<<<<<<<==========> */}

                {this.renderPageContent()}

                <ImagePickerModal visible={this.state.imagePickerModal}
                    onPressCamera={() => this.onPressCamera()}
                    onPressGallery={() => this.onPressGallery()}
                    onPressCancel={() => this.setState({ imagePickerModal: false })}
                />

                <LoadWheel visible={this.state.loading} />
                <CustomModal visible={this.state.msgModal} title={this.state.msg}
                    ButtonText={'OK'} onPress={() => this.setState({ msgModal: false })} />
            </View>
        );
    }
    // ====>>>>>>>>>>> Page Content <<<<<<<<<<==========>

    onSelect(id, val, text) {
        this.setState({ selectedReasonId: id, selectedReason: val, otherText: text })
    }

    renderPageContent() {

        return <ScrollView style={{ flex: 1 }}>
            {/* ====>>>>>>>>>>> Reason Container <<<<<<<<<<==========>  */}
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Reason', { reasonTypes: this.state.reasonData, selectedReasonId: this.state.selectedReasonId, onSelect: this.onSelect.bind(this) })}>
                <View style={Styles.reasonContainer}>
                    {/* {this.state.finishedClick ? (Matrics.screenHeight == 812 && Platform.OS == 'ios'? Matrics.ScaleValue(430) : Matrics.ScaleValue(310)) : Matrics.ScaleValue(50)} */}
                    <Text style={Styles.reasonText}>{this.state.selectedReason ?(this.state.otherText !== '' ? this.state.otherText : this.state.selectedReason): 'Select Reason'}</Text>
                    <View style={{ alignItems: "flex-end" }}>
                        <Image style={Styles.arrrowStyle} source={Images.LeftArrowIcon} />
                    </View>
                </View>
            </TouchableOpacity>
            <View style={Styles.borderView} />
            {/* ====>>>>>>>>>>> Attached Container <<<<<<<<<<==========>  */}

            <TouchableOpacity onPress={() => this.setState({ imagePickerModal: true })}>
                <View style={Styles.attachContainer}>
                    <Image style={Styles.attachIconStyle} source={Images.AttachIcon} />
                    <Text style={Styles.attachTextStyle}>
                        Attached file
                </Text>
                </View>
            </TouchableOpacity>
            <View style={Styles.borderView} />
            {this.state.imageFile ? <View style={Styles.ImageView}>
                <Image source={{ uri: this.state.imageFile.uri }} style={Styles.ImageStyle} />
            </View> : null}

            {/* ====>>>>>>>>>>> TextInput Container <<<<<<<<<<==========>  */}

            <View style={Styles.inputContainer}>
                <TextInput style={{ fontSize: 17, fontFamily: Fonts.NunitoSansRegular }} placeholder={"Comment for manager"} value={this.state.comment} onChangeText={val => {
                    this.setState({ comment: val });
                }} multiline={true // style={{ flex: 1 }}
                } numberOfLines={4} />
            </View>
        </ScrollView>;
    }
}
/* ====>>>>>>>>>>> StyleSheet <<<<<<<<<<==========> */

const Styles = {
    pageBody: {
        flex: 1, backgroundColor: Colors.WHITE
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
    leftTextStyle: {

    },
    ImageView: {
        marginVertical: Matrics.CountScale(20),
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerStyle: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    },
    centerTextStyle: {

    },
    rightStyle: {
        justifyContent: 'center',
        flex: 0.5
    },
    rightTextStyle: {

    },
    ImageStyle: {
        height: height / 2,
        width: width - Matrics.CountScale(20),
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.GREY
    },
    reasonContainer: {
        flex: 1,
        paddingTop: Matrics.CountScale(15),
        paddingBottom: Matrics.CountScale(15),
        flexDirection: 'row',
        marginLeft: Matrics.CountScale(10),
        marginRight: Matrics.CountScale(10),
        alignItems: 'center',
    },
    reasonText: {
        justifyContent: 'center',
        fontSize: Matrics.CountScale(17),
        flex: 1,
        color: Colors.BLACK,
        alignItems: 'flex-start'
    },
    arrrowStyle: {
        justifyContent: 'center',
        height: Matrics.CountScale(15),
        width: Matrics.CountScale(10),
        alignItems: 'flex-end'
    },
    attachContainer: {
        flex: 1,
        paddingTop: Matrics.CountScale(15),
        paddingBottom: Matrics.CountScale(15),
        flexDirection: 'row',
        marginLeft: Matrics.CountScale(10),
        marginRight: Matrics.CountScale(10),
        // borderBottomColor: Colors.LIGHTGREY,
        // borderBottomWidth: 0.8
    },
    attachIconStyle: {
        justifyContent: 'center',
        height: Matrics.CountScale(23),
        width: Matrics.CountScale(20),
        marginRight: Matrics.CountScale(10)
    },
    attachTextStyle: {
        color: Colors.APPCOLOR,
        justifyContent: 'center',
        fontSize: Matrics.CountScale(17),
        flex: 1,
        alignItems: 'flex-start'
    },
    inputContainer: {
        flex: 1,
        paddingTop: Matrics.CountScale(0),
        paddingBottom: Matrics.CountScale(15),
        flexDirection: 'row',
        marginLeft: Matrics.CountScale(10),
        marginRight: Matrics.CountScale(10)
    },
    borderView: {
        borderBottomColor: Colors.LIGHTGREY,
        borderBottomWidth: 0.8
    }
}

const mapStateToProps = (state) => {

    return {
        data: state.DashboardEmployee,
    };
}

export default connect(mapStateToProps, {
    getEndEmployeementReasonType
})(EndEmployment);
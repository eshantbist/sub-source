//LIBRARIES
import React from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, TouchableHighlight, Dimensions } from 'react-native';
// import SignatureCapture from "react-native-signature-capture";
//ASSETS
import { Colors, Fonts, Matrics, Images, MasterCssEmployee } from "@Assets";

const { height, width } = Dimensions.get('window')

//====CLASS DECLARATION====//
class Signature extends React.Component {



    //--------->>>State Initilization----------->>>

    state = {

    };

    //------------>>>LifeCycle Methods------------->>>

    componentWillMount() {

    }

    //------------->>>Controllers/Functions------------>>>>

    saveSign() {
        this.refs["sign"].saveImage();
        // this.props.navigation.navigate('Login')
        // AsyncStorage.clear();
    }

    resetSign() {
        this.refs["sign"].resetImage();
    }

    _onSaveEvent(result) {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        console.log(result);
    }
    _onDragEvent() {
        // This callback will be called when the user enters signature
        console.log("dragged");
    }


    //----------->>>Render Method-------------->>>
    render() {
        return (
            <View style={Styles.pageBody}>
                {/* ====>>>>>>>>>>> Header start <<<<<<<<<<==========> */}

                <View style={MasterCssEmployee.headerContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        style={MasterCssEmployee.headerTextContainerStyle}
                    >
                        <Text style={MasterCssEmployee.headerLeftTextStyle}>Cancel</Text>
                    </TouchableOpacity>
                    <View style={MasterCssEmployee.centerStyle}>
                        <Text style={MasterCssEmployee.headerTextContainerStyle}>Draw Signature</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            // this.saveSign();
                            this.props.navigation.navigate('ProfileEmployee')
                        }}
                        style={MasterCssEmployee.rightStyle}
                    >
                        <Text style={MasterCssEmployee.headerRightTextStyle}>Done</Text>
                    </TouchableOpacity>
                </View>
                {/* ====>>>>>>>>>>> Header End <<<<<<<<<<==========> */}

                {this.renderPageContent()}
            </View>
        );
    }

    // ====>>>>>>>>>>> Page Content <<<<<<<<<<==========>
    renderPageContent() {
        return <View style={Styles.SignatureView}>
            <Text style={Styles.SignatureText}>
                By signing below and selected "Done", you</Text>
            <Text style={Styles.SignatureText2}> are confirming you end of employment.</Text>
            <View style={{ flex: 1, borderWidth: 1, borderColor: Colors.BLACK, borderRadius: 5 }}>
                {/* <SignatureCapture
                    style={[{ flex: 1 }, Styles.signature]}
                    ref="sign"
                    showBorder={false}
                    onSaveEvent={this._onSaveEvent}
                    onDragEvent={this._onDragEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={"portrait"}
                /> */}
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>

                <TouchableOpacity style={Styles.buttonStyle} onPress={() => {
                    this.resetSign();
                }}>
                    <Text style={{ color: Colors.APPCOLOR, }}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>;
    }
}

/* ====>>>>>>>>>>> Styles <<<<<<<<<<==========> */

const Styles = {
    pageBody: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
        height: height / 2,
        borderColor: Colors.BLACK,
        marginVertical: Matrics.CountScale(20)
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    },
    SignatureView: {
        flex: 1,
        marginHorizontal: Matrics.CountScale(10)
    },
    SignatureText: {
        alignItems: "center",
        marginTop: Matrics.CountScale(15),
        alignSelf: 'center',
        marginHorizontal: Matrics.CountScale(10),
        justifyContent: "center",
        color: Colors.GREY
    },
    SignatureText2: {
        alignSelf: 'center',
        marginHorizontal: Matrics.CountScale(10),
        justifyContent: "center",
        color: Colors.GREY,
        marginBottom: Matrics.CountScale(15),
    }
}






export default Signature;
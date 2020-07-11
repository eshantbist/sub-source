//  ====>>>>>>>>>>> Libraries <<<<<<<<<<==========> 
import React from 'react';
import { View, StatusBar, ScrollView, TouchableOpacity, Image, Text } from 'react-native';

//  ====>>>>>>>>>>> Assets <<<<<<<<<<==========> 
import { Colors, Fonts, Matrics, Images, MasterCss } from '@Assets'
import { TextInputView, Button } from "@Components";

//  ====>>>>>>>>>>> Header start <<<<<<<<<<==========> 
class EditProfile extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Edit Profile',
        headerTitleStyle: MasterCss.headerTitleStyle,
        headerLeft:
            <TouchableOpacity onPress={() => { navigation.goBack() }} >
                <Text style={MasterCss.headerRightTextStyle}>Cancel</Text>
            </TouchableOpacity>,
        headerRight:
            <TouchableOpacity onPress={() => { }} >
                <Text style={MasterCss.headerRightTextStyle}>Save</Text>
            </TouchableOpacity>,

    })

    state = {
        university: this.props.navigation.state.params.profileData.university,
        profile: this.props.navigation.state.params.profileData.Profile,
        address1: this.props.navigation.state.params.profileData.address1,
        address2: this.props.navigation.state.params.profileData.address2,
        city: this.props.navigation.state.params.profileData.city,
        state: this.props.navigation.state.params.profileData.state,
        zip: this.props.navigation.state.params.profileData.zip,
        email: this.props.navigation.state.params.profileData.email,
        cellphone: this.props.navigation.state.params.profileData.cellphone,
        homephone: this.props.navigation.state.params.profileData.homephone,
        name: this.props.navigation.state.params.profileData.name,
    }
    UNSAFE_componentWillMount() {
        console.log(this.props)
    }
    render() {
        return (
            <View style={Styles.pageBody}>
                <StatusBar barStyle="dark-content"></StatusBar>

                {this.renderPageContent()}
            </View>
        );
    }


    //    ==========>>>>>  Page Container Starts Here <<<<<<<======== 

    renderPageContent() {
        return (
            <ScrollView style={{ backgroundColor: Colors.WHITE }}>
                <View style={Styles.profileImgStyle}>
                    <TouchableOpacity>
                        <Image style={{ height: Matrics.CountScale(100), width: Matrics.CountScale(100), borderRadius: Matrics.CountScale(50) }}
                            source={{ uri: this.state.profile }}></Image>
                    </TouchableOpacity>
                    <Text style={{ color: Colors.APPCOLOR, padding: Matrics.CountScale(5), fontSize: Matrics.CountScale(15), fontFamily: Fonts.NunitoSansRegular }}>Change Profile Picture</Text>
                </View>
                <View style={Styles.inputBox}>
                    <TextInputView
                        label="Nickname"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.name}
                        onChangeText={val => this.setState({ name: val })}
                        containerStyle={Styles.Input}
                    />
                </View>
                <View style={Styles.inputBox}>
                    <TextInputView
                        label="Address1"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.address1}
                        onChangeText={val => this.setState({ address1: val })}
                        containerStyle={Styles.Input}
                    />
                </View>
                <View style={Styles.inputBox}>
                    <TextInputView
                        label="Address2"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.address2}
                        onChangeText={val => this.setState({ address2: val })}
                        containerStyle={Styles.Input}
                    />
                </View>
                <View style={Styles.inputBox}>
                    <TextInputView
                        label="City"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.city}
                        onChangeText={val => this.setState({ city: val })}
                        containerStyle={Styles.Input}
                    />
                </View>
                <View style={Styles.inputBox}>
                    <TextInputView
                        label="State"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.state}
                        onChangeText={val => this.setState({ state: val })}
                        containerStyle={Styles.Input}
                    />
                </View>
                <View style={Styles.inputBox}>
                    <TextInputView
                        label="Zip"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.zip}
                        onChangeText={val => this.setState({ zip: val })}
                        containerStyle={Styles.Input}
                    />
                </View>
                <View style={Styles.inputBox}>
                    <TextInputView
                        label="Email"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.email}
                        onChangeText={val => this.setState({ email: val })}
                        containerStyle={Styles.Input}
                    />
                </View>

                <View style={Styles.inputBox}>
                    <TextInputView
                        label="University of Subway"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.university}
                        onChangeText={val => this.setState({ university: val })}
                        containerStyle={Styles.Input}
                    />
                </View>
                <View style={Styles.inputBox}>
                    <TextInputView
                        label="Cell Phone"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.cellphone}
                        onChangeText={val => this.setState({ cellphone: val })}
                        containerStyle={Styles.Input}
                    />
                </View>
                <View style={Styles.inputBox}>
                    <TextInputView
                        label="Home Phone"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.homephone}
                        onChangeText={val => this.setState({ homephone: val })}
                        containerStyle={Styles.Input}
                    />
                </View>

                <View style={Styles.inputBox}>
                    <TextInputView
                        label="Emergency contact name"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.name}
                        onChangeText={val => this.setState({ name: val })}
                        containerStyle={Styles.Input}
                    />
                </View>
            </ScrollView>
        );
    }
}
{/* ==========>>>>>  Styles For Page <<<<<<<======== */ }
const Styles = {
    pageBody: {
        flex: 1, backgroundColor: Colors.BODYBACKGROUND
    },
    inputBox: {
        marginLeft: Matrics.CountScale(15),
        marginRight: Matrics.CountScale(15),
        margin: Matrics.CountScale(5)
    },
    profileImgStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: Matrics.CountScale(20)
    }
}
export default EditProfile;
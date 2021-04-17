//LIBRARIES
import React from 'react';
import { TextField } from 'react-native-material-textfield';
//ASSETS
import { Fonts, Colors } from '@Assets'

//=====Common Input Function=====//
class TextInputView extends React.Component {
    render() {
        return (
            <TextField
                label={this.props.label}
                value={this.props.value}
                baseColor={Colors.DARK_GREY}
                tintColor={Colors.DARK_GREY}
                textColor={Colors.BLACK}
                // fontFamily={Fonts.NunitoSansRegular}
                fontSize={this.props.fontSize}
                labelTextStyle={{ fontFamily: Fonts.NunitoSansRegular }}
                labelHeight={12}
                labelPadding={5}
                labelFontSize={this.props.labelFontSize}
                autoCorrect={false}
                autoCapitalize={false}
                ref={this.props.refField}
                clearButtonMode={this.props.clearButtonMode}
                autoCapitalize={"none"}
                error={this.props.error}
                placeholderTextColor={this.props.placeholderTextColor}
                secureTextEntry={this.props.secureTextEntry}
                containerStyle={[{ flex: 1, marginBottom: 10 }, this.props.containerStyle]}
                inputContainerPadding={8}
                returnKeyType={this.props.returnKeyType}
                editable={this.props.editable}
                onChangeText={this.props.onChangeText}
                renderAccessory={this.props.renderAccessory}
                onSubmitEditing={this.props.onSubmitEditing}
                onFocus={this.props.onFocus}
                multiline={this.props.multiline}
                maxLength={this.props.maxLength}
                keyboardType={this.props.keyboardType}
                lineWidth={this.props.lineWidth}
                activeLineWidth={this.props.activeLineWidth}
            />
        )
    }
};


export { TextInputView };

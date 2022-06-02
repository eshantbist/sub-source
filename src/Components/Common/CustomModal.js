//LIBRARIES
import React from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'

//ASSETS
import { Colors, Fonts, Matrics } from '@Assets'

export const CustomModal = ({ onPress, visible, onRequestClose, title, ButtonText }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <View style={styles.modal}>
                <View style={styles.modalContainer}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.titleText}>
                            {title}
                        </Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>{ButtonText}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal >
    )
}

export const ResignModal = ({ onCancelPress, visible, onResignPress, onRequestClose, title }) => {
    return (
        <Modal animationType={"none"} transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}>
            <View style={styles.resignModal}>
                <View style={styles.modalBody}>
                    <View style={styles.msgContainer}>
                        <Text style={styles.modalText}>
                            {title}
                            {/* Are you sure you want to end your employment within our company?
                            if you have any troubles, please contact your manager for support. */}
                        </Text>
                    </View>
                    <View style={styles.modalBtn}>
                        <TouchableOpacity
                            onPress={onCancelPress}
                            style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.btnText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onResignPress}
                            style={styles.btnContainer}>
                            <Text style={styles.btnText}>
                                Resign
                                    </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
// ======>>>>>> CustomModal StyleSheet <<<<<=======
const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    text: {
        color: '#3f2949',
        marginTop: Matrics.CountScale(10)
    },
    text: {
        textAlign: 'center',
        borderColor: '#bbb',
        padding: Matrics.CountScale(10),
        backgroundColor: '#eee'
    },
    container: {
        flex: 1,
        backgroundColor: 'gray'
    },
    buttonContainer: {
        flex: 1,
        borderRadius: 3,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.LIGHTGREY,
        justifyContent: 'center'
    },
    titleText: {
        alignSelf: 'center',
        fontSize: 15,
        fontFamily: Fonts.NeNunitoSansRegular,
        paddingHorizontal: Matrics.CountScale(10),
        textAlign: 'center',
    },
    buttonText: {
        color: Colors.APPCOLOR,
        fontSize: 16
    },
    modalContainer: {
        margin: Matrics.CountScale(20),
        borderRadius: Matrics.CountScale(4),
        backgroundColor: Colors.WHITE,
        height: Matrics.CountScale(150),
        flexDirection: 'column'
    },
    //=======>>>>>>>> resign modal stylesheet <<<<<<=====
    resignModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    text: {
        color: '#3f2949',
        marginTop: 10
    },
    modalText: {
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: "center",
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(17)
    },
    modalBody: {
        width: Matrics.screenWidth - 40,
        backgroundColor: Colors.WHITE,
        borderRadius: 5
    },
    modalBtn: {
        height: Matrics.CountScale(45),
        flexDirection: 'row',
        justifyContent: 'center',
        borderTopColor: Colors.LIGHTGREY,
        borderTopWidth: 0.8
    },
    btnText: {
        alignSelf: 'center',
        color: Colors.APPCOLOR,
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(17)
    },
    msgContainer: {
        padding: Matrics.CountScale(15),
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContainer: {
        flex: 1,
        borderLeftColor: Colors.LIGHTGREY,
        borderLeftWidth: 0.8,
        justifyContent: 'center'
    }
})
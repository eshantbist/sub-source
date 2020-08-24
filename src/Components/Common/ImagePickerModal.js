import React, { Component } from 'react';
import { Modal, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Images, Matrics, Fonts, Colors } from '@Assets'

export const ImagePickerModal = ({ visible, onPressGallery, onPressCamera, onPressCancel }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={onPressCancel}>
        <View style={styles.modalViewContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.viewContainer}>

              <Text style={styles.titleText}>Choose Image</Text>

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={onPressCamera}>
                  <View style={{ margin: Matrics.CountScale(20) }}><Image source={Images.Camera} /></View>
                  <Text style={[styles.textStyle]}>Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onPressGallery}>
                  <View style={{ margin: Matrics.CountScale(20) }}><Image source={Images.Gallery} /></View>
                  <Text style={styles.textStyle}>Gallery</Text>
                </TouchableOpacity>
              </View>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
const styles = {
  modalViewContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  viewContainer: {
    backgroundColor: 'white',
    borderRadius: Matrics.CountScale(10),
    alignSelf: 'center',
    padding: Matrics.CountScale(20),
  },
  titleText: {
    fontSize: Matrics.CountScale(20),
    //color: Color.lightBlack,
    fontFamily: Fonts.NunitoSansRegular,
    alignSelf: 'center',
    marginBottom: Matrics.CountScale(10),
  },
  textStyle: {
    fontSize: Matrics.CountScale(17),
    color: Colors.DARK_GREY,
    fontFamily: Fonts.NunitoSansRegular,
    alignSelf: 'center',
  }
}
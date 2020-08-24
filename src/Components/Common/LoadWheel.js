// //LIBRARIES
// import React from 'react'
// import {View, Text, Modal, ActivityIndicator } from 'react-native'

// //ASSETS
// import { Colors, Matrics } from '@Assets'

// export const LoadWheel = ({ visible, text, onRequestClose }) => {
//     return(

//         <Modal
//             transparent={true}
//             visible={visible}
//             onRequestClose={onRequestClose}
//             // style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)',}}
//         >
//             <View style={{
//                 flex: 1, 
//                 backgroundColor: 'rgba(52, 52, 52, 0.4)',
//                 justifyContent: 'center', 
//                 alignItems: 'center'
//                 }}>
//                 <ActivityIndicator color={Colors.APPCOLOR} size="large" style={{ shadowOpacity: 0.3,
//                     shadowOffset: { height: 1 }
//                 }}/>
//             </View>
//         </Modal>
        
//     )
// }





//LIBRARIES
import React from 'react'
import { View, Text, Modal, ActivityIndicator } from 'react-native'
var Spinner = require("react-native-spinkit");
//ASSETS
import { Colors, Matrics } from '@Assets'

export const LoadWheel = ({ visible, text, onRequestClose }) => {
    return (
        <View style={{ position: 'absolute', justifyContent: 'center', height: visible ? '100%' : 0, width: visible ? '100%' : 0, alignItems: 'center' }}>
            <Spinner
                style={{ justifyContent: 'center', alignItems: 'center' }}
                isVisible={visible}
                size={40}
                type={'WanderingCubes'} 
                color={Colors.APPCOLOR} />
        </View>
    )
}

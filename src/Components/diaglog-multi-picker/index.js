import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Modal } from 'react-native'
import { View, Text } from 'react-native'
import SingleElement from './single-element'

const DialogMultiPicker = ({modalVisible, valueList=[], onDonePress}) => {
    const [selectedValues, setSelectedValues] = useState([]);

    const onValuePress = (item, value, checked) => {
        if(!checked){
            setSelectedValues([...selectedValues].filter((curr)=> curr.value!==value))
        }else{
            setSelectedValues([...selectedValues, item])
        }
    }

    const handleDoneSelection = () => {
        onDonePress(selectedValues)
    }

    return (
        <Modal animationType="slide"
        transparent
        visible={modalVisible}>
            <View style={{flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingHorizontal: 25,
        paddingVertical:100
}}>
    <ScrollView style={{backgroundColor: 'white',
        borderRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowColor: 'black',
        elevation: 4,}}
        contentContainerStyle={{paddingHorizontal:20, paddingVertical:12}}>
                    {valueList.map((el)=>{
                        return(<SingleElement {...el} onValueChange={onValuePress} selected={selectedValues.some((item)=>item.value === el.value)}/>)
                    })}
                    <TouchableOpacity style={{position:"absolute", top:15, right:20}} onPress={handleDoneSelection}>
                        <Text style={{fontSize:18, color:'green'}}>Done</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </Modal>
    )
}

export default DialogMultiPicker

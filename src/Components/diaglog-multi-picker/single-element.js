import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import { Images } from '@Assets';

const SingleElement = ({selected, onValueChange, ...item}) => {
    const {label, value} = item
    const [isSelected, setIsSelected] = useState(selected)
    useEffect(()=>{
        setIsSelected(selected)
    },[selected])

    const onPress = () => {
        onValueChange(item, value, !isSelected)
        setIsSelected(e=>!e)
    }

    return (
        <TouchableOpacity onPress={onPress} style={{flexDirection:"row", marginVertical:5}}>
            <Text style={{fontSize:16, fontWeight:'600'}}>{label}</Text>
            {isSelected && <Image source={Images.CheckBoxChecked} style={{height:20, width:20}}/>}
        </TouchableOpacity>
    )
}

export default SingleElement

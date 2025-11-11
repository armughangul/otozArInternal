import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { AppStyle } from '../../../../utilis/AppStyle'
import SingleMake from './SingleMake'
import { MakeModel } from '../../../../Model/CarMakeModel'
interface Props {
    makeList : any[],
    onPress : (item : MakeModel)=>void,
    size : any
}
const SingleQuickItem = (props : Props) => {
  return (
    <View
    style = {{
        ...AppStyle.mainView,
        marginRight : 12
    }}
    >
        {
            props.makeList.length > 0 &&
            <SingleMake
            size={props.size}
            model={props.makeList[0]}
            onPress={()=>props.onPress(props.makeList[0])}
            />

        }
        {
            props.makeList.length > 1 &&
            <SingleMake
            size={props.size}
           model={props.makeList[1]}
            onPress={()=>props.onPress(props.makeList[1])}
            />
        }
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        ...AppStyle.mainView,
        marginRight : 12
    }
})

export default SingleQuickItem

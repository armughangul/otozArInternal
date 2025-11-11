import React from 'react'
import { StyleSheet, View } from 'react-native'
import SingleAskView from './SingleAskView'
import PaddingView from '../../../../components/Padding/PaddingView'
import { InquiryManagerType } from '../../Manager/InquiryManager'
interface Props {
    manager : InquiryManagerType
}
const AskView = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <View
        style = {{
            ...style.singleContainer
        }}
        >
            <SingleAskView
            isSelected = {props.manager.isFright}
            onPress={()=>{
                props.manager.setIsFright(!props.manager.isFright)
            }}
            title='Freight'
            />
             <SingleAskView
            isSelected = {props.manager.isInsurance}
            onPress={()=>{
                props.manager.setIsInsurance(!props.manager.isInsurance)
            }}
            title='Insurance'
            />
        </View>
           <PaddingView
            width={20}
            />
                <View
        style = {{
            ...style.singleContainer
        }}
        >
            <SingleAskView
         isSelected = {props.manager.isInspection}
            onPress={()=>{
                props.manager.setIsInspection(!props.manager.isInspection)
            }}
            title='Inspection'
            />
         
             <SingleAskView
            isSelected = {true}
            onPress={()=>{

            }}
            title='Total Price'
            />
        </View>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        flexDirection : "row",
        alignItems : "center"
    },
    singleContainer : {
        flex : 1,
    }
})

export default AskView

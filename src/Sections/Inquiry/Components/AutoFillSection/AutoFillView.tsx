import React from 'react'
import { StyleSheet, View } from 'react-native'
import { autoFillList } from '../../../../utilis/AppStrings'
import SingleAutoFillView from './SingleAutoFillView'
import { InquiryManagerType } from '../../Manager/InquiryManager'

interface Props {
    manager : InquiryManagerType
}
const AutoFillView = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        {
            autoFillList.map((item,index)=>{
                return(
                    <SingleAutoFillView
                    key={`${index}`}  
                    onPress={()=>{
                        let newMessage = props.manager.message + item
                        if (newMessage.length <= 400){
                          props.manager.setMessage(newMessage)
                        }
                    }}
                    title={item}
                    />
                )
            })
        }
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        flexWrap : "wrap",
        flexDirection : "row",
        marginTop : 10
    }
})
export default AutoFillView

import React from 'react'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import AppImageView from '../../../../components/AppImageView/AppImageView'
import { ImagesModel } from '../../../../Model/VehicleModel'
import { AppStyle } from '../../../../utilis/AppStyle'
import { AppColors } from '../../../../utilis/AppColors'
interface Props {
    image : ImagesModel,
    size : any,
    onPress : ()=>void
}
const SingleDetailImageItem = (props : Props) => {
  return (
    <TouchableWithoutFeedback
    onPress={()=>props.onPress()}
    >
        <View
        style = {{ 
            ...props.size,
            ...style.mainView,
        }}
        >
            <AppImageView
            source={props.image.image}
            style = {{
                ...AppStyle.commonImgStyle
            }}
            mode={"cover"}
            />
        </View>
    </TouchableWithoutFeedback>
  )
}
const style = StyleSheet.create({
    mainView : {
        marginRight : 8,
        borderRadius : 4,
        overflow : "hidden",
        backgroundColor : AppColors.black(1)
    }
})
export default SingleDetailImageItem

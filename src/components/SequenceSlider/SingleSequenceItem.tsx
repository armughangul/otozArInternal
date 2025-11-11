import React from 'react'
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { AppImages } from '../../utilis/AppConstant'
import { AppColors } from '../../utilis/AppColors'
interface Props {
  status? : number,
  isLast?  : boolean,
  onPress? : ()=>void
}
const SingleSequenceItem = (props : Props) => {
  return (
    <View
    style = {{
      ... props.isLast ? style.isLastView : style.mainView
    }}
    >
   <TouchableWithoutFeedback
   onPress={()=>{
    props.onPress && props.onPress()
   }}
   >
       <Image
      style = {{
        ...style.imgStyle
      }}
      source={props.status == 2 ? AppImages.Order.completed : props.status == 1 ? AppImages.Order.active : AppImages.Order.pending}
      />
   </TouchableWithoutFeedback>
    {
      !props.isLast &&
        <View
      style = {[{
        ...style.borderStyle,
      },props.status && props.status > 0 ? style.selectedBorder : {}]}
      />
    }
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
      flex : 1,
    alignItems : "center",
    flexDirection : "row"
    },
    isLastView : {
    },
    imgStyle : {
      height : 24,
      width : 24,
      resizeMode : "contain"
    },
    borderStyle : {
      flex : 1,
      height : 2,
      backgroundColor : AppColors.seperatorColor,
      marginHorizontal :5
    },
    selectedBorder : {
      backgroundColor : AppColors.primary
    }
})

export default SingleSequenceItem

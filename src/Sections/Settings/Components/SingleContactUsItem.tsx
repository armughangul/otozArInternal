import React from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { AppColors } from '../../../utilis/AppColors'
import { font, FontWeight } from '../../../utilis/AppStyle'
interface Props {
    item :any,
    onPress : ()=>void
}
const SingleContactUsItem = (props : Props) => {
  return (
   <TouchableWithoutFeedback
   onPress={()=>props.onPress()}
   >
     <View
    style = {{
        ...style.mainView
    }}
    >
      <Image
      style = {{
        ...style.iconStyle
      }}
      source={props.item.img}
      />
      <View
      style = {{
        ...style.innerView
      }}
      >
        <Text
        style = {{
          ...style.titleStyle
        }}
        >
          {props.item.title}
        </Text>
            <Text
            style = {{
          ...style.descStyle
        }}
            >
          {props.item.desc}
        </Text>
      </View>
    </View>
   </TouchableWithoutFeedback>
  )
}
const style = StyleSheet.create({
    mainView : {
        marginTop : 20,
        borderWidth : 1,
        borderColor : AppColors.primary,
        borderRadius : 8,
        flexDirection : "row",
        alignItems : "center",
        paddingHorizontal : 12,
        paddingVertical : 15
    },
    iconStyle : {
      resizeMode : "contain"
    },
    innerView : {
      marginLeft : 12,
      flex : 1
    },
    titleStyle : {
      ...font(16,FontWeight.SemiBold)
    },
    descStyle : {
    ...font(14),
    color : AppColors.disGreyColor,
    marginTop : 2
    }
})

export default SingleContactUsItem

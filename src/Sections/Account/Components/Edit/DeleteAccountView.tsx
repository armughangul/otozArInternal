import React from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { AppColors } from '../../../../utilis/AppColors'
import { AppImages } from '../../../../utilis/AppConstant'
import { font, FontWeight } from '../../../../utilis/AppStyle'
interface Props {
    onDelete : ()=>void
}
const DeleteAccountView = (props : Props) => {
  return (
  <TouchableWithoutFeedback
  onPress={()=>props.onDelete()}
  >
      <View
    style = {{
        ...style.mainView
    }}
    >
        <Image
        style = {{
            ...style.msgIcon
        }}
        source={AppImages.Common.deleteIcon}
        />
        <View
        style = {{
            ...style.paddingView 
        }}
        >
            <Text
            style = {{
                ...font(16,FontWeight.SemiBold),
                color : AppColors.redColor
            }}
            >
                Delete Account
            </Text>
               <Text
            style = {{
                ...style.descStyle
            }}
            >
                Disable your account and data.
            </Text>
        </View>
    </View>
  </TouchableWithoutFeedback>
  )
}
const style = StyleSheet.create({
    mainView: {
      height: 71,
      backgroundColor: AppColors.primaryOP(0.03),
      marginTop: 10,
      borderColor: AppColors.primary,
      borderWidth: 1,
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 8,
      flexDirection : "row",
      alignItems : "center"
    },
    msgIcon: {
        width : 20,
        height : 16,
        resizeMode : "contain"
    },
    paddingView : {
        flex : 1,
        paddingHorizontal : 15
    },
    descStyle : {
        ...font(14),
        color : AppColors.disGreyColor
    },
    nextBtnStyle : {
        width :16,
        resizeMode : "contain",
        transform : [{
            rotate : "-90deg"
        }],
        marginRight : 15
    }
})

export default DeleteAccountView

import React from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { AppColors } from '../../../../utilis/AppColors'
import { AppImages } from '../../../../utilis/AppConstant'
import { font, FontWeight } from '../../../../utilis/AppStyle'
import { AccountManagerType } from '../../Manager/AccountManager'
interface Props {
    onChange : ()=>void
}
const ChangePassView = (props : Props) => {
  return (
  <TouchableWithoutFeedback
  onPress={()=>props.onChange()}
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
        source={AppImages.Common.msgIcon}
        />
        <View
        style = {{
            ...style.paddingView 
        }}
        >
            <Text
            style = {{
                ...font(16,FontWeight.SemiBold)
            }}
            >
                Change Password
            </Text>
               <Text
            style = {{
                ...style.descStyle
            }}
            >
                Set a new password to stay secure.
            </Text>
        </View>
        <Image
        style = {{
            ...style.nextBtnStyle
        }}
        source={AppImages.Common.dropDown}
        />
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

export default ChangePassView

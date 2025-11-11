import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import ProfileImageView from './ProfileImageView'
import { font, FontWeight } from '../../../utilis/AppStyle'
import { AppColors } from '../../../utilis/AppColors'
import { AppHorizontalMargin } from '../../../utilis/AppConstant'
import CommonManager from '../../../utilis/CommonManager'
import AccountSingleBtnView from './AccountSingleBtnView'
import { accountBtnList } from '../../../utilis/AppStrings'
import { AccountManagerType } from '../Manager/AccountManager'
interface Props {
  manager : AccountManagerType,
  onEdit : ()=>void,
  onMenu : (type : number)=>void
}
const AccountLoginView = (props : Props) => {
    let size = CommonManager.shared.generateViewAspectRatioSize(2/1.6,((Dimensions.get("screen").width - AppHorizontalMargin)/3) - 12)
  return (
    <View>
        <View
        style = {{
            ...style.topView
        }}
        >
          <ProfileImageView
          url={props.manager.selector.appUser.image ?? ""}
          />
          <Text
          style = {{
            ...style.nameStyle
          }}
          >
            {props.manager.selector.appUser.first_name}
          </Text>
          <Text
          style = {{
            ...style.descStyle
          }}
          >
                        {props.manager.selector.appUser.email}
          </Text>
          <TouchableWithoutFeedback
          onPress={()=> props.onEdit()}
          >
            <Text
            style = {{
              ...style.btnStyle
            }}
            >
              Manage Account
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View
        style = {{
          ...style.bottomView
        }}
        >
          <AccountSingleBtnView
          size={size}
          onPress={()=>props.onMenu(0)}
          model={accountBtnList[0]}
          />
           <AccountSingleBtnView
          size={size}
          onPress={()=>props.onMenu(1)}
          model={accountBtnList[1]}
          />
           <AccountSingleBtnView
          size={size}
          onPress={()=>props.onMenu(2)}
          model={accountBtnList[2]}
          />
        </View>
    </View>
  )
}
const style = StyleSheet.create({
    topView : {
        alignItems : "center",
        marginTop : 20,
    },
    nameStyle : {
      ...font(16,FontWeight.SemiBold),
      marginTop : 15
    },
    descStyle : {
      ...font(14),
      color : AppColors.descColor,
      marginTop : 2
    },
    btnStyle : {
      ...font(14),
      color : AppColors.primary,
      marginVertical : 15
    },
    bottomView : {
      flexDirection : "row",
      justifyContent : "space-between"
    }
})

export default AccountLoginView

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { font, FontWeight } from '../../../utilis/AppStyle'
import { AppColors } from '../../../utilis/AppColors'
import { AppHorizontalMargin } from '../../../utilis/AppConstant'
import { SmartMatchManagerType } from '../Manager/SmartMatchManager'
interface Props {
  manager : SmartMatchManagerType
}
const TopDescView = (props : Props) => {
  return (
    <View
    style = {{
      ...style.mainView
    }}
    >
    <Text
    style = {{
        ...style.mainTxtView
    }}
    >
        Swipe out to explore your top matches, ranked by relevance to your recent activity.
    </Text>
      <Text
    style = {{
        ...style.countStyle
    }}
    >
      {props.manager.list.length} Match Found
    </Text>
    </View>
  )
}
const style = StyleSheet.create({
  mainView : {
        marginHorizontal : AppHorizontalMargin,
                marginTop : 40,
  },
    mainTxtView : {
        ...font(14),
        color : AppColors.descColor,
        textAlign : "center",
    },
    countStyle : {
      ...font(14,FontWeight.SemiBold),
      marginTop : 20,
      marginBottom : 20,
      alignSelf : "center",
      color : AppColors.descColor
    }
})
export default TopDescView

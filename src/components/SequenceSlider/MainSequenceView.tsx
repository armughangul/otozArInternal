import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import SingleSequenceItem from './SingleSequenceItem'
import { font, FontWeight } from '../../utilis/AppStyle'
import { AppColors } from '../../utilis/AppColors'
import { orderStatusList, QuickFilterList } from '../../utilis/AppStrings'
import { OrderManagerType } from '../../Sections/Order/Manager/OrderManager'
import { AppHorizontalMargin } from '../../utilis/AppConstant'
import { PurchaseManagerType } from '../../Sections/Order/Manager/PurchaseManager'
interface Props {
  manager : OrderManagerType | PurchaseManagerType
}
const MainSequenceView = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
      <View
      style = {{
        ...style.topView
      }}
      >
        {
          props.manager.tabList.map((item,index)=>{
            return(
              <SingleSequenceItem
              onPress={()=>{
                props.manager.setTab(index)
              }}
              key={`${index}`}
               status={item.status}
              isLast = {index == orderStatusList.length - 1}
              />
            )
          })
        }
      </View>
      <Text
      style = {[{
        ...style.txtStyle
      },props.manager.checkTxtLeft(Dimensions.get("screen").width - (AppHorizontalMargin * 2),props.manager.tab)]}
      >
        {orderStatusList[props.manager.tab]?.name ?? ""}
      </Text>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        height : 55
    },
    txtStyle : {
      ...font(14,FontWeight.SemiBold),
      color : AppColors.primary,
      marginTop : 10
    },
    topView : {
      flex : 1,
      flexDirection : "row",
    }
})

export default MainSequenceView

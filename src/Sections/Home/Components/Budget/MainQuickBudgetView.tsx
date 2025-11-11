import React from 'react'
import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import SingleQuickBudgetItem from './SingleQuickBudgetItem'
import CommonManager from '../../../../utilis/CommonManager'
import { AppHorizontalMargin } from '../../../../utilis/AppConstant'
import { BudgetModel } from '../../../../Model/BudgetModel'
interface Props {
  itemList : any[],
  onPress : (item : BudgetModel)=>void
}
const MainQuickBudgetView = (props : Props) => {
  let size = CommonManager.shared.generateViewAspectRatioSize(2/0.4,((Dimensions.get("screen").width - AppHorizontalMargin)/2) - 12)
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
      <FlatList
      initialNumToRender={4}
      showsHorizontalScrollIndicator = {false}
      horizontal
      data={props.itemList ?? []}
      keyExtractor={((item,index)=>`${index}`)}
      renderItem={({item})=>{
        return(
          <SingleQuickBudgetItem
          size={size}
          budgetList={item}
          onPress={(innerItem)=>props.onPress(innerItem)}
          />
        )
      }}
      />
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
    }
})

export default React.memo(MainQuickBudgetView)

import React from 'react'
import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import SingleQuickItem from './SingleQuickItem'
import CommonManager from '../../../../utilis/CommonManager'
import { AppHorizontalMargin } from '../../../../utilis/AppConstant'
import { MakeModel } from '../../../../Model/CarMakeModel'
interface Props {
  itemList : any[],
  onPress : (item : MakeModel)=>void
}
const MainQuickMake = (props : Props) => {
  let size = CommonManager.shared.generateViewAspectRatioSize(2/1.7,((Dimensions.get("screen").width - AppHorizontalMargin)/3) - 12)
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
          <SingleQuickItem
          size={size}
          onPress={(item)=>props.onPress(item)}
          makeList={item}
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

export default React.memo(MainQuickMake)

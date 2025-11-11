import React from 'react'
import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import SingleQuickItem from './SingleQuickModelItem'
import SingleQuickModel from './SingleQuickModel'
import SingleQuickModelItem from './SingleQuickModelItem'
import CommonManager from '../../../../utilis/CommonManager'
import { AppHorizontalMargin } from '../../../../utilis/AppConstant'
import { CarModel } from '../../../../Model/CarModel'
interface Props {
  itemList : any[],
    onPress : (item : CarModel)=>void
}
const MainQuickModelView = (props : Props) => {
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
          <SingleQuickModelItem
          onPress={(item)=>props.onPress(item)}
          size={size}
          modeList={item}
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

export default React.memo(MainQuickModelView)

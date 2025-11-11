import React from 'react'
import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import SingleQuickBodyTypeItem from './SingleQuickBodyTypeItem'
import CommonManager from '../../../../utilis/CommonManager'
import { AppHorizontalMargin } from '../../../../utilis/AppConstant'
import { BodyTypeModel } from '../../../../Model/BodyTypeModel'
interface Props {
  itemList : any[],
  onPress : (bodyType : BodyTypeModel)=>void
}
const MainQuickBodyTypeView = (props : Props) => {
    let size = CommonManager.shared.generateViewAspectRatioSize(2/1.6,((Dimensions.get("screen").width - AppHorizontalMargin)/3) - 12)
  return (
    <View
    style = {{
        ...style.mainView,
        marginRight :12
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
          <SingleQuickBodyTypeItem
          size={size}
          bodyList={item}
          onPress={(item)=>props.onPress(item)}
          />
        )
      }}
      />
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
      marginRight :12
    }
})

export default React.memo(MainQuickBodyTypeView)

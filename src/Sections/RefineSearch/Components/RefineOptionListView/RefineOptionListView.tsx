import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { font, FontWeight } from '../../../../utilis/AppStyle'
import { AppHorizontalMargin } from '../../../../utilis/AppConstant'
import SingleRefineOptionItem from './SingleRefineOptionItem'
interface Props {
    title : string,
    list : any[],
    selectedIndex : number,
    onSelect : (value : string)=>void
}
const RefineOptionListView = (props : Props) => {
  return (
   <View
       style={{
         ...style.mainView,
       }}>
       <Text
         style={{
           ...style.titleTxt,
         }}>
         {props.title}
       </Text>
        <View
               style={{
                 ...style.bodyTypeView,
               }}>
               <FlatList
               contentContainerStyle = {style.flatContentStyle}
               showsHorizontalScrollIndicator = {false}
                 data={props.list}
                 horizontal = {true}
                 keyExtractor={(item, index) => `${index}`}
                 renderItem={({item,index}) => {
                   return (
                    <SingleRefineOptionItem
                    title={item}
                    onPress={()=>{
                      props.onSelect(item)
                    }}
                    isSelected = {props.selectedIndex == index}
                    />
                   );
                 }}
               />
             </View>
    </View>
  )
}
const style = StyleSheet.create({
  mainView: {},
  titleTxt: {
    ...font(18, FontWeight.SemiBold),
    marginLeft: AppHorizontalMargin,
  },
    bodyTypeView: {
    marginTop: 10,
  },
  flatContentStyle : {
    paddingLeft : AppHorizontalMargin
  }
})
export default React.memo(RefineOptionListView)

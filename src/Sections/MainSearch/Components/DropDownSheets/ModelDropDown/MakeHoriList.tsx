import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import { MakeModel } from '../../../../../Model/CarMakeModel';
import { AppHorizontalMargin } from '../../../../../utilis/AppConstant';
import { mainSearchFilterList } from '../../../../../utilis/AppStrings';
import { AppStyle } from '../../../../../utilis/AppStyle';
import SingleFilterItem from '../../Filters/SingleFilterItem';
interface Props {
  makeList : MakeModel[],
  selectedMake? : MakeModel | null,
  onSelectMake : (make : MakeModel | null)=>void
}
const MakeHoriList = (props : Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <View
        style={{
          ...AppStyle.mainView,
        }}>
            <FlatList
            showsHorizontalScrollIndicator = {false}
            horizontal
            data={props.makeList}
            keyExtractor={(item,index)=>`${index}`}
            renderItem={({item,index})=>{
                return(
                 <SingleFilterItem
                 isSelected = {item.id == props.selectedMake?.id}
                 onPress={()=>{
                 props.onSelectMake(item.id == props.selectedMake?.id ? null : item)
                 }}
                 model={{
                    title : item.name
                 }}
                 />
                )
            }}
            />
        </View>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    height: 32,
    marginHorizontal: AppHorizontalMargin,
    marginTop: 20,
    flexDirection : "row",
  },
});

export default MakeHoriList;

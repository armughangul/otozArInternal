import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {AppHorizontalMargin} from '../../../../utilis/AppConstant';
import SortingComp from './SortingComp';
import {appShadow, AppStyle} from '../../../../utilis/AppStyle';
import {AppColors} from '../../../../utilis/AppColors';
import SingleFilterItem from './SingleFilterItem';
import { mainSearchFilterList, mainSearchFilterTypes } from '../../../../utilis/AppStrings';
import { MainSearchManagerType } from '../../Manager/MainSearchManager';
interface Props {
  manager : MainSearchManagerType
}
const FilterListing = (props : Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <SortingComp
      onPress={()=>props.manager.openModalType(mainSearchFilterTypes.sort,false)}
      />
      <View
        style={{
          ...AppStyle.mainView,
        }}>
            <FlatList
            showsHorizontalScrollIndicator = {false}
            horizontal
            data={mainSearchFilterList}
            keyExtractor={(item,index)=>`${index}`}
            renderItem={({item,index})=>{
              let obj = props.manager.setHoriFilters(item.title,item.value)
                return(
                 <SingleFilterItem
                 isSelected = {obj.isSelected}
                 onPress={()=>props.manager.openModalType(item.value,obj.isSelected)}
                 model={obj}
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
    marginTop: 10,
    flexDirection : "row",
  },
});

export default FilterListing;

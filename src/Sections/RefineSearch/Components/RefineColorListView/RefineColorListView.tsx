import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {AppHorizontalMargin} from '../../../../utilis/AppConstant';
import {font, FontWeight} from '../../../../utilis/AppStyle';
import CommonManager from '../../../../utilis/CommonManager';
import SingleColorItem from '../../../MainSearch/Components/DropDownSheets/ColorDropDown/SingleColorItem';
import { RefineSearchManagerType } from '../../Manager/RefineSearchManager';
import { ColorModel } from '../../../../Model/ColorModel';
interface Props {
  manager : RefineSearchManagerType
}
const RefineColorListView = (props : Props) => {

  const updateColorList = (item : ColorModel)=>{
  let list = [...props.manager.colorType.value ?? [] ]
  let index = list.findIndex((innerItem)=>item.id == innerItem.id)
  if (index == -1){
    list.push(item)
  }
  else {
    list.splice(index,1)
  }
  props.manager.setColorType({
    value : list
  })
  }
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <Text
        style={{
          ...style.titleTxt,
        }}>
        Color
      </Text>
      <View
        style={{
          ...style.bodyTypeView,
        }}>
        <FlatList
        contentContainerStyle = {style.flatContentStyle}
        showsHorizontalScrollIndicator = {false}
          data={CommonManager.shared.colorList}
          horizontal = {true}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item,index}) => {
            return (
              <SingleColorItem
              style = {{
                marginRight : 10
              }}
            isSelected = {props.manager.colorType.value && props.manager.colorType.value.findIndex((innerItem)=>innerItem.id == item.id) != -1}
              color={item}
                size={{
                    width : 123,
                    height : 92
                }}
                onPress={() => {
                  updateColorList(item)
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {},
  titleTxt: {
    ...font(18, FontWeight.SemiBold),
    marginLeft: AppHorizontalMargin,
  },
  bodyTypeView: {
    marginTop: 5,
  },
  flatContentStyle : {
    paddingLeft : AppHorizontalMargin
  }
});
export default React.memo(RefineColorListView);

import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {AppHorizontalMargin} from '../../../../utilis/AppConstant';
import {font, FontWeight} from '../../../../utilis/AppStyle';
import CommonManager from '../../../../utilis/CommonManager';
import SingleQuickBody from '../../../Home/Components/BodyType/SingleQuickBody';
import { AppColors } from '../../../../utilis/AppColors';
import { RefineSearchManagerType } from '../../Manager/RefineSearchManager';
interface Props {
  manager : RefineSearchManagerType
}
const RefineBodyTypeView = (props : Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <Text
        style={{
          ...style.titleTxt,
        }}>
        Body Type
      </Text>
      <View
        style={{
          ...style.bodyTypeView,
        }}>
        <FlatList
        contentContainerStyle = {style.flatContentStyle}
        showsHorizontalScrollIndicator = {false}
          data={CommonManager.shared.bodyTypeList}
          horizontal = {true}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item}) => {
            return (
              <SingleQuickBody
              style = {{
                marginRight : 10
              }}
              color={props.manager.bodyType && props.manager.bodyType.id == item.id ? AppColors.primary : AppColors.txtLightColor}
                size={{
                    width : 123,
                    height : 92
                }}
                bodyType={item}
                onPress={() => {
                  props.manager.setBodyType(item)
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
    marginTop: 10,
  },
  flatContentStyle : {
    paddingLeft : AppHorizontalMargin
  }
});
export default React.memo(RefineBodyTypeView);

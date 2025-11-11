import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppHorizontalMargin} from '../../../utilis/AppConstant';
import {font, FontWeight} from '../../../utilis/AppStyle';
import QuickFilterTopTab from './QuickFilterTopTab';
import {mainSearchFilterTypes, QuickFilterList} from '../../../utilis/AppStrings';
import MainQuickMakeView from './Make/MainQuickMakeView';
import MainQuickModelView from './Model/MainQuickModelView';
import MainQuickBodyTypeView from './BodyType/MainQuickBodyTypeView';
import MainQuickBudgetView from './Budget/MainQuickBudgetView';
import CommonManager from '../../../utilis/CommonManager';
import {QuickFilterHomeModel} from '../../../Model/QuickFilerModel';
interface Props {
  onPress: (item : any,type : mainSearchFilterTypes) => void;
  data?: QuickFilterHomeModel;
}
const QuickFilterView = (props: Props) => {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const autoHeight = () => {
    return {
      height: CommonManager.shared.heightRef,
    };
  };
  return (
    <View
      onLayout={event => {
        CommonManager.shared.heightRef =
          event.nativeEvent.layout.height > 0
            ? event.nativeEvent.layout.height
            : null;
      }}
      style={[
        {
          ...style.mainView,
        },
        CommonManager.shared.heightRef != null && autoHeight(),
      ]}>
      <Text
        style={{
          ...style.title,
        }}>
        AI-Powered Car Finder
      </Text>
      <View
        style={{
          ...style.tabView,
        }}>
        {QuickFilterList.map((item, index) => {
          return (
            <QuickFilterTopTab
              key={item.title}
              title={item.title}
              isSelected={selectedFilter == index}
              onClick={() => {
                setSelectedFilter(index);
              }}
            />
          );
        })}
      </View>
      {selectedFilter == 0 && (
        <MainQuickMakeView
          onPress={(item) => {
            props.onPress(item,mainSearchFilterTypes.make)
          }}
          itemList={props.data?.make ?? []}
        />
      )}
      {selectedFilter == 1 && (
        <MainQuickModelView itemList={props.data?.model ?? []}
        onPress={(item) => {
            props.onPress(item,mainSearchFilterTypes.model)
          }}
        />
      )}
      {selectedFilter == 2 && (
        <MainQuickBodyTypeView itemList={props.data?.bodyType ?? []} 
             onPress={(item) => {
            props.onPress(item,mainSearchFilterTypes.bodyType)
          }}
        />
      )}
      {selectedFilter == 3 && (
        <MainQuickBudgetView itemList={props.data?.budget ?? []} 
          onPress={(item) => {
            props.onPress(item,mainSearchFilterTypes.price)
          }}
        />
      )}
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    marginTop: 15,
    marginHorizontal: AppHorizontalMargin,
    minHeight : 320
  },
  title: {
    ...font(18, FontWeight.SemiBold),
  },
  tabView: {
    height: 37,
    marginTop: 12,
    flexDirection: 'row',
  },
  listView: {
    height: 195,
  },
});

export default QuickFilterView;

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppColors} from '../../../../../utilis/AppColors';
import {AppHorizontalMargin} from '../../../../../utilis/AppConstant';
import SingleDetailTopTab from '../../../../Detail/Components/DetailTopTab/SingleDetailTopTab';
import ItemView from '../../../../Detail/Components/DetailTopTab/item/ItemView';
import { OrderManagerType } from '../../../Manager/OrderManager';
import { PurchaseManagerType } from '../../../Manager/PurchaseManager';
interface Props {
  manager: OrderManagerType | PurchaseManagerType
}
const OrderInquiryItemView = (props: Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <View
        style={{
          ...style.mainView2,
        }}>
          <SingleDetailTopTab
            title="Price Overview"
            onPress={() => {}}
            selected={true}
            viewStyle={{
              ...style.tabStyle,
            }}
          />
        <View style={[style.selectedBorderView]} />
      </View>
      {props.manager.obj && (
        <ItemView
          list={props.manager.generateInquiryObjDetail1(
          )}
        />
      )}
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    flex : 1,
    backgroundColor: AppColors.white(0.2),
    borderColor: AppColors.white(1),
    borderWidth: 1,
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 25,
  },
  mainView2: {
    height: 50,
  },
  innerView: {
    flexDirection: 'row',
  },
  selectedBorderView: {
    backgroundColor: AppColors.primary,
    height: 0.9,
  },
  tabStyle: {
    alignItems: 'flex-start',
    marginLeft: 5,
  },
});
export default OrderInquiryItemView;

import React from 'react';
import {StyleSheet, View} from 'react-native';
import { OrderManagerType } from '../../../Manager/OrderManager';
import OrderInquiryItemView from './OrderInquiryItemView';
import SimpleMsg from '../../DetailMsgs/SimpleMsg';
import NextMsg from '../../DetailMsgs/NextMsg';
import { inquiryNxtTxt } from '../../../../../utilis/AppStrings';
import { PurchaseManagerType } from '../../../Manager/PurchaseManager';
interface Props {
  manager: OrderManagerType | PurchaseManagerType
}
const OrderInquiryStep = (props: Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
        <OrderInquiryItemView
        manager={props.manager}
        />
        <SimpleMsg
        startTxt='Please discuss with'
        midTxt='Otoz.ai'
        endTxt='via chat to purchase / bid this car. Thanks'
        />
         <NextMsg
        startTxt={inquiryNxtTxt}
        />
    </View>
  );
};
const style = StyleSheet.create({
  mainView : {
    flex : 1,
  }
});
export default OrderInquiryStep;

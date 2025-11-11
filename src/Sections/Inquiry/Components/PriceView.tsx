import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, FontWeight} from '../../../utilis/AppStyle';
import {InquiryManagerType} from '../Manager/InquiryManager';
import {useSelector} from 'react-redux';
import {PriceType} from '../../../redux/Reducers/AppReducer';
import CommonManager from '../../../utilis/CommonManager';
import {AppColors} from '../../../utilis/AppColors';
interface Props {
  manager: InquiryManagerType;
}
const PriceView = (props: Props) => {
  const selector = useSelector((state: any) => state.appReducer);
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <Text
        style={{
          ...style.titleStyle,
        }}>
        Vehicle Price:
      </Text>
      <Text
        style={{
          ...style.priceTxt,
        }}>
        {selector.priceType == PriceType.dollar
          ? `$${CommonManager.shared.formattedNumber(
              props.manager.generatePrice ?? 0,
            )}`
          : `${
              PriceType.yen +
              CommonManager.shared.formattedNumber(
                CommonManager.shared.convertDollarToYen(
                  props.manager.generatePrice ?? 0,
                ),
              )
            }`}
      </Text>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleStyle: {
    ...font(16, FontWeight.SemiBold),
  },
  priceTxt: {
    ...font(18, FontWeight.SemiBold),
    color: AppColors.redColor,
  },
});

export default PriceView;

import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DetailBorderBtn from './DetailBorderBtn';
import {AppColors} from '../../../../utilis/AppColors';
import WhatsappBtn from './WhatsappBtn';
import {AppHorizontalMargin} from '../../../../utilis/AppConstant';
import {AppStyle, font, FontWeight} from '../../../../utilis/AppStyle';
import {CarDetailManagerType} from '../../Manager/CarDetailManager';
import CommonManager from '../../../../utilis/CommonManager';
import DiscountView from '../../../../components/DiscountView/DiscountView';
import BorderBtn from '../../../../components/BorderBtn/BorderBtn';
import {useSelector} from 'react-redux';
import {PriceType} from '../../../../redux/Reducers/AppReducer';
interface Props {
  manager: CarDetailManagerType;
}
const BottomDetailView = (props: Props) => {
  const selector = useSelector((state: any) => state.appReducer);
  const discountViewCheck = () => {
    let regularPrice = props.manager.carObj?.regular_price;
    if (selector.priceType != PriceType.dollar) {
      regularPrice = CommonManager.shared.convertDollarToYen(
        props.manager.carObj?.regular_price ?? 0,
      );
    }
    let discountAmount = CommonManager.shared.getDiscountPercentage(
      props.manager.carObj!.regular_price,
      props.manager.carObj!.sale_price,
    );
    if (discountAmount > 0) {
      return (
        <DiscountView txtStyle={style.discountTxtStyle} value={CommonManager.shared.formattedNumber(regularPrice)} />
      );
    }
    return null;
  };
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <View
        style={{
          ...AppStyle.commonHoriStyle,
        }}>
        <View
          style={{
            ...AppStyle.mainView,
          }}>
          <Text
            style={{
              ...font(12, FontWeight.SemiBold),
            }}>
            Price
          </Text>
          <View
            style={{
              ...AppStyle.commonHoriStyle,
            }}>
            {discountViewCheck()}
            <Text
              style={{
                ...style.priceTxt,
              }}>
              {selector.priceType == PriceType.dollar
                ? `$${CommonManager.shared.formattedNumber(props.manager.carObj?.sale_price)}`
                : `${
                    PriceType.yen +
                    CommonManager.shared.formattedNumber(CommonManager.shared.convertDollarToYen(
                      props.manager.carObj?.sale_price ?? 0,
                    ))
                  }`}
            </Text>
          </View>
        </View>
        <BorderBtn
          isSelected={!props.manager.carObj?.has_inquiries}
          btnStyle={{
            ...props.manager.carObj?.has_inquiries ? style.disableBtnStyle  : style.btnStyle,
          }}
          titleStyle = {{
            ...props.manager.carObj?.has_inquiries ? style.disableTxt : {}
          }}
          onPress={() => {
          props.manager.onInquiry()
          }}
          title="Inquiry"
        />
      </View>
      <View
        style={{
          ...style.bottomBtnView,
        }}>
        <DetailBorderBtn
          onPress={() => {
            props.manager.handleCall();
          }}
          title={'Call'}
          color={AppColors.purpleColor}
        />
        <DetailBorderBtn
          onPress={() => {
            props.manager.handleEmail();
          }}
          title={'Email'}
          color={AppColors.redColor}
        />
        <WhatsappBtn
          onPress={() => {
            props.manager.handleWhatsApp();
          }}
          title={'Whatsapp'}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    paddingHorizontal: AppHorizontalMargin,
    paddingVertical: 10,
  },
  bottomBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
  },
  priceTxt: {
    ...font(24, FontWeight.Bold),
    color: AppColors.redColor,
  },
  btnStyle: {
    flex: 1,
    marginLeft : 20
  },
  discountTxtStyle: {...font(14), color: AppColors.disGreyColor},
  disableBtnStyle : {
           flex: 1,
    marginLeft : 20,
    backgroundColor : AppColors.bgBtn,
    borderWidth : 0
  },
  disableTxt : {
    ...font(14),
    color : AppColors.txtLightColor
  },
});

export default BottomDetailView;

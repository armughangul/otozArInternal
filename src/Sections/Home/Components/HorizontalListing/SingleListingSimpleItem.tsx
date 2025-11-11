import React, {useCallback} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {AppImages} from '../../../../utilis/AppConstant';
import {AppColors} from '../../../../utilis/AppColors';
import {font, FontWeight} from '../../../../utilis/AppStyle';
import DiscountView from '../../../../components/DiscountView/DiscountView';
import {VehicleModel} from '../../../../Model/VehicleModel';
import CommonManager from '../../../../utilis/CommonManager';
import OffView from '../../../../components/OffView/OffView';
import AppImageView from '../../../../components/AppImageView/AppImageView';
import {useSelector} from 'react-redux';
import {PriceType} from '../../../../redux/Reducers/AppReducer';
interface Props {
  type: number;
  obj: VehicleModel;
  onPress: () => void;
}
const SingleListingSimpleItem = (props: Props) => {
  const selector = useSelector((state: any) => state.appReducer);
  const setBackgroundStyle = useCallback(() => {
    if (props.type == 1) {
      return style.type1;
    }
    if (props.type == 2) {
      return style.type2;
    }
    return {};
  }, []);
  const offViewCheck = useCallback(() => {
    let discountAmount = CommonManager.shared.getDiscountPercentage(
      props.obj.regular_price,
      props.obj.sale_price,
    );
    if (discountAmount > 0) {
      return (
        <OffView
          viewStyle={style.discountView}
          value={discountAmount}
          txtStyle={style.discountTxt}
        />
      );
    }
    return null;
  }, []);
  const discountViewCheck = ()=> {
    let regularPrice = props.obj.regular_price
        if (selector.priceType != PriceType.dollar) {
          regularPrice = CommonManager.shared.convertDollarToYen(props.obj.regular_price)
        }
    let discountAmount = CommonManager.shared.getDiscountPercentage(
      props.obj.regular_price,
      props.obj.sale_price,
    );
    if (discountAmount > 0) {
      return <DiscountView value={CommonManager.shared.formattedNumber(regularPrice)} />;
    }
    return null;
  }
  const setPrice = () => {
    if (selector.priceType == PriceType.dollar) {
      return `$${CommonManager.shared.formattedNumber(props.obj.sale_price)}`;
    } else {
      return `¥${CommonManager.shared.formattedNumber(CommonManager.shared.convertDollarToYen(
        props.obj.sale_price,
      ))}`;
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => props.onPress && props.onPress()}>
      <View style={[style.mainView, setBackgroundStyle()]}>
        <View
          style={{
            ...style.bannerView,
          }}>
          {props.obj.images && props.obj.images.length > 0 && (
            <AppImageView
              mode={'cover'}
              style={{}}
              source={props?.obj?.images[0]?.image}
            />
          )}
          <Image source={AppImages.dummy.dummyCarThumbnail} />
          {offViewCheck()}
          {props.type == 1 && (
            <Image
              style={{
                ...style.certifiedBannerImg,
              }}
              source={AppImages.Home.certifiedBanner}
            />
          )}
        </View>
        <View
          style={{
            ...style.detailView,
          }}>
          <Text
            numberOfLines={1}
            style={{
              ...style.nameTxt,
            }}>
            {props.obj.make_name} {props.obj.model_name}
          </Text>
          <View
            style={{
              ...style.priceView,
            }}>
            {discountViewCheck()}
            <Text
              style={{
                ...font(18, FontWeight.Bold),
              }}>
              {setPrice()}
            </Text>
          </View>
          <Text
            style={{
              ...font(12, FontWeight.Light),
            }}>
            {props.obj.year}
            {props.obj.manufacturer_month
              ? `/${props.obj.manufacturer_month}`
              : ''}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const style = StyleSheet.create({
  mainView: {
    width: 208,
    marginRight: 10,
    overflow: 'hidden',
    borderRadius: 8,
  },
  bannerView: {
    height: 139,
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  discountView: {
    backgroundColor: AppColors.primaryBg,
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: 4,
  },
  discountTxt: {
    ...font(12, FontWeight.SemiBold),
    color: AppColors.primary,
    padding: 5,
  },
  detailView: {
    marginHorizontal: 10,
  },
  nameTxt: {
    ...font(14),
    marginTop: 8,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  discountPriceView: {
    marginRight: 10,
  },
  actualPriceTxt: {
    ...font(12, FontWeight.Light),
  },
  borderMainView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  boderLine: {
    height: 0.6,
    backgroundColor: 'black',
  },
  type1: {
    backgroundColor: AppColors.primaryOP(0.1),
    borderColor: AppColors.primary,
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 4,
  },
  type2: {
    borderColor: AppColors.primary,
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 4,
  },
  certifiedBannerImg: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    resizeMode: 'contain',
    height: 31,
    width: 71,
  },
});

export default React.memo(SingleListingSimpleItem);

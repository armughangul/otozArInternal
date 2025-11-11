import React, {useCallback, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {AppColors} from '../../../../utilis/AppColors';
import {AppHorizontalMargin, AppImages} from '../../../../utilis/AppConstant';
import {AppStyle, font, FontWeight} from '../../../../utilis/AppStyle';
import ImagePagerLoader from '../ImagePager/ImagePagerLoader';
import {VehicleModel} from '../../../../Model/VehicleModel';
import CommonManager from '../../../../utilis/CommonManager';
import DiscountView from '../../../../components/DiscountView/DiscountView';
import OffView from '../../../../components/OffView/OffView';
import ImageSlider from '../../../../components/ImageSlider/ImageSlider';
import {useSelector} from 'react-redux';
import {PriceType} from '../../../../redux/Reducers/AppReducer';

interface Props {
  car: VehicleModel;
  onPress : ()=>void
}
const SingleColumnCarItem = (props: Props) => {
  const selector = useSelector((state: any) => state.appReducer);
  const isDiscounted = useRef<boolean>(false);
  const [page, setPage] = useState(0);
  const offViewCheck = useCallback(() => {
    let discountAmount = CommonManager.shared.getDiscountPercentage(
      props.car.regular_price,
      props.car.sale_price,
    );
    if (discountAmount > 0) {
      return (
        <OffView
          viewStyle={style.discountView}
          value={discountAmount}
          txtStyle={style.discountTxt}
          extraTxt={' Off'}
        />
      );
    }
    return null;
  }, []);
  const discountViewCheck = () => {
    let regularPrice = props.car.regular_price;
    if (selector.priceType != PriceType.dollar) {
      regularPrice = CommonManager.shared.convertDollarToYen(
        props.car?.regular_price ?? 0,
      );
    }
    let discountAmount = CommonManager.shared.getDiscountPercentage(
      props.car.regular_price,
      props.car.sale_price,
    );
    if (discountAmount > 0) {
      return (
        <DiscountView
          txtStyle={{
            ...font(14),
            color: AppColors.disGreyColor,
          }}
          value={CommonManager.shared.formattedNumber(regularPrice)}
        />
      );
    }
    return null;
  };

  const setBackground = () => {
    let discountAmount = CommonManager.shared.getDiscountPercentage(
      props.car.regular_price,
      props.car.sale_price,
    );
    if (discountAmount > 0) {
      return style.type1;
    }
    return {};
  };
  return (
     <View
      style={[
        {
          ...style.mainView,
        },
        setBackground(),
      ]}>
      <View
        style={{
          ...style.carImageStyle,
        }}>
        <ImageSlider
        onPress={()=>props.onPress()}
          images={props.car.images ?? []}
          singleItemStyle={style.singeItemStyle}
          onPageChange={newPage => {
            if (page != newPage) {
              setPage(newPage);
            }
          }}
        />
        {props.car.otoz_recommended && (
          <Image
            source={AppImages.Home.certifiedBanner}
            style={{
              ...style.bannerStyle,
            }}
          />
        )}
      </View>
      <View
        style={{
          ...style.bodyTypeView,
        }}>
        <Text
          style={{
            ...style.typeTxt,
          }}>
          {props.car.type.name}
        </Text>
      </View>
      {offViewCheck()}
      <ImagePagerLoader scrollIndex={page} list={props?.car?.images ?? []} />
      <View
        style={{
          ...AppStyle.mainView,
        }}>
        <View
          style={{
            ...style.horiStyle,
          }}>
          <Text
            style={{
              ...style.nameStyle,
            }}>
            {props.car.make_name} {props.car.model_name}
          </Text>
          {CommonManager.shared.userToken != '' && (
            <TouchableWithoutFeedback
            onPress={()=>{
              CommonManager.shared.markFav(props.car.id ?? 0)
            }}
            >
              <Image
                source={CommonManager.shared.checkFavStatus(selector,props.car.id ?? 0) ? AppImages.Common.favSelected : AppImages.Common.favUnselected}
                style={{
                  ...style.favIcon,
                }}
              />
            </TouchableWithoutFeedback>
          )}
        </View>
        <Text
          style={{
            ...style.descStyle,
          }}>
          {`${props.car.year}${
            props.car.manufacturer_month
              ? '/' + props.car.manufacturer_month
              : ''
          } | ${props.car.fuel_type.name} | ${props.car.mileage}km | ${
            props.car.engine_size
          }cc | ${props.car.transmission}`}
        </Text>
        <View
          style={{
            ...style.horiStyle,
          }}>
          <View
            style={{
              ...style.discountHori,
            }}>
            {discountViewCheck()}
            <Text
              style={[
                {
                  ...style.priceStyle,
                },
                isDiscounted.current && style.discRedStyle,
              ]}>
              {selector.priceType == PriceType.dollar
                ? `$${CommonManager.shared.formattedNumber(props.car?.sale_price)}`
                : `${
                    PriceType.yen +
                    CommonManager.shared.formattedNumber(CommonManager.shared.convertDollarToYen(
                      props.car?.sale_price ?? 0,
                    ))
                  }`}
            </Text>
          </View>
          <Text
            style={{
              ...style.idStyle,
            }}>
            Stock ID. {props.car.serial_code}
          </Text>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    height: 342,
    marginTop: 20,
    borderWidth: 1,
    borderColor: AppColors.white(1),
    borderRadius: 8,
    overflow: 'hidden',
  },
  carImageStyle: {
    height: 224,
    overflow: 'hidden',
  },
  singeItemStyle: {
    width: Dimensions.get('screen').width - AppHorizontalMargin * 2,
    height: 224,
  },
  bodyTypeView: {
    height: 29,
    paddingHorizontal: 10,
    justifyContent: 'center',
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: AppColors.lightPrimaryBg,
    borderRadius: 6,
  },
  typeTxt: {
    ...font(14),
  },
  horiStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    marginHorizontal: 10,
  },
  favIcon: {
    width: 20,
    resizeMode: 'contain',
  },
  nameStyle: {
    ...font(16, FontWeight.SemiBold),
  },
  descStyle: {
    ...font(14),
    color: AppColors.descColor,
    marginHorizontal: 10,
    marginTop: 5,
  },
  priceStyle: {
    ...font(24, FontWeight.Bold),
  },
  discRedStyle: {
    color: AppColors.redColor,
  },
  idStyle: {
    ...font(14),
  },
  discountHori: {
    flexDirection: 'row',
    alignItems: 'center',
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
  type1: {
    backgroundColor: AppColors.primaryOP(0.05),
    borderColor: AppColors.primary,
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 6,
  },
  type2: {
    borderColor: AppColors.primary,
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 6,
  },
  bannerStyle: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    resizeMode: 'contain',
    width: 98,
    height: 42,
  },
});

export default React.memo(SingleColumnCarItem);

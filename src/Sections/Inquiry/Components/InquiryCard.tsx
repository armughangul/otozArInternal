import React, {useCallback, useRef} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import AppImageView from '../../../components/AppImageView/AppImageView';
import DiscountView from '../../../components/DiscountView/DiscountView';
import OffView from '../../../components/OffView/OffView';
import {VehicleModel} from '../../../Model/VehicleModel';
import {PriceType} from '../../../redux/Reducers/AppReducer';
import {AppColors} from '../../../utilis/AppColors';
import {AppHorizontalMargin, AppImages} from '../../../utilis/AppConstant';
import {font, AppStyle, FontWeight} from '../../../utilis/AppStyle';
import CommonManager from '../../../utilis/CommonManager';
import SingleInfoView from '../../MainSearch/Components/Cards/SingleInfoView';
interface Props {
  car: VehicleModel;
}
const InquiryCard = (props: Props) => {
  const selector = useSelector((state: any) => state.appReducer);
  const isDiscounted = useRef<boolean>(false);
  const offViewCheck = useCallback(() => {
    let discountAmount = CommonManager.shared.getDiscountPercentage(
      props.car.regular_price,
      props.car.sale_price,
    );
    if (discountAmount > 0) {
      return (
        <OffView
          value={discountAmount}
          viewStyle={style.offViewStyle}
          txtStyle={style.offTxtStyle}
        />
      );
    }
    return null;
  }, []);
  const discountViewCheck = () => {
    let regularPrice = props.car?.regular_price;
    if (selector.priceType != PriceType.dollar) {
      regularPrice = CommonManager.shared.convertDollarToYen(
        props.car?.regular_price ?? 0,
      );
    }
    let discountAmount = CommonManager.shared.getDiscountPercentage(
      props.car?.regular_price,
      props.car?.sale_price,
    );
    if (discountAmount > 0) {
      isDiscounted.current = true;
      return (
        <DiscountView
          viewStyle={{}}
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
    return style.type1;
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
          ...style.topView,
        }}>
        <View
          style={{
            ...style.imgViewStyle,
          }}>
          <AppImageView
            style={{
              ...style.imgStyle,
            }}
            source={props.car.images && props.car.images[0].image}
            mode={'cover'}
          />
          {offViewCheck()}

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
            ...AppStyle.mainView,
          }}>
          <View
            style={{
              ...AppStyle.commonHoriStyle,
            }}>
            <View
              style={{
                ...style.descView,
              }}>
              <Text
                style={{
                  ...style.nameStyle,
                }}>
                {props.car.make_name} {props.car.model_name}
              </Text>
              <Text
                style={{
                  ...style.idStyle,
                }}>
                Stock ID. {props.car.serial_code}
              </Text>
            </View>
            {CommonManager.shared.userToken != '' && (
              <TouchableWithoutFeedback
                onPress={() => {
                  CommonManager.shared.markFav(props.car.id ?? 0);
                }}>
                <Image
                  source={
                    CommonManager.shared.checkFavStatus(
                      selector,
                      props.car.id ?? 0,
                    )
                      ? AppImages.Common.favSelected
                      : AppImages.Common.favUnselected
                  }
                  style={{
                    ...style.favIcon,
                  }}
                />
              </TouchableWithoutFeedback>
            )}
          </View>
          <View
            style={{
              ...style.bottomDescView,
            }}>
            <View
              style={{
                ...AppStyle.mainView,
              }}>
              {discountViewCheck()}
              <Text
                style={[
                  {
                    ...style.priceTxt,
                  },
                  isDiscounted.current && style.discRedStyle,
                ]}>
                {selector.priceType == PriceType.dollar
                  ? `$${CommonManager.shared.formattedNumber(
                      props.car?.sale_price,
                    )}`
                  : `${
                      PriceType.yen +
                      CommonManager.shared.formattedNumber(
                        CommonManager.shared.convertDollarToYen(
                          props.car?.sale_price ?? 0,
                        ),
                      )
                    }`}
              </Text>
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
          </View>
        </View>
      </View>
      <View
        style={{
          ...style.bottomHori,
        }}>
        <SingleInfoView
          model={{
            value: `${props.car.year}${
              props.car.manufacturer_month
                ? '/' + props.car.manufacturer_month
                : ''
            }`,
            image: AppImages.MainSearch.smallCalendar,
          }}
        />
        <SingleInfoView
          model={{
            value: `${props.car.mileage}km`,
            image: AppImages.MainSearch.smallMilege,
          }}
        />
        <SingleInfoView
          model={{
            value: `${props.car.engine_size}cc`,
            image: AppImages.MainSearch.smallEngine,
          }}
        />
        <SingleInfoView
          model={{
            value: `${props.car.transmission}`,
            image: AppImages.MainSearch.smallTransmission,
          }}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    borderRadius: 6,
    borderLeftColor: AppColors.white(1),
    borderBottomColor: AppColors.white(1),
    borderRightColor: AppColors.white(1),
    borderTopColor: AppColors.white(0),
    borderWidth: 1,
    marginTop: 15,
  },
  topView: {
    ...AppStyle.commonHoriStyle,
    marginTop: 6,
  },
  imgViewStyle: {
    height: 113,
    width: 168,
    backgroundColor: AppColors.txtGreyColor,
    borderRadius: 7,
    overflow: 'hidden',
    marginLeft: 8,
  },
  imgStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  descView: {
    ...AppStyle.mainView,
    marginLeft: 8,
  },
  nameStyle: {
    ...font(16, FontWeight.SemiBold),
  },
  idStyle: {
    ...font(12),
    color: AppColors.descColor,
    marginTop: 2,
  },
  favIcon: {
    width: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  priceView: {
    ...AppStyle.commonHoriStyle,
  },
  priceTxt: {
    ...font(18, FontWeight.Bold),
  },
  bottomDescView: {
    ...AppStyle.commonHoriStyle,
    flex: 1,
    alignItems: 'flex-end',
    marginHorizontal: 8,
  },
  bodyTypeView: {
    height: 29,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: AppColors.lightPrimaryBg,
    borderRadius: 6,
  },
  typeTxt: {
    ...font(12),
    color: AppColors.lightPrimary,
  },
  bottomHori: {
    ...AppStyle.commonHoriStyle,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 12,
    marginLeft: 10,
  },
  offViewStyle: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  offTxtStyle: {
    ...font(11, FontWeight.SemiBold),
    color: AppColors.primary,
  },
  discRedStyle: {
    color: AppColors.redColor,
  },
  type1: {
    backgroundColor: AppColors.primaryOP(0.05),
    borderColor: AppColors.primary,
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 6,
    borderLeftColor: AppColors.primary,
    borderBottomColor: AppColors.primary,
    borderRightColor: AppColors.primary,
    borderTopColor: AppColors.primary,
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
    height: 28,
    width: 64,
  },
});

export default React.memo(InquiryCard);

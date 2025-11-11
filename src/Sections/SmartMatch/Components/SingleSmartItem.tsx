import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AppColors} from '../../../utilis/AppColors';
import {AppImages} from '../../../utilis/AppConstant';
import {AppStyle, font, FontWeight} from '../../../utilis/AppStyle';
import { VehicleModel } from '../../../Model/VehicleModel';
import AppImageView from '../../../components/AppImageView/AppImageView';

interface Props {
  car : VehicleModel
}
const SingleSmartItem = (props : Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <View
        style={{
          ...style.imageView,
        }}>
          {props.car.images && props.car.images?.length > 0 &&
           <AppImageView
            style={style.imgStyle}
            source={props.car.images[0].image}
            mode={'cover'}
          />
          }
        <View style={{}}>
          <Text
            style={{
              ...style.titleStyle,
            }}>
            {props.car.make_name} {props.car.model_name}
          </Text>
          <Text
            style={{
              ...style.detailTxtStyle,
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
              ...style.bottomView,
            }}>
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
            <View
              style={{
                ...style.colorView,
              }}>
               <Image
                       tintColor={props.car.exterior_color.code ?? "black"}
                       style = {{
                           ...style.colorIconStyle
                       }}
                       source={AppImages.MainSearch.colorCar}
                       />
            </View>
            <Text
              style={{
                ...style.stockId,
              }}>
              Stock ID. {props.car.serial_code}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    height : 332,
    backgroundColor: AppColors.white(1),
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop : 8,
    paddingBottom : 12
  },
  imageView: {
    flex : 1,
    borderRadius: 6,
    overflow: 'hidden',
  },
  imgStyle: {
    flex: 1,
    resizeMode: 'cover',
    overflow: 'hidden',
  },
  titleStyle: {
    ...font(14.8, FontWeight.SemiBold),
    marginTop: 15,
  },
  detailTxtStyle: {
    ...font(11.51),
    color: AppColors.descColor,
    marginTop: 5,
  },
  bottomView: {
    flexDirection: 'row',
    marginTop: 15,
  },
  bodyTypeView: {
    height: 29,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: AppColors.lightPrimaryBg,
    borderRadius: 6,
    marginRight: 8,
  },
  typeTxt: {
    ...font(14),
    color: AppColors.lighteshPrimary,
  },
  colorView: {
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    width: 73,
    backgroundColor: AppColors.white(1),
    borderWidth: 0.5,
    borderColor: AppColors.seperatorColor,
  },
  colorIconStyle: {
    width: 44,
    height: 16,
    resizeMode: 'contain',
  },
  stockId: {
    flex: 1,
    ...font(12),
    color: AppColors.txtGreyColor,
    textAlign: 'right',
  },
});
export default SingleSmartItem;

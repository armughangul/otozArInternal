import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppHorizontalMargin, AppImages} from '../../../utilis/AppConstant';
import {AppStyle, font, FontWeight} from '../../../utilis/AppStyle';
import {AppColors} from '../../../utilis/AppColors';
import {VehicleModel} from '../../../Model/VehicleModel';
import { Image } from 'expo-image';
interface Props {
  car: VehicleModel;
}
const CarDetailDescription = (props: Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <Text
        style={{
          ...style.titleStyle,
        }}>
        {props.car?.make_name} {props.car?.model_name}
      </Text>
      <Text
        style={{
          ...style.descStyle,
        }}>
        {`${props.car.year}${
          props.car.manufacturer_month ? '/' + props.car.manufacturer_month : ''
        } | ${props.car.fuel_type.name} | ${props.car.mileage}km | ${
          props.car.engine_size
        }cc | ${props.car.transmission}`}
      </Text>
      <View
        style={{
          ...style.innerView,
        }}>
            <View
            style = {{
                ...AppStyle.commonHoriStyle
            }}
            >
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
        style = {{
            ...style.colorView
        }}
        >
            <Image
            tintColor={props.car.exterior_color.code ?? "black"}
            style = {{
                ...style.colorIconStyle
            }}
            source={AppImages.MainSearch.colorCar}
            />
        </View>
        
            </View>
            <Text
            style = {{
                ...style.stockId
            }}
            >
              Stock ID. {props.car.serial_code}
            </Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    marginHorizontal: AppHorizontalMargin,
    marginVertical: 20,
  },
  titleStyle: {
    ...font(18, FontWeight.SemiBold),
  },
  descStyle: {
    ...font(14),
    color: AppColors.descColor,
    marginTop: 4,
  },
  innerView : {
    ...AppStyle.commonHoriStyle,
    marginTop : 10,
    flexDirection : "row",
    alignItems : "center",
    justifyContent : "space-between"
  },
  bodyTypeView: {
    height: 29,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: AppColors.lightPrimaryBg,
    borderRadius: 6,
    marginRight : 8
  },
  typeTxt: {
    ...font(14),
    color : AppColors.lighteshPrimary
  },
  colorView : {
    height : 29,
    justifyContent : "center",
    alignItems : "center",
    borderRadius: 6,
    width : 73,
    backgroundColor : AppColors.white(1),
    
  },
  colorIconStyle : {
    width : 44,
    height : 16,
    resizeMode : "contain"
  },
  stockId : {
    ...font(12),
    color : AppColors.txtGreyColor,
    textAlign :"right"
  }
});

export default CarDetailDescription;

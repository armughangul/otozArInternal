import React, {Suspense} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import SvgBackground from '../../../../components/Svg/SvgBackground';
import {appShadow, AppStyle, font, FontWeight} from '../../../../utilis/AppStyle';
import {AppColors} from '../../../../utilis/AppColors';
import {Image} from 'expo-image';
import {AppImages} from '../../../../utilis/AppConstant';
interface Props {
  title: string;
  isSelected: boolean;
  onSelect : ()=>void
}
const SingleCurrency = (props: Props) => {
  return (
      <TouchableWithoutFeedback onPress={() => {props.onSelect()}}>
        <View
          style={[
            {
              ...style.mainView,
            },
          ]}>
          <Image
            style={{
              ...style.tickStyle,
            }}
            source={
              props.isSelected
                ? AppImages.Common.check
                : AppImages.Common.uncheck
            }
          />
          <Text
            style={{
              ...style.titleStyle,
            }}>
            {props.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
  );
};
const style = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row',
    height: 45,
    marginBottom: 15,
    borderRadius: 4,
    backgroundColor : "white",
    ...appShadow(AppColors.primaryOP(0.5),{width : 0.5,height : 0.5}),
  },
  titleStyle: {
    ...font(16, FontWeight.Medium),
    marginLeft: 12,
  },
  tickStyle: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
});

export default SingleCurrency;

import React, {lazy, Suspense} from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import SvgBackground from '../../../../../components/Svg/SvgBackground';
import { AppColors } from '../../../../../utilis/AppColors';
import { AppImages } from '../../../../../utilis/AppConstant';
import { AppStyle, font } from '../../../../../utilis/AppStyle';
import { ColorModel } from '../../../../../Model/ColorModel';
const QuickBorder = React.lazy(
  () => import('../../../../../assets/newImages/Main/svgs/QuickBorder.svg'),
);
interface Props {
    color : ColorModel
  onPress? : ()=>void,
  size : any,
  isSelected? : boolean,
  style? : StyleProp<ViewStyle>
}
const SingleColorItem = (props: Props) => {
  return (
    <Suspense fallback={null}>
      <TouchableWithoutFeedback
      onPress={()=>props.onPress && props.onPress()}
      >
        <View
          style={[{
            ...style.mainView,
            ...props.size,
          },props.style && props.style,props.isSelected && style.selectedStyle]}>
         {
          !props.isSelected &&
           <SvgBackground>
            <QuickBorder
            height={props.size.height}
            width={props.size.width}
            preserveAspectRatio='none'
            />
          </SvgBackground>
         }
          <View
            style={{
              ...AppStyle.mainView,
            }}>
            <View
              style={{
                ...style.iconView,
              }}>
              <Image
                style={{
                  ...style.img,
                  tintColor : props.color.code ?? AppColors.txtGreyColor
                }}
                source={AppImages.MainSearch.colorCar}
              />
            </View>
            <Text
              style={{
                ...style.title,
              }}>
              {props.color.name}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Suspense>
  );
};
const style = StyleSheet.create({
  mainView: {
    marginTop: 12,
  },
  iconView: {
    height : "65%",
    backgroundColor: AppColors.white(1),
    margin: 6,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    ...font(12),
    textAlign: 'center',
  },
  img: {
    resizeMode: 'contain',
  },
  selectedStyle : {
    backgroundColor : AppColors.primaryOP(0.2),
    borderRadius : 6
  },
});
export default React.memo(SingleColorItem);

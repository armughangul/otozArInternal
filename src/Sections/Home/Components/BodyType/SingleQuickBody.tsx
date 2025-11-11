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
import SvgBackground from '../../../../components/Svg/SvgBackground';
import {AppStyle, font} from '../../../../utilis/AppStyle';
import {AppColors} from '../../../../utilis/AppColors';
import {BodyTypeModel} from '../../../../Model/BodyTypeModel';
import AppImageView from '../../../../components/AppImageView/AppImageView';
import {IMAGE_BODY_TYPE_BASE_URL} from '../../../../Network/Urls';
const QuickBorder = React.lazy(
  () => import('../../../../assets/newImages/Main/svgs/QuickBorder.svg'),
);
interface Props {
  bodyType: BodyTypeModel;
  onPress?: () => void;
  size: any;
  color? : string,
    style? : StyleProp<ViewStyle>
}
const SingleQuickBody = (props: Props) => {
  return (
    <Suspense fallback={null}>
      <TouchableWithoutFeedback
        onPress={() => props.onPress && props.onPress()}>
        <View
          style={[{
            ...style.mainView,
            ...props.size,
          },props.style && props.style]}>
          <SvgBackground>
            <QuickBorder
              height={props.size.height}
              width={props.size.width}
              preserveAspectRatio="none"
            />
          </SvgBackground>
          <View
            style={{
              ...AppStyle.mainView,
            }}>
            <View
              style={{
                ...style.iconView,
              }}>
              {props.bodyType?.mobile_icon &&
                props.bodyType?.mobile_icon != '' && (
                  <AppImageView
                    tintColor={props.color ?? AppColors.primary}
                    style={{
                      ...style.img,
                    }}
                    source={IMAGE_BODY_TYPE_BASE_URL + props.bodyType?.mobile_icon}
                  />
                )}
              {/* <Image
                style={{r
                  ...style.img,
                }}
                source={AppImages.dummy.dummyBodyType}
              /> */}
            </View>
            <Text
              style={{
                ...style.title,
              }}>
              {props.bodyType.name}
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
    height: '65%',
    backgroundColor: AppColors.white(0.25),
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
    width: '70%',
    resizeMode: 'contain',
    height: 50,
  },
});
export default React.memo(SingleQuickBody);

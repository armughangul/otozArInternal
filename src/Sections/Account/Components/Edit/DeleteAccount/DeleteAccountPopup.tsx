import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import BorderBtn from '../../../../../components/BorderBtn/BorderBtn';
import PaddingView from '../../../../../components/Padding/PaddingView';
import {AppColors} from '../../../../../utilis/AppColors';
import {
  AppImages,
  AppHorizontalMargin,
} from '../../../../../utilis/AppConstant';
import {confirmDeleteTxt} from '../../../../../utilis/AppStrings';
import {appShadow, font, FontWeight} from '../../../../../utilis/AppStyle';
interface Props {
  onClose: () => void;
  onCofirm: () => void;
}
const DeleteAccountPopUp = (props: Props) => {
  const animatedValue = useSharedValue(800);
  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: animatedValue.value,
        },
      ],
    };
  });
  useEffect(() => {
    initializeView();
  }, []);
  const initializeView = async () => {
    animateView(true);
  };
  const animateView = (start: boolean, onFinished: () => void = () => {}) => {
    animatedValue.value = withTiming(
      start ? 0 : 800,
      {
        duration: 300,
      },
      finished => {
        if (finished) {
          runOnJS(onFinished)();
        }
      },
    );
  };
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          animateView(false, () => {
            props.onClose();
          });
        }}>
        <View
          style={{
            ...style.mainView,
          }}
        />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          {
            ...style.modalView,
          },
          animatedViewStyle,
        ]}>
        <Image
          style={{
            ...style.iconStyle,
          }}
          source={AppImages.Account.deleteMain}
        />
        <Text
          style={{
            ...style.titleStyle,
          }}>
          Delete Account Confirmation
        </Text>
        <Text
          style={{
            ...style.descStyle,
          }}>
          {confirmDeleteTxt}
        </Text>
        <View
          style={{
            ...style.bottomBtnView,
          }}>
          <BorderBtn
            onPress={() => {
              animateView(false, () => {
                props.onClose();
              });
            }}
            title="Cancel"
            titleStyle={{
              ...style.cancelTxtStyle,
            }}
            btnStyle={{
              ...style.cancelBtnStyle,
            }}
            isSelected={false}
          />
          <PaddingView width={15} />
          <BorderBtn
            onPress={() => {
              animateView(false, () => {
                props.onCofirm();
              });
            }}
            title="Delete"
            titleStyle={{
              ...style.btnTitleStyle,
            }}
            btnStyle={{
              ...style.deleteBtnStyle,
            }}
            isSelected={false}
          />
        </View>
      </Animated.View>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: AppColors.white(1),
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    ...appShadow(),
    minHeight: 350,
  },
  iconStyle: {
    height: 81,
    width: 81,
    resizeMode: 'contain',
    alignSelf: 'center',
    transform: [
      {
        scale: 2.2,
      },
    ],
    marginTop: 20,
  },
  titleStyle: {
    ...font(16, FontWeight.SemiBold),
    textAlign: 'center',
    marginTop: 20,
  },
  descStyle: {
    ...font(14),
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: AppHorizontalMargin,
  },
  bottomBtnView: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: AppHorizontalMargin,
    marginTop: 20,
  },
  confirmBtnStyle: {
    flex: 1,
    backgroundColor: AppColors.green,
  },
    btnTitleStyle: {
    ...font(14),
    color: AppColors.white(1),
  },
  deleteBtnStyle: {
    flex: 1,
    backgroundColor: AppColors.redColor,
  },
  cancelBtnStyle: {
    flex: 1,
    backgroundColor: AppColors.bgBtnMore,
    borderWidth :0
  },
    cancelTxtStyle: {
    ...font(14),
  },
});

export default DeleteAccountPopUp;

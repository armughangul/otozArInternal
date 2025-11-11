import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {runOnJS} from 'react-native-worklets';
import {AppHorizontalMargin, AppImages} from '../../utilis/AppConstant';
import {appShadow, AppStyle, font, FontWeight} from '../../utilis/AppStyle';
import {AppColors} from '../../utilis/AppColors';
import BgBtn from '../BgBtn/BgBtn';
import BorderBtn from '../BorderBtn/BorderBtn';
import DateDropDown from '../DateDropDown/DateDropDown';
import {JourneyManagerType} from '../../Sections/Journey/Manager/JourneyManager';
import { MainSearchManagerType } from '../../Sections/MainSearch/Manager/MainSearchManager';
import { useDispatch } from 'react-redux';
import { setTabbarVisibility } from '../../redux/Reducers/AppReducer';
interface Props {
  title: string;
  onApply?: () => void;
  manager: JourneyManagerType | MainSearchManagerType;
}
const CarYearDropDown = (props: Props) => {
  const dispatch = useDispatch()
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
    dispatch(setTabbarVisibility(false))
    animateView(true);
  }, []);
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
                                dispatch(setTabbarVisibility(true))
            props.manager.setYearRangeObj({
              ...props.manager.yearRangeObj,
              isVisible: false,
            });
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
        <View
          style={{
            ...style.topView,
          }}>
          <Text
            style={{
              ...style.titleStyle,
            }}>
            {props.title}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              animateView(false, () => {
                    dispatch(setTabbarVisibility(true))
                props.manager.setYearRangeObj({
                  ...props.manager.yearRangeObj,
                  isVisible: false,
                });
              });
            }}>
            <Image
              style={{
                ...style.crossBtn,
              }}
              source={AppImages.Common.crossImg}
            />
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            ...style.lineBorder,
          }}
        />
        <View
          style={{
            ...style.flatStyle,
          }}>
          <View
            style={{
              ...style.horiMainView,
            }}>
            <View
              style={{
                ...style.horiInnerView,
              }}>
              <DateDropDown
                value={`${props.manager.datePicker.fromYear ?? ''}`}
                onPress={() => {
                  props.manager.showDatePicker({
                    ...props.manager.datePicker,
                    type: 0,
                    isVisible: true,
                  });
                }}
                title="Min Year"
                placeHolder="Min Year"
              />
              <View
                style={{
                  ...style.paddingInnerView,
                }}
              />
              <DateDropDown
                value={`${props.manager.datePicker.fromMonth ?? ''}`}
                onPress={() => {
                  props.manager.showDatePicker({
                    ...props.manager.datePicker,
                    type: 1,
                    isVisible: true,
                  });
                }}
                viewStyle={{
                  ...style.monthStyle,
                }}
                title="Month"
                placeHolder="Mon"
              />
            </View>
            <View
              style={{
                ...style.paddingView,
              }}
            />
            <View
              style={{
                ...style.horiInnerView,
              }}>
              <DateDropDown
                value={`${props.manager.datePicker.toYear ?? ''}`}
                onPress={() => {
                  props.manager.showDatePicker({
                    ...props.manager.datePicker,
                    type: 2,
                    isVisible: true,
                  });
                }}
                title="Max Year"
                placeHolder="Max Year"
              />
              <View
                style={{
                  ...style.paddingInnerView,
                }}
              />
              <DateDropDown
                value={`${props.manager.datePicker.toMonth ?? ''}`}
                onPress={() => {
                  props.manager.showDatePicker({
                    ...props.manager.datePicker,
                    type: 3,
                    isVisible: true,
                  });
                }}
                viewStyle={{
                  ...style.monthStyle,
                }}
                title="Month"
                placeHolder="Mon"
              />
            </View>
          </View>
          <View
            style={{
              ...style.horiMainView,
            }}>
            <BgBtn
              btnStyle={{
                ...style.btnStyle,
              }}
              onPress={() => {
                 animateView(false, () => {
                      dispatch(setTabbarVisibility(true))
                  props.manager.setYearRangeObj(
                    {
                  isVisible : false,
                  type : 0
                }
                  )
              });
                props.manager.showDatePicker({
                  isVisible : false
                })
              }}
              title="Clear"
            />
            <View
              style={{
                ...style.paddingView,
              }}
            />
            <BorderBtn
              isSelected={props.manager.checkYearStatus()}
              btnStyle={{
                ...style.btnStyle,
              }}
              onPress={() => {
                if (props.manager.validateYear()) {
                  animateView(false, () => {
                  dispatch(setTabbarVisibility(true))
                props.manager.setYearRangeObj({
                  ...props.manager.datePicker,
                  isVisible: false,
                });
              });
                
                }
              }}
              title="Apply Filter"
            />
          </View>
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
    flex: 1,
    maxHeight: 284,
    backgroundColor: AppColors.white(1),
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    ...appShadow(),
  },
  titleStyle: {
    ...font(16, FontWeight.SemiBold),
  },
  topView: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: AppHorizontalMargin,
  },
  crossBtn: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  lineBorder: {
    height: 0.5,
    backgroundColor: AppColors.primaryOP(0.25),
    marginBottom: 20,
  },
  flatStyle: {
    ...AppStyle.mainView,
    marginTop: 15,
  },
  horiMainView: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: AppHorizontalMargin,
  },
  horiInnerView: {
    flex: 1,
    flexDirection: 'row',
  },
  paddingView: {
    width: 15,
  },
  paddingInnerView: {
    width: 8,
  },
  btnStyle: {
    flex: 1,
  },
  monthStyle: {
    flex: 0.6,
  },
});

export default React.memo(CarYearDropDown);

import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
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
import BudgetRange from '../BudgetRange/BudgetRange';
import LightInput from '../LightInput/LightInput';
import BgBtn from '../BgBtn/BgBtn';
import BorderBtn from '../BorderBtn/BorderBtn';
import {JourneyManagerType} from '../../Sections/Journey/Manager/JourneyManager';
import { MainSearchManagerType } from '../../Sections/MainSearch/Manager/MainSearchManager';
import { useDispatch } from 'react-redux';
import { setTabbarVisibility } from '../../redux/Reducers/AppReducer';
interface Props {
  onClose: () => void;
  title: string;
  manager: JourneyManagerType | MainSearchManagerType;
  setBudget: (minPrice: number | null, maxPrice: number | null) => void;
  minPrice? : number | null,
  maxPrice? : number | null
}
const BudgetDropDown = (props: Props) => {
    const dispatch = useDispatch()
  const animatedValue = useSharedValue(800);
  const [minPrice, setMinPice] = useState(props?.minPrice ?? 0);
  const [maxPrice, setMaxPrice] = useState(props?.maxPrice ?? 500000);
  const minRef = useRef<TextInput>(null);
  const maxRef = useRef<TextInput>(null);
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
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      console.log('Keyboard is open');
      animatedValue.value = -300;
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      console.log('Keyboard is closed');
      animatedValue.value = 0;
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
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
                props.onClose();
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
          <BudgetRange
            onChange={values => {
              if (values && values[0] != minPrice) {
                minRef.current?.setNativeProps({text: values[0]});
                setMinPice(values[0]);
              }
              if (values && values[1] != maxPrice) {
                setMaxPrice(values[1]);
                maxRef.current?.setNativeProps({text: values[1]});
              }
            }}
            minValue={minPrice}
            maxValue={maxPrice}
            min={0}
            max={500000}
          />
          <View
            style={{
              ...style.horiMainView,
            }}>
            <LightInput
              inputRef={minRef}
              value={minPrice.toString()}
              title="Min Price"
              placeHolder="Min $0"
              onChangeTxt={txt => {
                if (
                  Number(txt) &&
                  Number(maxPrice) &&
                  Number(txt) > Number(maxPrice)
                ) {
                  return;
                }
                setMinPice(Number(txt) ?? 0);
              }}
            />
            <View
              style={{
                ...style.paddingView,
              }}
            />
            <LightInput
              inputRef={maxRef}
              value={maxPrice.toString()}
              title="Max Price"
              placeHolder="Max $500000+"
              onChangeTxt={txt => {
                if (
                  Number(txt) &&
                  Number(minPrice) &&
                  Number(txt) < Number(minPrice)
                ) {
                  return;
                }
                setMaxPrice(Number(txt) ?? 500000);
              }}
            />
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
                setMaxPrice(500000);
                setMinPice(0);
                minRef.current?.setNativeProps({text: ''});
                maxRef.current?.setNativeProps({text: ''});
                props.setBudget(null,null)
               dispatch(setTabbarVisibility(true))
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
              isSelected={minPrice < maxPrice}
              btnStyle={{
                ...style.btnStyle,
              }}
              onPress={() => {
                if (props.manager.validateBudget(minPrice, maxPrice)) {
                  animateView(false, () => {
                    dispatch(setTabbarVisibility(true))
                    props.setBudget(minPrice, maxPrice);
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
    maxHeight: 337,
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
  paddingView: {
    width: 15,
  },
  btnStyle: {
    flex: 1,
  },
});

export default React.memo(BudgetDropDown);

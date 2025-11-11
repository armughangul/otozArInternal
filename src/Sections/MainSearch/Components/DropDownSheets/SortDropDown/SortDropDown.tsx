import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  ScrollView,
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
import {useDispatch} from 'react-redux';
import BgBtn from '../../../../../components/BgBtn/BgBtn';
import BorderBtn from '../../../../../components/BorderBtn/BorderBtn';
import {setTabbarVisibility} from '../../../../../redux/Reducers/AppReducer';
import {AppColors} from '../../../../../utilis/AppColors';
import {
  AppImages,
  AppHorizontalMargin,
} from '../../../../../utilis/AppConstant';
import {
  appShadow,
  font,
  FontWeight,
  AppStyle,
} from '../../../../../utilis/AppStyle';
import {MainSearchManagerType} from '../../../Manager/MainSearchManager';
import BottomAppSafeArea from '../../../../../components/AppSafeArea/BottomAppSafeArea';
import SortSection from './SortSection';
import {
  sortDateList,
  sortMileageList,
  sortModelYearList,
  sortPriceList,
} from '../../../../../utilis/AppStrings';
interface Props {
  onClose: () => void;
  title: string;
  manager: MainSearchManagerType;
}
const SortDropDown = (props: Props) => {
    const [priceSorting,setPriceSorting] = useState(props.manager.priceSorting)
  const [mileageSorting,setMileageSorting] = useState(props.manager.mileageSorting)
  const [modelSorting,setModelSorting] = useState(props.manager.modelSorting)
  const [dateSorting,setDate] = useState(props.manager.dateSorting)
  const dispatch = useDispatch();
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
    dispatch(setTabbarVisibility(false));
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
            dispatch(setTabbarVisibility(true));
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
                dispatch(setTabbarVisibility(true));
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
          <View
            style={{
              ...AppStyle.mainView,
            }}>
            <ScrollView
            showsVerticalScrollIndicator = {false}
            >
              <SortSection
              selectedIndex={priceSorting}
                title="Sort By Price"
                itemList={sortPriceList}
                onSelectItem={(index) => setPriceSorting(index)}
              />
              <SortSection
              selectedIndex={mileageSorting}
                title="Mileage"
                itemList={sortMileageList}
                onSelectItem={(index) => setMileageSorting(index)}
              />
              <SortSection
              selectedIndex={modelSorting}
                title="Model Year"
                itemList={sortModelYearList}
                onSelectItem={(index) => setModelSorting(index)}
              />
              <SortSection
              selectedIndex={dateSorting}
                title="Updated Date"
                itemList={sortDateList}
               onSelectItem={(index) => setDate(index)}
              />
            </ScrollView>
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
                   props.onClose()
                  props.manager.updateSortingValues(-1,-1,-1,-1)
                  dispatch(setTabbarVisibility(true));
                });
              }}
              title="Clear"
            />
            <View
              style={{
                ...style.paddingView,
              }}
            />
            <BorderBtn
              isSelected={priceSorting != -1 || mileageSorting != -1 || modelSorting != -1 || dateSorting != -1}
              btnStyle={{
                ...style.btnStyle,
              }}
              onPress={() => {
                if(priceSorting != -1 || mileageSorting != -1 || modelSorting != -1 || dateSorting != -1){
                   animateView(false, () => {
                                       props.onClose()
                 props.manager.updateSortingValues(priceSorting,mileageSorting,modelSorting,dateSorting)
                  dispatch(setTabbarVisibility(true));
                });
                }
              }}
              title="Apply Filter"
            />
          </View>
        </View>
        <BottomAppSafeArea />
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
    maxHeight: 600,
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
  },
  flatStyle: {
    ...AppStyle.mainView,
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

export default React.memo(SortDropDown);

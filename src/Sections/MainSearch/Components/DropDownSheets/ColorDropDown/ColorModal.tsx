import React, {useEffect, useLayoutEffect, useState} from 'react';
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
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {runOnJS} from 'react-native-worklets';
import {AppColors} from '../../../../../utilis/AppColors';
import {
  AppImages,
  AppHorizontalMargin,
} from '../../../../../utilis/AppConstant';
import {
  AppStyle,
  appShadow,
  font,
  FontWeight,
} from '../../../../../utilis/AppStyle';
import CommonManager from '../../../../../utilis/CommonManager';
import SearchBar from '../../../../../components/AppSearchBar/SearchBar';
import {useDispatch} from 'react-redux';
import {setTabbarVisibility} from '../../../../../redux/Reducers/AppReducer';
import SingleColorItem from './SingleColorItem';
import {MainSearchManagerType} from '../../../Manager/MainSearchManager';
import BgBtn from '../../../../../components/BgBtn/BgBtn';
import BorderBtn from '../../../../../components/BorderBtn/BorderBtn';
import BottomAppSafeArea from '../../../../../components/AppSafeArea/BottomAppSafeArea';
interface Props {
  onClose: () => void;
  onSelect: (colorList: ColorModel[]) => void;
  manager: MainSearchManagerType;
}
const ColorModal = (props: Props) => {
  let size = CommonManager.shared.generateViewAspectRatioSize(
    2 / 1.7,
    (Dimensions.get('screen').width - AppHorizontalMargin) / 3 - 12,
  );
  const dispatch = useDispatch();
  const animatedValue = useSharedValue(800);
  const [search, setSearch] = useState('');
  const [selectedIndexList, setSelectedIndexList] = useState<number[]>([]);
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
  }, []);
  useLayoutEffect(() => {
    setSelectedIndexList(props.manager.getSelectedColorListIndex());
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
  const setSelection = (index: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedIndexList(selectedIndexList.filter(item => item != index));
    } else {
      setSelectedIndexList([...selectedIndexList, index]);
    }
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
            Color
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
        <SearchBar onChange={txt => setSearch(txt)} placeHolder="Search" />
        <View
          style={{
            ...style.flatStyle,
          }}>
          <FlatList
            numColumns={3}
            showsVerticalScrollIndicator={false}
            data={CommonManager.shared.colorList}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({item, index}) => {
              let isSelected = selectedIndexList.includes(index);
              if (
                search != '' &&
                !CommonManager.shared.checkTxtExist(search, item.name)
              ) {
                return null;
              }
              return (
                <View
                  style={{
                    ...style.singleColumn,
                  }}>
                  <SingleColorItem
                    size={size}
                    color={item}
                    isSelected={isSelected}
                    onPress={() => {
                      setSelection(index, isSelected);
                      // animateView(false, () => {
                      //   // props.onSelect && props.onSelect()
                      // });
                    }}
                  />
                </View>
              );
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
                dispatch(setTabbarVisibility(true));
                setSelectedIndexList([])
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
            isSelected={selectedIndexList.length > 0}
            btnStyle={{
              ...style.btnStyle,
            }}
            onPress={() => {
              if (selectedIndexList.length > 0) {
                animateView(false, () => {
                  dispatch(setTabbarVisibility(true));
                  let colorList : ColorModel[] = []
                  selectedIndexList.forEach((innerIndex)=>{
                    colorList.push(CommonManager.shared.colorList[innerIndex])
                  })
                  props.onSelect(colorList)
                });
              }
            }}
            title="Apply Filter"
          />
        </View>
        <BottomAppSafeArea/>
      </Animated.View>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    ...AppStyle.mainView,
    backgroundColor: AppColors.white(1),
    marginTop: 200,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    ...appShadow(),
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
    marginHorizontal: AppHorizontalMargin,
  },
  titleStyle: {
    ...font(16, FontWeight.SemiBold),
  },
  singleColumn: {
    width: Dimensions.get('screen').width / 3,
    justifyContent: 'center',
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

export default ColorModal;

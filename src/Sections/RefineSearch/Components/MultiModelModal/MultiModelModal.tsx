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
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {runOnJS} from 'react-native-worklets';

import {useDispatch} from 'react-redux';
import {CarModel} from '../../../../Model/CarModel';
import {AppColors} from '../../../../utilis/AppColors';
import {AppImages, AppHorizontalMargin} from '../../../../utilis/AppConstant';
import {
  AppStyle,
  appShadow,
  font,
  FontWeight,
} from '../../../../utilis/AppStyle';
import CommonManager from '../../../../utilis/CommonManager';
import SingleItem from '../../../Journey/Components/DropDown/SingleItem';
import MakeHoriList from '../../../MainSearch/Components/DropDownSheets/ModelDropDown/MakeHoriList';
import {RefineSearchManagerType} from '../../Manager/RefineSearchManager';
import AppSearchBar from '../../../../components/AppSearchBar/SearchBar';
import BgBtn from '../../../../components/BgBtn/BgBtn';
import BorderBtn from '../../../../components/BorderBtn/BorderBtn';
import BottomAppSafeArea from '../../../../components/AppSafeArea/BottomAppSafeArea';
interface Props {
  onClose: () => void;
  onSelect: (model: CarModel[]) => void;
  manager: RefineSearchManagerType;
  showMakeList?: boolean;
  selectedList: CarModel[];
}
const MultiModelModal = (props: Props) => {
  const animatedValue = useSharedValue(800);
  const [search, setSearch] = useState('');
  const [list, setList] = useState<CarModel[]>([]);
  const [selectedList, setSelectedList] = useState<CarModel[]>([]);
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
  useEffect(() => {
    fetchModelList();
  }, [props.manager.selectedMaker]);
  const initializeView = async () => {
    await fetchModelList();
    animateView(true);
  };
  const fetchModelList = async () => {
    await props.manager
      .getList(props.manager.selectedMaker?.id ?? -1)
      .then((newList: any) => setList(newList));
  };
  const animateView = (start: boolean, onFinished: () => void = () => {}) => {
    animatedValue.value = withTiming(
      start ? 0 : 800,
      {
        duration: 200,
      },
      finished => {
        if (finished) {
          runOnJS(onFinished)();
        }
      },
    );
  };
  const onSelectItem = (item: CarModel) => {
    let findedList = [...selectedList];
    let index = findedList.findIndex(innerItem => innerItem.id == item.id);
    if (index == -1) {
      findedList.push(item);
    } else {
      findedList.splice(index, 1);
    }
    setSelectedList(findedList);
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
        <View
          style={{
            ...style.topView,
          }}>
          <Text
            style={{
              ...style.titleStyle,
            }}>
            Model
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              animateView(false, () => {
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
        <AppSearchBar onChange={txt => setSearch(txt)} placeHolder="Search" />
        <View
          style={{
            ...style.flatStyle,
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={list}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({item, index}) => {
              if (
                search != '' &&
                !CommonManager.shared.checkTxtExist(search, item.name)
              ) {
                return null;
              }
              return (
                <SingleItem
                  isSelected={
                    selectedList.findIndex(
                      (innerItem, index) => innerItem.id == item.id,
                    ) !== -1
                  }
                  title={item.name}
                  onPress={() => {
                    onSelectItem(item);
                  }}
                />
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
            onPress={() => {}}
            title="Clear"
          />
          <View
            style={{
              ...style.paddingView,
            }}
          />
          <BorderBtn
            isSelected={selectedList.length > 0}
            btnStyle={{
              ...style.btnStyle,
            }}
            onPress={() => {
              if (selectedList.length > 0) {
                animateView(false, () => {
                    props.onSelect(selectedList)
                });
              }
            }}
            title="Apply Filter"
          />
        </View>
        <BottomAppSafeArea />
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
    marginTop: 5,
  },
  titleStyle: {
    ...font(16, FontWeight.SemiBold),
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

export default React.memo(MultiModelModal);

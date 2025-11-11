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
import {runOnJS} from "react-native-worklets"
import { AppColors } from '../../../../../utilis/AppColors';
import { AppImages, AppHorizontalMargin } from '../../../../../utilis/AppConstant';
import { AppStyle, appShadow, font, FontWeight } from '../../../../../utilis/AppStyle';
import CommonManager from '../../../../../utilis/CommonManager';
import SearchBar from '../../../../../components/AppSearchBar/SearchBar';
import { useDispatch } from 'react-redux';
import { setTabbarVisibility } from '../../../../../redux/Reducers/AppReducer';
import SingleItem from '../../../../Journey/Components/DropDown/SingleItem';
interface Props {
  onClose: () => void;
  onSelect: (item : any) => void;
  list : any[],
  title? : string
}
const SimpleDropDown = (props: Props) => {
  const dispatch = useDispatch()
  const animatedValue = useSharedValue(800);
  const [search,setSearch] = useState("")
  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: animatedValue.value,
        },
      ],
    };
  });
  useEffect(()=>{
    initializeView()
  },[])
  const initializeView = async()=>{
    dispatch(setTabbarVisibility(false))
    animateView(true)
  }
  const animateView = (start: boolean,onFinished : ()=>void = ()=>{}) => {
    animatedValue.value = withTiming(
      start ? 0 : 800,
      {
        duration: 300,
      },
      finished => {
        if (finished){
        runOnJS(onFinished)()
        }
      },
    );
  };
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <TouchableWithoutFeedback onPress={() => {
        animateView(false,()=>{
              dispatch(setTabbarVisibility(true))
            props.onClose()
        })
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
          style = {{
            ...style.titleStyle
          }}
          >{props.title ?? "Model"}</Text>
          <TouchableWithoutFeedback onPress={() => {
            animateView(false,()=>{
                  dispatch(setTabbarVisibility(true))
            props.onClose()
        })
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
        <SearchBar onChange={(txt) => setSearch(txt)} placeHolder="Search" />
        <View
          style={{
            ...style.flatStyle,
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={props.list}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({item, index}) => {
              if (search != "" && !CommonManager.shared.checkTxtExist(search,item)){
                return null
              }
              return (
              <SingleItem
              isSelected = {false}
              title={item}
              onPress={()=>{
                animateView(false,()=>{
                  dispatch(setTabbarVisibility(true))
                  props.onSelect && props.onSelect(item)
                })
              }}
              />
              )
            }}
          />
        </View>
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
    titleStyle : {
      ...font(16,FontWeight.SemiBold)
    },
});

export default SimpleDropDown;

import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {appShadow, AppStyle, font, FontWeight} from '../../../../utilis/AppStyle';
import {AppColors} from '../../../../utilis/AppColors';
import {AppHorizontalMargin, AppImages} from '../../../../utilis/AppConstant';
import SelectionDropDownModel from '../../../../Model/SelectionDropDownModel';
import SearchBar from '../../../../components/AppSearchBar/SearchBar';
import SingleItem from './SingleItem';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {runOnJS} from "react-native-worklets"
import CommonManager from '../../../../utilis/CommonManager';
interface Props {
  model: SelectionDropDownModel | null;
  onClose: () => void;
  onSelect: (index: number) => void;
}
const DropDownModal = (props: Props) => {
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
  useEffect(() => {
    animateView(true)
  },[]);
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
          >{props.model?.title}</Text>
          <TouchableWithoutFeedback onPress={() => {
            animateView(false,()=>{
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
            data={props.model?.data}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({item, index}) => {
              if (search != "" && !CommonManager.shared.checkTxtExist(search,item.name)){
                return null
              }
              return <SingleItem
              isSelected = {false}
              onPress={()=>{
                animateView(false,()=>{
                  props.onSelect && props.onSelect(index)
                })
              }}
              title={item?.name}
              img={item?.mobile_icon ?? item?.mobile_icon}
              />;
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
    marginTop: 15,
  },
    titleStyle : {
      ...font(16,FontWeight.SemiBold)
    },
});

export default DropDownModal;

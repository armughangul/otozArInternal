import React, {useEffect, useRef} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {AppColors} from '../../../utilis/AppColors';
import {AppHorizontalMargin, AppImages} from '../../../utilis/AppConstant';
import {AppStyle, font, FontWeight} from '../../../utilis/AppStyle';
import {AiSearchManagerType} from '../Manager/AiSearchManager';
import AnimatedLottieView from 'lottie-react-native';
import AiSearchFieldView from './AiSearchFieldView';
import BorderBtn from '../../BorderBtn/BorderBtn';
import AiVoiceSearchView from './AiVoiceSearchView';
import BottomAppSafeArea from '../../AppSafeArea/BottomAppSafeArea';
import PaddingView from '../../Padding/PaddingView';

interface Props {
  manager: AiSearchManagerType;
  onClose : ()=>void
}
const SearchFilterView = (props: Props) => {
  const animationRef = useRef<any>(null);
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, []);
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <View
        style={{
          ...style.topView,
        }}>
        <View
          style={{
            ...AppStyle.commonHoriStyle,
            alignItems : "center"
          }}>
          <Text
            style={{
              ...style.smartTxt,
            }}>
           {props.manager.showVoice ? "Smart Voice" : "Smart Filters"} 
          </Text>
          {
            props.manager.showVoice ?
            <TouchableWithoutFeedback
            onPress={()=>{
              props.manager.onDeleteVoice();
            }}
            >
              <View
              style = {{
                ...style.smtView
              }}
              >
                <Text
                style = {{
                  ...style.smtTxt
                }}
                >
                  Smart Filter
                </Text>
                <Image
                style = {{
                  ...style.smtImg
                }}
                source={AppImages.Common.starIcon}
                />
              </View>
            </TouchableWithoutFeedback>
            :
      <AnimatedLottieView
            ref={animationRef}
            source={require('../../../assets/lottie/aiStarAnim.json')}
            style={{...style.starStyle}}
            autoPlay
            loop={true}
          />
          }
    
        </View>
        <TouchableWithoutFeedback
        onPress={()=>{
          props.onClose()
        }}
        >
          <Image
            style={{
              ...style.crossIcon,
            }}
            source={AppImages.Common.crossImg}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={{...style.borderStyle}} />
      <View
        style={{
          ...style.innerView,
        }}>
       {
        props.manager.showVoice ?
        <AiVoiceSearchView manager={props.manager} /> :
 <View>
          <PaddingView
          height={20}
          />
            <AiSearchFieldView
            value={props.manager.text}
            onChange={(txt)=>props.manager.setText(txt)}
            showMic = {true}
            onMic={()=>props.manager.onMic()}
            />
              <PaddingView
          height={20}
          />
            <BorderBtn
            onPress={()=>{
              props.manager.onAiSearch(props.manager.text)
            }}
            title='Apply Filter'
            />
          </View>
       }
       
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    backgroundColor: AppColors.white(1),
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    borderTopWidth: 1,
    borderEndWidth: 1,
    borderStartWidth: 1,
    borderColor: AppColors.primary,
    paddingBottom: 30,
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'space-between',
    paddingHorizontal: AppHorizontalMargin,
  },
  smartTxt: {
    ...font(16, FontWeight.SemiBold),
  },
  crossIcon: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  starStyle: {
    height: 24,
    width: 20,
    marginLeft: 5,
  },
  borderStyle: {
    ...AppStyle.commonBorder,
  },
  innerView: {
    marginHorizontal: AppHorizontalMargin,
  },
  smtView : {
    backgroundColor : AppColors.primary,
    borderRadius : 7.33,
    width : 113,
    height : 33,
    justifyContent : "center",
    alignItems : "center",
    flexDirection : "row",
    marginLeft : 8
  },
  smtTxt : {
    ...font(12),
    color : AppColors.white(1)
  },
  smtImg : {
    height :18.78,
    width : 15.58,
    resizeMode : "contain",
    marginLeft : 5
  }
});

export default SearchFilterView;

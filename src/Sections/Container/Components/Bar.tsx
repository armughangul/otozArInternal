import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import {AppColors} from '../../../utilis/AppColors';
import {font} from '../../../utilis/AppStyle';
import AnimatedLottieView from 'lottie-react-native';

interface Props {
  obj: any;
  onPress: () => void;
  index: number;
  tab: number;
}
const Bar = ({obj, onPress, index, tab}: Props) => {
  return (
    <TouchableWithoutFeedback key={obj.name} onPress={() => onPress()}>
      <View style={{
        ...styles.barStyle
      }}>
        {
          obj.name == "Agentic" ?
             <AnimatedLottieView
                    source={tab == index ? require("../../../assets/lottie/agenticIconSelectedAnim.json") : require("../../../assets/lottie/agenticIconAnim.json")}
                    style={{...styles.agenticStyle}}
                    autoPlay
                    loop = {true}
                    onAnimationFinish={()=>{
                    }}
                  />
          :
                 <Image
              style={[styles.tabStyle]}
              source={tab == index ? obj.selectedIcon : obj.icon}
              resizeMode="contain"
            />
        }

        <Text
          style={{
            ...(tab == index ? styles.selectedTitleStyle : styles.titleStyle),
          }}>
          {obj.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  barStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabStyle: {
    // tintColor: AppColors.primary,
    width: 24,
    height: 24,
  },
  agenticStyle : {
    height : 24,
    width : 24,
    resizeMode : "contain",
    transform : [{
      scale : 1.8
    },
  {translateY : -5}
  ]
  },
  titleStyle: {
    ...font(12),
    color: AppColors.txtGreyColor,
    marginTop: 5,
  },
  selectedTitleStyle: {
    ...font(12),
    color: AppColors.primary,
    marginTop: 5,
  },
});
export default React.memo(Bar);

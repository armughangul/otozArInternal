import React from 'react';
import {
    Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { font } from '../../../../utilis/AppStyle';
import { AppColors } from '../../../../utilis/AppColors';
import { AppImages } from '../../../../utilis/AppConstant';
interface Props {
  title: string;
  onPress : ()=>void,
}
const WhatsappBtn = (props : Props) => {
  return (
    <TouchableWithoutFeedback
    onPress={()=>props.onPress()}
    >
      <View style={{
        ...style.mainView,
      }}>
        <Image
        style = {{
            ...style.imgStyle
        }}
        source={AppImages.Detail.whatsappImg}
        />
        <Text
        style = {{
            ...style.txtStyle
        }}
        >
            {props.title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
const style = StyleSheet.create({
  mainView: {
    flex: 1,
    height: 41,
    justifyContent : "center",
    alignItems  : "center",
    borderRadius : 8,
    backgroundColor : AppColors.green,
    flexDirection : "row"
  },
  txtStyle : {
    ...font(14),
    color :AppColors.white(1)
  },
  imgStyle : {
    height : 21,
    width :21,
    resizeMode : "contain",
    marginRight : 3
  }
});
export default WhatsappBtn;

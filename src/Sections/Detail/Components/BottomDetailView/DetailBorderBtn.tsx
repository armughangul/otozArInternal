import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { font } from '../../../../utilis/AppStyle';
interface Props {
  title: string;
  onPress : ()=>void,
  color : string
}
const DetailBorderBtn = (props : Props) => {
  return (
    <TouchableWithoutFeedback
    onPress={()=>props.onPress()}
    >
      <View style={{
        ...style.mainView,
        borderColor : props.color
      }}>
        <Text
        style = {{
            ...font(14),
            color : props.color
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
    borderWidth : 1,
    borderRadius : 8,
    marginRight :8
  },
  txtStyle : {
    ...font(14)
  }
});
export default DetailBorderBtn;

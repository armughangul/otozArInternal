import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {AppColors} from '../../utilis/AppColors';
import {font} from '../../utilis/AppStyle';
interface Props {
  btnStyle?: StyleProp<ViewStyle>;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  onPress: () => void;
}
const BgBtn = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => props.onPress && props.onPress()}>
      <View style={[style.mainView, props?.btnStyle && props.btnStyle]}>
        <Text
          style={[
            {
              ...style.titleStyle,
            },
            props.titleStyle && props.titleStyle,
          ]}>
          {props.title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
const style = StyleSheet.create({
  mainView: {
    height: 41,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : AppColors.bgBtn,
  },
  titleStyle: {
    ...font(14),
  },
});

export default React.memo(BgBtn);

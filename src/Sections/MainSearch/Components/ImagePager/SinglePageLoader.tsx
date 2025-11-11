import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppColors} from '../../../../utilis/AppColors';
interface Props {
    isSelected : boolean,
}
const SinglePageLoader = (props : Props) => {
  return (
    <View
      style={{
        ...style.sliderValueStyle,
      }}>
    {
        props.isSelected &&
          <View
        style={{
          ...style.fillView,
        }}
      />
    }
    </View>
  );
};
const style = StyleSheet.create({
  sliderValueStyle: {
    flex: 1,
    height: 3,
    marginRight: 10,
    borderRadius: 2,
    backgroundColor: AppColors.seperatorColor,
  },
  fillView: {
    flex: 1,
    backgroundColor: AppColors.txtLightColor,
  },
});

export default React.memo(SinglePageLoader);

import React, { Suspense } from 'react';
import {StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import { font, FontWeight } from '../../../../utilis/AppStyle';
import SvgBackground from '../../../../components/Svg/SvgBackground';
import { AppColors } from '../../../../utilis/AppColors';
     const QuickBorder4 = React.lazy(() =>
      import("../../../../assets/newImages/MainSearch/svgs/QuickBorder4.svg")
    );
interface Props {
    model : any,
    onPress : ()=>void,
    isSelected : boolean
}
const SingleFilterItem = (props : Props) => {

  return <Suspense>
   <TouchableWithoutFeedback
   onPress={()=>props.onPress()}
   >
     <View
  style = {[{
    ...style.mainView
  },props.isSelected && style.selectedStyle]}
  >
    {
      !props.isSelected &&
    <SvgBackground>
        <QuickBorder4
        width={"100%"}
        preserveAspectRatio='none'
        />
    </SvgBackground>
    }
    <Text
    style = {{
        ... props.isSelected ? style.selectedTitleStyle : style.titleStyle
    }}
    >
        {props.model.title} {props.isSelected && " x"}
    </Text>
  </View>
   </TouchableWithoutFeedback>
  </Suspense>
};
const style = StyleSheet.create({
  mainView: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 4,
    marginRight: 15,
  },
  titleStyle : {
    ...font(12,FontWeight.Light)
  },
  selectedStyle : {
    backgroundColor : AppColors.primary,
    borderRadius : 4,
  },
  selectedTitleStyle : {
    ...font(12,FontWeight.Medium),
    color : AppColors.white(1)
  }
});
export default React.memo(SingleFilterItem);

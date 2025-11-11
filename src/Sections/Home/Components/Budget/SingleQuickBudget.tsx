import React,{lazy, Suspense} from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import SvgBackground from '../../../../components/Svg/SvgBackground';
import { AppStyle, font } from '../../../../utilis/AppStyle';
import { AppColors } from '../../../../utilis/AppColors';
import { AppImages } from '../../../../utilis/AppConstant';
import { BudgetModel } from '../../../../Model/BudgetModel';
import CommonManager from '../../../../utilis/CommonManager';
    const QuickBorder3 = React.lazy(() =>
  import("../../../../assets/newImages/Main/svgs/QuickBorder3.svg")
);

interface Props {
    budgetModel : BudgetModel,
    size : any,
    onPress : ()=>void
}
const SingleQuickBudget = (props : Props) => {

  return (
    <Suspense
    fallback = {null}
    >
   <TouchableWithoutFeedback
   onPress={()=>props.onPress && props.onPress()}
   >
      <View
    style = {{
        ...style.mainView,
        ...props.size
    }}
    >
        <SvgBackground>
        <QuickBorder3
        preserveAspectRatio='none'
        />
        </SvgBackground>
            <Text
            style = {{
                ...style.title
            }}
            >
                {
                    `$${CommonManager.shared.formattedNumber(props.budgetModel.min_price)} - $${CommonManager.shared.formattedNumber(props.budgetModel.max_price)}`
                }
            </Text>
    </View>
   </TouchableWithoutFeedback>
    </Suspense>
  )
}
const style = StyleSheet.create({
    mainView : {
       marginTop : 12,
       justifyContent : "center",
       alignItems : "center"
    },
    iconView : {
        height : 60,
        backgroundColor : AppColors.white(0.25),
        margin : 6,
        borderRadius : 4,
        justifyContent : "center",
        alignItems : "center"
    },
    title : {
        ...font(12),
        textAlign : "center"
    },
    img : {
        resizeMode : "contain"
    }
})
export default React.memo(SingleQuickBudget)

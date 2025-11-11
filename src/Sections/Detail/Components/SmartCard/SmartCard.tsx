import React from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { AppColors } from '../../../../utilis/AppColors'
import { AppStyle, font, FontWeight } from '../../../../utilis/AppStyle'
import { CarDetailManagerType } from '../../Manager/CarDetailManager'
import { AppImages } from '../../../../utilis/AppConstant'
import { useSelector } from 'react-redux'
import { PriceType } from '../../../../redux/Reducers/AppReducer'
import CommonManager from '../../../../utilis/CommonManager'
import DiscountView from '../../../../components/DiscountView/DiscountView'
interface Props {
    manager : CarDetailManagerType,
    onSmartInquiry : ()=>void
}
const SmartCard = (props : Props) => {
      const selector = useSelector((state: any) => state.appReducer);
      const discountViewCheck = () => {
        let regularPrice = props.manager.carObj?.regular_price;
        if (selector.priceType != PriceType.dollar) {
          regularPrice = CommonManager.shared.convertDollarToYen(
            props.manager.carObj?.regular_price ?? 0,
          );
        }
        let discountAmount = CommonManager.shared.getDiscountPercentage(
          props.manager.carObj!.regular_price,
          props.manager.carObj!.sale_price,
        );
        if (discountAmount > 0) {
          return (
            <DiscountView txtStyle={style.discountTxtStyle} value={CommonManager.shared.formattedNumber(regularPrice)} />
          );
        }
        return null;
      };
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <View
        style = {{
            ...style.paddingView
        }}
        >
            <Text
            style = {{
                ...style.priceStyle
            }}
            >
                Price
            </Text>
                 <View
                   style={{
                     ...AppStyle.commonHoriStyle,
                   }}>
                   {discountViewCheck()}
                   <Text
                     style={{
                       ...style.priceTxt,
                     }}>
                     {selector.priceType == PriceType.dollar
                       ? `$${CommonManager.shared.formattedNumber(props.manager.carObj?.sale_price)}`
                       : `${
                           PriceType.yen +
                           CommonManager.shared.formattedNumber(CommonManager.shared.convertDollarToYen(
                             props.manager.carObj?.sale_price ?? 0,
                           ))
                         }`}
                   </Text>
                 </View>
        </View>
        <TouchableWithoutFeedback
        onPress={()=>props.onSmartInquiry && props.onSmartInquiry()}
        >
            <Image
            source={AppImages.Smart.tickSmart}
            style = {{
                ...style.singleIconStyle
            }}
            />
        </TouchableWithoutFeedback>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        height : 80,
        borderRadius : 100,
        backgroundColor :AppColors.white(0.9),
        borderWidth : 0.1,
        alignSelf : "center",
        bottom : 50,
        position : "absolute",
        flexDirection : "row",
        alignItems : "center",
        paddingRight : 10,
        paddingLeft : 15
    },
    priceStyle : {
        ...font(12,FontWeight.SemiBold),
    },
     singleIconStyle : {
        height : 60,
        width : 60,
        resizeMode : "contain",
        borderRadius : 30
    },
      discountTxtStyle: {...font(14), color: AppColors.disGreyColor},
  priceTxt: {
    ...font(24, FontWeight.Bold),
    color: AppColors.redColor,
  },
  paddingView : {
    marginRight : 10
  }
})

export default SmartCard

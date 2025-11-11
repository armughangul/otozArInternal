import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { AppHorizontalMargin, AppImages } from '../../../../../utilis/AppConstant'
import { font, FontWeight } from '../../../../../utilis/AppStyle'
import { AppColors } from '../../../../../utilis/AppColors'
import BorderBtn from '../../../../../components/BorderBtn/BorderBtn'
import { OrderManagerType } from '../../../Manager/OrderManager'
interface Props {
    isCompleted : boolean,
    manager : OrderManagerType | any
}
const OrderReceivedStep = (props: Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        {
            props.isCompleted ?
            <View>
                           <Image
        source={AppImages.Order.congratsImg}
        style = {{
            ...style.congImg
        }}
        />
        <Text
        style = {{
            ...style.congTxt
        }}
        >
            Congratulations on your new car!
        </Text>
        <Text
        style = {{
            ...style.descStyle
        }}
        >
            New car, new memories. Wishing you safe and smooth drives.
        </Text>
                </View>
                :
                  <View>
                    <Image
        source={AppImages.Order.confirmReceived}
        style = {{
            ...style.imgStyle
        }}
        />
        <Text
        style = {{
            ...style.descStyle
        }}
        >
            If you receive your car, Please confirm by pressing car received button
        </Text>
           <BorderBtn
              onPress={()=>{
                props.manager.onReceivedCar()
              }}
              title='Car Received'
              btnStyle = {{
                ...style.btnStyle
              }}
              titleStyle = {{
                ...style.btnTitleStyle
              }}
              />
        </View>
        }
      
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        marginTop : 30
    },
    imgStyle : {
        height : 172,
        resizeMode : "contain",
        alignSelf : "center"
    },
    descStyle : {
        ...font(14),
        marginTop : 10,
        textAlign : "center",
        marginHorizontal : AppHorizontalMargin
    },
      btnStyle : {
        backgroundColor : AppColors.primary,
        marginTop : 20
      },
      btnTitleStyle : {
        ...font(14),
        color : AppColors.white(1)
      },
      congTxt : {
        ...font(18,FontWeight.SemiBold),
        marginTop : 20,
        textAlign : "center",
      },
      congImg : {
        marginHorizontal : AppHorizontalMargin,
        resizeMode : "center",
        marginTop : 20
      }
})
export default OrderReceivedStep

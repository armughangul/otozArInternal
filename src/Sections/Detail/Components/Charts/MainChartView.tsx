import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import {LineChart } from "react-native-gifted-charts";
import { AppColors } from '../../../../utilis/AppColors';
import { font, FontWeight } from '../../../../utilis/AppStyle';
import { AppHorizontalMargin, AppImages } from '../../../../utilis/AppConstant';
import { CarDetailManagerType } from '../../Manager/CarDetailManager';
interface Props {
    manager : CarDetailManagerType
}
const MainChartView = (props : Props) => {
const ptData = props.manager.chartData()
console.log("data is ",ptData)
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <View
        style = {{
            ...style.topView
        }}
        >
            <Text
            style = {{
                ...style.titleStyle
            }}
            >
                Price Mapping
            </Text>
            <View
            style = {{
                ...style.endView
            }}
            >
                <View
                style = {{
                    ...style.percentageView
                }}
                >
                    <Text
                    style = {{
                        ...style.titleStyle
                    }}
                    >
                        1.3%
                    </Text>
                    <Image
                    source={AppImages.Detail.upward}
                    style = {{
                        ...style.arrowImg
                    }}
                    />
                </View>
                <Text
                style = {{
                    ...style.monthStyle
                }}
                >
                    VS Last Month
                </Text>
            </View>
        </View>
<LineChart
disableScroll ={true}
 data = {ptData} areaChart
  width={Dimensions.get("screen").width - (AppHorizontalMargin * 2)}
          hideDataPoints
          spacing={26}
          color={AppColors.primary}
          thickness={3.5}
          startFillColor={AppColors.primary}
          endFillColor={AppColors.primary}
          startOpacity={0.4}
          endOpacity={0.0}
          initialSpacing={0}
          noOfSections={6}
          maxValue={(props.manager.carObj?.sale_price ?? 0)  + 1000}
        //   yAxisColor="white"
          yAxisThickness={0}
          yAxisTextStyle = {{
            ...font(12,FontWeight.Light),
            color : "#111111"
          }}
          xAxisLabelTextStyle = {{
               ...font(12,FontWeight.Light),
            color : "#111111"
          }}

        //   rulesType="solid"
        //   rulesColor="gray"
          xAxisColor="#95D2FF"
 />
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        marginHorizontal : AppHorizontalMargin,
        overflow : "hidden",
        marginVertical : 12
    },
    topView : {
        flexDirection : "row",
        justifyContent : "space-between"
    },
    endView : {
        alignItems : "flex-end"
    },
    percentageView : {
        flexDirection : "row",
    },
    titleStyle : {
        ...font(16,FontWeight.SemiBold),
    },
    arrowImg : {
        width : 21.76,
        height : 21.76,
        resizeMode : "contain",
        marginLeft : 8
    },
    monthStyle : {
        ...font(14),
        color : AppColors.txtLightColor
    }
})
export default MainChartView

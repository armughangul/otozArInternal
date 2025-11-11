import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppColors } from '../../../../utilis/AppColors'
import { AppHorizontalMargin } from '../../../../utilis/AppConstant'
import { font, FontWeight } from '../../../../utilis/AppStyle'
import SingleReviewerItem from './SingleReviewerItem'

interface Props {

}
const ExpertsReviewView = () => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    > 
    <Text
    style = {{
        ...style.titleStyle
    }}
    >
        Experts Review
    </Text>
    <SingleReviewerItem/>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        backgroundColor : AppColors.white(0.2),
        borderRadius : 6,
        marginHorizontal : AppHorizontalMargin,
        marginTop : 20,
        paddingHorizontal : 4
    },
    titleStyle : {
        ...font(16,FontWeight.SemiBold),
        marginBottom : 12
    }
})

export default ExpertsReviewView

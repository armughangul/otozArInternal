import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { font } from '../../../../utilis/AppStyle'
import CommonManager from '../../../../utilis/CommonManager'
import { AppHorizontalMargin } from '../../../../utilis/AppConstant'
import SingleGender from './SingleGender'
import { genderList } from '../../../../utilis/AppStrings'
import { EditProfileMangerType } from '../../Manager/EditProfileManager'
interface Props {
    manager : EditProfileMangerType
}
const GenderView = (props : Props) => {
let size = CommonManager.shared.generateViewAspectRatioSize(2/1.6,((Dimensions.get("screen").width - AppHorizontalMargin)/3) - 12)    
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
        Gender
    </Text>
    <View
    style = {{
        ...style.genderView
    }}
    >
          <SingleGender
          isSelected = {props.manager.gender == 0}
          gender={genderList[0]}
                  size={size}
                  onPress={()=>props.manager.setGender(0)}
                  
                  />
                     <SingleGender
                               isSelected = {props.manager.gender == 1}
          gender={genderList[1]}
                  size={size}
                  onPress={()=>props.manager.setGender(1)}
                  
                  />
                     <SingleGender
                               isSelected = {props.manager.gender == 2}
          gender={genderList[2]}
                  size={size}
                  onPress={()=>props.manager.setGender(2)}                  
                  />
    </View>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {       
        marginTop : 19 
    },
       titleStyle : {
            ...font(14),
        },
        genderView : {
            flexDirection : "row",
            marginTop : 10,
            justifyContent : "space-between"
        }
})

export default GenderView

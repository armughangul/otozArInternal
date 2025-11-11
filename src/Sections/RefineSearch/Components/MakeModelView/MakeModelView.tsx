import React from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { AppStyle, font, FontWeight } from '../../../../utilis/AppStyle'
import { AppHorizontalMargin, AppImages } from '../../../../utilis/AppConstant'
import { AppColors } from '../../../../utilis/AppColors'
import { RefineSearchManagerType } from '../../Manager/RefineSearchManager'
import SelectedMakeModalView from './SelectedMakeModalView'
interface Props {
    title : string,
    value? : string | null,
    placeHolder? :string,
    onPress : ()=>void,
    manager : RefineSearchManagerType
}
const MakeModelView = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <Text
        style = {{
            ...style.titleTxt
        }}
        >
        {props.title}
        </Text>
        {
            props.manager.checkMakeModel() ?
            <SelectedMakeModalView
            selectedMake={props.manager.selectedMaker}
            selectedModelList={props.manager.selectedModelList}
            onCross={()=>props.manager.onClearMakeFilter()}
            /> :
   <TouchableWithoutFeedback
        onPress={()=>props.onPress()}
        >
            <View
            style = {{
                ...style.dropDownView
            }}
            >
                <Text
                style = {{
                    ... props.value ? style.valueStyle : style.placeHolderStyle
                }}
                >
                    {props.value ? props.value :  props.placeHolder}
                </Text>
                <Image
                style = {{
                    ...style.dropDownImg
                }}
                source={AppImages.Common.dropDown}
                />
            </View>
        </TouchableWithoutFeedback>
        }
     
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        marginTop : 20,
        marginHorizontal : AppHorizontalMargin
    },
    titleTxt : {
        ...font(18,FontWeight.SemiBold)
    },
    dropDownView : {
        minHeight : 48,
        borderRadius : 8,
        borderWidth : 1,
        borderColor : AppColors.primary,
        marginTop : 10,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-between",
        paddingHorizontal : 10
    },
    dropDownImg : {
        height : 9,
        resizeMode : "contain",
        transform : [
            {
                rotate : "270deg"
            }
        ]
    },
    placeHolderStyle : {
        ...font(14),
        color : AppColors.txtLightColor
    },
    valueStyle : {
      ...font(14),
    }
})

export default React.memo(MakeModelView)

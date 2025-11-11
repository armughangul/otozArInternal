import React from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { AppHorizontalMargin, AppImages } from '../../../../utilis/AppConstant'
import SingleSwitcher from './SingleSwitcher'
import { AppStyle, font } from '../../../../utilis/AppStyle'
import { AppColors } from '../../../../utilis/AppColors'
interface Props {
  type : number,
  setType : (type : number)=>void,
  carLength : number,
  onPrefSave : ()=>void
}
const ListSwitcher = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    > 
    <SingleSwitcher
    onPress={()=>props.setType(0)}
    image={AppImages.MainSearch.largeList}
    isSelected = {props.type == 0}
    />
     <SingleSwitcher
    onPress={()=>props.setType(1)}
    image={AppImages.MainSearch.listView}
    isSelected = {props.type == 1}
    />

    <View
    style = {{
      ...AppStyle.mainView
    }}
    />
        <Text
    style = {{
      ...style.resultStyle
    }}
    >
      {props.carLength && props.carLength > 0 && `${props.carLength} Results`}
    </Text>
    {/* <TouchableWithoutFeedback
    onPress={()=>props.onPrefSave()}
    >
      <View
      style = {{
        ...style.favView
      }}
      >
        <Image
        style = {{
          ...style.favIcon
        }}
        source={AppImages.Common.favUnselected}
        />
        <Text
        style = {{
          ...style.favTxt
        }}
        >
          Save Search
        </Text>
      </View>
    </TouchableWithoutFeedback> */}
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        height : 32,
        marginHorizontal : AppHorizontalMargin,
        flexDirection : "row",
        marginTop : 15,
        alignItems : "flex-end"
    },
    resultStyle : {
      ...font(12),
      color : AppColors.descColor
    },
    favView : {
      flexDirection : "row"
    },
    favIcon : {
      width : 15,
      resizeMode : "contain"
    },
    favTxt : {
      ...font(12),
      color : AppColors.redColor,
      marginLeft :5
    }
})

export default ListSwitcher

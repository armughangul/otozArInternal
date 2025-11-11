import React from 'react'
import { FlatList, ImageBackground, StyleSheet, View } from 'react-native'
import { AppStyle } from '../../utilis/AppStyle'
import { AppHorizontalMargin, AppImages, ScreenProps } from '../../utilis/AppConstant'
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea'
import PrivacyHeader from './Components/PrivacyHeader'
import { privacyTxt } from '../../utilis/AppStrings'
import SinglePrivacyItem from './Components/SinglePrivacyItem'
import BottomAppSafeArea from '../../components/AppSafeArea/BottomAppSafeArea'
import TopBar from '../../components/TopBar/TopBar'

const PrivacyPolicyScreen = (props : ScreenProps) => {
  return (
    <ImageBackground
    source={AppImages.Home.background}
    style = {{
        ...style.mainView
    }}
    >
       <TopAppSafeArea/> 
       <TopBar
       onBack={()=>{
        props.navigation.goBack()
       }}
       title='Privacy Policy'
       />
       <View
       style = {{
        ...style.paddingView
       }}
       >
        <FlatList
        showsVerticalScrollIndicator = {false}
        data={privacyTxt.dataList}
        keyExtractor={(item,index)=>`${index}`}
        ListHeaderComponent={()=>{
          return(
            <PrivacyHeader/>
          )
        }}
        renderItem={({item})=>{
          return (
            <SinglePrivacyItem
            dataList={item.dataList}
            titleList={item.titleList}
            header={item.header}
            />
          )
        }}
        />
       </View>
       <BottomAppSafeArea/>
    </ImageBackground>
  )
}
const style = StyleSheet.create({
    mainView : {
        ...AppStyle.mainView
    },
    paddingView : {
      flex :1,
      marginHorizontal : AppHorizontalMargin
    }
})

export default PrivacyPolicyScreen

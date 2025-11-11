import React from 'react'
import { FlatList, ImageBackground, StyleSheet, View } from 'react-native'
import { AppStyle } from '../../utilis/AppStyle'
import { AppHorizontalMargin, AppImages, ScreenProps } from '../../utilis/AppConstant'
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea'
import PrivacyHeader from './Components/PrivacyHeader'
import { contactUsList, privacyTxt } from '../../utilis/AppStrings'
import SinglePrivacyItem from './Components/SinglePrivacyItem'
import BottomAppSafeArea from '../../components/AppSafeArea/BottomAppSafeArea'
import TopBar from '../../components/TopBar/TopBar'
import SingleContactUsItem from './Components/SingleContactUsItem'
import AccountManager from '../Account/Manager/AccountManager'

const ContactUsScreen = (props : ScreenProps) => {
  const manager = AccountManager()
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
       title='Contact Us'
       />
       <View
       style = {{
        ...style.paddingView
       }}
       >
        <FlatList
        showsVerticalScrollIndicator = {false}
        data={contactUsList}
        keyExtractor={(item,index)=>`${index}`}
        renderItem={({item,index})=>{
          return (
            <SingleContactUsItem
            item= {item}
            onPress={()=>manager.onContactUs(index)}
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

export default ContactUsScreen

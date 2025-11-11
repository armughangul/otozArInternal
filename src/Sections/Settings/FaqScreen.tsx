import React, { useState } from 'react'
import { FlatList, ImageBackground, StyleSheet, View } from 'react-native'
import { AppStyle } from '../../utilis/AppStyle'
import { AppHorizontalMargin, AppImages, ScreenProps } from '../../utilis/AppConstant'
import TopAppSafeArea from '../../components/AppSafeArea/TopAppSafeArea'
import { faqItemList } from '../../utilis/AppStrings'
import BottomAppSafeArea from '../../components/AppSafeArea/BottomAppSafeArea'
import TopBar from '../../components/TopBar/TopBar'
import TermsAccordian from './Components/TermsAccordian'

const FaqScreen = (props : ScreenProps) => {
      const [openIndex, setOpenIndex] = useState<number | null>(null);
        const handleAccordionToggle = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };
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
       title='FAQ'
       />
       <View
       style = {{
        ...style.paddingView
       }}
       >
        <FlatList
        showsVerticalScrollIndicator = {false}
        data={faqItemList}
        keyExtractor={(item,index)=>`${index}`}
        renderItem={({item,index})=>{
          return (
           <TermsAccordian
                    key={`${{index}}`}
                    title={item.title}
                    content={item.content}
                    isOpen={openIndex === index}
                    onPress={() => handleAccordionToggle(index)}
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

export default FaqScreen

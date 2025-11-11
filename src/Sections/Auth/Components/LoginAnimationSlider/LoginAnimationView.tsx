import React from 'react'
import { StyleSheet, View } from 'react-native'
import { loginAnimList } from '../../../../utilis/AppStrings'
import SingleLoginItem from './SingleLoginItem'
import { AuthManagerType } from '../../Manager/AuthManager'
import SingleSlider from './SingleSlider'
interface Props {
  manager : AuthManagerType
}
const LoginAnimationView = (props : Props) => {
  return (
    <View
    style = {{
      ...style.mainView
    }}
    >
      {
        props.manager.animIndex == 0 ?
        <SingleLoginItem
        title={loginAnimList[0].title}
        animation={loginAnimList[0].animation}
        onComplete={()=>{
          props.manager.setAnimIndex(1)
        }}
        /> : null
      }
       {
        props.manager.animIndex == 1 ?
        <SingleLoginItem
        title={loginAnimList[1].title}
        animation={loginAnimList[1].animation}
        onComplete={()=>{
          props.manager.setAnimIndex(2)
        }}
        /> : null
      }
        {
        props.manager.animIndex == 2 ?
        <SingleLoginItem
        title={loginAnimList[2].title}
        animation={loginAnimList[2].animation}
        onComplete={()=>{
          props.manager.setAnimIndex(0)
        }}
        /> : null
      }
      <View
      style = {{
        ...style.sliderViewMain
      }}
      >
        {
          loginAnimList.map((item,index)=>{
            return (
              <SingleSlider
              isSelected = {props.manager.animIndex == index}
              key={`${index}`}
              />
            )
          })
        }
      </View>
    </View>
  )
}
const style = StyleSheet.create({
  mainView : {
    alignItems : "center"
  },
  sliderViewMain : {
    width : 135,
    marginTop :15,
    flexDirection : "row",
    justifyContent : "space-between"
  }
})

export default LoginAnimationView

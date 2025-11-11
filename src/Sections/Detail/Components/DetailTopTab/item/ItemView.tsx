import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import SingleItem from './SingleItem'
interface Props {
  list : any[]
}
const ItemView = (props : Props) => {
  console.log("screen loaded")
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
      {
        props.list.map((item,index)=>{
          return(
            <SingleItem
            key={`${index}`}
            title={item.title}
            value={item.value}
            hideBorder = {index == props.list.length - 1}
            />
          )
        })
      }
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
      flex :1,
    }
})
export default ItemView

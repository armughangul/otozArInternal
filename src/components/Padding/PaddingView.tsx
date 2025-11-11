import React from 'react'
import { View } from 'react-native'
interface Props {
    width? : number,
    height? : number
}
const PaddingView = (props : Props) => {
  return (
    <View
    style = {{
        width : props.width ?? 0,
        height : props.height ?? 0
    }}
    ></View>
  )
}

export default PaddingView

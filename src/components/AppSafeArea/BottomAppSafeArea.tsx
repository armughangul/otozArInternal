import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CommonManager from '../../utilis/CommonManager'

const BottomAppSafeArea = () => {
  return (
   CommonManager.shared.saveAreaInsects?.bottom ? <View
    style = {{
      marginBottom : CommonManager.shared.saveAreaInsects.bottom
    }}
    /> :
    <SafeAreaView
    edges={{bottom : "maximum"}}
    />
  )
}

export default BottomAppSafeArea

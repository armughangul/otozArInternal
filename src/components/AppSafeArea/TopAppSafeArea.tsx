import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CommonManager from '../../utilis/CommonManager'
import { View } from 'react-native'

const TopAppSafeArea = () => {
  return (
   CommonManager.shared.saveAreaInsects?.top ? <View
    style = {{
      marginTop : CommonManager.shared.saveAreaInsects.top
    }}
    /> :
    <SafeAreaView
    edges={{top : "maximum"}}
    />
  )
}

export default React.memo(TopAppSafeArea)

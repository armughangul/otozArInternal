import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import SectionHeader from './SectionHeader'
import SectionSingleItem from './SectionSingleItem'
import { AppColors } from '../../../../utilis/AppColors'
import { AccountManagerType } from '../../Manager/AccountManager'
interface Props {
    section : any,
    index : number,
    manager : AccountManagerType
}
const SectionListView = (props : Props) => {
  return (<View
    style = {{...style.mainView}}
    >  
    {props.section.title != "" &&
    <SectionHeader
    title={props.section.title}
    />
    }
    <View
    style = {{
      ...style.listView
    }}
    >
      <FlatList
      scrollEnabled = {false}
      data={props.section.list}
      keyExtractor={(item,index)=>`${index}`}
      renderItem={({item,index})=>{
        if ((props.index == 0 || props.index == 2) && index == 0 && props.manager.selector.appUser == null){
       return null
        }
        return(
          <SectionSingleItem
          onPress={()=>props.manager.onSectionItem(item.title)}
          item={item}
          />
        )
      }}
      />
    </View>
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
      flex :1,
    },
    listView : {
      borderWidth : 1,
      borderColor : AppColors.white(1),
      backgroundColor : AppColors.white(0.2),
      borderRadius : 8,
      marginVertical : 15
    }
})

export default SectionListView

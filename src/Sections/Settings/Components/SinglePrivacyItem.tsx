import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { font, FontWeight } from '../../../utilis/AppStyle'
import SinglePrivacyDetailItem from './SinglePrivacyDetailItem'
interface Props {
    header : string,
    dataList : string[]
    titleList : string[]
}
const SinglePrivacyItem = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <Text
        style = {{
            ...style.titleStyle
        }}
        >
            {props.header}
        </Text>
        <View
        style = {{
            ...style.mainView
        }}
        >
            <FlatList
            scrollEnabled = {false}
            showsVerticalScrollIndicator = {false}
            data={props.dataList}
            keyExtractor={(item,index)=>`${index}`}
            renderItem={({item,index})=>{
                return(
                    <SinglePrivacyDetailItem
                    title={props.titleList[index]}
                    desc={item}
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
        flex : 1,
    },
    titleStyle : {
        ...font(18,FontWeight.SemiBold),
        marginVertical : 10
    }
})
export default SinglePrivacyItem

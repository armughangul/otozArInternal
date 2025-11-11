import React from 'react'
import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { AppHorizontalMargin } from '../../../../utilis/AppConstant'
import { font, FontWeight } from '../../../../utilis/AppStyle'
import SingleListingSimpleItem from './SingleListingSimpleItem'
import { VehicleModel } from '../../../../Model/VehicleModel'
interface Props {
    title : string,
    list : VehicleModel[],
    type : number,
    onSeeAll : ()=>void,
    onSelect : (id : number)=>void,
    hideSeeAll? : boolean
}
const HorizontalListing = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    >
        <View
        style = {{
            ...style.topView
        }}
        >
            <Text
            style = {{
                ...style.title
            }}
            >
                {props.title}
            </Text>
            {
                props.hideSeeAll ?
                <View/>
                :
            <TouchableWithoutFeedback
            onPress={()=>props.onSeeAll && props.onSeeAll()}
            >
                <Text
                style = {{
                    ...font(14)
                }}
                >
                    See All
                </Text>
            </TouchableWithoutFeedback>
            }
        </View>
        <View
        style = {{
            ...style.listing
        }}
        >
            <FlatList
            showsHorizontalScrollIndicator = {false}
            horizontal
            data={props.list}
            keyExtractor={(item,index)=>`${index}`}
            renderItem={({item,index})=>{
                return(
                    <SingleListingSimpleItem
                    onPress={()=>props.onSelect && props.onSelect(item.id ?? -1)}
                    obj={item}
                    type={props.type}
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
        height : 261,
        marginLeft : AppHorizontalMargin,
        marginTop : 25
    },
    topView : {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        marginRight : AppHorizontalMargin,
    },
    title : {
        ...font(16,FontWeight.SemiBold)
    },
    listing : {
        flex : 1,
        marginTop : 15
    }
})

export default HorizontalListing

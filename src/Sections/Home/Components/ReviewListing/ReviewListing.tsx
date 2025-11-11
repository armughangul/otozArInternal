import React from 'react'
import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { AppHorizontalMargin } from '../../../../utilis/AppConstant'
import { font, FontWeight } from '../../../../utilis/AppStyle'
import SingleReview from './SingleReview'
interface Props {
    title : string,
    list : any[],
}
const ReviewListing = (props : Props) => {
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
            <TouchableWithoutFeedback>
                <Text
                style = {{
                    ...font(14)
                }}
                >
                    See All
                </Text>
            </TouchableWithoutFeedback>
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
                   <SingleReview
                   reviewObj={item}
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

export default ReviewListing

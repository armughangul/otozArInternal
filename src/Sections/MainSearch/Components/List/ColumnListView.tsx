import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { AppStyle } from '../../../../utilis/AppStyle'
import SingleColumnCarItem from '../Cards/SingleColumnCarItem'
import { VehicleModel } from '../../../../Model/VehicleModel'
import { FlashList } from '@shopify/flash-list'
import EmptyCar from '../NoCar/EmptyCar'
interface Props {
    list : VehicleModel[],
    handleLoadMore : ()=>void,
    onPress : (id : number)=>void 
}
const ColumnListView = (props : Props) => {
  return (
    <View
    style = {{
        ...style.mainView
    }}
    > 
    <FlashList
    removeClippedSubviews = {true}
    contentContainerStyle = {{
        paddingBottom : 100
    }}
    onEndReached={()=>props.handleLoadMore()}
     onEndReachedThreshold={0.5}
    showsVerticalScrollIndicator = {false}
    data={props.list}
    keyExtractor={(item,index)=>`${index}`}
    renderItem={({item,index})=>{
        return(
            <SingleColumnCarItem
            onPress={()=>props.onPress(item.id ?? -1)}
            car={item}
            />
        )
    }}
    ListEmptyComponent={()=>{
        return (<EmptyCar/>)
    }}
    />
    </View>
  )
}
const style = StyleSheet.create({
    mainView : {
        ...AppStyle.mainView
    }
})
export default React.memo(ColumnListView)

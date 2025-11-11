import React, { useEffect, useMemo, useState } from 'react'
import { VehicleModel } from '../../../Model/VehicleModel'
import { ScreenProps } from '../../../utilis/AppConstant'
import { Routes, TabRoutes } from '../../../utilis/Routes'
import { useSelector } from 'react-redux'

const FavouriteManager = () => {
    const selector = useSelector((AppState : any)=>AppState.appReducer)
    const getFavList = useMemo(()=>{
        let list : any[] = []
        if (selector.userFavCars){
        Object.entries(selector.userFavCars).forEach((item)=>{
            list.push(item[1])
        })
        }
        return list
    },[selector.userFavCars])
    const onBrowse = (props : ScreenProps)=>{
        props.navigation.navigate(TabRoutes.HomeStack)
    }
    const onDetail = (id: any, navigation: any) => {
        navigation.push(Routes.CarDetailScreen, {
          id: id,
        });
      };
    return {
        getFavList,
        onBrowse,
        onDetail
    }
}
export type FavouriteManagerType = ReturnType<typeof FavouriteManager>

export default FavouriteManager

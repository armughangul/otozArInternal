import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import CommonManager from '../../../utilis/CommonManager'
import { setJourney } from '../../../redux/Reducers/AppReducer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SplashManager = () => {
    const dispatch = useDispatch()
    const insets = useSafeAreaInsets()
      const animationRef = useRef<any>(null);
    useEffect(()=>{
    CommonManager.shared.saveAreaInsects = insets
    },[])
    const loadJourney = async()=>{
        let isEnable =  await CommonManager.shared.getJourney()
        dispatch(setJourney(isEnable))
    }
    return {
        loadJourney,
        animationRef
    }
}

export default SplashManager

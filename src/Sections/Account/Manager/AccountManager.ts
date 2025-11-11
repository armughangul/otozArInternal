import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScreenProps} from '../../../utilis/AppConstant';
import {Routes} from '../../../utilis/Routes';
import { GeneralEnum } from '../../../utilis/AppStrings';
import CommonManager from '../../../utilis/CommonManager';
import { PriceType, setPriceType } from '../../../redux/Reducers/AppReducer';
const AccountManager = (screenProps : any = null) => {
  const selector = useSelector((AppState: any) => AppState.appReducer);
  const dispatch = useDispatch()
  const [currency,ShowCurrency] = useState(false)
  const onLogin = (props: ScreenProps) => {
    props.navigation.push(Routes.LoginScreen, {
      onUpdate: () => {},
    });
  };
  const onEdit = useCallback(
    (props: ScreenProps, manager: AccountManagerType) => {
      props.navigation.push(Routes.EditProfile, {
        onUpdate: () => {},
        manager: manager,
      });
    },
    [],
  );
  const onMenu = (type : number,props : ScreenProps)=>{
    if (type == 0){
      props.navigation.push(Routes.InquiryListScreen)
    }
    if (type == 1){
            props.navigation.push(Routes.OrderListScreen)
    }
    if (type == 2){
            props.navigation.push(Routes.OrderHistoryListScreen)
    }
  }
  const onSectionItem = (itemName : string)=>{
    if (itemName === GeneralEnum.FAQs){
      screenProps.navigation.push(Routes.FaqScreen)
    }
     if (itemName === GeneralEnum.Terms){
      screenProps.navigation.push(Routes.TermsnCondition)
    }
     if (itemName === GeneralEnum.Privacy){
      screenProps.navigation.push(Routes.PrivacyPolicyScreen)
    }
     if (itemName === GeneralEnum.Contact){
      screenProps.navigation.push(Routes.ContactUsScreen)
    }
     if (itemName === GeneralEnum.Ledger){
      screenProps.navigation.push(Routes.LedgerScreen)
    }
     if (itemName === GeneralEnum.AboutUs){
      screenProps.navigation.push(Routes.AboutUsScreen)
    }
        if (itemName === GeneralEnum.HowIt){
      screenProps.navigation.push(Routes.HowItWorkScreen)
    }
        if (itemName === GeneralEnum.Currency){
          ShowCurrency(true)
    }
  }
  const onContactUs = (item : number)=>{
    if (item == 0){
      CommonManager.shared.handleSMS()
    }
    if (item == 1){
      CommonManager.shared.handleCall()

    }
    if (item == 2){
     CommonManager.shared.handleEmail()
    }
  }
  const onCurrency = (item : number)=>{
    dispatch(setPriceType(item == 0 ? PriceType.dollar : PriceType.yen))
  }
  return {
    selector,
    onLogin,
    onEdit,
    onMenu,
    onSectionItem,
    onContactUs,
    currency,ShowCurrency,
    onCurrency
  };
};

export default AccountManager;
export type AccountManagerType = ReturnType<typeof AccountManager>;

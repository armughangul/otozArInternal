import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PriceType, setLoading } from '../../../redux/Reducers/AppReducer';
import { getLedgerListApi,getLedgerPdfLinkApi } from '../../../Network/Services/LedgerService';
import CommonManager from '../../../utilis/CommonManager';
import { LedgerModel } from '../../../Model/LedgerModel';
import { AppColors } from '../../../utilis/AppColors';
import { downloadAndSaveFile } from '../../../utilis/SharingUtil';

const LedgerManager = () => {
    const selector = useSelector((state: any) => state.appReducer);
    const [selectedIndex,setSelectedIndex] = useState(-1)
    const dispatch = useDispatch()
    const [leaderList,setLeaderList] = useState<LedgerModel[]>([])
    const ledgerLinkRef = useRef("")
    const ledgerAmount = useRef({
      balance : "",
      balancePerCar : ""
    })
    useEffect(()=>{
        getLeaderList()
        getPdfLink()
    },[])
   const getLeaderList = async () => {
     dispatch(setLoading(true));
     getLedgerListApi()
       .then(async response => {
         if (response?.ledger) {
          let newList : LedgerModel[] = []
          for (let i = 0; i < response.ledger.length; i++) {
            const element = response.ledger[i];
            let index = newList.findIndex((item)=>item.car_id == element.car_id)
            if (index != -1){
              let pAmount_paid = newList[index].amount_paid + element.amount_paid
              let obj : LedgerModel = {
                ...element,
              amount_paid : pAmount_paid
              }
              newList[index] = obj
            }
            else {
              newList.push(element)
            }
          }
          let totalBalance = newList.reduce((previous,item)=>{return previous + item.car_price},0) -  newList.reduce((previous,item)=>{return previous + item.amount_paid},0)
          let totalPerCarBalance = newList.length > 0 ? newList[newList.length - 1].cumulative_paid : 0
          // newList.reduce((previous,item)=>{return previous + item.cumulative_paid},0)
          ledgerAmount.current = {
            balance : selector.priceType == PriceType.dollar
                              ? `$${CommonManager.shared.formattedNumber(totalBalance)}`
                              : `${
                                  PriceType.yen +
                                  CommonManager.shared.formattedNumber(
                                    CommonManager.shared.convertDollarToYen(
                                      totalBalance ?? 0,
                                    ),
                                  )
                                }`,
            balancePerCar : selector.priceType == PriceType.dollar
                              ? `$${CommonManager.shared.formattedNumber(totalPerCarBalance)}`
                              : `${
                                  PriceType.yen +
                                  CommonManager.shared.formattedNumber(
                                    CommonManager.shared.convertDollarToYen(
                                      totalPerCarBalance ?? 0,
                                    ),
                                  )
                                }`,
          }
            setLeaderList(newList)
         }
       })
       .catch(response => {
         let msg = '';
         if (response.message && response.message.length > 0) {
           response.message.map((item: string) => {
             msg += item;
           });
         }
         CommonManager.shared.showPopUp('Error', msg);
       })
       .finally(() => {
         dispatch(setLoading(false));
       });
   };
   const getPdfLink = ()=>{
    getLedgerPdfLinkApi().then((response)=>{
      if (response?.pdf_link){
        ledgerLinkRef.current = response.pdf_link
      }
    })
   }
   const generateLedgerData = (ledger : LedgerModel)=>{
     let percentage = (ledger.amount_paid / ledger.car_price) * 100
      let colors = AppColors.progressColors.red
      if (percentage > 20){
          colors = AppColors.progressColors.blue
      }
        if (percentage > 50){
          colors = AppColors.progressColors.yellow
      }
       if (percentage >= 100){
          colors = AppColors.progressColors.green
      }
      let item = {
        ...ledger,
        percentage : percentage < 100 ? Math.round(percentage) : 100,
        colors : colors
      };
      return item;
   }
   const downloadPdf = ()=>{
    if (ledgerLinkRef.current != ""){
      downloadAndSaveFile(ledgerLinkRef.current)
    }
    else {
      CommonManager.shared.showMessage("No data found")
    }
   }
    return {
        selectedIndex,setSelectedIndex,
        leaderList,
        ledgerAmount,
        generateLedgerData,
        downloadPdf
    }
}

export default LedgerManager
export type LedgerManagerType = ReturnType<typeof LedgerManager>
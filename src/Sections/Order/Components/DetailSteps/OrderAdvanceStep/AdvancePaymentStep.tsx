import React from 'react';
import {StyleSheet, View} from 'react-native';
import {OrderManagerType} from '../../../Manager/OrderManager';
import SimpleMsg from '../../DetailMsgs/SimpleMsg';
import {AppColors} from '../../../../../utilis/AppColors';
import SingleDetailTopTab from '../../../../Detail/Components/DetailTopTab/SingleDetailTopTab';
import SingleItem from '../../../../Detail/Components/DetailTopTab/item/SingleItem';
import {font, FontWeight} from '../../../../../utilis/AppStyle';
import InvoiceView from './InvoiceView';
import UploadInvoiceView from './UploadInvoiceView';
import CommonManager from '../../../../../utilis/CommonManager';
import { PurchaseManagerType } from '../../../Manager/PurchaseManager';
import { downloadAndSaveFile, showFile } from '../../../../../utilis/SharingUtil';
import { BASE_DOC_URLS } from '../../../../../Network/Urls';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
interface Props {
  manager: OrderManagerType
}
const AdvancePaymentStep = (props: Props) => {
  return (
    <View
      style={{
        ...style.mainView,
      }}>
      <View
        style={{
          ...style.topView,
        }}>
        <View
          style={{
            ...style.mainView2,
          }}>
          <SingleDetailTopTab
            title="Payment Detail"
            onPress={() => {}}
            selected={true}
            viewStyle={{
              ...style.tabStyle,
            }}
          />
          <View style={[style.selectedBorderView]} />
        </View>
        <View
          style={{
            ...style.mainView,
          }}>
          <SingleItem
            title={'Total Payable'}
            value={`${props.manager.convertCurrency(
              props.manager.obj!.total_invoice,
            )}`}
          />
          <SingleItem
            title={'Advance Payable'}
            value={props.manager.convertCurrency(
              props.manager.obj!.total_invoice *
                (Number(props.manager.obj!.advance_percentage) / 100),
            )}
          />
          <SingleItem
            txtStyle={style.paidStyle}
            title={'Paid Amount'}
            value={props.manager.checkAlreadyPaidAmount()}
          />
          <SingleItem
            txtStyle={style.remainStyle}
            title={'Remaining Payable'}
            value={props.manager.checkRemainingAmount()}
          />
          <InvoiceView
          onDownload={()=>downloadAndSaveFile(`${BASE_DOC_URLS}partner/advancepay/print.php?id=${props.manager.obj?.car.id}&uid=${props.manager.obj?.user_id}`)}
          onPrint={()=>showFile(`${BASE_DOC_URLS}partner/advancepay/print.php?id=${props.manager.obj?.car.id}&uid=${props.manager.obj?.user_id}`)}
          />
          {props.manager.obj?.payments.length == 0 &&
           <UploadInvoiceView
          onUpload={()=> props.manager.uploadAddanceBankReceipt && props.manager.uploadAddanceBankReceipt()}
          />
          }
         
        </View>
      </View>
      {
        props.manager.obj?.shipping?.car_received ?
           <SimpleMsg
           isSuccess = {true}
      startTxt='Hi'
      midTxt={(CommonManager.shared.currentUser?.first_name ?? "")}
      endTxt={` Thank you very much. We’ve received your advance payment in our account. We appreciate your trust in Otoz.ai.`}
      /> :
     <SimpleMsg
      startTxt='Hi'
      midTxt={(CommonManager.shared.currentUser?.first_name ?? "") + (props.manager.obj?.payments.length  == 0 ? "" : " Receipt,")}
      endTxt={props.manager.obj?.payments.length == 0 ? ' Pay advance amount in our bank account and upload bank receipt here.' :
        "has been uploaded successfully. Otoz.ai will review the uploaded bank receipt and verify the payment in the company’s bank account. you will be updated accordingly. Thank You!"
      }
      />
      }
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  topView: {
    flex: 1,
    backgroundColor: AppColors.white(0.2),
    borderColor: AppColors.white(1),
    borderWidth: 1,
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 25,
  },
  mainView2: {
    height: 50,
  },
  innerView: {
    flexDirection: 'row',
  },
  selectedBorderView: {
    backgroundColor: AppColors.primary,
    height: 0.9,
  },
  tabStyle: {
    alignItems: 'flex-start',
    marginLeft: 5,
  },
  paidStyle: {
    ...font(12, FontWeight.SemiBold),
    color: AppColors.green,
  },
  remainStyle: {
    ...font(12, FontWeight.SemiBold),
    color: AppColors.redColor,
  },
});
export default React.memo(AdvancePaymentStep);

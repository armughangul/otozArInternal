import React from 'react';
import {StyleSheet, View} from 'react-native';
import {OrderManagerType} from '../../../Manager/OrderManager';
import SimpleMsg from '../../DetailMsgs/SimpleMsg';
import {AppColors} from '../../../../../utilis/AppColors';
import SingleDetailTopTab from '../../../../Detail/Components/DetailTopTab/SingleDetailTopTab';
import SingleItem from '../../../../Detail/Components/DetailTopTab/item/SingleItem';
import {font, FontWeight} from '../../../../../utilis/AppStyle';
import InvoiceView from '../OrderAdvanceStep/InvoiceView';
import UploadInvoiceView from '../OrderAdvanceStep/UploadInvoiceView';
import CommonManager from '../../../../../utilis/CommonManager';
import { downloadAndSaveFile, showFile } from '../../../../../utilis/SharingUtil';
import { BASE_DOC_URLS } from '../../../../../Network/Urls';
interface Props {
  manager: OrderManagerType
}
const OrderBalanceStep = (props: Props) => {
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
                   onDownload={()=>downloadAndSaveFile(`${BASE_DOC_URLS}partner/cnf/print.php?id=${props.manager.obj?.car.id}&uid=${props.manager.obj?.user_id}`)}
                   onPrint={()=>showFile(`${BASE_DOC_URLS}partner/cnf/print.php?id=${props.manager.obj?.car.id}&uid=${props.manager.obj?.user_id}`)}
                   />
          {
            props.manager.balanceEnable() &&
            <UploadInvoiceView
          onUpload={()=>{
            props.manager.uploadBalanceBankReceipt()
          }}
          />
          }
        </View>
      </View>
      <SimpleMsg
      startTxt='Hi'
      isSuccess = {props.manager.obj?.shipping?.car_received}
      midTxt={CommonManager.shared.currentUser?.first_name ?? ""}
      endTxt={props.manager.obj?.shipping?.car_received ? " you have paid the complete balance amount for this car." : ' Please pay your balance amount as per invoice to receive original documents.'}
      />
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
export default React.memo(OrderBalanceStep);

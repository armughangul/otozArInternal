import React from 'react';
import {StyleSheet, View} from 'react-native';
import {OrderManagerType} from '../../../Manager/OrderManager';
import SimpleMsg from '../../DetailMsgs/SimpleMsg';
import {AppColors} from '../../../../../utilis/AppColors';
import SingleDetailTopTab from '../../../../Detail/Components/DetailTopTab/SingleDetailTopTab';
import {font, FontWeight} from '../../../../../utilis/AppStyle';
import SingleDocumentView from './SingleDocumentView';
import BorderBtn from '../../../../../components/BorderBtn/BorderBtn';
import NextMsg from '../../DetailMsgs/NextMsg';
import CourierDetailView from './CourierDetailView';
import { downloadAndSaveFile, showFile } from '../../../../../utilis/SharingUtil';
import { BASE_DOC_URLS, BASE_URLS } from '../../../../../Network/Urls';
import CommonManager from '../../../../../utilis/CommonManager';
interface Props {
  manager: OrderManagerType 
}
const OrderDocumentStep = (props: Props) => {
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
            title="Documents"
            onPress={() => {}}
            selected={true}
            viewStyle={{
              ...style.tabStyle,
            }}
          />
          <View style={[style.selectedBorderView]} />
        </View>
        <SingleDocumentView
        onDownload={()=>props.manager.downloadFBInvoice()}
          isDisable={props.manager.obj?.shipping.cnf_invoice == ''}
          title ={`${props.manager.obj?.invoice_term} invoice`}
          onView={()=>showFile(props.manager.obj?.shipping.fob_invoice ?? "")}
        />
        <SingleDocumentView
        onDownload={()=>downloadAndSaveFile(props.manager.obj?.shipping?.export_certificate ?? "")}
        onView={()=>showFile(props.manager.obj?.shipping?.export_certificate ?? "")}
          isDisable={props.manager.obj?.shipping.export_certificate == ''}
          title="Export Certificate"
        />
        <SingleDocumentView
        onDownload={()=>downloadAndSaveFile(`${BASE_DOC_URLS}otozbi-v1/uploads/${props.manager.obj?.shipping.bl_copy}`)}
        onView={()=>showFile(`${BASE_DOC_URLS}otozbi-v1/uploads/${props.manager.obj?.shipping.bl_copy}`)}
          isDisable={props.manager.obj?.shipping.bl_copy == ''}
          title="BL Copy"
        />
        <SingleDocumentView
        onDownload={()=>downloadAndSaveFile(`${BASE_DOC_URLS}otozbi-v1/uploads/${props.manager.obj?.shipping.inspection_certificate}`)}
        onView={()=>showFile(`${BASE_DOC_URLS}otozbi-v1/uploads/${props.manager.obj?.shipping.inspection_certificate}`)}
          isDisable={props.manager.obj?.shipping.inspection_certificate == ''}
          hideBorder={true}
          title="Inspection Certificate"
        />
      </View>
      {!props.manager.obj?.shipping.document_received
      &&
      <BorderBtn
        onPress={() => {
          props.manager.submitDocReceived()
        }}
        title="Documents Received"
        btnStyle={{
          ...style.btnStyle,
        }}
        titleStyle={{
          ...style.btnTitleStyle,
        }}
      />
      }
      {
        props.manager.obj?.shipping?.car_received ?
        <SimpleMsg
        startTxt='Dear '
        midTxt={CommonManager.shared.currentUser?.first_name + ", "}
        endTxt='it is inform you that you have received your documents successfully. Please let you know when you receive your car. Thank you for your feedback'
        isSuccess = {true}
        />
        :       <NextMsg startTxt="If you have received your original documents please click here, for Confirmation" />
      }
      <CourierDetailView />
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
  selectedBorderView: {
    backgroundColor: AppColors.primary,
    height: 0.9,
  },
  tabStyle: {
    alignItems: 'flex-start',
    marginLeft: 5,
  },

  btnStyle: {
    backgroundColor: AppColors.primary,
    marginTop: 20,
  },
  btnTitleStyle: {
    ...font(14),
    color: AppColors.white(1),
  },
});
export default React.memo(OrderDocumentStep);

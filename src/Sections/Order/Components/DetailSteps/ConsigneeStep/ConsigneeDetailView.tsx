import React from 'react';
import {StyleSheet, View} from 'react-native';
import {OrderManagerType} from '../../../Manager/OrderManager';
import SimpleMsg from '../../DetailMsgs/SimpleMsg';
import {AppColors} from '../../../../../utilis/AppColors';
import SingleDetailTopTab from '../../../../Detail/Components/DetailTopTab/SingleDetailTopTab';
import {font, FontWeight} from '../../../../../utilis/AppStyle';
import CommonManager from '../../../../../utilis/CommonManager';
import SingleItem from '../../../../Detail/Components/DetailTopTab/item/SingleItem';
interface Props {
  manager: OrderManagerType | any;
}
const CosigneeDetailView = (props: Props) => {
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
            title="Consignee Details"
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
              title={'Name'}
              value={props.manager.obj?.consignee_details.name ?? '-'}
            />
            <SingleItem
              title={'Email'}
              value={props.manager.obj?.consignee_details.email ?? '-'}
            />
            <SingleItem
              title={'Contact no.'}
              value={props.manager.obj?.consignee_details.contact_no ?? '-'}
            />
            <SingleItem
              title={'Address'}
              value={props.manager.obj?.consignee_details.address ?? '-'}
            />
            <SingleItem
              title={'Passport No./ID Number'}
              value={props.manager.obj?.consignee_details.passport ?? '-'}
            />
            <SingleItem
              title={'P.O.Box'}
              value={props.manager.obj?.consignee_details.pobox ?? '-'}
              hideBorder={true}
            />
          </View>
           <SimpleMsg
        isSuccess={true}
        startTxt="Hi"
        midTxt={CommonManager.shared.currentUser?.first_name ?? ''}
        endTxt=" We have received your consignee details."
      />
      </View>
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
export default React.memo(CosigneeDetailView);

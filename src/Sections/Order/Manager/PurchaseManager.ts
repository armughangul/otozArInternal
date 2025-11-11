import React, {useEffect, useRef, useState} from 'react';
import {InquiryModel} from '../../../Model/InquiryModel';
import {
  getInquiryDetailApi,
  getInquiryListApi,
  getPurchaseListApi,
  getPurchaseObjDetailApi,
} from '../../../Network/Services/InquiryService';
import {PriceType, setLoading} from '../../../redux/Reducers/AppReducer';
import CommonManager from '../../../utilis/CommonManager';
import {Routes, TabRoutes} from '../../../utilis/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {ScreenProps} from '../../../utilis/AppConstant';
import {useRoute} from '@react-navigation/native';
import {CountryModel} from '../../../Model/CountryModel';
import {UserModel} from '../../../Model/UserModel';
import {AppStrings, orderStatusList} from '../../../utilis/AppStrings';
import { downloadAndSaveFile } from '../../../utilis/SharingUtil';
import { BASE_DOC_URLS, BASE_URLS } from '../../../Network/Urls';

const PurchaseManager = (props: ScreenProps, isList: boolean = false) => {
  //LISTING VARIABLES
  const [orderList, setOrderList] = useState<InquiryModel[]>();
  const per_page = 30;
  const pageRef = useRef<number>(1);
  const totalPageRef = useRef<number>(5);
  const loadingMore = useRef<boolean>(false);
  //SHARED
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.appReducer);
  // DETAIL VARIABLES
  const [obj, setObj] = useState<InquiryModel>();
  const [tab, setTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [tabList, setTabList] = useState<any[]>([]);
  const name = useRef<string>('');
  const email = useRef<string>('');
  const phoneNo = useRef<string>('');
  const address = useRef<string>('');
  const passportId = useRef<string>('');
  const poBox = useRef<string>('');
  const [country, setCountry] = useState<CountryModel>();
  const [showConfirmPopup, setConfirmPopup] = useState(false);
  let userData: UserModel = selector.appUser;
  // FUNCTIONS
  useEffect(() => {
    initialize();
  }, []);
  useEffect(() => {
    if (obj) {
      generateTabList();
      consigneeData();
    }
  }, [obj]);
  const initialize = () => {
    if (isList) {
      totalPageRef.current = 5;
      pageRef.current = 1;
      getHistoryList(pageRef.current, false);
    } else {
      initializeDetail();
    }
  };
  const initializeDetail = () => {
    let findedCountry = CommonManager.shared.countriesList.find(
      item => item.id == userData.country.id,
    );
    if (findedCountry) {
      setCountry(findedCountry);
    }
    // getInquiryObj(628);
    if (props.route.params && props.route.params['orderId']) {
      getInquiryObj(props.route.params['orderId']);
    }
  };
    const checkTxtLeft = (width : number,tab : number)=>{
    let singleWidth = width/6
    let padding = singleWidth * tab
    return {
      left : padding + (tab > 3 ? 10 : 0)
    }
  }
  const getInquiryObj = async (id: number) => {
    console.log("data for call is ",id)
    setRefreshing(false);
    dispatch(setLoading(true));
    getPurchaseObjDetailApi(`${id}`)
      .then(async response => {
        console.log("response for purchase is ",response?.purchase_history)
        if (response?.purchase_history) {
          setObj(response.purchase_history);
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
        loadingMore.current = false;
        dispatch(setLoading(false));
      });
  };
  const getHistoryList = async (page: number, isLoadMore: boolean) => {
    if (pageRef.current > totalPageRef.current) {
      return;
    }
    let params: any = {
      required_images: 1,
      per_page,
      page,
    };
    dispatch(setLoading(true));
    getPurchaseListApi(params)
      .then(async response => {
        if (response?.purchase_histories) {
          pageRef.current = pageRef.current + 1;
          totalPageRef.current = response?.pagination?.total_pages ?? 0;
          if (isLoadMore) {
            setOrderList([...(orderList ?? []), ...response.purchase_histories]);
          } else {
            setOrderList(response.purchase_histories);
          }
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
        loadingMore.current = false;
        dispatch(setLoading(false));
      });
  };
  const handleLoadMore = () => {
    if (loadingMore.current) {
      return;
    }
    loadingMore.current = true;
    getHistoryList(pageRef.current, true);
  };
  const onBrowse = (props: ScreenProps) => {
    props.navigation.navigate(Routes.Container, {
      screen: TabRoutes.HomeStack,
      params: {
        screen: Routes.MainSearchScreen,
        params: {
          searchParams: {},
        },
      },
    });
  };
  const onDetail = (item: InquiryModel, props: ScreenProps, manager: any) => {
    props.navigation.push(Routes.HistoryDetailScreen, {
      orderId: item.id,
    });
  };
  const generateInquiryObjDetail1 = () => {
    let list = [];
    if (obj) {
      let price =
        selector.priceType == PriceType.dollar
          ? `$${CommonManager.shared.formattedNumber(obj.car_price)}`
          : `${
              PriceType.yen +
              CommonManager.shared.formattedNumber(
                CommonManager.shared.convertDollarToYen(obj.car.regular_price),
              )
            }`;
      list.push({
        title: 'Car Price',
        value: price,
      });
      list.push({
        title: 'Incoterm',
        value: obj.invoice_term,
      });
      let inspectionPrice =
        selector.priceType == PriceType.dollar
          ? `$${CommonManager.shared.formattedNumber(obj.inspection_charges)}`
          : `${
              PriceType.yen +
              CommonManager.shared.formattedNumber(
                CommonManager.shared.convertDollarToYen(obj.inspection_charges),
              )
            }`;
      list.push({
        title: 'Inspection Charges',
        value: inspectionPrice,
      });
      list.push({
        title: 'M3 Size',
        value: obj.car.m3 ?? '-',
      });

      let freightPrice =
        selector.priceType == PriceType.dollar
          ? `$${CommonManager.shared.formattedNumber(obj.freight_charges)}`
          : `${
              PriceType.yen +
              CommonManager.shared.formattedNumber(
                CommonManager.shared.convertDollarToYen(obj.freight_charges),
              )
            }`;
      list.push({
        title: 'Freight',
        value: freightPrice,
      });
      let insurancePrice =
        selector.priceType == PriceType.dollar
          ? `$${CommonManager.shared.formattedNumber(obj.insurance_price)}`
          : `${
              PriceType.yen +
              CommonManager.shared.formattedNumber(
                CommonManager.shared.convertDollarToYen(
                  Number(obj.insurance_price) ?? 0,
                ),
              )
            }`;
      list.push({
        title: 'Insurance',
        value: insurancePrice == '0' ? 'Not Included' : insurancePrice,
      });
      let totalPrice =
        selector.priceType == PriceType.dollar
          ? `$${CommonManager.shared.formattedNumber(obj.total_invoice)}`
          : `${
              PriceType.yen +
              CommonManager.shared.formattedNumber(
                CommonManager.shared.convertDollarToYen(
                  Number(obj.total_invoice) ?? 0,
                ),
              )
            }`;
      list.push({
        title: 'Total Price',
        value: totalPrice,
      });
    }
    return list;
  };
  const convertCurrency = (amount: number) => {
    let totalPrice =
      selector.priceType == PriceType.dollar
        ? `$${CommonManager.shared.formattedNumber(amount)}`
        : `${
            PriceType.yen +
            CommonManager.shared.formattedNumber(
              CommonManager.shared.convertDollarToYen(Number(amount) ?? 0),
            )
          }`;
    return totalPrice;
  };
  const checkRemainingAmount = () => {
    let totalAmount = obj?.total_invoice ?? 0;
    const paidAmount = obj?.receives.reduce(
      (sum: any, i: any) => sum + i.amount,
      0,
    );
    return convertCurrency(totalAmount - paidAmount);
  };
  const checkAlreadyPaidAmount = () => {
    const paidAmount = obj?.receives.reduce(
      (sum: any, i: any) => sum + i.amount,
      0,
    );
    return convertCurrency(paidAmount);
  };
  const generateTabList = () => {
    let list: any[] = [];
    const isAdvancePaid = obj?.receives && obj?.receives?.length > 0;
    const hasConsigneeDetails = !!obj?.consignee_details;
    const isSecondPaymentDone = obj?.receives && obj?.receives?.length > 1;
    const isDocumentReceived = !!obj?.shipping?.document_received;
    const isCarReceived = !!obj?.shipping?.car_received;
    let step = 1;
    if (isAdvancePaid) {
      step = 2;
    }
    if (hasConsigneeDetails) {
      step = 3;
    }
    if (isSecondPaymentDone) {
      step = 4;
    }
    if (isDocumentReceived) {
      step = 5;
    }
    if (isCarReceived) {
      step = 6;
    }
    setTab(step >= 6? 5 : step);
    orderStatusList.map((item, index) => {
      list.push({
        ...item,
        status: step > index ? 2 : step == index ? 1 : 0,
      });
    });
    setTabList(list);
  };
  // CONSIGNEE METHODS
  const consigneeData = () => {
    if (obj && obj.consignee_details) {
      name.current = obj.consignee_details.name;
      email.current = obj.consignee_details.email;
      phoneNo.current = obj.consignee_details.contact_no;
      poBox.current = obj.consignee_details.pobox;
      address.current = obj.consignee_details.address;
      passportId.current = obj.consignee_details.passport
      return;
    }
    name.current = userData.first_name;
    email.current = userData.email;
    phoneNo.current = userData.phone_no;
    address.current = userData.address;
  };

  // BALANCE METHODS
  const balanceEnable = () => {
    return (
      (obj?.receives[1]?.amount === 0 ||
        obj?.receives[1]?.amount === undefined) &&
      obj?.shipping?.shipping_emails[2]?.type === 'customer' &&
      obj?.payments[1]?.status !== 'pending' &&
      obj?.payments[1]?.status !== 'verified'
    );
  };

  // DOCUMENTS METHOD
  const downloadFBInvoice = () => {
    if (obj)
      downloadAndSaveFile(`${BASE_DOC_URLS}partner/cnf/print.php?id=${obj.id}&uid=${obj.user_id}`)
  };
  // CAR METHODS
  return {
    orderList,
    setOrderList,
    onBrowse,
    handleLoadMore,
    onDetail,
    generateInquiryObjDetail1,
    obj,
    setObj,
    convertCurrency,
    checkRemainingAmount,
    checkAlreadyPaidAmount,
    name,
    email,
    phoneNo,
    country,
    showConfirmPopup,
    setConfirmPopup,
    tab,
    setTab,
    tabList,
    address,
    passportId,
    poBox,
    balanceEnable,
    getInquiryObj,
    refreshing,
    setRefreshing,
    checkTxtLeft,
    downloadFBInvoice,
  };
};

export default PurchaseManager;
export type PurchaseManagerType = ReturnType<typeof PurchaseManager>;

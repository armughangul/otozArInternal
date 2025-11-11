import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ScreenProps} from '../../../utilis/AppConstant';
import {VehicleModel} from '../../../Model/VehicleModel';
import {CountryModel} from '../../../Model/CountryModel';
import {PortModel} from '../../../Model/PortModel';
import CommonManager from '../../../utilis/CommonManager';
import SelectionDropDownModel from '../../../Model/SelectionDropDownModel';
import {AppStrings} from '../../../utilis/AppStrings';
import {useDispatch, useSelector} from 'react-redux';
import {PriceType, setLoading} from '../../../redux/Reducers/AppReducer';
import {
  getInquiryListApi,
  inquiryApi,
} from '../../../Network/Services/InquiryService';
import {InquiryModel} from '../../../Model/InquiryModel';
import {Routes, TabRoutes} from '../../../utilis/Routes';
const InquiryManager = (props: ScreenProps) => {
  const selector = useSelector((state: any) => state.appReducer);
  const [modelObj, setModelObj] = useState<SelectionDropDownModel | null>();
  const [inquiryCar, setInquiryCar] = useState<VehicleModel>();
  const name = useRef<string>(CommonManager.shared.currentUser?.first_name);
  const email = useRef<string>(CommonManager.shared.currentUser?.email);
  const phoneNo = useRef<string>(
    CommonManager.shared.currentUser?.phone_no ?? '',
  );
  const [country, setCountry] = useState<CountryModel>();
  const [port, setPort] = useState<PortModel>();
  const [isFright, setIsFright] = useState(false);
  const [isInspection, setIsInspection] = useState(false);
  const [isInsurance, setIsInsurance] = useState(false);
  const [message, setMessage] = useState<string>('');
  const portListRef = useRef<PortModel[]>([]);
  const dispatch = useDispatch();

  //INQUIRY LISTING VARIABLES
  const [inquriyList, setInquiryList] = useState<InquiryModel[]>();
  const per_page = 30;
  const pageRef = useRef<number>(1);
  const totalPageRef = useRef<number>(5);
  const loadingMore = useRef<boolean>(false);
  const selectedInquiryItem = useRef<InquiryModel>(null);
  useEffect(() => {
    initialize();
  }, []);
  const generatePrice = useMemo(() => {
    let totalPrice = inquiryCar?.sale_price ?? 0;
    if (country && port) {
      if (isFright) {
        totalPrice += port?.fare ?? 0;
      }
      if (isInspection) {
        totalPrice += port?.ship_inspection ?? 0;
      }
      if (isInsurance) {
        totalPrice += port?.insurance ?? 0;
      }
    }
    return totalPrice;
  }, [country, port, isFright, isInspection, isInsurance]);
  useEffect(() => {
    generatePortList();
  }, [country]);
  const initialize = () => {
    if (props.route.params && props.route.params['inquiryCar']) {
      setInquiryCar(props.route.params['inquiryCar']);
      if (CommonManager.shared.userCountry) {
        setCountry(CommonManager.shared.userCountry);
      }
    } else {
      totalPageRef.current = 5;
      pageRef.current = 1;
      getInquiryList(pageRef.current, false);
    }
  };
  const generatePortList = () => {
    let portList = CommonManager.shared.portList.filter(
      port => port.country.id == country?.id,
    );
    portListRef.current = portList;
    setPort(undefined)
        if (portListRef.current && portListRef.current.length > 0){
        setPort(portListRef.current[0])
      }
  };
  const onSelectItem = (index: number) => {
    if (modelObj?.type == 0) {
      setCountry(CommonManager.shared.countriesList[index]);
    } else {
      setPort(portListRef.current[index]);
    }
    setModelObj(null);
  };
  const inquiryValidation = () => {
    if (country == null) {
      CommonManager.shared.showPopUp(
        'Error',
        AppStrings.AuthManager.countryError,
      );
      return false;
    }
    if (port == null) {
      CommonManager.shared.showPopUp('Error', AppStrings.AuthManager.portError);
      return false;
    }
    if (
      !CommonManager.shared.validatePhoneNumber(
        country.phone_regex,
        phoneNo.current,
      )
    ) {
      CommonManager.shared.showPopUp(
        'Error',
        AppStrings.AuthManager.phoneNo +
          ' example like ' +
          country.example_phone,
      );
      return false;
    }
    return true;
  };
  const onInquiry = (props: ScreenProps) => {
    if (inquiryValidation()) {
      let bodyParams = {
        name: name.current?.trim(),
        phone: phoneNo.current.trim(),
        email: email.current?.trim(),
        car_id: inquiryCar?.id,
        inspection: isInspection,
        insurance: isInsurance,
        port_id: port?.id,
        country_id: country?.id,
        message: message,
        freight: isFright,
        contact: phoneNo.current.trim(),
      };
      let params = {
        inquiry: bodyParams,
      };
      console.log(params);
      dispatch(setLoading(true));
      inquiryApi(params)
        .then(response => {
          console.log('response is ', response);
          if (response) {
            CommonManager.shared.showMessage(
              'Inquiry request send successfully.',
              1,
            );
            if (props.route.params && props.route.params['onInquiry']) {
              props.route.params['onInquiry']();
              props.navigation.goBack();
            }
          }
        })
        .catch(response => {
          dispatch(setLoading(false));
          let msg = '';
          if (response.message && response.message.length > 0) {
            response.message.map((item: string) => {
              msg += item;
            });
          }
          CommonManager.shared.showPopUp('Error', msg);
        })
        .finally(() => {});
    }
  };
  const getInquiryList = async (page: number, isLoadMore: boolean) => {
    if (pageRef.current > totalPageRef.current) {
      console.log('returning pages');
      return;
    }
    let params: any = {
      required_images: 1,
      per_page,
      page,
    };
    dispatch(setLoading(true));
    getInquiryListApi(params)
      .then(async response => {
        if (response?.inquiries) {
          pageRef.current = pageRef.current + 1;
          totalPageRef.current = response?.pagination?.total_pages ?? 0;
          if (isLoadMore) {
            setInquiryList([...(inquriyList ?? []), ...response.inquiries]);
          } else {
            setInquiryList(response.inquiries);
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
    if (loadingMore.current || inquriyList == null) {
      return;
    }
    console.log("load more")
    loadingMore.current = true;
    getInquiryList(pageRef.current, true);
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
    selectedInquiryItem.current = item;
    props.navigation.push(Routes.InquiryDetailScreen, {
      manager: manager,
    });
  };
  const generateInquiryObjDetail = (obj: InquiryModel) => {
    let list = [];
    list.push({
      title: 'Destination Country',
      value: obj.country,
    });
    list.push({
      title: 'Destination Port',
      value: obj.port,
    });
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
    let freightPrice = selector.priceType == PriceType.dollar
        ? `$${CommonManager.shared.formattedNumber(obj.freight_charges)}`
        : `${
            PriceType.yen +
            CommonManager.shared.formattedNumber(
              CommonManager.shared.convertDollarToYen(obj.freight_charges),
            )
          }`
    list.push({
      title: 'Freight',
      value: freightPrice,
    });
        let insurancePrice = selector.priceType == PriceType.dollar
        ? `$${CommonManager.shared.formattedNumber(obj.insurance_price)}`
        : `${
            PriceType.yen +
            CommonManager.shared.formattedNumber(
              CommonManager.shared.convertDollarToYen(Number(obj.insurance_price) ?? 0),
            )
          }`
      list.push({
      title: 'Insurance',
      value: insurancePrice,
    });
     list.push({
      title: 'Inspection',
      value: obj.pre_ship_inspection  == "0" ? "No" : "Yes",
    });
    return list
  };
  return {
    inquiryCar,
    name,
    email,
    country,
    setCountry,
    port,
    setPort,
    isFright,
    setIsFright,
    isInspection,
    setIsInspection,
    isInsurance,
    setIsInsurance,
    message,
    setMessage,
    portListRef,
    modelObj,
    setModelObj,
    onSelectItem,
    phoneNo,
    generatePrice,
    onInquiry,
    inquriyList,
    setInquiryList,
    handleLoadMore,
    onBrowse,
    onDetail,
    selectedInquiryItem,
    generateInquiryObjDetail
  };
};

export default InquiryManager;
export type InquiryManagerType = ReturnType<typeof InquiryManager>;

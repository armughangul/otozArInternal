import React, {Suspense} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from '../utilis/Routes';
import {useSelector} from 'react-redux';
import AppLoader from '../components/AppLoader/AppLoader';
const RefineSearch = React.lazy(() =>
  import('../Sections/RefineSearch/RefineSearchScreen'),
);
const Container = React.lazy(() => import('../Sections/Container/Container'));
const Journey = React.lazy(() => import('../Sections/Journey/Journey'));
const MainSearchScreen = React.lazy(() =>
  import('../Sections/MainSearch/MainSearchScreen'),
);
const CarDetailScreen = React.lazy(() =>
  import('../Sections/Detail/CarDetailScreen'),
);
const InquiryScreen = React.lazy(() =>
  import('../Sections/Inquiry/InquiryScreen'),
);
const LoginScreen = React.lazy(() => import('../Sections/Auth/LoginScreen'));
const RegisterOptionScreen = React.lazy(() =>
  import('../Sections/Auth/RegisterOptionScreen'),
);
const RegisterScreen = React.lazy(() =>
  import('../Sections/Auth/RegisterScreen'),
);
const ForgetPasswordScreen = React.lazy(() =>
  import('../Sections/Auth/ForgetPasswordScreen'),
);
const ChangePasswordScreen = React.lazy(() =>
  import('../Sections/Auth/ChangePasswordScreen'),
);
const OtpVerificationScreen = React.lazy(() =>
  import('../Sections/Auth/OtpVerificationScreen'),
);
const PrivacyPolicyScreen = React.lazy(() =>
  import('../Sections/Settings/PrivacyPolicyScreen'),
);
const TermsNConditionScreen = React.lazy(() =>
  import('../Sections/Settings/TermsNConditionScreen'),
);
const EditProfile = React.lazy(() =>
  import('../Sections/Account/EditProfileScreen'),
);
const ImageCropScreen = React.lazy(() =>
  import('../Sections/Settings/ImageCropScreen'),
);
const InquiryListScreen = React.lazy(() =>
  import('../Sections/Inquiry/InquiryListScreen'),
);
const InquiryDetailScreen = React.lazy(() =>
  import('../Sections/Inquiry/InquiryDetailScreen'),
);
const OrderListScreen = React.lazy(() =>
  import('../Sections/Order/OrderListScreen'),
);
const OrderDetailScreen = React.lazy(() =>
  import('../Sections/Order/OrderDetailScreen'),
);
const HistoryDetailScreen = React.lazy(() =>
  import('../Sections/Order/HistoryDetailScreen'),
);
const OrderHistoryListScreen = React.lazy(() =>
  import('../Sections/Order/OrderHistoryListScreen'),
);
const ResetPasswordScreen = React.lazy(() =>
  import('../Sections/Auth/ResetPasswordScreen'),
);
const FaqScreen = React.lazy(() => import('../Sections/Settings/FaqScreen'));
const ContactUsScreen = React.lazy(() =>
  import('../Sections/Settings/ContactUsScreen'),
);
const LedgerScreen = React.lazy(() =>
  import('../Sections/Ledger/LedgerScreen'),
);

const AboutUsScreen = React.lazy(() =>
  import('../Sections/Settings/AboutUsScreen'),
);
const HowItWorkScreen = React.lazy(() =>
  import('../Sections/Settings/HowItWorkScreen'),
);
const SmartMatchingScreen = React.lazy(() =>
  import('../Sections/SmartMatch/SmartMatchingScreen'),
);
const SmartMatchIntroScreen = React.lazy(() =>
  import('../Sections/SmartMatch/SmartMatchIntroScreen'),
);
const SmartMatchInquiryScreen = React.lazy(() =>
  import('../Sections/SmartMatch/SmartMatchInquiryScreen'),
);
const SparkyScreen = React.lazy(() =>
  import('../Sections/Agentic/Sparky/SparkyScreen'),
);
const Stack = createNativeStackNavigator();
const NewStack = () => {
  const selector = useSelector(State => State.appReducer);
  return (
    <Suspense fallback={<AppLoader />}>
      <Stack.Navigator
        initialRouteName={
          selector.isJourney == '0' ? Routes.Journey : Routes.Container
        }
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen component={Journey} name={Routes.Journey} />
        <Stack.Screen component={Container} name={Routes.Container} />
        <Stack.Screen
          component={MainSearchScreen}
          name={Routes.MainSearchScreen}
        />
        <Stack.Screen component={RefineSearch} name={Routes.RefineSearch} />
        <Stack.Screen
          component={CarDetailScreen}
          name={Routes.CarDetailScreen}
        />
        <Stack.Screen component={InquiryScreen} name={Routes.InquiryScreen} />
        <Stack.Screen component={LoginScreen} name={Routes.LoginScreen} />
        <Stack.Screen
          component={RegisterOptionScreen}
          name={Routes.RegisterOptionScreen}
        />
        <Stack.Screen component={RegisterScreen} name={Routes.RegisterScreen} />
        <Stack.Screen
          component={ForgetPasswordScreen}
          name={Routes.ForgetPasswordScreen}
        />
        <Stack.Screen
          component={ChangePasswordScreen}
          name={Routes.ChangePasswordScreen}
        />
        <Stack.Screen
          component={OtpVerificationScreen}
          name={Routes.OtpVerificationScreen}
        />
        <Stack.Screen
          component={PrivacyPolicyScreen}
          name={Routes.PrivacyPolicyScreen}
        />
        <Stack.Screen
          component={TermsNConditionScreen}
          name={Routes.TermsnCondition}
        />
        <Stack.Screen
          component={ResetPasswordScreen}
          name={Routes.ResetPasswordScreen}
        />
        <Stack.Screen component={EditProfile} name={Routes.EditProfile} />
        <Stack.Screen
          component={ImageCropScreen}
          name={Routes.ImageCropScreen}
        />
        <Stack.Screen
          component={InquiryListScreen}
          name={Routes.InquiryListScreen}
        />
        <Stack.Screen
          component={InquiryDetailScreen}
          name={Routes.InquiryDetailScreen}
        />
        <Stack.Screen
          component={OrderListScreen}
          name={Routes.OrderListScreen}
        />
        <Stack.Screen
          component={OrderDetailScreen}
          name={Routes.OrderDetailScreen}
        />
        <Stack.Screen
          component={OrderHistoryListScreen}
          name={Routes.OrderHistoryListScreen}
        />
        <Stack.Screen
          component={HistoryDetailScreen}
          name={Routes.HistoryDetailScreen}
        />
        <Stack.Screen component={FaqScreen} name={Routes.FaqScreen} />
        <Stack.Screen
          component={ContactUsScreen}
          name={Routes.ContactUsScreen}
        />
        <Stack.Screen component={LedgerScreen} name={Routes.LedgerScreen} />
        <Stack.Screen component={AboutUsScreen} name={Routes.AboutUsScreen} />
        <Stack.Screen
          component={HowItWorkScreen}
          name={Routes.HowItWorkScreen}
        />
        <Stack.Screen
          component={SmartMatchingScreen}
          name={Routes.SmartMatchingScreen}
        /> 
           <Stack.Screen
           options={{
            presentation : "transparentModal"
           }}
          component={SmartMatchIntroScreen}
          name={Routes.SmartMatchIntroScreen}
        /> 
          <Stack.Screen
          component={SmartMatchInquiryScreen}
          name={Routes.SmartMatchInquiryScreen}
        /> 
             <Stack.Screen
          component={SparkyScreen}
          name={Routes.SparkyScreen}
        /> 
      </Stack.Navigator>
    </Suspense>
  );
};
export default NewStack;

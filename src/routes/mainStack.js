import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyDrawer from '../drawer/MyDrawer';
import ContactUs from '../screens/mainScreens/ContactUs';
import DetaildScreen from '../screens/mainScreens/DetaildScreen';
import TrendingCarInJapan from '../components/TrendingCarInJapan';
import InquiryScreen from '../screens/mainScreens/InquiryScreen';
import FiltersScreen from '../screens/mainScreens/FiltersScreen';
import MyInquires from '../screens/mainScreens/MyInquires';
import SmartMatchingScreen from '../screens/mainScreens/SmartMatchingScreen';
import Howitworks from '../screens/mainScreens/Howitworks';
import AboutUs from '../screens/mainScreens/AboutUs';
import TermsnCondition from '../screens/mainScreens/TermsnCondition';
import PrivacyPolicy from '../screens/mainScreens/PrivacyPolicy';
import Faq from '../screens/mainScreens/Faq';
import InquiryDetail from '../screens/mainScreens/InquiryDetail';
import ChangePassword from '../screens/mainScreens/ChangePassword';
import TrackOrder from '../screens/mainScreens/TrackOrder';
import PurchaseHistory from '../screens/mainScreens/PurchaseHistory';
import PreAuctionStock from '../screens/drawerScreens/PreAuctionStock';
import SingleInquiryDetail from '../screens/mainScreens/SingleInquiryDetail';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyDrawer"
        component={MyDrawer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Howitworks"
        component={Howitworks}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PreAuctionStock"
        component={PreAuctionStock}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="ConfirmEmail"
        component={ConfirmEmail}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="Faq"
        component={Faq}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TermsnCondition"
        component={TermsnCondition}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetaildScreen"
        component={DetaildScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TrendingCarInJapan"
        component={TrendingCarInJapan}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyInquires"
        component={MyInquires}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PurchaseHistory"
        component={PurchaseHistory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TrackOrder"
        component={TrackOrder}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InquiryDetail"
        component={InquiryDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SingleInquiryDetail"
        component={SingleInquiryDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InquiryScreen"
        component={InquiryScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SmartMatchingScreen"
        component={SmartMatchingScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="ForgotScreen"
        component={ForgotScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConfirmEmail"
        component={ConfirmEmail}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="FiltersScreen"
        component={FiltersScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

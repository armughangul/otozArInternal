import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthStack from './authStack';
import {useSelector} from 'react-redux';
import MainStack from './mainStack';
import SplashScreen from '../screens/loginScreen/SplashScreen';
import OnboardingScreen from '../screens/loginScreen/OnboardingScreen';
import setAuthToken from '../app-services/axios-util/set-auth-token';
import { setExploreOnly } from '../redux/Reducers/userReducers';
import NewStack from "./newStack"
import AppLoader from '../components/AppLoader/AppLoader';
import Journey from '../Sections/Journey/Journey';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {user, token, isSkipped, exploreOnly} = useSelector(
    state => state.user,
  );
  const [showSplash, setShowSplash] = React.useState(true);
    const selector = useSelector((AppState) => AppState.appReducer);
  useEffect(() => {
    setExploreOnly(true)
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    console.log('>>>token>>>', token);
    console.log('>>>user>>>', user);
  }, [user, token]);

  // if (showSplash) {
  //   return <SplashScreen />;
  // }

  // if (!isSkipped) {
  //   return <OnboardingScreen />;
  // }
  // return(
  //   <NewStack/>
  // )
  console.log("journey is ",selector.isJourney)
  if (!selector.isJourney){
    return(
      <Journey/>
    )
  }
  return (
    <SafeAreaProvider>
      <NewStack/>
      {
        selector.isLoading &&
        <AppLoader
        visisble = {selector.isLoading}
        />
      }
      {/* {token || exploreOnly ? <MainStack /> : <AuthStack />} */}
    </SafeAreaProvider>

  );
};

export default Navigation;
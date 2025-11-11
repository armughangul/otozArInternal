import analytics from '@react-native-firebase/analytics';

export const trackScreenView = async (screenName) => {
  await analytics().logScreenView({
    screen_name: screenName,
    screen_class: screenName, // Optional, can be any class name
  });
};

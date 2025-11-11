import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, StyleSheet, View} from 'react-native';
import Bar from './Bar';
import {AppColors} from '../../../utilis/AppColors';
import {bottomBarList} from '../../../utilis/AppStrings';
import {appShadow} from '../../../utilis/AppStyle';
import { useNavigation } from '@react-navigation/native';

const BottomBar = ({state, descriptors, navigation}: any) => {
  const selector = useSelector((AppState: any) => AppState.appReducer);
  return (
    <View
      style={{
        ...style.mainView,
        zIndex: selector.tabbarVisibility ? 20 : -20,
      }}>
      <View
        style={{
          ...style.tabbar,
        }}>
        {bottomBarList.map((item, index) => {
          return (
            <Bar
              key={item.name}
              tab={state.index}
              obj={item}
              index={index}
              onPress={() => {
                const isFocused = state.index === index;
                if (!isFocused) {
                  navigation.navigate(item.name);
                }
                else {
                  navigation.goBack()
                  // if (navigation.canGoBack()){
                  //   navigation.goBack()
                  // }
                }
              }}
            />
          );
        })}
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  mainView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    justifyContent: 'center',
    zIndex: 20,
    borderWidth: 0,
    elevation: 6,
    backgroundColor: AppColors.white(0.9),
    ...appShadow(AppColors.black(0.05), {width: 0, height: -4}),
  },
  tabbar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
});
export default BottomBar;

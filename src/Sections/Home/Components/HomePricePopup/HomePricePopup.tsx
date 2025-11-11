import React from 'react'
import AppPopupMenu from '../../../../components/AppPopupMenu/AppPopupMenu';
import { HomeManagerType } from '../../Manager/HomeManager';
import SinglePopupItem from '../../../../components/AppPopupMenu/SinglePopupItem';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { priceList } from '../../../../utilis/AppStrings';
import { PriceType, setPriceType } from '../../../../redux/Reducers/AppReducer';
interface Props {
    manager : HomeManagerType
}
const HomePricePopup = (props : Props) => {
  return (
          <AppPopupMenu
            style={{
              ...style.popupStyle,
            }}
            closeMenu={() => props.manager.setMenuVisible(false)}
            child={() => {
             return <View
              style = {{
              }}
              >
                <FlatList
                  data={priceList}
                  keyExtractor={(item, index) => `${item}`}
                  renderItem={({item,index}) => {
                    return (
                      <SinglePopupItem title={item} onPress={() => {
                        props.manager.dispatch(setPriceType(index == 0 ? PriceType.dollar : PriceType.yen))
                        props.manager.setMenuVisible(false)
                      }} />
                    );
                  }}
                />
              </View>;
            }}
          />
  )
}
const style = StyleSheet.create({
  popupStyle: {
    width: 200,
    marginLeft: Dimensions.get('screen').width - 210,
  },
});
export default HomePricePopup

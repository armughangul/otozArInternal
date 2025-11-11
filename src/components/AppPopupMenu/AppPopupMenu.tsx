import React, {useState} from 'react';
import {View, LayoutAnimation, FlatList, Dimensions, StyleSheet} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
const AppPopupMenu = ({style,closeMenu,child} : any) => {
  return (
          <Menu
        onBackdropPress={() => {
          closeMenu()
        }}
        opened={true}>
        <MenuTrigger
         />
        <MenuOptions
        optionsContainerStyle = {{
            ...style
        }}
          renderOptionsContainer={() => {
            return (
              child()
            );
          }}
        >
        </MenuOptions>
      </Menu>
  );
};

export default AppPopupMenu;

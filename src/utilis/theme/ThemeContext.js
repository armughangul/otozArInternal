import React, {createContext, useContext} from 'react';
import {useSelector} from 'react-redux';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';
import {useTheme} from 'react-native-paper';

// Create the context
export const ThemeContext = createContext();

export const useAppTheme = () => {
  return useContext(ThemeContext);
};

// ThemeProvider component that wraps your app
export const ThemeProvider = ({children}) => {
  const {myTheme} = useSelector(state => state.root.user);
  const theme = useTheme(myTheme === 'lightTheme' ? lightTheme : darkTheme);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

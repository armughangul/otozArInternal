// lightTheme.js
import {DefaultTheme} from 'react-native-paper';

const lightTheme = {
  ...DefaultTheme,
  dark: false,
  mode: 'adaptive', // or 'exact' if you prefer
  colors: {
    ...DefaultTheme.colors,
    primary: '#3F51B5',
    logo: '#720808',
    background: 'red',
    text: '#313131',
    icon: '#313131',
    tabs: '#fff',
    rightBar: '#fff',
    eyeIcon: '#fff',
    topbar: '#f5e9cd',
    bgColor:'#fff',
  },
};

export default lightTheme;

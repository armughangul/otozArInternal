// darkTheme.js
import {DefaultTheme} from 'react-native-paper';

const darkTheme = {
  ...DefaultTheme,
  dark: true,
  mode: 'adaptive', 
  colors: {
    ...DefaultTheme.colors,
    primary: '#3F51B5',
    logo: '#fff',
    background: 'orange',
    text: '#313131',
    icon: 'white',
    tabs: '#313131',
    rightBar: '#0D0D0D',
    eyeIcon: '#fff',
    topbar: '#313131',
    bgColor:'#0D0D0D'
  },
};

export default darkTheme;

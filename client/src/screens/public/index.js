import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from './views/Login';
import RegisterScreen from './views/Register';

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    headerMode: 'none',
  },
);

export default AuthStack;

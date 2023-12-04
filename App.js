import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from "react-redux";
import store from "./store/store.js";

import SignupComponent from './Screens/Signup.js';
import LoginComponent from './Screens/Login.js';
import HomeComponent from './Screens/Home.js';


// main Screen
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen options={{ headerShown: false }} name="Signup" component={SignupComponent} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginComponent} />
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
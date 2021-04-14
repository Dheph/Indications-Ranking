import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./pages/Login";
import PersonalData from "./pages/PersonalData";
import Address from "./pages/Address";
import RegisterPass from "./pages/RegisterPass";
import BottomMenu from "./bottomNavigator";

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="login" component={Login} />
        <AppStack.Screen name="personaldata" component={PersonalData} />
        <AppStack.Screen name="address" component={Address} />
        <AppStack.Screen name="registerpass" component={RegisterPass} />
        <AppStack.Screen name="bottommenu" component={BottomMenu} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
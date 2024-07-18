import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { RecoilRoot } from "recoil";
import Home from "./screens/home/Home";
import SignUp from "./screens/userauth/SignUp";
import SignIn from "./screens/userauth/SignIn";
import SplashScreenComponent from "./screens/splash/SplashScreen";
import Selection from "./screens/selection/Selection";
import Onboarding from "./screens/onboarding/Onboarding";
import YouthGenderAwareness from "./screens/youthlearn/YouthGenderAwareness";
import ReadingSpeaking from "./screens/readingspeaking/ReadingSpeaking";
import LiteracySkills from "./screens/literacyskills/LiteracySkills";
import CareerExploration from "./screens/careerexploration/CareerExploration";
import QuestionDetail from "./components/questiondetail/QuestionDetail";

import { enableScreens } from "react-native-screens";

enableScreens();

const Stack = createStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    "paybooc-Bold": {
      uri: "https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/paybooc-Bold.woff",
      display: Font.FontDisplay.FALLBACK,
    },
  });
};

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    fetchFonts().then(() => {
      setFontLoaded(true);
      SplashScreen.hideAsync();
    });
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreenComponent} />
          <Stack.Screen name="Selection" component={Selection} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="YouthGenderAwareness"
            component={YouthGenderAwareness}
          />
          <Stack.Screen name="ReadingSpeaking" component={ReadingSpeaking} />
          <Stack.Screen name="LiteracySkills" component={LiteracySkills} />
          <Stack.Screen
            name="CareerExploration"
            component={CareerExploration}
          />
          <Stack.Screen name="QuestionDetail" component={QuestionDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;

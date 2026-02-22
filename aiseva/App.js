import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

// Import Screens
import LoginScreen from "./src/screens/auth/LoginScreen";
import SignupScreen from "./src/screens/auth/SignupScreen";
import UserDashboardScreen from "./src/screens/user/UserDashboardScreen";
import SchemeDetailsScreen from "./src/screens/user/SchemeDetailsScreen";
import ApplicationFormScreen from "./src/screens/user/ApplicationFormScreen";
import UserProfileScreen from "./src/screens/user/UserProfileScreen";
import NotificationsScreen from "./src/screens/user/NotificationsScreen";
import AdminDashboardScreen from "./src/screens/admin/AdminDashboardScreen";

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Login");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Comment this out to persist login between sessions
      await AsyncStorage.clear();

      const isAuthenticated = await AsyncStorage.getItem("isAuthenticated");
      const userType = await AsyncStorage.getItem("userType");

      if (isAuthenticated === "true" && userType) {
        setInitialRoute(
          userType === "admin" ? "AdminDashboard" : "UserDashboard"
        );
      } else {
        setInitialRoute("Login");
      }
    } catch (error) {
      console.error("Failed to check auth:", error);
      setInitialRoute("Login");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F9FAFB",
        }}
      >
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#F9FAFB" },
        }}
      >
        {/* Auth Screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />

        {/* User Screens */}
        <Stack.Screen name="UserDashboard" component={UserDashboardScreen} />
        <Stack.Screen name="SchemeDetails" component={SchemeDetailsScreen} />
        <Stack.Screen
          name="ApplicationForm"
          component={ApplicationFormScreen}
        />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />

        {/* Admin Screens */}
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

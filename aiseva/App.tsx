import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Auth Components
import Login from "./src/components/auth/Login";
import Signup from "./src/components/auth/Signup";

// User Components
import UserDashboard from "./src/components/user/UserDashboard";
import UserProfile from "./src/components/user/UserProfile";
import Notifications from "./src/components/user/Notifications";
import SchemeDetails from "./src/components/user/SchemeDetails";
import ApplicationForm from "./src/components/user/ApplicationForm";

// Admin Components
import AdminDashboard from "./src/components/admin/AdminDashboard";
import AddEditScheme from "./src/components/admin/AddEditScheme";

// Types
import { Scheme } from "./src/lib/mockData";

type Screen =
  | "Login"
  | "Signup"
  | "UserDashboard"
  | "UserProfile"
  | "Notifications"
  | "SchemeDetails"
  | "ApplicationForm"
  | "AdminDashboard"
  | "AddEditScheme";

interface User {
  id: string;
  email: string;
  role: "user" | "admin";
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#EF4444",
    textAlign: "center",
  },
});

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("Login");
  const [user, setUser] = useState<User | null>(null);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setCurrentScreen(
          parsedUser.role === "admin" ? "AdminDashboard" : "UserDashboard",
        );
      }
    } catch (error) {
      console.log("Error checking auth status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      // Mock authentication logic
      const isAdmin = email === "admin@aiseva.gov.in";
      const userData: User = {
        id: isAdmin ? "admin1" : "user1",
        email,
        role: isAdmin ? "admin" : "user",
      };

      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setCurrentScreen(
        userData.role === "admin" ? "AdminDashboard" : "UserDashboard",
      );

      Alert.alert("Success", "Login successful!");
    } catch (error) {
      console.log("Login error:", error);
      Alert.alert("Error", "Login failed. Please try again.");
    }
  };

  const handleSignup = async (
    email: string,
    password: string,
    name: string,
  ) => {
    try {
      // Mock signup logic
      const userData: User = {
        id: `user_${Date.now()}`,
        email,
        role: "user",
      };

      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setCurrentScreen("UserDashboard");

      Alert.alert("Success", "Account created successfully!");
    } catch (error) {
      console.log("Signup error:", error);
      Alert.alert("Error", "Signup failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
      setCurrentScreen("Login");
      setSelectedScheme(null);
      setEditingScheme(null);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const handleNavigate = (screen: Screen, params?: any) => {
    if (screen === "SchemeDetails" && params?.scheme) {
      setSelectedScheme(params.scheme);
    }
    if (screen === "ApplicationForm" && params?.scheme) {
      setSelectedScheme(params.scheme);
    }
    if (screen === "AddEditScheme" && params?.scheme) {
      setEditingScheme(params.scheme);
    }
    if (screen === "AddEditScheme" && !params?.scheme) {
      setEditingScheme(null);
    }
    setCurrentScreen(screen);
  };

  const handleSchemeSelect = (scheme: Scheme) => {
    setSelectedScheme(scheme);
    setCurrentScreen("SchemeDetails");
  };

  const handleApplyForScheme = (schemeId: string) => {
    if (selectedScheme) {
      setCurrentScreen("ApplicationForm");
    }
  };

  const handleApplicationSubmit = (applicationId: string) => {
    Alert.alert(
      "Application Submitted",
      `Your application has been submitted with ID: ${applicationId}`,
      [{ text: "OK", onPress: () => setCurrentScreen("UserDashboard") }],
    );
  };

  const handleSchemeEdit = (scheme?: Scheme) => {
    setEditingScheme(scheme || null);
    setCurrentScreen("AddEditScheme");
  };

  const handleSchemeSave = (data?: any) => {
    setEditingScheme(null);
    setCurrentScreen("AdminDashboard");
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={{ marginTop: 10, color: "#6B7280" }}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderCurrentScreen = () => {
    try {
      switch (currentScreen) {
        case "Login":
          return (
            <Login
              onLogin={handleLogin}
              onNavigateToSignup={() => setCurrentScreen("Signup")}
            />
          );

        case "Signup":
          return (
            <Signup
              onSignup={handleSignup}
              onNavigateToLogin={() => setCurrentScreen("Login")}
            />
          );

        case "UserDashboard":
          return (
            <UserDashboard
              onNavigate={handleNavigate}
              onSchemeSelect={handleSchemeSelect}
              onLogout={handleLogout}
            />
          );

        case "UserProfile":
          return (
            <UserProfile onLogout={handleLogout} onNavigate={handleNavigate} />
          );

        case "Notifications":
          return (
            <Notifications onBack={() => setCurrentScreen("UserDashboard")} />
          );

        case "SchemeDetails":
          if (!selectedScheme) {
            return (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>No scheme selected</Text>
              </View>
            );
          }
          return (
            <SchemeDetails
              scheme={selectedScheme}
              onBack={() => setCurrentScreen("UserDashboard")}
              onApply={handleApplyForScheme}
            />
          );

        case "ApplicationForm":
          if (!selectedScheme) {
            return (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  No scheme selected for application
                </Text>
              </View>
            );
          }
          return (
            <ApplicationForm
              scheme={selectedScheme}
              onBack={() => setCurrentScreen("SchemeDetails")}
              onSubmit={handleApplicationSubmit}
            />
          );

        case "AdminDashboard":
          return (
            <AdminDashboard
              onNavigate={handleNavigate}
              onEditScheme={handleSchemeEdit}
              onLogout={handleLogout}
            />
          );

        case "AddEditScheme":
          return (
            <AddEditScheme
              scheme={editingScheme}
              onBack={() => setCurrentScreen("AdminDashboard")}
              onSave={handleSchemeSave}
            />
          );

        default:
          return (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                Unknown screen: {currentScreen}
              </Text>
            </View>
          );
      }
    } catch (error) {
      console.error("Error rendering screen:", error);
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Error loading screen. Please restart the app.
          </Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {renderCurrentScreen()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

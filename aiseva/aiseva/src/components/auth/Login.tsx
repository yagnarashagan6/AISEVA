import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AntDesign } from "@expo/vector-icons";

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onNavigateToSignup: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  content: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoIcon: {
    width: 64,
    height: 64,
    backgroundColor: "#3B82F6",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3B82F6",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 24,
    textAlign: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 16,
  },
  signupContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  signupText: {
    color: "#6B7280",
    fontSize: 14,
  },
  signupLink: {
    color: "#3B82F6",
    fontWeight: "500",
  },
  demoContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  demoText: {
    color: "#1D4ED8",
    textAlign: "center",
    fontSize: 14,
  },
});

export default function Login({ onLogin, onNavigateToSignup }: LoginProps) {
  const [loginType, setLoginType] = useState<"user" | "admin">("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    await onLogin(email, password);
  };

  const navigateToSignup = () => {
    onNavigateToSignup();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Logo and Branding */}
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <AntDesign name="star" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.title}>AISEVA</Text>
            <Text style={styles.subtitle}>
              Turning Awareness into Empowerment
            </Text>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Login</Text>

            {/* Login Type Toggle */}
            <View style={styles.toggleContainer}>
              <View style={styles.toggleButton}>
                <Button
                  onPress={() => setLoginType("user")}
                  variant={loginType === "user" ? "default" : "outline"}
                  className="rounded-full"
                >
                  User Login
                </Button>
              </View>
              <View style={styles.toggleButton}>
                <Button
                  onPress={() => setLoginType("admin")}
                  variant={loginType === "admin" ? "default" : "outline"}
                  className="rounded-full"
                >
                  Admin Login
                </Button>
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Label>Email</Label>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                className="rounded-xl"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Label>Password</Label>
              <Input
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                className="rounded-xl"
              />
            </View>

            {/* Login Button */}
            <Button onPress={handleSubmit} className="w-full rounded-full">
              Login
            </Button>

            {loginType === "user" && (
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>
                  Don't have an account?{" "}
                  <Text style={styles.signupLink} onPress={navigateToSignup}>
                    Sign Up
                  </Text>
                </Text>
              </View>
            )}
          </View>

          {/* Demo Credentials */}
          <View style={styles.demoContainer}>
            <Text style={styles.demoText}>
              Demo: Use any email/password to login
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

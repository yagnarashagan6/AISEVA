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

interface SignupProps {
  onSignup: (email: string, password: string, name: string) => Promise<void>;
  onNavigateToLogin: () => void;
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
  inputContainer: {
    marginBottom: 16,
  },
  loginContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  loginText: {
    color: "#6B7280",
    fontSize: 14,
  },
  loginLink: {
    color: "#3B82F6",
    fontWeight: "500",
  },
});

export default function Signup({ onSignup, onNavigateToLogin }: SignupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    await onSignup(email, password, name);
  };

  const navigateToLogin = () => {
    onNavigateToLogin();
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

          {/* Signup Form */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Create Account</Text>

            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Label>Full Name</Label>
              <Input
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                className="rounded-xl"
              />
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
                placeholder="Create a password"
                secureTextEntry
                className="rounded-xl"
              />
            </View>

            {/* Signup Button */}
            <Button onPress={handleSubmit} className="w-full rounded-full">
              Sign Up
            </Button>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                Already have an account?{" "}
                <Text style={styles.loginLink} onPress={navigateToLogin}>
                  Login
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

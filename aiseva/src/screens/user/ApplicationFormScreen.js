import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mockSchemes, defaultUserProfile } from "../../lib/mockData";

export default function ApplicationFormScreen({ route, navigation }) {
  const { schemeId } = route.params;
  const scheme = mockSchemes.find((s) => s.id === schemeId);
  const [profile, setProfile] = useState(defaultUserProfile);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem("userProfile");
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  };

  const handleSubmit = () => {
    Alert.alert(
      "Submit Application",
      "Are you sure you want to submit this application?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Submit",
          onPress: () => setShowSuccess(true),
        },
      ]
    );
  };

  if (!scheme) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Scheme not found</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (showSuccess) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={64} color="#10B981" />
          </View>
          <Text style={styles.successTitle}>Application Submitted!</Text>
          <Text style={styles.successText}>
            Your application for {scheme.title} has been submitted successfully.
          </Text>
          <Text style={styles.successSubText}>
            You will receive updates on your registered email and mobile number.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("UserDashboard")}
          >
            <Text style={styles.buttonText}>Back to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Application Form</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoBannerTitle}>Applying for:</Text>
          <Text style={styles.infoBannerScheme}>{scheme.title}</Text>
        </View>

        {/* AI Pre-fill Info */}
        <View style={styles.aiBanner}>
          <Ionicons name="sparkles" size={20} color="#10B981" />
          <View style={{ flex: 1 }}>
            <Text style={styles.aiBannerTitle}>AI Pre-filled Information</Text>
            <Text style={styles.aiBannerText}>
              We've automatically filled in your details from your profile.
              Please review and update if needed.
            </Text>
          </View>
        </View>

        {/* Personal Details */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              value={profile.personalDetails.fullName}
              placeholder="Enter your full name"
              editable={false}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth *</Text>
            <TextInput
              style={styles.input}
              value={profile.personalDetails.dateOfBirth}
              placeholder="DD/MM/YYYY"
              editable={false}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Aadhaar Number *</Text>
            <TextInput
              style={styles.input}
              value={profile.personalDetails.aadhaar}
              placeholder="XXXX-XXXX-XXXX"
              editable={false}
            />
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number *</Text>
            <TextInput
              style={styles.input}
              value={profile.contactInfo.mobile}
              placeholder="+91 XXXXXXXXXX"
              editable={false}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={profile.contactInfo.email}
              placeholder="email@example.com"
              editable={false}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address *</Text>
            <TextInput
              style={styles.textArea}
              value={profile.contactInfo.address}
              placeholder="Enter your full address"
              multiline
              numberOfLines={3}
              editable={false}
            />
          </View>
        </View>

        {/* Bank Details */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Bank Details</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Account Number *</Text>
            <TextInput
              style={styles.input}
              value={profile.bankDetails.accountNumber}
              placeholder="Enter account number"
              editable={false}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>IFSC Code *</Text>
            <TextInput
              style={styles.input}
              value={profile.bankDetails.ifscCode}
              placeholder="Enter IFSC code"
              editable={false}
            />
          </View>
        </View>

        {/* Declaration */}
        <View style={styles.declarationSection}>
          <View style={styles.declarationHeader}>
            <Ionicons name="shield-checkmark" size={24} color="#3B82F6" />
            <Text style={styles.declarationTitle}>Declaration</Text>
          </View>
          <Text style={styles.declarationText}>
            I hereby declare that all the information provided above is true and
            correct to the best of my knowledge. I understand that any false
            information may lead to rejection of my application or legal action.
          </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky Submit Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Application</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  infoBanner: {
    margin: 16,
    padding: 16,
    backgroundColor: "#DBEAFE",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  infoBannerTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E3A8A",
    marginBottom: 4,
  },
  infoBannerScheme: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E40AF",
  },
  aiBanner: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F0FDF4",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#86EFAC",
    gap: 12,
  },
  aiBannerTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#065F46",
    marginBottom: 4,
  },
  aiBannerText: {
    fontSize: 14,
    color: "#047857",
  },
  formSection: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
    color: "#6B7280",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
    color: "#6B7280",
    minHeight: 80,
    textAlignVertical: "top",
  },
  declarationSection: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#FFF7ED",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  declarationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  declarationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#9A3412",
  },
  declarationText: {
    fontSize: 14,
    color: "#9A3412",
    lineHeight: 20,
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B82F6",
    borderRadius: 24,
    paddingVertical: 14,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  successContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  successIcon: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#10B981",
    marginBottom: 12,
    textAlign: "center",
  },
  successText: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
    marginBottom: 8,
  },
  successSubText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#3B82F6",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 16,
  },
});

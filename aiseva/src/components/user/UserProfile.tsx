import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  defaultUserProfile,
  UserProfile as UserProfileType,
} from "../../lib/mockData";
import { AntDesign } from "@expo/vector-icons";

interface UserProfileProps {
  onLogout: () => void;
  onNavigate?: (screen: string) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 40,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  main: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 20,
  },
  banner: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  bannerIcon: {
    marginTop: 2,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1D4ED8",
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 12,
    color: "#1D4ED8",
    lineHeight: 16,
  },
  successMessage: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  successText: {
    fontSize: 14,
    color: "#059669",
    fontWeight: "500",
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  fieldContainer: {
    gap: 4,
  },
  fieldRow: {
    flexDirection: "row",
    gap: 12,
  },
  fieldHalf: {
    flex: 1,
  },
  saveButton: {
    marginTop: 8,
  },
  sectionSelector: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  sectionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  sectionButtonActive: {
    backgroundColor: "#EFF6FF",
  },
  sectionButtonText: {
    fontSize: 14,
    color: "#6B7280",
  },
  sectionButtonTextActive: {
    color: "#3B82F6",
    fontWeight: "500",
  },
});

export default function UserProfile({
  onLogout,
  onNavigate,
}: UserProfileProps) {
  const [profile, setProfile] = useState<UserProfileType>(defaultUserProfile);
  const [activeSection, setActiveSection] = useState("personalDetails");
  const [saveMessage, setSaveMessage] = useState("");

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
      console.log("Error loading profile:", error);
    }
  };

  const handleSave = async (section: keyof UserProfileType) => {
    try {
      await AsyncStorage.setItem("userProfile", JSON.stringify(profile));
      setSaveMessage("Changes saved successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      console.log("Error saving profile:", error);
      Alert.alert("Error", "Failed to save profile changes");
    }
  };

  const updateField = (
    section: keyof UserProfileType,
    field: string,
    value: string
  ) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const sections = [
    { id: "personalDetails", title: "1. Personal Details", icon: "user" },
    { id: "contactInfo", title: "2. Contact Information", icon: "phone" },
    { id: "familyIncome", title: "3. Family & Income", icon: "team" },
    {
      id: "educationEmployment",
      title: "4. Education & Employment",
      icon: "book",
    },
    { id: "bankDetails", title: "5. Bank Details", icon: "bank" },
  ];

  const handleBack = () => {
    if (onNavigate) {
      onNavigate("UserDashboard");
    }
  };

  const renderPersonalDetails = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Personal Details</Text>

      <View style={styles.fieldContainer}>
        <Label>Full Name *</Label>
        <Input
          value={profile.personalDetails.fullName}
          onChangeText={(value) =>
            updateField("personalDetails", "fullName", value)
          }
          placeholder="Enter your full name"
          className="rounded-xl"
        />
      </View>

      <View style={styles.fieldRow}>
        <View style={[styles.fieldContainer, styles.fieldHalf]}>
          <Label>Date of Birth *</Label>
          <Input
            value={profile.personalDetails.dateOfBirth}
            onChangeText={(value) =>
              updateField("personalDetails", "dateOfBirth", value)
            }
            placeholder="DD/MM/YYYY"
            className="rounded-xl"
          />
        </View>
        <View style={[styles.fieldContainer, styles.fieldHalf]}>
          <Label>Gender *</Label>
          <Input
            value={profile.personalDetails.gender}
            onChangeText={(value) =>
              updateField("personalDetails", "gender", value)
            }
            placeholder="Male/Female/Other"
            className="rounded-xl"
          />
        </View>
      </View>

      <View style={styles.fieldRow}>
        <View style={[styles.fieldContainer, styles.fieldHalf]}>
          <Label>Caste</Label>
          <Input
            value={profile.personalDetails.caste}
            onChangeText={(value) =>
              updateField("personalDetails", "caste", value)
            }
            placeholder="General/SC/ST/OBC"
            className="rounded-xl"
          />
        </View>
        <View style={[styles.fieldContainer, styles.fieldHalf]}>
          <Label>Religion</Label>
          <Input
            value={profile.personalDetails.religion}
            onChangeText={(value) =>
              updateField("personalDetails", "religion", value)
            }
            placeholder="Enter religion"
            className="rounded-xl"
          />
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Label>Marital Status</Label>
        <Input
          value={profile.personalDetails.maritalStatus}
          onChangeText={(value) =>
            updateField("personalDetails", "maritalStatus", value)
          }
          placeholder="Single/Married/Divorced/Widowed"
          className="rounded-xl"
        />
      </View>

      <Button
        onPress={() => handleSave("personalDetails")}
        style={styles.saveButton}
        className="rounded-xl"
      >
        <Text style={{ color: "#FFFFFF" }}>Save Changes</Text>
      </Button>
    </View>
  );

  const renderContactInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Contact Information</Text>

      <View style={styles.fieldRow}>
        <View style={[styles.fieldContainer, styles.fieldHalf]}>
          <Label>Mobile Number *</Label>
          <Input
            value={profile.contactInfo.mobileNumber}
            onChangeText={(value) =>
              updateField("contactInfo", "mobileNumber", value)
            }
            placeholder="Enter mobile number"
            keyboardType="phone-pad"
            className="rounded-xl"
          />
        </View>
        <View style={[styles.fieldContainer, styles.fieldHalf]}>
          <Label>Email</Label>
          <Input
            value={profile.contactInfo.email}
            onChangeText={(value) => updateField("contactInfo", "email", value)}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="rounded-xl"
          />
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Label>Address *</Label>
        <Input
          value={profile.contactInfo.address}
          onChangeText={(value) => updateField("contactInfo", "address", value)}
          placeholder="Enter complete address"
          multiline
          numberOfLines={3}
          className="rounded-xl"
        />
      </View>

      <View style={styles.fieldRow}>
        <View style={[styles.fieldContainer, styles.fieldHalf]}>
          <Label>Pincode *</Label>
          <Input
            value={profile.contactInfo.pincode}
            onChangeText={(value) =>
              updateField("contactInfo", "pincode", value)
            }
            placeholder="Enter pincode"
            keyboardType="numeric"
            className="rounded-xl"
          />
        </View>
        <View style={[styles.fieldContainer, styles.fieldHalf]}>
          <Label>State *</Label>
          <Input
            value={profile.contactInfo.state}
            onChangeText={(value) => updateField("contactInfo", "state", value)}
            placeholder="Enter state"
            className="rounded-xl"
          />
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Label>District *</Label>
        <Input
          value={profile.contactInfo.district}
          onChangeText={(value) =>
            updateField("contactInfo", "district", value)
          }
          placeholder="Enter district"
          className="rounded-xl"
        />
      </View>

      <Button
        onPress={() => handleSave("contactInfo")}
        style={styles.saveButton}
        className="rounded-xl"
      >
        <Text style={{ color: "#FFFFFF" }}>Save Changes</Text>
      </Button>
    </View>
  );

  const renderCurrentSection = () => {
    switch (activeSection) {
      case "personalDetails":
        return renderPersonalDetails();
      case "contactInfo":
        return renderContactInfo();
      default:
        return renderPersonalDetails();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <AntDesign name="left" size={20} color="#6B7280" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>
          <Button onPress={onLogout} variant="outline" className="rounded-full">
            <AntDesign name="logout" size={16} color="#6B7280" />
            <Text style={{ marginLeft: 4, color: "#6B7280" }}>Logout</Text>
          </Button>
        </View>
      </View>

      <ScrollView
        style={styles.main}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Info Banner */}
        <View style={styles.banner}>
          <AntDesign
            name="safety"
            size={16}
            color="#1D4ED8"
            style={styles.bannerIcon}
          />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Your Data is Safe</Text>
            <Text style={styles.bannerText}>
              All information is stored securely and used only for scheme
              recommendations and applications.
            </Text>
          </View>
        </View>

        {/* Success Message */}
        {saveMessage && (
          <View style={styles.successMessage}>
            <Text style={styles.successText}>{saveMessage}</Text>
          </View>
        )}

        {/* Section Navigation */}
        <View style={styles.sectionSelector}>
          {sections.map((section) => (
            <TouchableOpacity
              key={section.id}
              style={[
                styles.sectionButton,
                activeSection === section.id && styles.sectionButtonActive,
              ]}
              onPress={() => setActiveSection(section.id)}
            >
              <Text
                style={[
                  styles.sectionButtonText,
                  activeSection === section.id &&
                    styles.sectionButtonTextActive,
                ]}
              >
                {section.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Current Section */}
        {renderCurrentSection()}
      </ScrollView>
    </SafeAreaView>
  );
}

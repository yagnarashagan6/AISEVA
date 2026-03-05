import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultUserProfile } from "../../lib/mockData";

export default function UserProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(defaultUserProfile);
  const [activeSection, setActiveSection] = useState("personalDetails");

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

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem("userProfile", JSON.stringify(profile));
      Alert.alert("Success", "Profile saved successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to save profile");
    }
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("isAuthenticated");
            await AsyncStorage.removeItem("userType");
            await AsyncStorage.removeItem("currentUser");
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          } catch (error) {
            console.error("Logout failed:", error);
            Alert.alert("Error", "Failed to logout. Please try again.");
          }
        },
      },
    ]);
  };

  const updateField = (section, field, value) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const sections = [
    { id: "personalDetails", title: "Personal Details", icon: "person" },
    { id: "contactInfo", title: "Contact Information", icon: "call" },
    { id: "familyIncome", title: "Family & Income", icon: "people" },
    {
      id: "educationEmployment",
      title: "Education & Employment",
      icon: "school",
    },
    { id: "bankDetails", title: "Bank Details", icon: "card" },
  ];

  const renderPersonalDetails = () => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>Personal Details</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          value={profile.personalDetails.fullName}
          onChangeText={(val) =>
            updateField("personalDetails", "fullName", val)
          }
          placeholder="Enter your full name"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date of Birth *</Text>
        <TextInput
          style={styles.input}
          value={profile.personalDetails.dateOfBirth}
          onChangeText={(val) =>
            updateField("personalDetails", "dateOfBirth", val)
          }
          placeholder="DD/MM/YYYY"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender *</Text>
        <TextInput
          style={styles.input}
          value={profile.personalDetails.gender}
          onChangeText={(val) => updateField("personalDetails", "gender", val)}
          placeholder="Male/Female/Other"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category *</Text>
        <TextInput
          style={styles.input}
          value={profile.personalDetails.category}
          onChangeText={(val) =>
            updateField("personalDetails", "category", val)
          }
          placeholder="General/SC/ST/OBC"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Aadhaar Number *</Text>
        <TextInput
          style={styles.input}
          value={profile.personalDetails.aadhaar}
          onChangeText={(val) => updateField("personalDetails", "aadhaar", val)}
          placeholder="XXXX-XXXX-XXXX"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>PAN Number</Text>
        <TextInput
          style={styles.input}
          value={profile.personalDetails.pan}
          onChangeText={(val) => updateField("personalDetails", "pan", val)}
          placeholder="ABCDE1234F"
          autoCapitalize="characters"
        />
      </View>
    </View>
  );

  const renderContactInfo = () => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>Contact Information</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mobile Number *</Text>
        <TextInput
          style={styles.input}
          value={profile.contactInfo.mobile}
          onChangeText={(val) => updateField("contactInfo", "mobile", val)}
          placeholder="+91 XXXXXXXXXX"
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          value={profile.contactInfo.email}
          onChangeText={(val) => updateField("contactInfo", "email", val)}
          placeholder="email@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          style={styles.textArea}
          value={profile.contactInfo.address}
          onChangeText={(val) => updateField("contactInfo", "address", val)}
          placeholder="Enter your full address"
          multiline
          numberOfLines={3}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>City *</Text>
        <TextInput
          style={styles.input}
          value={profile.contactInfo.city}
          onChangeText={(val) => updateField("contactInfo", "city", val)}
          placeholder="Enter city"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>State *</Text>
        <TextInput
          style={styles.input}
          value={profile.contactInfo.state}
          onChangeText={(val) => updateField("contactInfo", "state", val)}
          placeholder="Enter state"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Pincode *</Text>
        <TextInput
          style={styles.input}
          value={profile.contactInfo.pincode}
          onChangeText={(val) => updateField("contactInfo", "pincode", val)}
          placeholder="Enter pincode"
          keyboardType="numeric"
        />
      </View>
    </View>
  );

  const renderFamilyIncome = () => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>Family & Income</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Father's Name *</Text>
        <TextInput
          style={styles.input}
          value={profile.familyIncome.fatherName}
          onChangeText={(val) => updateField("familyIncome", "fatherName", val)}
          placeholder="Enter father's name"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mother's Name *</Text>
        <TextInput
          style={styles.input}
          value={profile.familyIncome.motherName}
          onChangeText={(val) => updateField("familyIncome", "motherName", val)}
          placeholder="Enter mother's name"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Annual Family Income *</Text>
        <TextInput
          style={styles.input}
          value={profile.familyIncome.annualIncome}
          onChangeText={(val) =>
            updateField("familyIncome", "annualIncome", val)
          }
          placeholder="Enter annual income"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Family Size *</Text>
        <TextInput
          style={styles.input}
          value={profile.familyIncome.familySize}
          onChangeText={(val) => updateField("familyIncome", "familySize", val)}
          placeholder="Number of family members"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Ration Card Type</Text>
        <TextInput
          style={styles.input}
          value={profile.familyIncome.rationCardType}
          onChangeText={(val) =>
            updateField("familyIncome", "rationCardType", val)
          }
          placeholder="APL/BPL/AAY"
        />
      </View>
    </View>
  );

  const renderEducationEmployment = () => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>Education & Employment</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Educational Qualification *</Text>
        <TextInput
          style={styles.input}
          value={profile.educationEmployment.education}
          onChangeText={(val) =>
            updateField("educationEmployment", "education", val)
          }
          placeholder="e.g., 10th, 12th, Graduate"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Occupation</Text>
        <TextInput
          style={styles.input}
          value={profile.educationEmployment.occupation}
          onChangeText={(val) =>
            updateField("educationEmployment", "occupation", val)
          }
          placeholder="Enter your occupation"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Employment Status</Text>
        <TextInput
          style={styles.input}
          value={profile.educationEmployment.employmentStatus}
          onChangeText={(val) =>
            updateField("educationEmployment", "employmentStatus", val)
          }
          placeholder="Employed/Unemployed/Self-employed"
        />
      </View>
    </View>
  );

  const renderBankDetails = () => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>Bank Details</Text>
      <View style={styles.infoBanner}>
        <Ionicons name="shield-checkmark" size={20} color="#3B82F6" />
        <Text style={styles.infoBannerText}>
          Your bank details are encrypted and secure
        </Text>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Account Number *</Text>
        <TextInput
          style={styles.input}
          value={profile.bankDetails.accountNumber}
          onChangeText={(val) =>
            updateField("bankDetails", "accountNumber", val)
          }
          placeholder="Enter account number"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>IFSC Code *</Text>
        <TextInput
          style={styles.input}
          value={profile.bankDetails.ifscCode}
          onChangeText={(val) => updateField("bankDetails", "ifscCode", val)}
          placeholder="Enter IFSC code"
          autoCapitalize="characters"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Bank Name *</Text>
        <TextInput
          style={styles.input}
          value={profile.bankDetails.bankName}
          onChangeText={(val) => updateField("bankDetails", "bankName", val)}
          placeholder="Enter bank name"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Branch Name</Text>
        <TextInput
          style={styles.input}
          value={profile.bankDetails.branchName}
          onChangeText={(val) => updateField("bankDetails", "branchName", val)}
          placeholder="Enter branch name"
        />
      </View>
    </View>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "personalDetails":
        return renderPersonalDetails();
      case "contactInfo":
        return renderContactInfo();
      case "familyIncome":
        return renderFamilyIncome();
      case "educationEmployment":
        return renderEducationEmployment();
      case "bankDetails":
        return renderBankDetails();
      default:
        return renderPersonalDetails();
    }
  };

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
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Info Banner */}
      <View style={styles.topBanner}>
        <Ionicons name="shield-checkmark" size={20} color="#3B82F6" />
        <Text style={styles.topBannerText}>
          Complete your profile for AI-powered scheme recommendations
        </Text>
      </View>

      {/* Section Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
      >
        {sections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={[
              styles.tab,
              activeSection === section.id && styles.tabActive,
            ]}
            onPress={() => setActiveSection(section.id)}
          >
            <Ionicons
              name={section.icon}
              size={18}
              color={activeSection === section.id ? "#3B82F6" : "#6B7280"}
            />
            <Text
              style={[
                styles.tabText,
                activeSection === section.id && styles.tabTextActive,
              ]}
            >
              {section.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderSection()}
      </ScrollView>

      {/* Save Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Ionicons name="save" size={20} color="#fff" />
          <Text style={styles.saveButtonText}>Save Changes</Text>
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
  topBanner: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 12,
    backgroundColor: "#DBEAFE",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    gap: 8,
  },
  topBannerText: {
    flex: 1,
    fontSize: 14,
    color: "#1E3A8A",
  },
  tabsContainer: {
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 6,
  },
  tabActive: {
    backgroundColor: "#EFF6FF",
    borderColor: "#3B82F6",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  tabTextActive: {
    color: "#3B82F6",
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  formSection: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  sectionTitle: {
    fontSize: 20,
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
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
    minHeight: 80,
    textAlignVertical: "top",
  },
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#DBEAFE",
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  infoBannerText: {
    flex: 1,
    fontSize: 13,
    color: "#1E3A8A",
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B82F6",
    borderRadius: 24,
    paddingVertical: 14,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

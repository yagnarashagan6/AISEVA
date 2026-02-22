import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import {
  Scheme,
  UserProfile as UserProfileType,
  defaultUserProfile,
} from "../../lib/mockData";
import { AntDesign } from "@expo/vector-icons";

interface ApplicationFormProps {
  scheme: Scheme;
  onBack?: () => void;
  onSubmit?: (applicationId: string) => void;
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
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    marginTop: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3B82F6",
    borderRadius: 2,
  },
  main: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
    gap: 16,
  },
  schemeInfo: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 8,
  },
  schemeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  schemeMeta: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  stepContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 16,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  stepTitle: {
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
  requiredLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  requiredStar: {
    color: "#EF4444",
    marginLeft: 2,
  },
  documentUpload: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
  uploadText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  uploadButton: {
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  uploadButtonText: {
    fontSize: 12,
    color: "#4B5563",
  },
  reviewSection: {
    gap: 12,
  },
  reviewItem: {
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 12,
    gap: 4,
  },
  reviewLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  reviewValue: {
    fontSize: 14,
    color: "#111827",
  },
  declaration: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  declarationTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1D4ED8",
  },
  declarationText: {
    fontSize: 12,
    color: "#1D4ED8",
    lineHeight: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  checkboxText: {
    fontSize: 13,
    color: "#374151",
    flex: 1,
  },
  navigationButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    padding: 16,
    flexDirection: "row",
    gap: 12,
  },
  navButton: {
    flex: 1,
    borderRadius: 12,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  successContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 24,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  successMessage: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
  applicationId: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B82F6",
    textAlign: "center",
  },
});

export default function ApplicationForm({
  scheme,
  onBack,
  onSubmit,
}: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<UserProfileType>(defaultUserProfile);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  const totalSteps = 4;

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

  const updateProfile = (
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

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!isAgreed) {
      Alert.alert(
        "Declaration Required",
        "Please agree to the declaration before submitting."
      );
      return;
    }

    try {
      // Generate application ID
      const appId = `APP${Date.now()}`;
      setApplicationId(appId);

      // Save application data (mock)
      const applicationData = {
        id: appId,
        schemeId: scheme.id,
        schemeName: scheme.title,
        profile,
        additionalInfo,
        submissionDate: new Date().toISOString(),
        status: "submitted",
      };

      await AsyncStorage.setItem(
        `application_${appId}`,
        JSON.stringify(applicationData)
      );

      setIsSubmitted(true);

      if (onSubmit) {
        onSubmit(appId);
      }
    } catch (error) {
      console.log("Error submitting application:", error);
      Alert.alert("Error", "Failed to submit application. Please try again.");
    }
  };

  const renderPersonalDetails = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>1</Text>
        </View>
        <Text style={styles.stepTitle}>Personal Details</Text>
      </View>

      <View style={styles.fieldContainer}>
        <View style={styles.requiredLabel}>
          <Label>Full Name</Label>
          <Text style={styles.requiredStar}>*</Text>
        </View>
        <Input
          value={profile.personalDetails.fullName}
          onChangeText={(value) =>
            updateProfile("personalDetails", "fullName", value)
          }
          placeholder="Enter your full name"
          className="rounded-xl"
        />
      </View>

      <View style={styles.fieldRow}>
        <View style={[styles.fieldContainer, styles.fieldHalf]}>
          <View style={styles.requiredLabel}>
            <Label>Date of Birth</Label>
            <Text style={styles.requiredStar}>*</Text>
          </View>
          <Input
            value={profile.personalDetails.dateOfBirth}
            onChangeText={(value) =>
              updateProfile("personalDetails", "dateOfBirth", value)
            }
            placeholder="DD/MM/YYYY"
            className="rounded-xl"
          />
        </View>
        <View style={[styles.fieldContainer, styles.fieldHalf]}>
          <View style={styles.requiredLabel}>
            <Label>Gender</Label>
            <Text style={styles.requiredStar}>*</Text>
          </View>
          <Input
            value={profile.personalDetails.gender}
            onChangeText={(value) =>
              updateProfile("personalDetails", "gender", value)
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
              updateProfile("personalDetails", "caste", value)
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
              updateProfile("personalDetails", "religion", value)
            }
            placeholder="Enter religion"
            className="rounded-xl"
          />
        </View>
      </View>
    </View>
  );

  const renderContactInfo = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>2</Text>
        </View>
        <Text style={styles.stepTitle}>Contact Information</Text>
      </View>

      <View style={styles.fieldRow}>
        <View style={[styles.fieldContainer, styles.fieldHalf]}>
          <View style={styles.requiredLabel}>
            <Label>Mobile Number</Label>
            <Text style={styles.requiredStar}>*</Text>
          </View>
          <Input
            value={profile.contactInfo.mobileNumber}
            onChangeText={(value) =>
              updateProfile("contactInfo", "mobileNumber", value)
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
            onChangeText={(value) =>
              updateProfile("contactInfo", "email", value)
            }
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="rounded-xl"
          />
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <View style={styles.requiredLabel}>
          <Label>Address</Label>
          <Text style={styles.requiredStar}>*</Text>
        </View>
        <Input
          value={profile.contactInfo.address}
          onChangeText={(value) =>
            updateProfile("contactInfo", "address", value)
          }
          placeholder="Enter complete address"
          multiline
          numberOfLines={3}
          className="rounded-xl"
        />
      </View>

      <View style={styles.fieldRow}>
        <View style={[styles.fieldContainer, styles.fieldHalf]}>
          <View style={styles.requiredLabel}>
            <Label>Pincode</Label>
            <Text style={styles.requiredStar}>*</Text>
          </View>
          <Input
            value={profile.contactInfo.pincode}
            onChangeText={(value) =>
              updateProfile("contactInfo", "pincode", value)
            }
            placeholder="Enter pincode"
            keyboardType="numeric"
            className="rounded-xl"
          />
        </View>
        <View style={[styles.fieldContainer, styles.fieldHalf]}>
          <View style={styles.requiredLabel}>
            <Label>State</Label>
            <Text style={styles.requiredStar}>*</Text>
          </View>
          <Input
            value={profile.contactInfo.state}
            onChangeText={(value) =>
              updateProfile("contactInfo", "state", value)
            }
            placeholder="Enter state"
            className="rounded-xl"
          />
        </View>
      </View>
    </View>
  );

  const renderDocuments = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>3</Text>
        </View>
        <Text style={styles.stepTitle}>Document Upload</Text>
      </View>

      {scheme.requiredDocuments.map((document, index) => (
        <View key={index} style={styles.fieldContainer}>
          <Label>{document}</Label>
          <View style={styles.documentUpload}>
            <AntDesign name="cloud-upload" size={24} color="#9CA3AF" />
            <Text style={styles.uploadText}>
              Upload {document}
              {"\n"}
              Supported formats: PDF, JPG, PNG
            </Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Choose File</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={styles.fieldContainer}>
        <Label>Additional Information (Optional)</Label>
        <Textarea
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
          placeholder="Provide any additional information relevant to your application..."
          numberOfLines={4}
          className="rounded-xl"
        />
      </View>
    </View>
  );

  const renderReview = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>4</Text>
        </View>
        <Text style={styles.stepTitle}>Review & Submit</Text>
      </View>

      <View style={styles.reviewSection}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#111827",
            marginBottom: 8,
          }}
        >
          Personal Details
        </Text>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Full Name</Text>
          <Text style={styles.reviewValue}>
            {profile.personalDetails.fullName}
          </Text>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Date of Birth</Text>
          <Text style={styles.reviewValue}>
            {profile.personalDetails.dateOfBirth}
          </Text>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Mobile Number</Text>
          <Text style={styles.reviewValue}>
            {profile.contactInfo.mobileNumber}
          </Text>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Address</Text>
          <Text style={styles.reviewValue}>{profile.contactInfo.address}</Text>
        </View>
      </View>

      <View style={styles.declaration}>
        <Text style={styles.declarationTitle}>Declaration</Text>
        <Text style={styles.declarationText}>
          I hereby declare that all the information provided is true and correct
          to the best of my knowledge. I understand that any false information
          may result in the rejection of my application and may also result in
          legal action against me.
        </Text>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setIsAgreed(!isAgreed)}
        >
          <View style={[styles.checkbox, isAgreed && styles.checkboxChecked]}>
            {isAgreed && <AntDesign name="check" size={12} color="#FFFFFF" />}
          </View>
          <Text style={styles.checkboxText}>
            I agree to the above declaration and terms & conditions
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSuccessScreen = () => (
    <View style={styles.successContainer}>
      <View style={styles.successIcon}>
        <AntDesign name="check-circle" size={40} color="#16A34A" />
      </View>

      <Text style={styles.successTitle}>
        Application Submitted Successfully!
      </Text>

      <Text style={styles.successMessage}>
        Your application for {scheme.title} has been submitted successfully. You
        will receive updates on your application status via SMS and email.
      </Text>

      <Text style={styles.applicationId}>Application ID: {applicationId}</Text>

      <Button onPress={onBack} style={styles.navButton}>
        <Text style={[styles.navButtonText, { color: "#FFFFFF" }]}>
          Back to Dashboard
        </Text>
      </Button>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalDetails();
      case 2:
        return renderContactInfo();
      case 3:
        return renderDocuments();
      case 4:
        return renderReview();
      default:
        return renderPersonalDetails();
    }
  };

  if (isSubmitted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Application Submitted</Text>
          </View>
        </View>
        {renderSuccessScreen()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <AntDesign name="left" size={20} color="#6B7280" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              Apply for Scheme - Step {currentStep} of {totalSteps}
            </Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(currentStep / totalSteps) * 100}%` },
              ]}
            />
          </View>
        </View>

        <ScrollView
          style={styles.main}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Scheme Info */}
          <View style={styles.schemeInfo}>
            <Text style={styles.schemeTitle}>{scheme.title}</Text>
            <View style={styles.schemeMeta}>
              <Badge variant="secondary">{scheme.category}</Badge>
              <Badge variant="outline">{scheme.location}</Badge>
            </View>
          </View>

          {/* Current Step Content */}
          {renderCurrentStep()}
        </ScrollView>

        {/* Navigation Buttons */}
        <View style={styles.navigationButtons}>
          {currentStep > 1 && (
            <Button
              variant="outline"
              onPress={handlePrevious}
              style={styles.navButton}
            >
              <Text style={[styles.navButtonText, { color: "#6B7280" }]}>
                Previous
              </Text>
            </Button>
          )}

          {currentStep < totalSteps ? (
            <Button onPress={handleNext} style={styles.navButton}>
              <Text style={[styles.navButtonText, { color: "#FFFFFF" }]}>
                Next
              </Text>
            </Button>
          ) : (
            <Button
              onPress={handleSubmit}
              disabled={!isAgreed}
              style={styles.navButton}
            >
              <Text
                style={[
                  styles.navButtonText,
                  { color: isAgreed ? "#FFFFFF" : "#9CA3AF" },
                ]}
              >
                Submit Application
              </Text>
            </Button>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

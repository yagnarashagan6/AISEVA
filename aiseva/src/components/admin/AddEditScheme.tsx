import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { mockSchemes } from "../../lib/mockData";
import { AntDesign } from "@expo/vector-icons";

interface AddEditSchemeProps {
  scheme?: any;
  onBack: () => void;
  onSave: () => void;
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
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  main: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 20,
  },
  aiSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 16,
  },
  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B82F6",
  },
  aiDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  urlContainer: {
    gap: 8,
  },
  urlInputContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-end",
  },
  urlInput: {
    flex: 1,
  },
  fetchButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  formSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 16,
  },
  formTitle: {
    fontSize: 18,
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
  submitButton: {
    marginTop: 24,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: "#6B7280",
  },
});

export default function AddEditScheme({
  scheme,
  onBack,
  onSave,
}: AddEditSchemeProps) {
  const isEditMode = !!scheme;
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    ageMin: "",
    ageMax: "",
    benefits: "",
    description: "",
    instructions: "",
    deadline: "",
  });

  useEffect(() => {
    if (isEditMode && scheme) {
      setFormData({
        title: scheme.title,
        category: scheme.category,
        location: scheme.location,
        ageMin: scheme.ageMin.toString(),
        ageMax: scheme.ageMax.toString(),
        benefits: scheme.benefits,
        description: scheme.fullDescription,
        instructions: scheme.instructions.join("\\n"),
        deadline: scheme.deadline || "",
      });
    }
  }, [scheme, isEditMode]);

  const handleFetchDetails = () => {
    if (!url.trim()) {
      Alert.alert("Error", "Please enter a valid URL");
      return;
    }

    setIsLoading(true);

    // Simulate AI fetching data from URL
    setTimeout(() => {
      setFormData({
        title: "PM Digital India Scheme",
        category: "Technology",
        location: "All India",
        ageMin: "18",
        ageMax: "60",
        benefits: "Free digital literacy training and certification",
        description:
          "The PM Digital India Scheme aims to provide digital literacy and skills training to citizens across India, enabling them to participate in the digital economy.",
        instructions:
          "Visit the official portal\\nRegister with valid ID\\nComplete the training modules\\nAppear for certification exam",
        deadline: "2025-12-31",
      });
      setIsLoading(false);
      Alert.alert("Success", "Scheme details fetched successfully!");
    }, 2000);
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.title || !formData.category || !formData.location) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    Alert.alert(
      "Success",
      `Scheme ${isEditMode ? "updated" : "created"} successfully!`,
      [
        {
          text: "OK",
          onPress: onSave,
        },
      ]
    );
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBack = () => {
    onBack();
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
            <Text style={styles.headerTitle}>
              {isEditMode ? "Edit Scheme" : "Add New Scheme"}
            </Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.main}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* AI Scraper Section - Only for new schemes */}
          {!isEditMode && (
            <View style={styles.aiSection}>
              <View style={styles.aiHeader}>
                <AntDesign name="robot" size={20} color="#3B82F6" />
                <Text style={styles.aiTitle}>AI-Powered Scheme Scraper</Text>
              </View>
              <Text style={styles.aiDescription}>
                Enter a government scheme URL and our AI will automatically
                extract all the relevant information including title, benefits,
                eligibility criteria, and application process.
              </Text>

              <View style={styles.urlContainer}>
                <Label>Scheme URL</Label>
                <View style={styles.urlInputContainer}>
                  <View style={styles.urlInput}>
                    <Input
                      value={url}
                      onChangeText={setUrl}
                      placeholder="https://example.gov.in/scheme"
                      keyboardType="default"
                      autoCapitalize="none"
                      className="rounded-xl"
                    />
                  </View>
                  <Button
                    onPress={handleFetchDetails}
                    disabled={isLoading}
                    style={styles.fetchButton}
                    className="rounded-xl"
                  >
                    {isLoading ? (
                      <Text>Fetching...</Text>
                    ) : (
                      <>
                        <AntDesign name="download" size={16} color="#FFFFFF" />
                        <Text style={{ marginLeft: 4, color: "#FFFFFF" }}>
                          Fetch
                        </Text>
                      </>
                    )}
                  </Button>
                </View>
              </View>

              {isLoading && (
                <View style={styles.loadingContainer}>
                  <AntDesign name="loading" size={20} color="#3B82F6" />
                  <Text style={styles.loadingText}>
                    AI is analyzing the webpage and extracting scheme details...
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Scheme Form */}
          <View style={styles.formSection}>
            <Text style={styles.formTitle}>Scheme Details</Text>

            <View style={styles.fieldContainer}>
              <Label>Scheme Title *</Label>
              <Input
                value={formData.title}
                onChangeText={(value) => updateField("title", value)}
                placeholder="Enter scheme title"
                className="rounded-xl"
              />
            </View>

            <View style={styles.fieldRow}>
              <View style={[styles.fieldContainer, styles.fieldHalf]}>
                <Label>Category *</Label>
                <Input
                  value={formData.category}
                  onChangeText={(value) => updateField("category", value)}
                  placeholder="e.g., Agriculture"
                  className="rounded-xl"
                />
              </View>
              <View style={[styles.fieldContainer, styles.fieldHalf]}>
                <Label>Location *</Label>
                <Input
                  value={formData.location}
                  onChangeText={(value) => updateField("location", value)}
                  placeholder="e.g., All India"
                  className="rounded-xl"
                />
              </View>
            </View>

            <View style={styles.fieldRow}>
              <View style={[styles.fieldContainer, styles.fieldHalf]}>
                <Label>Min Age</Label>
                <Input
                  value={formData.ageMin}
                  onChangeText={(value) => updateField("ageMin", value)}
                  placeholder="18"
                  keyboardType="numeric"
                  className="rounded-xl"
                />
              </View>
              <View style={[styles.fieldContainer, styles.fieldHalf]}>
                <Label>Max Age</Label>
                <Input
                  value={formData.ageMax}
                  onChangeText={(value) => updateField("ageMax", value)}
                  placeholder="60"
                  keyboardType="numeric"
                  className="rounded-xl"
                />
              </View>
            </View>

            <View style={styles.fieldContainer}>
              <Label>Benefits</Label>
              <Textarea
                value={formData.benefits}
                onChangeText={(value) => updateField("benefits", value)}
                placeholder="Describe the benefits offered by this scheme"
                numberOfLines={3}
                className="rounded-xl"
              />
            </View>

            <View style={styles.fieldContainer}>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChangeText={(value) => updateField("description", value)}
                placeholder="Provide a detailed description of the scheme"
                numberOfLines={4}
                className="rounded-xl"
              />
            </View>

            <View style={styles.fieldContainer}>
              <Label>Application Instructions</Label>
              <Textarea
                value={formData.instructions}
                onChangeText={(value) => updateField("instructions", value)}
                placeholder="Step-by-step application instructions (one per line)"
                numberOfLines={4}
                className="rounded-xl"
              />
            </View>

            <View style={styles.fieldContainer}>
              <Label>Application Deadline</Label>
              <Input
                value={formData.deadline}
                onChangeText={(value) => updateField("deadline", value)}
                placeholder="YYYY-MM-DD (optional)"
                className="rounded-xl"
              />
            </View>

            <Button
              onPress={handleSubmit}
              style={styles.submitButton}
              className="w-full rounded-xl"
            >
              <Text style={{ color: "#FFFFFF" }}>
                {isEditMode ? "Update Scheme" : "Create Scheme"}
              </Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

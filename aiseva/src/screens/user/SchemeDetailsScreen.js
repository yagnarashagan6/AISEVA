import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mockSchemes } from "../../lib/mockData";

export default function SchemeDetailsScreen({ route, navigation }) {
  const { schemeId } = route.params;
  const scheme = mockSchemes.find((s) => s.id === schemeId);

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
        <Text style={styles.headerTitle}>Scheme Details</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate("UserProfile")}
          >
            <Ionicons name="person-outline" size={24} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title and Category */}
        <View style={styles.section}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{scheme.category}</Text>
          </View>
          <Text style={styles.title}>{scheme.title}</Text>
          <Text style={styles.description}>{scheme.description}</Text>
        </View>

        {/* AI Eligibility Check */}
        <View
          style={[
            styles.eligibilityContainer,
            scheme.isEligible
              ? styles.eligibilitySuccess
              : styles.eligibilityError,
          ]}
        >
          <View style={styles.eligibilityHeader}>
            <Ionicons
              name={scheme.isEligible ? "checkmark-circle" : "close-circle"}
              size={32}
              color={scheme.isEligible ? "#10B981" : "#EF4444"}
            />
            <View style={styles.eligibilityTextContainer}>
              <Text style={styles.eligibilityTitle}>
                {scheme.isEligible
                  ? "✅ You are eligible for this scheme!"
                  : "❌ You are not eligible for this scheme"}
              </Text>
              <Text style={styles.eligibilitySubtitle}>
                {scheme.isEligible
                  ? "Based on your profile, you meet all the requirements."
                  : scheme.ineligibilityReason ||
                    "Some eligibility criteria are not met."}
              </Text>
            </View>
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="gift-outline" size={24} color="#3B82F6" />
            <Text style={styles.cardTitle}>Benefits</Text>
          </View>
          <Text style={styles.cardText}>{scheme.benefits}</Text>
        </View>

        {/* Full Description */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="document-text-outline" size={24} color="#3B82F6" />
            <Text style={styles.cardTitle}>About the Scheme</Text>
          </View>
          <Text style={styles.cardText}>{scheme.fullDescription}</Text>
        </View>

        {/* Eligibility Criteria */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="checkmark-done-outline" size={24} color="#3B82F6" />
            <Text style={styles.cardTitle}>Eligibility Criteria</Text>
          </View>
          {scheme.eligibilityCriteria.map((criterion, index) => (
            <View key={index} style={styles.listItem}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.listItemText}>{criterion}</Text>
            </View>
          ))}
        </View>

        {/* Required Documents */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="folder-outline" size={24} color="#3B82F6" />
            <Text style={styles.cardTitle}>Required Documents</Text>
          </View>
          {scheme.requiredDocuments.map((doc, index) => (
            <View key={index} style={styles.listItem}>
              <Ionicons name="document-outline" size={20} color="#6B7280" />
              <Text style={styles.listItemText}>{doc}</Text>
            </View>
          ))}
        </View>

        {/* Application Instructions */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="list-outline" size={24} color="#3B82F6" />
            <Text style={styles.cardTitle}>How to Apply</Text>
          </View>
          {scheme.instructions.map((instruction, index) => (
            <View key={index} style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{instruction}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky Apply Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.applyButton,
            !scheme.isEligible && styles.applyButtonDisabled,
          ]}
          onPress={() => {
            if (scheme.isEligible) {
              navigation.navigate("ApplicationForm", { schemeId: scheme.id });
            } else {
              Alert.alert(
                "Not Eligible",
                "You do not meet the eligibility criteria for this scheme.",
                [{ text: "OK" }]
              );
            }
          }}
          disabled={!scheme.isEligible}
        >
          <Text style={styles.applyButtonText}>
            {scheme.isEligible ? "Apply Now" : "Not Eligible"}
          </Text>
          {scheme.isEligible && (
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          )}
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
  headerActions: {
    flexDirection: "row",
    gap: 8,
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
  section: {
    padding: 16,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#6B7280",
  },
  eligibilityContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
  },
  eligibilitySuccess: {
    backgroundColor: "#F0FDF4",
    borderColor: "#86EFAC",
  },
  eligibilityError: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FCA5A5",
  },
  eligibilityHeader: {
    flexDirection: "row",
    gap: 12,
  },
  eligibilityTextContainer: {
    flex: 1,
  },
  eligibilityTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  eligibilitySubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  cardText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 8,
  },
  listItemText: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
    paddingTop: 4,
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  applyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B82F6",
    borderRadius: 24,
    paddingVertical: 14,
    gap: 8,
  },
  applyButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  applyButtonText: {
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
});

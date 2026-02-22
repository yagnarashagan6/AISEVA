import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Scheme } from "../../lib/mockData";
import { AntDesign } from "@expo/vector-icons";

interface SchemeDetailsProps {
  scheme: Scheme;
  onBack?: () => void;
  onApply?: (schemeId: string) => void;
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
  shareButton: {
    padding: 8,
  },
  main: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroSection: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  schemeTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  schemeMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  benefitsContainer: {
    backgroundColor: "#F0F9FF",
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  benefitsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1D4ED8",
    marginBottom: 8,
  },
  benefitsText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D4ED8",
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginVertical: 8,
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionContent: {
    gap: 8,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    paddingVertical: 4,
  },
  listBullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#6B7280",
    marginTop: 6,
    flexShrink: 0,
  },
  listText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
    flex: 1,
  },
  descriptionText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 22,
  },
  eligibilityBadge: {
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  deadlineContainer: {
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#FCD34D",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  deadlineText: {
    fontSize: 14,
    color: "#92400E",
    flex: 1,
  },
  infoBox: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1D4ED8",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: "#1D4ED8",
    lineHeight: 16,
  },
  floatingActionContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    padding: 16,
  },
  applyButton: {
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButtonText: {
    color: "#9CA3AF",
  },
});

export default function SchemeDetails({
  scheme,
  onBack,
  onApply,
}: SchemeDetailsProps) {
  const [showAllDocuments, setShowAllDocuments] = useState(false);

  const handleApply = () => {
    if (onApply) {
      onApply(scheme.id);
    } else {
      Alert.alert(
        "Apply for Scheme",
        `You are about to apply for ${scheme.title}. This will redirect you to the application form.`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Continue",
            onPress: () => console.log("Navigate to application form"),
          },
        ]
      );
    }
  };

  const handleShare = () => {
    Alert.alert("Share Scheme", "Share this scheme information with others", [
      { text: "Cancel", style: "cancel" },
      { text: "Share", onPress: () => console.log("Share scheme") },
    ]);
  };

  const renderListItem = (item: string, index: number) => (
    <View key={index} style={styles.listItem}>
      <View style={styles.listBullet} />
      <Text style={styles.listText}>{item}</Text>
    </View>
  );

  const documentsToShow = showAllDocuments
    ? scheme.requiredDocuments
    : scheme.requiredDocuments.slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <AntDesign name="left" size={20} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {scheme.title}
          </Text>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <AntDesign name="share-alt" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.main}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.schemeTitle}>{scheme.title}</Text>

          <View style={styles.schemeMeta}>
            <Badge variant="secondary">{scheme.category}</Badge>
            <Badge variant="outline">{scheme.location}</Badge>
            <Badge variant="outline">
              Age: {scheme.ageMin}-{scheme.ageMax}
            </Badge>
          </View>

          {scheme.isEligible !== undefined && (
            <Badge
              variant={scheme.isEligible ? "default" : "destructive"}
              style={styles.eligibilityBadge}
            >
              {scheme.isEligible ? "✓ Eligible" : "✗ Not Eligible"}
            </Badge>
          )}

          {scheme.deadline && (
            <View style={styles.deadlineContainer}>
              <AntDesign name="clock-circle" size={16} color="#92400E" />
              <Text style={styles.deadlineText}>
                Application deadline: {scheme.deadline}
              </Text>
            </View>
          )}

          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>Benefits</Text>
            <Text style={styles.benefitsText}>{scheme.benefits}</Text>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <AntDesign name="file-text" size={16} color="#6B7280" />
            <Text style={styles.sectionTitle}>Description</Text>
          </View>
          <Text style={styles.descriptionText}>{scheme.fullDescription}</Text>
        </View>

        {/* Eligibility Criteria Section */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <AntDesign name="check-circle" size={16} color="#6B7280" />
            <Text style={styles.sectionTitle}>Eligibility Criteria</Text>
          </View>
          <View style={styles.sectionContent}>
            {scheme.eligibilityCriteria.map((criteria, index) =>
              renderListItem(criteria, index)
            )}
          </View>
        </View>

        {/* Required Documents Section */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <AntDesign name="folder" size={16} color="#6B7280" />
            <Text style={styles.sectionTitle}>Required Documents</Text>
          </View>
          <View style={styles.sectionContent}>
            {documentsToShow.map((document, index) =>
              renderListItem(document, index)
            )}

            {scheme.requiredDocuments.length > 3 && (
              <TouchableOpacity
                onPress={() => setShowAllDocuments(!showAllDocuments)}
                style={{ marginTop: 8 }}
              >
                <Text
                  style={{ color: "#3B82F6", fontSize: 14, fontWeight: "500" }}
                >
                  {showAllDocuments
                    ? "Show less"
                    : `+${scheme.requiredDocuments.length - 3} more documents`}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* How to Apply Section */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <AntDesign name="question-circle" size={16} color="#6B7280" />
            <Text style={styles.sectionTitle}>How to Apply</Text>
          </View>
          <View style={styles.sectionContent}>
            {scheme.instructions.map((instruction, index) =>
              renderListItem(instruction, index)
            )}
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <AntDesign name="info-circle" size={16} color="#1D4ED8" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Need Help?</Text>
            <Text style={styles.infoText}>
              Contact your local government office or visit the official portal
              for more information and assistance with your application.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <View style={styles.floatingActionContainer}>
        <Button
          onPress={handleApply}
          disabled={scheme.isEligible === false}
          style={styles.applyButton}
        >
          <Text
            style={[
              styles.buttonText,
              scheme.isEligible === false && styles.disabledButtonText,
            ]}
          >
            {scheme.isEligible === false ? "Not Eligible" : "Apply Now"}
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import SchemeCard from "../shared/SchemeCard";
import { mockSchemes, type Scheme } from "../../lib/mockData";
import { AntDesign } from "@expo/vector-icons";

interface UserDashboardProps {
  onLogout: () => void;
  onNavigate: (screen: string, params?: any) => void;
  onSchemeSelect: (scheme: Scheme) => void;
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
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  main: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 24,
  },
  recommendedSection: {
    marginBottom: 32,
  },
  recommendedTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 8,
  },
});

export default function UserDashboard({
  onLogout,
  onNavigate,
  onSchemeSelect,
}: UserDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "All",
    "Agriculture",
    "Education",
    "Housing",
    "Healthcare",
    "Skill Development",
    "Entrepreneurship",
  ];
  const locations = ["All", "All India", "Urban Areas", "Rural Areas"];

  // Filter schemes
  const filteredSchemes = mockSchemes.filter((scheme) => {
    const matchesSearch =
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || scheme.category === selectedCategory;
    const matchesLocation =
      selectedLocation === "All" || scheme.location === selectedLocation;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Recommended schemes (eligible ones)
  const recommendedSchemes = mockSchemes.filter((scheme) => scheme.isEligible);

  const handleLogout = () => {
    onLogout();
  };

  const handleSchemePress = (scheme: Scheme) => {
    onSchemeSelect(scheme);
  };

  const handleProfilePress = () => {
    onNavigate("UserProfile");
  };

  const handleNotificationsPress = () => {
    onNavigate("Notifications");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome to AISEVA!</Text>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <TouchableOpacity onPress={handleNotificationsPress}>
              <AntDesign name="notification" size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleProfilePress}>
              <AntDesign name="user" size={20} color="#6B7280" />
            </TouchableOpacity>
            <Button
              onPress={handleLogout}
              variant="outline"
              size="sm"
              style={styles.logoutButton}
            >
              <AntDesign name="logout" size={16} color="#6B7280" />
              <Text style={{ marginLeft: 4, color: "#6B7280" }}>Logout</Text>
            </Button>
          </View>
        </View>
      </View>

      <ScrollView style={styles.main}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <Input
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for schemes (e.g., 'education', 'farmer')"
            className="rounded-xl"
          />
        </View>

        {/* Recommended Schemes */}
        {recommendedSchemes.length > 0 && (
          <View style={styles.recommendedSection}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <AntDesign name="star" size={20} color="#059669" />
              <Text style={styles.recommendedTitle}>Recommended for You</Text>
            </View>
            <Text style={{ fontSize: 14, color: "#6B7280", marginBottom: 16 }}>
              Based on your profile, these schemes might be perfect for you
            </Text>
            {recommendedSchemes.slice(0, 3).map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onPress={() => handleSchemePress(scheme)}
              />
            ))}
          </View>
        )}

        {/* All Schemes */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text style={styles.sectionTitle}>All Government Schemes</Text>
          <Badge variant="secondary">
            <Text>{filteredSchemes.length} schemes</Text>
          </Badge>
        </View>

        {filteredSchemes.length === 0 ? (
          <View style={styles.emptyState}>
            <AntDesign name="search" size={48} color="#D1D5DB" />
            <Text style={styles.emptyText}>No schemes found</Text>
            <Text
              style={{ color: "#9CA3AF", textAlign: "center", marginTop: 8 }}
            >
              Try adjusting your search criteria
            </Text>
          </View>
        ) : (
          <View>
            {filteredSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onPress={() => handleSchemePress(scheme)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

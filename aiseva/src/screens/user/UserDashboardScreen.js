import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mockSchemes } from "../../lib/mockData";

export default function UserDashboardScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [userName, setUserName] = useState("");

  React.useEffect(() => {
    loadUserName();
  }, []);

  const loadUserName = async () => {
    const name = await AsyncStorage.getItem("currentUser");
    setUserName(name || "User");
  };

  const handleLogout = () => {
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

  const getCardStyle = (scheme) => {
    if (scheme.isEligible === true) {
      return { backgroundColor: "#F0FDF4", borderColor: "#86EFAC" };
    } else if (scheme.isEligible === false) {
      return { backgroundColor: "#FEF2F2", borderColor: "#FCA5A5" };
    }
    return { backgroundColor: "#fff", borderColor: "#E5E7EB" };
  };

  const renderSchemeCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.schemeCard, getCardStyle(item)]}
      onPress={() =>
        navigation.navigate("SchemeDetails", { schemeId: item.id })
      }
    >
      <View style={styles.cardHeader}>
        <Text style={styles.schemeTitle} numberOfLines={2}>
          {item.title}
        </Text>
        {item.isEligible !== undefined && (
          <View
            style={[
              styles.badge,
              item.isEligible ? styles.badgeSuccess : styles.badgeError,
            ]}
          >
            <Text style={styles.badgeText}>
              {item.isEligible ? "✓ Eligible" : "✗ Not Eligible"}
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.schemeDescription} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.metaContainer}>
        <View style={styles.metaRow}>
          <Ionicons name="pricetag-outline" size={16} color="#6B7280" />
          <Text style={styles.metaText} numberOfLines={1}>
            {item.category}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={16} color="#6B7280" />
          <Text style={styles.metaText} numberOfLines={1}>
            {item.location}
          </Text>
        </View>

        {item.deadline && (
          <View style={styles.metaRow}>
            <Ionicons name="calendar-outline" size={16} color="#F59E0B" />
            <Text style={[styles.metaText, styles.deadlineText]}>
              Deadline:{" "}
              {new Date(item.deadline).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{userName}!</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Ionicons name="notifications-outline" size={24} color="#374151" />
          </TouchableOpacity>
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
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#9CA3AF"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for schemes (e.g., 'education', 'farmer')"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filters Toggle */}
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons name="filter" size={20} color="#3B82F6" />
          <Text style={styles.filterButtonText}>Filters</Text>
          <Ionicons
            name={showFilters ? "chevron-up" : "chevron-down"}
            size={20}
            color="#3B82F6"
          />
        </TouchableOpacity>

        {/* Filter Options */}
        {showFilters && (
          <View style={styles.filterContainer}>
            <Text style={styles.filterLabel}>Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterScrollView}
            >
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.filterChip,
                    selectedCategory === cat && styles.filterChipActive,
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedCategory === cat && styles.filterChipTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.filterLabel}>Location</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterScrollView}
            >
              {locations.map((loc) => (
                <TouchableOpacity
                  key={loc}
                  style={[
                    styles.filterChip,
                    selectedLocation === loc && styles.filterChipActive,
                  ]}
                  onPress={() => setSelectedLocation(loc)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedLocation === loc && styles.filterChipTextActive,
                    ]}
                  >
                    {loc}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Recommended Schemes */}
        {recommendedSchemes.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="sparkles" size={24} color="#3B82F6" />
              <Text style={styles.sectionTitle}>Recommended for You</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {recommendedSchemes.map((scheme) => (
                <View key={scheme.id} style={styles.recommendedCardWrapper}>
                  {renderSchemeCard({ item: scheme })}
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* All Schemes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            All Schemes ({filteredSchemes.length})
          </Text>
          {filteredSchemes.map((scheme) => (
            <View key={scheme.id}>{renderSchemeCard({ item: scheme })}</View>
          ))}
        </View>
      </ScrollView>
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
  greeting: {
    fontSize: 14,
    color: "#6B7280",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
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
    paddingBottom: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    gap: 8,
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B82F6",
  },
  filterContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    marginTop: 8,
  },
  filterScrollView: {
    marginBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  filterChipActive: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  filterChipText: {
    fontSize: 14,
    color: "#374151",
  },
  filterChipTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  recommendedCardWrapper: {
    width: 320,
    marginRight: 16,
    marginLeft: 16,
  },
  schemeCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
    gap: 8,
  },
  schemeTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeSuccess: {
    backgroundColor: "#3B82F6",
  },
  badgeError: {
    backgroundColor: "#EF4444",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  schemeDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  metaContainer: {
    gap: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: "#6B7280",
    flex: 1,
  },
  deadlineText: {
    color: "#F59E0B",
    fontWeight: "500",
  },
});

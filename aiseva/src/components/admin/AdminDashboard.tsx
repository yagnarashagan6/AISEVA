import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../ui/button";
import {
  mockSchemes,
  deleteMockScheme,
  updateMockScheme,
} from "../../lib/mockData";
import { AntDesign } from "@expo/vector-icons";

interface AdminDashboardProps {
  onLogout: () => void;
  onNavigate: (screen: string, params?: any) => void;
  onEditScheme: (scheme?: any) => void;
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3B82F6",
  },
  main: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    marginBottom: 32,
  },
  statsGrid: {
    gap: 16,
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  statLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  schemesList: {
    gap: 12,
  },
  schemeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  schemeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  schemeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    marginRight: 12,
  },
  schemeActions: {
    flexDirection: "row",
    gap: 8,
  },
  schemeDetails: {
    gap: 4,
  },
  schemeCategory: {
    fontSize: 14,
    color: "#6B7280",
  },
  schemeLocation: {
    fontSize: 14,
    color: "#6B7280",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  emptyText: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 12,
    textAlign: "center",
  },
});

export default function AdminDashboard({
  onLogout,
  onNavigate,
  onEditScheme,
}: AdminDashboardProps) {
  const [schemes, setSchemes] = useState(mockSchemes);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: onLogout },
    ]);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Scheme",
      "Are you sure you want to delete this scheme?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteMockScheme(id);
            setSchemes([...mockSchemes]);
          },
        },
      ],
    );
  };

  const handleToggleVisibility = (id: string) => {
    const scheme = schemes.find((s) => s.id === id);
    if (scheme) {
      updateMockScheme({ ...scheme, isHidden: !scheme.isHidden });
      setSchemes([...mockSchemes]);
    }
  };

  const handleEdit = (id: string) => {
    const scheme = schemes.find((s) => s.id === id);
    onEditScheme(scheme);
  };

  const handleAddScheme = () => {
    onEditScheme();
  };

  // Mock stats
  const stats = {
    totalSchemes: schemes.length,
    activeUsers: 1247,
    newApplications: 89,
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Admin Panel</Text>
          <Button onPress={handleLogout} variant="outline" size="sm">
            <AntDesign name="logout" size={14} color="#6B7280" />
            Logout
          </Button>
        </View>
      </View>

      <ScrollView style={styles.main}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Text style={styles.statValue}>{stats.totalSchemes}</Text>
                <AntDesign name="file" size={24} color="#3B82F6" />
              </View>
              <Text style={styles.statLabel}>Total Schemes</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Text style={styles.statValue}>{stats.activeUsers}</Text>
                <AntDesign name="user" size={24} color="#10B981" />
              </View>
              <Text style={styles.statLabel}>Active Users</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Text style={styles.statValue}>{stats.newApplications}</Text>
                <AntDesign name="form" size={24} color="#F59E0B" />
              </View>
              <Text style={styles.statLabel}>New Applications</Text>
            </View>
          </View>
        </View>

        {/* Schemes Management */}
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Schemes Management</Text>
            <Button onPress={handleAddScheme} size="sm">
              <AntDesign name="plus" size={14} color="#FFFFFF" />
              Add Scheme
            </Button>
          </View>

          {schemes.length === 0 ? (
            <View style={styles.emptyState}>
              <AntDesign name="file" size={48} color="#D1D5DB" />
              <Text style={styles.emptyText}>
                No schemes available.{"\n"}Add a new scheme to get started.
              </Text>
            </View>
          ) : (
            <View style={styles.schemesList}>
              {schemes.map((scheme) => (
                <View key={scheme.id} style={styles.schemeCard}>
                  <View style={styles.schemeHeader}>
                    <Text style={styles.schemeTitle} numberOfLines={2}>
                      {scheme.title}
                    </Text>
                    <View style={styles.schemeActions}>
                      <TouchableOpacity
                        onPress={() => handleToggleVisibility(scheme.id)}
                        style={{ padding: 4 }}
                      >
                        <AntDesign
                          name={scheme.isHidden ? "eye" : "eye"}
                          size={16}
                          color={scheme.isHidden ? "#9CA3AF" : "#3B82F6"}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleEdit(scheme.id)}
                        style={{ padding: 4 }}
                      >
                        <AntDesign name="edit" size={16} color="#6B7280" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDelete(scheme.id)}
                        style={{ padding: 4 }}
                      >
                        <AntDesign name="delete" size={16} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.schemeDetails}>
                    <Text style={styles.schemeCategory}>{scheme.category}</Text>
                    <Text style={styles.schemeLocation}>{scheme.location}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

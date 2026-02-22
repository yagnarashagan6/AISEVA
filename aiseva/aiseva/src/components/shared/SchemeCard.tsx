import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Badge } from "../ui/badge";
import { AntDesign } from "@expo/vector-icons";
import { type Scheme } from "../../lib/mockData";

interface SchemeCardProps {
  scheme: Scheme;
  onPress: () => void;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    marginBottom: 12,
  },
  cardEligible: {
    backgroundColor: "#F0FDF4",
    borderColor: "#BBF7D0",
  },
  cardNotEligible: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },
  cardDefault: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    lineHeight: 20,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
    lineHeight: 20,
  },
  metaContainer: {
    gap: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    color: "#6B7280",
    flex: 1,
  },
  deadlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default function SchemeCard({ scheme, onPress }: SchemeCardProps) {
  const getCardStyles = () => {
    if (scheme.isEligible === true) {
      return [styles.card, styles.cardEligible];
    } else if (scheme.isEligible === false) {
      return [styles.card, styles.cardNotEligible];
    } else {
      return [styles.card, styles.cardDefault];
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={getCardStyles()}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>
          {scheme.title}
        </Text>
        {scheme.isEligible !== undefined && (
          <Badge
            variant={scheme.isEligible ? "default" : "destructive"}
            className="rounded-full"
          >
            {scheme.isEligible ? "✓ Eligible" : "✗ Not Eligible"}
          </Badge>
        )}
      </View>

      {/* Description */}
      <Text style={styles.description} numberOfLines={2}>
        {scheme.description}
      </Text>

      {/* Meta Information */}
      <View style={styles.metaContainer}>
        <View style={styles.metaRow}>
          <AntDesign name="tag" size={16} color="#6B7280" />
          <Text style={styles.metaText} numberOfLines={1}>
            {scheme.category}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <AntDesign name="environment" size={16} color="#6B7280" />
          <Text style={styles.metaText} numberOfLines={1}>
            {scheme.location}
          </Text>
        </View>

        {scheme.deadline && (
          <View style={styles.deadlineRow}>
            <AntDesign name="calendar" size={16} color="#6B7280" />
            <Badge
              variant="secondary"
              className="rounded-full"
              style={{ backgroundColor: "#FEF3C7", borderColor: "#F59E0B" }}
            >
              <Text style={{ color: "#D97706" }}>
                Deadline:{" "}
                {new Date(scheme.deadline).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Text>
            </Badge>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

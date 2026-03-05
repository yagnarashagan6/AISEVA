import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Badge } from "../ui/badge";
import { mockNotifications, Notification } from "../../lib/mockData";
import { AntDesign } from "@expo/vector-icons";

interface NotificationsProps {
  onBack?: () => void;
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
  },
  main: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
  },
  notificationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 8,
  },
  unreadCard: {
    borderColor: "#3B82F6",
    backgroundColor: "#F8FAFC",
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  infoIcon: {
    backgroundColor: "#DBEAFE",
  },
  successIcon: {
    backgroundColor: "#DCFCE7",
  },
  warningIcon: {
    backgroundColor: "#FEF3C7",
  },
  headerRight: {
    flex: 1,
    gap: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: "#6B7280",
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 18,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  markReadButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
  },
  markReadText: {
    fontSize: 12,
    color: "#6B7280",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#9CA3AF",
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },
  filterContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  filterButtonActive: {
    backgroundColor: "#EFF6FF",
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
  },
  filterButtonTextActive: {
    color: "#3B82F6",
  },
  headerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default function Notifications({ onBack }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const saved = await AsyncStorage.getItem("notifications");
      if (saved) {
        setNotifications(JSON.parse(saved));
      } else {
        setNotifications(mockNotifications);
        await AsyncStorage.setItem(
          "notifications",
          JSON.stringify(mockNotifications)
        );
      }
    } catch (error) {
      console.log("Error loading notifications:", error);
      setNotifications(mockNotifications);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const updated = notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      );
      setNotifications(updated);
      await AsyncStorage.setItem("notifications", JSON.stringify(updated));
    } catch (error) {
      console.log("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const updated = notifications.map((notification) => ({
        ...notification,
        read: true,
      }));
      setNotifications(updated);
      await AsyncStorage.setItem("notifications", JSON.stringify(updated));
    } catch (error) {
      console.log("Error marking all notifications as read:", error);
    }
  };

  const getFilteredNotifications = () => {
    return filter === "all"
      ? notifications
      : notifications.filter((notification) => !notification.read);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "application_status":
        return { name: "file-text" as const, color: "#3B82F6" };
      case "scheme_update":
        return { name: "notification" as const, color: "#10B981" };
      case "deadline":
        return { name: "clock-circle" as const, color: "#F59E0B" };
      default:
        return { name: "info-circle" as const, color: "#6B7280" };
    }
  };

  const getIconContainerStyle = (type: string) => {
    switch (type) {
      case "application_status":
        return styles.infoIcon;
      case "scheme_update":
        return styles.successIcon;
      case "deadline":
        return styles.warningIcon;
      default:
        return styles.infoIcon;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredNotifications = getFilteredNotifications();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <AntDesign name="left" size={20} color="#6B7280" />
          </TouchableOpacity>
          <View style={styles.headerBadge}>
            <Text style={styles.headerTitle}>Notifications</Text>
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount}</Badge>
            )}
          </View>
          {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllAsRead}>
              <Text style={{ fontSize: 12, color: "#3B82F6" }}>
                Mark all read
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.main}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === "all" && styles.filterButtonActive,
              ]}
              onPress={() => setFilter("all")}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filter === "all" && styles.filterButtonTextActive,
                ]}
              >
                All ({notifications.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === "unread" && styles.filterButtonActive,
              ]}
              onPress={() => setFilter("unread")}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filter === "unread" && styles.filterButtonTextActive,
                ]}
              >
                Unread ({unreadCount})
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => {
            const iconInfo = getNotificationIcon(notification.type);
            return (
              <View
                key={notification.id}
                style={[
                  styles.notificationCard,
                  !notification.read && styles.unreadCard,
                ]}
              >
                <View style={styles.notificationHeader}>
                  <View
                    style={[
                      styles.notificationIcon,
                      getIconContainerStyle(notification.type),
                    ]}
                  >
                    <AntDesign
                      name={iconInfo.name}
                      size={18}
                      color={iconInfo.color}
                    />
                  </View>
                  <View style={styles.headerRight}>
                    <Text style={styles.notificationTime}>
                      {formatTime(notification.timestamp)}
                    </Text>
                    <Text style={styles.notificationTitle}>
                      {notification.title}
                    </Text>
                    <Text style={styles.notificationMessage}>
                      {notification.message}
                    </Text>

                    <View style={styles.actionContainer}>
                      <Badge
                        variant={
                          notification.type === "deadline"
                            ? "destructive"
                            : "default"
                        }
                      >
                        {notification.type.replace("_", " ")}
                      </Badge>

                      {!notification.read && (
                        <TouchableOpacity
                          style={styles.markReadButton}
                          onPress={() => markAsRead(notification.id)}
                        >
                          <Text style={styles.markReadText}>Mark as read</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <AntDesign
              name="notification"
              size={48}
              color="#D1D5DB"
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyTitle}>
              {filter === "all"
                ? "No notifications yet"
                : "No unread notifications"}
            </Text>
            <Text style={styles.emptyMessage}>
              {filter === "all"
                ? "We'll notify you about application updates and new schemes"
                : "All your notifications have been read"}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

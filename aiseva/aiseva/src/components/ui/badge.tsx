import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
  style?: any;
}

const badgeStyles = StyleSheet.create({
  base: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  default: {
    backgroundColor: "#3B82F6",
  },
  secondary: {
    backgroundColor: "#F3F4F6",
  },
  destructive: {
    backgroundColor: "#EF4444",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  roundedFull: {
    borderRadius: 9999,
  },
});

const textStyles = StyleSheet.create({
  base: {
    fontSize: 12,
    fontWeight: "500",
  },
  default: {
    color: "#FFFFFF",
  },
  secondary: {
    color: "#374151",
  },
  destructive: {
    color: "#FFFFFF",
  },
  outline: {
    color: "#374151",
  },
});

export function Badge({
  children,
  variant = "default",
  className,
  style,
  ...props
}: BadgeProps) {
  const badgeStyleArray = [
    badgeStyles.base,
    badgeStyles[variant],
    className?.includes("rounded-full") && badgeStyles.roundedFull,
    style,
  ].filter(Boolean);

  const textStyleArray = [textStyles.base, textStyles[variant]].filter(Boolean);

  return (
    <View style={badgeStyleArray} {...props}>
      <Text style={textStyleArray}>{children}</Text>
    </View>
  );
}

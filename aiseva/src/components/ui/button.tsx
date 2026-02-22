import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import { cn } from "./utils";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
  style?: any;
}

const buttonStyles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 36,
  },
  default: {
    backgroundColor: "#3B82F6",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  secondary: {
    backgroundColor: "#F3F4F6",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  destructive: {
    backgroundColor: "#EF4444",
  },
  link: {
    backgroundColor: "transparent",
    paddingHorizontal: 0,
  },
  small: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 32,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    minHeight: 40,
  },
  icon: {
    width: 36,
    height: 36,
    paddingHorizontal: 0,
  },
  disabled: {
    opacity: 0.5,
  },
  roundedFull: {
    borderRadius: 9999,
  },
});

const textStyles = StyleSheet.create({
  base: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  default: {
    color: "#FFFFFF",
  },
  outline: {
    color: "#374151",
  },
  secondary: {
    color: "#374151",
  },
  ghost: {
    color: "#374151",
  },
  destructive: {
    color: "#FFFFFF",
  },
  link: {
    color: "#3B82F6",
    textDecorationLine: "underline",
  },
  small: {
    fontSize: 12,
  },
  large: {
    fontSize: 16,
  },
});

export function Button({
  children,
  onPress,
  variant = "default",
  size = "default",
  className,
  disabled = false,
  style,
  ...props
}: ButtonProps) {
  const buttonStyleArray = [
    buttonStyles.base,
    buttonStyles[variant],
    size !== "default" && buttonStyles[size as keyof typeof buttonStyles],
    disabled && buttonStyles.disabled,
    className?.includes("rounded-full") && buttonStyles.roundedFull,
    style,
  ].filter(Boolean);

  const textStyleArray = [
    textStyles.base,
    textStyles[variant],
    size !== "default" && textStyles[size as keyof typeof textStyles],
  ].filter(Boolean);

  if (Platform.OS === "web") {
    // For web, use a more traditional button approach
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={buttonStyleArray}
        accessibilityRole="button"
        {...props}
      >
        {typeof children === "string" ? (
          <Text style={textStyleArray}>{children}</Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={buttonStyleArray}
      activeOpacity={0.7}
      {...props}
    >
      {typeof children === "string" ? (
        <Text style={textStyleArray}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

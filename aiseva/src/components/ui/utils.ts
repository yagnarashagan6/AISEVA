import { Platform } from "react-native";

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// React Native compatible class utility
export function createStyles(styles: Record<string, any>) {
  return styles;
}

// Platform specific utilities
export const isWeb = Platform.OS === "web";
export const isNative = Platform.OS !== "web";

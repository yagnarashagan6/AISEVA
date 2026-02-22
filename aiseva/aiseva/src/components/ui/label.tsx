import * as React from "react";
import { Text, StyleSheet } from "react-native";

interface LabelProps {
  children: React.ReactNode;
  className?: string;
  style?: any;
}

const labelStyles = StyleSheet.create({
  base: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
  },
});

export function Label({ children, className, style, ...props }: LabelProps) {
  return (
    <Text style={[labelStyles.base, style]} {...props}>
      {children}
    </Text>
  );
}

import * as React from "react";
import { TextInput, StyleSheet, Platform, View } from "react-native";
import { cn } from "./utils";

interface InputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  className?: string;
  style?: any;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  required?: boolean;
}

const inputStyles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
    color: "#111827",
    minHeight: 36,
  },
  focused: {
    borderColor: "#3B82F6",
    borderWidth: 2,
  },
  roundedXl: {
    borderRadius: 12,
  },
  disabled: {
    backgroundColor: "#F3F4F6",
    color: "#9CA3AF",
  },
});

export function Input({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  className,
  style,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  required = false,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  const inputStyleArray = [
    inputStyles.base,
    isFocused && inputStyles.focused,
    className?.includes("rounded-xl") && inputStyles.roundedXl,
    !editable && inputStyles.disabled,
    multiline && { height: numberOfLines * 20 + 16 },
    style,
  ].filter(Boolean);

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      style={inputStyleArray}
      multiline={multiline}
      numberOfLines={numberOfLines}
      editable={editable}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholderTextColor="#9CA3AF"
      {...props}
    />
  );
}

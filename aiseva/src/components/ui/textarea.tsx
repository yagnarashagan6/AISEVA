import * as React from "react";
import { TextInput, StyleSheet } from "react-native";
import { cn } from "./utils";

interface TextareaProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  className?: string;
  style?: any;
  numberOfLines?: number;
  editable?: boolean;
}

const textareaStyles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
    color: "#111827",
    minHeight: 80,
    textAlignVertical: "top",
  },
  focused: {
    borderColor: "#3B82F6",
    borderWidth: 2,
  },
});

export function Textarea({
  value,
  onChangeText,
  placeholder,
  className,
  style,
  numberOfLines = 4,
  editable = true,
  ...props
}: TextareaProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  const textareaStyleArray = [
    textareaStyles.base,
    isFocused && textareaStyles.focused,
    { height: numberOfLines * 20 + 16 },
    style,
  ].filter(Boolean);

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={textareaStyleArray}
      multiline
      numberOfLines={numberOfLines}
      editable={editable}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholderTextColor="#9CA3AF"
      {...props}
    />
  );
}

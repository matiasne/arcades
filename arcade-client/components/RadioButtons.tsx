import React from "react";
import { Box } from "@chakra-ui/react";

const RadioButton = ({ label, selected, onPress, disabled }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      marginBottom="20px"
      onClick={disabled ? null : onPress}
      cursor="pointer"
    >
      <Box
        height="20px"
        width="20px"
        borderRadius="50%"
        border="2px solid"
        borderColor={disabled ? "#4c5566" : "green.500"}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {selected ? (
          <Box
            height="12px"
            width="12px"
            borderRadius="50%"
            backgroundColor="green.500"
          />
        ) : null}
      </Box>
      <Box marginLeft="8px">
        <label style={{ color: "white", fontWeight: 400 }}>{label}</label>
      </Box>
    </Box>
  );
};

export function RadioButtonsGroup({
  options,
  onValueChange,
  selected,
  disabled,
}) {
  const handlePress = (value) => {
    onValueChange(value);
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      {options.map((option) => (
        <RadioButton
          disabled={disabled}
          key={option.value}
          label={option.label}
          selected={selected === option.label}
          onPress={() => handlePress(option.value)}
        />
      ))}
    </Box>
  );
}

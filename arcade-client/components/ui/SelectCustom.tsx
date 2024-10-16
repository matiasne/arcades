import { Select } from "@chakra-ui/react";

export const SelectCustom = ({ children, ...props }: any) => {
  return (
    <Select
      borderRadius={"30px"}
      bg={"bgPrimary"}
      color="white"
      size="sm"
      {...props}
      sx={{
        "> option ": {
          background: "bgPrimary",
          color: "white",
        },
      }}
      padding="2"
    >
      {children}
    </Select>
  );
};

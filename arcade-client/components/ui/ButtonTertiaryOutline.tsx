import { Button } from "@chakra-ui/react";

export const ButtonTertiaryOutline = ({ children, ...props }: any) => {
  return (
    <Button
      border="1px solid"
      borderColor="bgPrimary"
      variant="outline"
      size="md"
      {...props}
    >
      {children}
    </Button>
  );
};

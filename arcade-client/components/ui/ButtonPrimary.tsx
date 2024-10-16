import { Button } from "@chakra-ui/react";

export const PrimaryButton = ({ children, ...props }: any) => {
  return (
    <Button bg="fgPrimary" size="lg" {...props}>
      {children}
    </Button>
  );
};

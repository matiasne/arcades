import { Button } from "@chakra-ui/react";

export const SecondaryButton = ({ children, ...props }: any) => {
  return (
    <Button bg="bgPrimary" size="lg" {...props}>
      {children}
    </Button>
  );
};

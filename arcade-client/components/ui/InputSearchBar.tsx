import { Input } from "@chakra-ui/react";

export const InputSearchBar = ({ children, ...props }: any) => {
  return <Input placeholder="Search" {...props} />;
};

import { Box } from "@chakra-ui/react";
import stylesBack from "./back.module.css";

export default function Background() {
  return (
    <Box position="absolute" width="100%" height="100vh" overflow="hidden">
      <div className={stylesBack.animatedBackground}></div>
    </Box>
  );
}

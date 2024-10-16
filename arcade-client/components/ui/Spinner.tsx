import { Box } from "@chakra-ui/react";
import styles from "./loader.module.css";

export const Spinner = ({ relative }: { relative?: boolean }) => {
  return (
    <Box className={relative ? styles.loaderRelative : styles.loader}></Box>
  );
};

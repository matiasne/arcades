import { Flex, Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsTrophy } from "react-icons/bs";
import { BsTrophyFill } from "react-icons/bs";
import { PiFootballBold } from "react-icons/pi";
import { PiFootballFill } from "react-icons/pi";
import { useAuthSession } from "./providers/SessionProvider";
import { GoHome, GoHomeFill } from "react-icons/go";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useMemo, useState } from "react";
import { League } from "../../domain/league";

export const BottomMenu = () => {
  const router = useRouter();
  const { authUser } = useAuthSession();

  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

  const { leagueId } = router.query;

  if (!authUser) return null;
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      w="100%"
      bg="#19182A"
      position="fixed"
      bottom="0"
      zIndex="sticky"
    >
      <Box
        display={"flex"}
        flexDir={"row"}
        justifyContent={"space-between"}
        bg="#19182A"
        w={{ base: "350px", md: "450px" }}
        height={"72px"}
        borderRadius="md"
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box as="button" onClick={() => router.push("/leagues")}>
            <Flex direction="column" justify="center" align="center">
              {router.pathname.includes("leagues") ? (
                <BsTrophyFill size={25} color="rgba(35, 188, 92, 1)" />
              ) : (
                <BsTrophy size={25} color="rgba(35, 188, 92, 1)" />
              )}
              <Text
                color="rgba(35, 188, 92, 1)"
                size="12px"
                fontFamily="Source Sans Pro"
              >
                Leagues
              </Text>
            </Flex>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box as="button" onClick={() => router.push("/home")}>
            <Flex direction="column" justify="center" align="center">
              {router.pathname.includes("home") ? (
                <GoHomeFill size={25} color="rgba(35, 188, 92, 1)" />
              ) : (
                <GoHome size={25} color="rgba(35, 188, 92, 1)" />
              )}
              <Text
                color="rgba(35, 188, 92, 1)"
                size="12px"
                fontFamily="Source Sans Pro"
              >
                Home
              </Text>
            </Flex>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box as="button" onClick={() => router.push("/live-stats")}>
            <Flex direction="column" justify="center" align="center">
              {router.pathname.includes("live-stats") ? (
                <PiFootballFill size={25} color="rgba(35, 188, 92, 1)" />
              ) : (
                <PiFootballBold size={25} color="rgba(35, 188, 92, 1)" />
              )}
              <Text
                size="12px"
                color="rgba(35, 188, 92, 1)"
                fontFamily="Source Sans Pro"
              >
                Live Stats
              </Text>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

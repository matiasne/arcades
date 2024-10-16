import * as React from "react";
import NextHead from "next/head";
import { Link } from "@chakra-ui/next-js";
import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";

import { NavMenu } from "./NavMenu";
import { ProfileMenu } from "./ProfileMenu";
import { useScore } from "../../application/user/useScore";
import { useAuthSession } from "./providers/SessionProvider";
import Background from "../ui/Background/Background";

/**
 * Head Elements. Include once per page component to set meta props
 */
export interface HeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

/**
 * Main App Shell. Render your pages inside
 */
export interface ShellProps {
  // Set to False to hide header
  header?: boolean;
  // Set to False to hide footer
  booter?: boolean;
  // Body components to display
  children: JSX.Element | JSX.Element[];
}

const GA4Script = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-P60LJGNVP6');

`;

export function Head({ title, description, image, url }: HeadProps) {
  return (
    <NextHead>
      <link rel="icon" type="image/png" href="./favicon.png" />
      <title>{title || "Loserball"}</title>
      <meta property="og:title" content={title || "Loserball"} />
      <meta
        property="og:description"
        content={description || "May The Worst Team Win!"}
      />
      <meta property="og:image" content={image || "/logo.png"} />

      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-P60LJGNVP6"
      ></script>
      <script>{GA4Script}</script>
    </NextHead>
  );
}

export interface NavProps {
  title: string | JSX.Element;
  score: number;
}

/**
 * Main Nav Bar.
 */
export function Nav({ title, score }: NavProps) {
  const [leagueScore, setLeagueScore] = React.useState(0);
  const { getScore } = useScore();

  const session = useAuthSession();

  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.700");
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      bgColor="bgSecondary"
      as="nav"
      h="60px"
      position="fixed"
      zIndex="999"
      bg="bgPrimary"
      w="100%"
    >
      <Box w={"33%"} textAlign={"left"}>
        <NavMenu />
      </Box>

      <Box w={"33%"} textAlign={"center"}>
        <h2>{title}</h2>
      </Box>

      <Box
        h="100%"
        w={"33%"}
        display={"flex"}
        flexDir={"row"}
        alignItems={"center"}
        justifyContent={"right"}
        alignSelf={"flex-end"}
        ml="auto"
      >
        <Box mr="1em" ml="2em">
          {session.authUser ? (
            <ProfileMenu avatar={session.authUser.image} />
          ) : (
            <Link color={"fgPrimary"} href={"/login"}>
              Login
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
}

/**
 * Main Footer Bar
 */
export function Footer() {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      ps="20px"
      bgColor="bgPrimary"
      as="footer"
      w="100%"
      h="200px"
    >
      Copywrite 2023 Loserball
    </Box>
  );
}

//export

/**
 * Main App Shell. Use this as the root component on a page and render your content as its children
 * @param
 * @returns
 */
export function Shell({
  header,
  footer,
  children,
  title,
  chatButton = true,
}: {
  title: string | JSX.Element;
  header?: boolean;
  footer?: boolean;
  chatButton?: boolean;
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <Box w="100%" min-h="120vh" position="relative">
      {header !== false && <Nav title={title} score={0} />}
      {
        <Box>
          <Background />
          <Box
            width="100%"
            mt="60px"
            height="calc(100vh - 60px)"
            position="absolute"
            overflowY="scroll"
            overflowX="hidden"
          >
            {children}{" "}
          </Box>
        </Box>
      }
      {footer !== false && <Footer />}
    </Box>
  );
}

import * as React from "react";
import {
  useDisclosure,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Grid,
  GridItem,
  Link,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";

import PrimaryLink from "./PrimaryLink";
import { LogoSVG } from "../logo/logoSVG";

/**
 * Left Hamburger Menu for Navigation
 *
 */
export function NavMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <div>
      <IconButton
        onClick={onOpen}
        aria-label="Open Nav Menu"
        ref={btnRef}
        bg="bgPrimary"
        color="fgPrimary"
        icon={<FaBars />}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="bgPrimary">
          <DrawerCloseButton />
          <DrawerHeader>
            <LogoSVG />
          </DrawerHeader>

          <DrawerBody>
            <Grid h="200px" gap={4}>
              <GridItem>
                <PrimaryLink href="/home" text="HOME" />
              </GridItem>
            </Grid>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

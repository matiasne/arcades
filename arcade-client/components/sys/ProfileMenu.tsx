import * as React from "react";
import {
  Box,
  Text,
  useDisclosure,
  Avatar,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Divider,
  DrawerFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useDeleteToken } from "../../application/token/useDeleteToken";
import { useRouter } from "next/navigation";
import { useAuthSession } from "./providers/SessionProvider";
import { useCasesAuth } from "../../application/auth/useCasesAuth";
import { useDeleteUser } from "../../application/user/useDeleteUser";
import { PrimaryButton } from "../ui/ButtonPrimary";
import { ButtonTertiaryOutline } from "../ui/ButtonTertiaryOutline";
import { ModalConfirm } from "../ui/ModalConfirm";
/**
 * Right Hand Menu for Profile /Login
 * @param param0
 * @returns
 */
export function ProfileMenu({ avatar }: { avatar: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { deleteToken } = useDeleteToken();
  const { push } = useRouter();

  const { signOut } = useAuthSession();
  const { authUser } = useAuthSession();
  const router = useRouter();

  const { useDeleteSignedUser } = useCasesAuth();

  const { deleteUser } = useDeleteUser();

  const toast = useToast();

  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();

  return (
    <Box backgroundColor={"bgPrimary"}>
      <Avatar cursor={"pointer"} src={avatar} onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent backgroundColor={"bgPrimary"}>
          <DrawerCloseButton />
          <DrawerHeader display={"flex"} alignItems={"center"} gap="2">
            <Avatar src={authUser && authUser.image} />
            <h2>{authUser && authUser.username}</h2>
          </DrawerHeader>

          <DrawerBody>
            <Divider />
          </DrawerBody>
          <ButtonTertiaryOutline
            color="red"
            colorScheme="red"
            onClick={() => {
              onOpenConfirm();
            }}
          >
            <h1>Remove Account</h1>
          </ButtonTertiaryOutline>
          <DrawerFooter>
            <ButtonTertiaryOutline
              variant="outline"
              mr={3}
              onClick={onClose}
              color="white"
            >
              <h1>Close</h1>
            </ButtonTertiaryOutline>
            <PrimaryButton
              colorScheme="blue"
              onClick={() => {
                deleteToken();
                signOut();
                router.push("/login");
              }}
            >
              <h1>Logout</h1>
            </PrimaryButton>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <ModalConfirm
        isOpen={isOpenConfirm}
        text={"Are you sure you want to remove your account from loserball?"}
        title={"Remove User Data"}
        onClose={() => {
          onCloseConfirm();
        }}
        onConfirm={async () => {
          deleteUser().then(() => {
            useDeleteSignedUser();
            toast({
              position: "top",
              title: "Account Removed",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            signOut();
          });
        }}
      />
    </Box>
  );
}

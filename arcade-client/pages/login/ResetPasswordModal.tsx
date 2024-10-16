import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useResetPassword } from "../../application/user/useResetPassword";
import { PrimaryButton } from "../../components/ui/ButtonPrimary";
import { ModalCustom } from "../../components/ui/ModalCustom";

export const ResetPasswordModal = ({
  isOpenConfirm,
  setIsOpenConfirm,
}: {
  isOpenConfirm: boolean;
  setIsOpenConfirm: Dispatch<SetStateAction<boolean>>;
}) => {
  const { resetPassword } = useResetPassword();

  const [emailReset, setEmailReset] = useState<string>("");
  const [sendingEmailResetLoading, setSendingEmailResetLoading] =
    useState<boolean>(false);

  const modalTitle = useMemo(() => `Request a password reset link`, []);

  const toast = useToast();

  const handleOnClose = () => {
    setEmailReset("");
    setIsOpenConfirm(false);
    setSendingEmailResetLoading(false);
  };

  const handleForgotPassword = useCallback(async () => {
    setSendingEmailResetLoading(true);
    try {
      const response = await resetPassword({ email: emailReset });

      if (response) {
        toast({
          title: "Reset password link sent successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Failed to send reset password link. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to send reset password link. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      handleOnClose();
    }
    handleOnClose();
  }, [emailReset, resetPassword]);

  return (
    <ModalCustom
      title={modalTitle}
      onClose={handleOnClose}
      isOpen={isOpenConfirm}
    >
      <Box
        display="flex"
        flexDir="column"
        alignContent="center"
        justifyContent="center"
        alignItems="center"
      >
        {sendingEmailResetLoading ? (
          <Box height={"100px"} width={"100px"}>
            <Spinner />
          </Box>
        ) : (
          <>
            <FormControl>
              <FormLabel color="white" textTransform="capitalize">
                Email:
              </FormLabel>
              <Input
                required
                type="email"
                name="league"
                value={emailReset}
                onChange={(event) => {
                  setEmailReset(event.target.value);
                }}
                placeholder="User email"
                my={2}
              />
            </FormControl>
            <PrimaryButton
              isDisabled={!emailReset}
              onClick={handleForgotPassword}
            >
              Send
            </PrimaryButton>
          </>
        )}
      </Box>
    </ModalCustom>
  );
};

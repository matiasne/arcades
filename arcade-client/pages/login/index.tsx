import { ChangeEvent, useEffect, useState } from "react";
import * as React from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Divider,
  Text,
  Link,
  Spinner,
} from "@chakra-ui/react";

import { FaGoogle } from "react-icons/fa";
import { LogoSVG } from "../../components/logo/logoSVG";
import { useAuthSession } from "../../components/sys/providers/SessionProvider";
import { useRouter } from "next/navigation";
import { ResetPasswordModal } from "./ResetPasswordModal";
import Background from "../../components/ui/Background/Background";

export default function Login() {
  const router = useRouter();
  const { signIn, signInWithGoogle, authUser, signOut } = useAuthSession();
  const isAuthenticated = authUser?.id ? true : false;

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setFormValues({ email: "", password: "" });
      router.push("/home");
    }
  }, [authUser]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit(event);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    setError("");
    setLoader(true);
    e.preventDefault();
    try {
      const res = await signIn(formValues.email, formValues.password);
      setTimeout(() => {
        setLoader(false);
      }, 1000);
      if (res.errors) setError(res.message);
    } catch (error: any) {
      setTimeout(() => {
        setLoader(false);
      }, 1000);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Box
      w="100vw"
      h="100vh"
      display={"flex"}
      justifyContent={"center"}
      overflow="hidden"
      fontFamily="Futura Std"
    >
      <Background />
      <Box
        p="1em"
        maxW="450px"
        h="450px"
        borderWidth={"1px"}
        borderRadius={"20px"}
        position={"absolute"}
        top="50%"
        transform="translateY(-50%);"
        display="flex"
        flexDir="column"
        alignItems="center"
        bg="bgPrimary"
        onKeyDown={handleKeyDown}
      >
        {/* <Logo /> */}
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          mt="10"
          mb="5"
          gap="2"
        >
          <LogoSVG />
          <Text as="p" fontSize="12px" fontFamily="Source Sans Pro">
            May The Worst Team Win
          </Text>
        </Box>
        <Text as="h1" mb="2">
          Login
        </Text>
        <Divider mb="2em" />
        <Text color="red">{error}</Text>
        <FormControl>
          <Input
            required
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Email Address"
          />
        </FormControl>
        <FormControl mt="5">
          <Input
            required
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </FormControl>
        <Text marginTop="2">
          <Link
            color="fgPrimary"
            fontFamily="Source Sans Pro"
            onClick={() => setIsOpenConfirm(true)}
          >
            Forgot your password{" "}
          </Link>{" "}
        </Text>
        <Button
          textColor={"white"}
          mt="5"
          bgColor={"green.500"}
          width={"100%"}
          onClick={onSubmit}
          _hover={{ bg: "green.800" }}
        >
          {loader ? <Spinner /> : <h1> Sign In</h1>}
        </Button>

        {/*The google login is not going to be used until the issue is fixed of users logged in with google*/}
        {/* <Box mt="1em" borderTop={"1px"} borderColor={"gray.100"}>
          <Text
            mt="1em"
            mb="1em"
            fontWeight={"500"}
            fontFamily="Source Sans Pro"
          >
            Sign in using
          </Text>

          <Box display="flex" flexDir="row" gap="2" alignContent={"center"}>
            <Button
              margin={"auto"}
              aria-label="Login With Google Account"
              onClick={() => {
                signInWithGoogle();
              }}
            >
              <FaGoogle />
            </Button>
          </Box>
        </Box> */}

        <Text marginTop="auto" fontFamily="Source Sans Pro">
          Don't have an account?{" "}
          <Link color="fgPrimary" href="/signup">
            Sign up{" "}
          </Link>{" "}
        </Text>
      </Box>
      <ResetPasswordModal
        isOpenConfirm={isOpenConfirm}
        setIsOpenConfirm={setIsOpenConfirm}
      />
    </Box>
  );
}

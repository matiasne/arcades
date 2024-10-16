import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import * as React from "react";
import {
  Box,
  Text,
  Button,
  FormControl,
  Input,
  Divider,
  Link,
  InputRightElement,
  InputGroup,
  useToast,
  Image,
} from "@chakra-ui/react";
import { LogoSVG } from "../../components/logo/logoSVG";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { useAuthSession } from "../../components/sys/providers/SessionProvider";

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const searchParams = useSearchParams();
  const toast = useToast();

  const { signIn, signUp } = useAuthSession();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !checkIfEmpty(
        formValues.email,
        formValues.password,
        formValues.confirmPassword
      )
    ) {
      return;
    }

    if (!validatePassword(formValues.password, formValues.confirmPassword)) {
      return;
    }

    if (!validateEmail(formValues.email)) {
      setError("Invalid email format");
      return;
    }

    if (!(await handleSignUp(formValues.email, formValues.password))) {
      return;
    }

    handleLogin(formValues.email, formValues.password);
  };

  const checkIfEmpty = (email, password, confirmPassword): boolean => {
    if (email === "" || password === "" || confirmPassword === "") {
      setError("Please fill out all fields");
      return false;
    }
    return true;
  };

  const validatePassword = (password, confirmPassword): boolean => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSignUp = async (email, password): Promise<boolean> => {
    setLoading(true);
    let res = await signUp({ email, password });

    console.log(res);
    if (res.errors) {
      setError(res.errors);
      return false;
    }
    setError("");
    toast({
      position: "top",
      title: "Account created.",
      description: "Welcome",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setLoading(false);
    return true;
  };

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);

      const resp = await signIn(email, password);
      setFormValues({
        email: "",
        password: "",
        confirmPassword: "",
      });
      router.push("/leagues");
    } catch (error: any) {
      setLoading(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <form>
        <Box h="100vh" display={"flex"} justifyContent={"center"}>
          <Box
            p="1em"
            w="370px"
            h="750px"
            borderWidth={"1px"}
            borderRadius={"20px"}
            position={"absolute"}
            top="50%"
            transform="translateY(-50%);"
            display="flex"
            flexDir="column"
            alignItems="center"
          >
            {/* <Logo /> */}
            <Box /*mt="10"*/ mb="5">
              <LogoSVG />
            </Box>
            <Text as="h1" mb="5">
              Create your account
            </Text>
            <Divider mb="2em" />
            <Text mb="5" color="red">
              {error}
            </Text>
            <FormControl>
              <Input
                required
                name="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="Email Address"
              />
            </FormControl>
            <InputGroup size="md">
              <FormControl mt="5">
                <Input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    variant="ghost"
                    h="2rem"
                    backgroundColor="none"
                    _hover={{ bg: "none" }}
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? (
                      <BiHide size="20px" color="white" />
                    ) : (
                      <BiShow size="20px" color="white" />
                    )}
                  </Button>
                </InputRightElement>
                <Text fontSize="10px" p="2" fontFamily="Source Sans Pro">
                  Use at least 8 characters and one number.{" "}
                </Text>
              </FormControl>
            </InputGroup>

            <InputGroup size="md">
              <FormControl mt="5">
                <Input
                  required
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    variant="ghost"
                    h="2rem"
                    backgroundColor="none"
                    _hover={{ bg: "none" }}
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? (
                      <BiHide size="20px" color="white" />
                    ) : (
                      <BiShow size="20px" color="white" />
                    )}
                  </Button>
                </InputRightElement>
              </FormControl>
            </InputGroup>

            <Button
              textColor={"white"}
              mt="2em"
              type="submit"
              bgColor={"green.500"}
              width={"100%"}
              onClick={onSubmit}
            >
              <h1>Sign Up</h1>
            </Button>
            <Box display="flex" flexDir="row" gap="2" marginTop="10px">
              <Text fontFamily="Source Sans Pro">
                Already have an account?{" "}
              </Text>
              <Link color="fgPrimary" href="/login">
                Sign in{" "}
              </Link>{" "}
            </Box>
            <Text
              fontFamily="Source Sans Pro"
              textAlign={"center"}
              marginTop="10px"
            >
              By registering you agree to our{" "}
              <Link color="fgPrimary" href="/terms-conditions" target="_blank">
                Terms and Conditions
              </Link>
            </Text>
            <Box display="flex" flexDir="column" gap="21px" marginTop="20px">
              <Link
                href="https://apps.apple.com/us/app/loserball/id6596762712?itsct=apps_box_badge&amp;itscg=30200"
                isExternal
                display="inline-block"
                overflow="hidden"
                borderRadius="13px"
                width="250px"
                height="83px"
              >
                <Image
                  src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1723420800"
                  alt="Download on the App Store"
                  borderRadius="13px"
                  width="250px"
                  height="83px"
                />
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.loserball"
                isExternal
                display="inline-block"
                overflow="hidden"
                width="250px"
                height="83px"
              >
                <Image
                  src="/google-play-badge.png"
                  alt="Download on the Play Store"
                  borderRadius="13px"
                  width="250px"
                  height="83px"
                />
              </Link>
            </Box>
          </Box>
        </Box>
      </form>
    </>
  );
}

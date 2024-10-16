import { Link } from "@chakra-ui/next-js";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface PrimaryLinkProps {
  href: string;
  text: string;
}

export default function PrimaryLink(props: PrimaryLinkProps) {
  const router = useRouter();
  const isActive = router.asPath === props.href;

  return (
    <Link href={props.href} color={isActive ? "white" : "fgPrimary"}>
      <Box
        color={isActive ? "white" : "fgPrimary"}
        fontSize="15px"
        fontFamily="Futura Std"
      >
        {props.text}
      </Box>
    </Link>
  );
}

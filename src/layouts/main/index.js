import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NavLink from "./nav-link";
import Footer from "./footer";
import WalletData from "./wallet-data";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { useWeb3React } from "@web3-react/core";

const Links = [
  {
    name: "Home",
    to: "/",
  },

];

const MainLayout = ({ children }) => {
  const { account } = useWeb3React();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAdmin } = useContext(AppContext);
  let customLinks = Links;
  customLinks = [
    ...Links,
    {
      name: "Galería",
      to:  `/galeria?address=${account}`,
    }
  ]
  if (isAdmin) {
    customLinks = [
      ...Links,
      {
        name: "Verify",
        to: "/verify",
      }
    ]
  }

  return (
    <Flex minH="100vh" direction="column">
      <Box
        mx="auto"
        maxW={"7xl"}
        width="100%"
        bg={useColorModeValue("white", "gray.800")}
        px={4}
      >
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 1 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Flex alignItems="center">
              <Image src="./images/logo-png.png" width="80px" />
              {/* <Image src="./SelloChainedCO2Interface/images/logo-png.png" width="80px" /> en local */}
              <Heading size="md" color="green" mt={0.2} ml={1}>
                Sello Chained CO2
              </Heading>
            </Flex>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {customLinks.map(({ name, to }) => (
                <NavLink key={name} to={to}>
                  {name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <WalletData />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {customLinks.map(({ name, to }) => (
                <NavLink key={name} to={to}>
                  {name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box mx="auto" flex={1} p={4} maxW={"7xl"} width="100%">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default MainLayout;


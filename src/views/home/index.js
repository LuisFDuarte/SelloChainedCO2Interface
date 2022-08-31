import {
  Stack,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import useSelloChainedCO2 from "../../hooks/useSelloChainedCO2";
import { useCallback, useEffect, useState } from "react";

const Home = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const { active, account } = useWeb3React();
  const SelloChainedCO2 = useSelloChainedCO2();
  const toast = useToast();
  
  const getSelloChainedCO2Data = useCallback(async () => {
    if (SelloChainedCO2) {
      const totalSupply = await SelloChainedCO2.methods.totalSupply().call();
      const dnaPreview = await SelloChainedCO2.methods
        .deterministicPseudoRandomDNA(totalSupply, account)
        .call();
      const image = await SelloChainedCO2.methods.imageByDNA(dnaPreview).call();
      setImageSrc(image);
    }
  }, [SelloChainedCO2, account]);

  useEffect(() => {
    getSelloChainedCO2Data();
  }, [getSelloChainedCO2Data]);

  const mint = () => {
    setIsMinting(true);
    SelloChainedCO2.methods
      .mint()
      .send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        toast({
          title: "Transacción enviada",
          description: txHash,
          status: "info",
        });
      })
      .on("receipt", () => {
        setIsMinting(false);
        toast({
          title: "Transacción confirmada",
          description: "",
          status: "success",
        });
      })
      .on("error", (error) => {
        setIsMinting(false);
        toast({
          title: "Transacción fallida",
          description: error.message,
          status: "error",
        });
      });
  };

  return (
    <Stack
      align={"center"}
      spacing={{ base: 6, md: 8 }}
      py={{ base: 18, md: 26 }}
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading
          lineHeight={1.0}
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "3xl", lg: "5xl" }}
        >
          <Text
            as={"span"}
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: "30%",
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "green.400",
              zIndex: -1,
            }}
          >
            El cambio climático es responsabilidad de todos
          </Text>
          <br />
          <Text as={"span"} color={"green.400"}>
            si no medimos no podemos tomar las mejores decisiones
          </Text>
        </Heading>
        <Text color={"gray.500"}>
        Sello Chained CO2 es una plataforma que permite obtener NFTs dinámicos que muestran la huella de carbono actual
         de un producto o servicio según su consumo de energía eléctrica. Estos NFTs sirven como un sello que muestra 
         con qué porcentaje de energía renovable funciona una empresa o usuario.
        </Text>
        <Text color={"green.500"}>
          Cada Sello Chained CO2 se genera de  basado en tu consumo energética,
          usa el previsualizador para averiguar cuál sería tu NFT y huella de carbono si haces
          mint.
        </Text>
        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={{ base: "column", sm: "row" }}
        >
          <Button
            rounded={"full"}
            size={"lg"}
            fontWeight={"normal"}
            px={6}
            colorScheme={"green"}
            bg={"green.400"}
            _hover={{ bg: "green.500" }}
            disabled={!SelloChainedCO2}
            onClick={mint}
            isLoading={isMinting}
          >
            Obtén tu NFT Sello Chained CO2
          </Button>
          <Link to="/galeria">
            <Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
              Galería
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Flex
        flex={1}
        direction="column"
        justify={"center"}
        align={"center"}
        position={"relative"}
        w={"full"}
      >
        <Image src={active ? imageSrc : "https://avataaars.io/"} /> 
        {/* TODO Se debe cambiar la imagen por defecto */}
        {active ? (
          <>
            <Flex mt={2}>
              <Badge>
                Next ID:
                <Badge ml={1} colorScheme="green">
                  1
                </Badge>
              </Badge>
              <Badge ml={2}>
                Address:
                <Badge ml={1} colorScheme="green">
                  0x0000...0000
                </Badge>
              </Badge>
            </Flex>
            <Button
              onClick={getSelloChainedCO2Data}
              mt={4}
              size="xs"
              colorScheme="green"
            >
              Actualizar
            </Button>
          </>
        ) : (
          <Badge mt={2}>Wallet desconectado</Badge>
        )}
      </Flex>
    </Stack>
  );
};

export default Home;
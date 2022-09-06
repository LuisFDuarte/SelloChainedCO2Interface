import {
  Stack,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import useSelloChainedCO2 from "../../hooks/useSelloChainedCO2";
import { useCallback, useEffect, useState, useContext } from "react";
import Form from "../../components/form";
import AppContext from "../../context/AppContext";
import Card from "../../components/card";

const Home = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [tokenURI, setTokenURI] = useState("");
  const { account } = useWeb3React();
  const { setIsAdmin } = useContext(AppContext);
  const selloChainedCO2 = useSelloChainedCO2();
  const toast = useToast();
  const [NFTdata, setNFTdata] = useState({})
  const getAccess = useCallback(async () => {
    if (selloChainedCO2) {
      const admin = await selloChainedCO2.methods.isReviewer().call({from: account});
      setIsAdmin(admin)
    }
  }, [selloChainedCO2, setIsAdmin, account]);

  useEffect(() => {
    getAccess();
  }, [getAccess]);

  const mint = () => {
    if(!tokenURI){
      toast({
        title: "Diligencia el formulario",
        description: "Debes llenar los campos y presionar en previsualizar",
        status: "info",
      });
      
      return
    }
    setIsMinting(true);
    selloChainedCO2.methods
      .mint(tokenURI)
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

  const getSelloChainedCO2Data = async (data) => {
   
    const BASE_URL = "https://api-co2.herokuapp.com";
    const URL = `${BASE_URL}/${data.country}?energy=${data.energy}`
    const response = await axios.get(URL);
    setTokenURI(URL)
    
    setNFTdata({
      "name": response.data.name,
      "description": response.data.description,
      "image": response.data.image,
      "share": response.data.attributes[0].value,
      "emissions": response.data.attributes[3].value
    })
   
    //btoa(JSON.stringify(obj))
  }

  return (
    <Stack
      align={"center"}
      spacing={{ base: 5, md: 4 }}
      py={{ base: 10, md: 2 }}
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Stack flex={1} spacing={{ base: 5, md: 4 }}>
        <Heading
          lineHeight={1.0}
          fontWeight={600}
          fontSize={{ base: "1xl", sm: "2xl", lg: "4xl" }}
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
          Cada Sello Chained CO2 se genera de  basado en tu consumo energético,
          utiliza el formulario para previsualizar tu NFT y huella de carbono.
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
            disabled={!selloChainedCO2}
            onClick={mint}
            isLoading={isMinting}
          >
            Obtén tu NFT Sello Chained CO2
          </Button>
          <Link to={`/galeria?address=${account}`}>
            <Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
              Galería
            </Button>
          </Link>
        </Stack>
      </Stack>
      { !NFTdata.name &&
      <Flex 
        flex={1}
        direction="column"
        justify={"center"}
        align={"center"}
        position={"relative"}
        w={"full"}
      >
        <Image src={  "./images/logo-png.png"}/> 
      </Flex>
      }
      { NFTdata.name &&
      <Flex
        flex={1}
        direction="column"
        justify={"center"}
        align={"center"}
        position={"relative"}
        w={"full"}
      >
      <Card name={NFTdata.name } 
            image={ NFTdata.image } 
            description={ NFTdata.description } 
            share={NFTdata.share} 
            emissions={ NFTdata.emissions} />
      </Flex>
      }
      <Flex
        flex={1}
        direction="column"
        justify={"center"}
        align={"top"}
        position={"relative"}
        w={"full"}
      >
        <Form onSubmit={(data) => getSelloChainedCO2Data(data)}/>
      </Flex>
    </Stack>
  );
};

export default Home;
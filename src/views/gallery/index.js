import { useWeb3React } from "@web3-react/core";
import {
  Grid,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
  FormHelperText,
  FormControl,
} from "@chakra-ui/react";
import { useNFTsData } from "../../hooks/useNFTData";
import RequestAccess from "../../components/request-access";
import Loading from "../../components/loading";
import Card from "../../components/card";
import { useLocation,useNavigate } from "react-router-dom";
import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";

const Gallery = () => {

  const { search } = useLocation();
  const { push } = useNavigate();
  const [validAddress, setValidAddress] = useState(true);
  const [submitted, setSubmitted] = useState(true);

  const [address, setAddress] = useState(
    new URLSearchParams(search).get("address")
  );

  const { active, library } = useWeb3React();
  const { NFTs, loading } = useNFTsData({
    owner: submitted && validAddress ? address : null,
  });
  console.log({NFTs})
  const handleAddressChange = ({ target: { value } }) => {
    setAddress(value);
    setValidAddress(false);
    setSubmitted(false);
  };

  const submit = (event) => {
    //event.preventDefault();
    console.log(address)
    if (address) {
      const isValid = library.utils.isAddress(address);
      setValidAddress(isValid);
      setSubmitted(true);
      //if (isValid) push(`/galeria?address=${address}`);
    } else {
      push("/galeria");
    }
  };

  if (!active) return <RequestAccess />;

  return (
    <>
      <form onSubmit={submit}>
        <FormControl>
          <InputGroup mb={3}>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              isInvalid={!validAddress}
              value={address ?? ""}
              onChange={handleAddressChange}
              placeholder="Buscar por dirección"
            />
            <InputRightElement width="5.5rem">
              <Button type="submit" h="1.75rem" size="sm">
                Buscar
              </Button>
            </InputRightElement>
          </InputGroup>
          {submitted && !validAddress && (
            <FormHelperText>Dirección inválida</FormHelperText>
          )}
        </FormControl>
      </form>
    
      {loading ? (
        <Loading />
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {NFTs.map(({ name, image, description, attributes, tokenId }) => (
              <Card name={name} 
                    key={tokenId} 
                    image={image} 
                    description={description} 
                    share={attributes[0].value}
                    emissions = {attributes[3].value} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default Gallery;
<<<<<<< HEAD
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Select,
  RadioGroup,
  HStack,
  Radio,
  NumberInput,
  NumberInputField,
  Grid,
  Button,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import axios from "axios";
const Form = ({ onSubmit }) => {
    const formRef = useRef(null);
    const FileRef = useRef(null);
    const [errors, setErrors] = useState({
        type: false,
        name: false,
        country: false,
        energy: false,
        email: false
    })

  const handleFileUpload = (e) =>{
    //TODO
    console.log(e.target.files[0]);
    axios.post('https://api-co2.herokuapp.com/uploadFile/', {
      user: 'Usuario',
      in_file: e.target.files[0]
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  
  }
  const handleClick = event => {
    FileRef.current.click();
  };

  const submitForm = (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current);
    const data = {
        type: formData.get("type"),
        name: formData.get("name"),
        country: formData.get("country"),
        energy: formData.get("energy"),
        email: formData.get("email"),
    }
    const newErrors = {}
    Object.keys(data).forEach(key => {
        if (!data[key]) {
            newErrors[key] = true;
        } else {
            newErrors[key] = false;
        }
    })
    setErrors(newErrors)
    const allOk = Object.values(newErrors).every(current => !current)
    if(allOk) onSubmit(data)
  };

  return (
    <form ref={formRef}>
      <Grid h="500px" gap={5}>
        <FormControl isInvalid={errors.type}>
          <RadioGroup defaultValue="Empresa">
            <HStack spacing="24px">
              <Radio value="Empresa" name="type">Empresa</Radio>
              <Radio value="Persona" name="type">Persona</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <FormControl isRequired isInvalid={errors.name}>
          <FormLabel>Nombre</FormLabel>
          <Input placeholder="" name="name" />
          <FormHelperText></FormHelperText>
        </FormControl>

        <FormControl isRequired isInvalid={errors.country}>
          <FormLabel>País</FormLabel>
          <Select placeholder="Selecciona tu país" name="country">
            <option value={"AR"}>Argentina</option>
            <option value={"BO"}>Bolivia</option>
            <option value={"CL"}>Chile</option>
            <option value={"FR"}>Francia</option>
          </Select>
        </FormControl>

        <FormControl isRequired isInvalid={errors.energy}>
          <FormLabel>Consumo eléctrico mensual</FormLabel>
          <NumberInput min={0}>
            <NumberInputField placeholder="[kWh/mes]" name="energy"/>
          </NumberInput>
        </FormControl>

        <FormControl isRequired isInvalid={errors.email}>
          <FormLabel>Dirección de correo</FormLabel>
          <Input type="email" name="email"/>
          <FormHelperText>Nunca compartiremos tu información.</FormHelperText>
        </FormControl>
        <input
          type="file"
          ref={FileRef}
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
       
        <Button colorScheme="blue" onClick={handleClick}>
          ⊕ Agregar un archivo
        </Button>
       
        <Button onClick={submitForm} colorScheme="green">
          Previsualizar
        </Button>
        
      </Grid>
    </form>
  );
};

export default Form;
>>>>>>> 25edcf35b91a513cf5a918dcf1cca224270e9821

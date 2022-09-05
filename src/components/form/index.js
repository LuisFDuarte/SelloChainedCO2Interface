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
  } from '@chakra-ui/react';

const Form = () => {
    return (
        <form>
            <Grid h='500px' gap={5}>
            <FormControl>
            <RadioGroup defaultValue='Empresa'>
                <HStack spacing='24px'>
                <Radio value='Empresa'>Empresa</Radio>
                <Radio value='Persona'>Persona</Radio>
                </HStack>
            </RadioGroup>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input placeholder='' />
                <FormHelperText></FormHelperText>
            </FormControl>

            <FormControl isRequired>
            <FormLabel>País</FormLabel>
            <Select placeholder='Selecciona tu país'>
                <option>Argentina</option>
                <option>Bolivia</option>
                <option>Chile</option>
                <option>Francia</option>
            </Select>
            </FormControl>

            <FormControl isRequired>
            <FormLabel>Consumo eléctrico mensual</FormLabel>
            <NumberInput min={0}>
                <NumberInputField placeholder='[kWh/mes]'/>
            </NumberInput>
            </FormControl>

            <FormControl>
            <FormLabel>Dirección de correo (opcional)</FormLabel>
            <Input type='email' />
            <FormHelperText>Nunca compartiremos tu información.</FormHelperText>
            </FormControl>


            <Button colorScheme='blue'>⊕ Agregar un archivo</Button>


            </Grid>
        </form>
    )
}

export default Form;
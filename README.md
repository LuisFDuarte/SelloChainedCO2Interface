# Sello ChainedCO2 Interface
Sello Chained CO2 es una plataforma que permite obtener NFTs dinámicos que muestran la huella de carbono actual de un producto o servicio según su consumo de energía eléctrica. Estos NFTs sirven como un sello que muestra con qué porcentaje de energía renovable funciona una empresa o usuario.

**Página web**:
https://luisfduarte.github.io/SelloChainedCO2Interface/

Este proyecto esta basado en el reto de [NFTs Dinámicos de Camilo Molano](https://github.com/camohe90). NFTs generados usando  IA [stable difussion](https://github.com/CompVis/stable-diffusion) e inspirado por la interfaz del proyecto [Platzi Punks de Ernesto García](https://github.com/ernestognw)

### Autores

* Luis Duarte (LuisFDuarte)

* Mario Sanchez (mszjar)

* Jhoer Perez (jho3r)

### Instalación
``` bash
yarn
```
### Uso
``` bash
yarn start
```

La previsualización del NFT depende de los siguientes elementos:
* Consumo de electricidad mensual
* País de origen

### Contrato (rinkeby)
``` bash
0xBCb40e7A0C3D65d2d1f2d539ca04e42222D99b6C 
```

## API y Smart Contract
- https://github.com/LuisFDuarte/SelloChainedCO2API
- https://github.com/LuisFDuarte/SelloChainedCO2


### Dependencias
- yarn add web3
- yarn add react-router-dom 
- yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
- yarn add @web3-react/core
- yarn add @web3-react/injected-connector
- yarn add @chakra-ui/icons

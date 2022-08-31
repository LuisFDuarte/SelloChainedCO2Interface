import { Route, Routes } from 'react-router-dom';
import Home from './views/home';
import MainLayout from './layouts/main/index';
import Gallery from "./views/gallery";
function App() {

  return (
  <MainLayout>
    <Routes>      
        <Route path="/" exact element={<Home/>} />
        <Route path="/galeria" exact element={<Gallery/>} />

    </Routes>
  </MainLayout>
  );
  }

export default App;
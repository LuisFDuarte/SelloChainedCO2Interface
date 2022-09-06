import { Route, Routes } from "react-router-dom";
import Home from "./views/home";
import MainLayout from "./layouts/main/index";
import Gallery from "./views/gallery";
import Verify from "./views/verify";
import NotFound from "./views/notFound";
import AppContext from "./context/AppContext";
import useAccessControl from "./hooks/useAccessControl";

function App() {
  const accessControl = useAccessControl();
  return (
    <AppContext.Provider value={accessControl}>
      <MainLayout>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/galeria" exact element={<Gallery />} />
          <Route path="/verify" exact element={accessControl.isAdmin ? <Verify /> : <NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </AppContext.Provider>
  );
}

export default App;

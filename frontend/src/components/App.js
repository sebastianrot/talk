import {BrowserRouter} from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import {AuthContextProvider} from '../context/AuthContext';
import Navbar from './Navbar';
import Router from './Router';
import Footer from './Footer';

const App = () => {
  return (
    <AuthContextProvider>
    <BrowserRouter>
    <ChakraProvider>
    <Navbar/>
    <Router/>
    <Footer/>
    </ChakraProvider>
    </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;


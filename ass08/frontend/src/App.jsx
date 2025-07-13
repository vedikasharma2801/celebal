// src/App.jsx 

import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast'; 
const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        
          <Outlet /> 
      
      </main>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
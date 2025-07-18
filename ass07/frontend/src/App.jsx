// src/App.jsx 

import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet /> 
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
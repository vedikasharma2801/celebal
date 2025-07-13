// frontend/src/pages/HomePage.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductsQuery } from '../slices/productsApiSlice';

// Import our new CSS file
import '../assets/styles/HomePage.css';

// --- This is our new Landing Section Component ---
const LandingSection = () => {
  // IMPORTANT: Replace these with the paths to YOUR images in the public folder
  const images = [
    '/images/12.png',
    '/images/5.png',
    '/images/13.png',
    '/images/14.png',
  ];

  // We duplicate the images to create a seamless infinite scroll effect
  const duplicatedImages = [...images, ...images];

  return (
    <Row className="landing-section">
      {/* Left Column - Text Content */}
      <Col md={6} className="landing-left">
        <p className="brand-name">Buy from us</p>
        <h1>All you need is new clothes</h1>
        <p>Life is too short to wear boring clothes. Discover our latest collection crafted with passion and designed for the modern individual.</p>
        <a href="#latest-products" className="get-started-btn">
          Get Started
        </a>
      </Col>

      {/* Right Column - Scrolling Slideshow */}
      <Col md={3}>
        <div className="slideshow-container">
          <div className="image-scroller">
            {duplicatedImages.map((src, index) => (
              <img key={index} src={src} alt={`Landing content ${index + 1}`} />
            ))}
          </div>
        </div>
      </Col>
    </Row>
  );
};

// --- This is our main HomePage Component ---
const HomePage = () => {
  const { keyword } = useParams();
  const { data: products, isLoading, error } = useGetProductsQuery({ keyword });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          {/* Conditionally show the landing section or a "Search Results" title */}
          {!keyword ? (
            <LandingSection />
          ) : (
            <Link to='/' className='btn btn-light mb-4'>Go Back</Link>
          )}

          {/* This ID is the anchor for our "Get Started" button */}
          <h1 id="latest-products">
            {keyword ? `Search Results for "${keyword}"` : 'Latest Products'}
          </h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomePage;
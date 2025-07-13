// frontend/src/components/CheckoutSteps.jsx (Corrected)

import React from 'react';
import { Nav } from 'react-bootstrap';
// We no longer need LinkContainer, so we import Link from react-router-dom
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      {/* --- Step 1: Sign In --- */}
      

      {/* --- Step 2: Shipping --- */}
      <Nav.Item>
        {step2 ? (
          <Nav.Link as={Link} to="/shipping">
            Shipping
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      {/* --- Step 3: Payment --- */}
      <Nav.Item>
        {step3 ? (
          <Nav.Link as={Link} to="/payment">
            Payment
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      {/* --- Step 4: Place Order --- */}
      <Nav.Item>
        {step4 ? (
          <Nav.Link as={Link} to="/placeorder">
            Place Order
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
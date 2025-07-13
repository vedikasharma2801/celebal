import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductPage = () => {
  // Get the product ID from the URL, and get hooks for dispatch, and navigation
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to manage the quantity selected by the user
  const [qty, setQty] = useState(1);

  // Fetch product details using the RTK Query hook
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  // Handler for the "Add To Cart" button
  const addToCartHandler = () => {
    // Dispatch the addToCart action with the product and selected quantity
    dispatch(addToCart({ ...product, qty }));
    // Navigate the user to the cart page after adding the item
    navigate('/cart');
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row>
          {/* Column 1: Product Image */}
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          {/* Column 2: Product Info */}
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Rating:</b> {product.rating} from {product.numReviews} reviews
              </ListGroup.Item>
              <ListGroup.Item><b>Price:</b> ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                <b>Description:</b> {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Column 3: Add to Cart Box */}
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {/* --- MERGED CHANGE: QUANTITY SELECTOR --- */}
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                {/* ------------------------------------------- */}

                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInstock === 0}
                    onClick={addToCartHandler} // <-- MERGED CHANGE: ONCLICK HANDLER
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductPage;
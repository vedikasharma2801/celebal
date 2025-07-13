// frontend/src/pages/PlaceOrderPage.jsx
import toast from 'react-hot-toast';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card, Container } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateOrderMutation, usePayOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
       if (res.paymentMethod === 'Cash on Delivery') {
        // For COD, we immediately mark the order as 'paid'
        await payOrder({ orderId: res._id, details: { status: 'COD_Placed' } });
      }
      dispatch(clearCartItems());
        if (res.paymentMethod === 'Cash on Delivery') {
                toast.success('Order Placed Successfully! 🎉');
            }
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.alert(err?.data?.message || err.error);
    }
  };

  return (
    <Container>
      <CheckoutSteps step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item><h2>Order Summary</h2></ListGroup.Item>
              <ListGroup.Item><Row><Col>Items:</Col><Col>${cart.itemsPrice}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col>Shipping:</Col><Col>${cart.shippingPrice}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col>Tax:</Col><Col>${cart.taxPrice}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col>Total:</Col><Col>${cart.totalPrice}</Col></Row></ListGroup.Item>
              <ListGroup.Item>{error && <Message variant='danger'>{error.data.message}</Message>}</ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' className='w-100' disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderPage;
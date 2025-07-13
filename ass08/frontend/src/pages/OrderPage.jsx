import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast'; // Import toast for notifications
import Message from '../components/Message';
import Loader from '../components/Loader';
import CheckoutForm from '../components/CheckoutForm';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useCreateStripePaymentIntentMutation,
} from '../slices/ordersApiSlice';

// Load Stripe outside of the component render cycle
const stripePromise = loadStripe('pk_test_51RhbiHFa8g20BpFJmhnZzYOgV5vB87cs9lyrBJaRDGfkWJpERy6fLMm7y7lfl40nx6XMoo6zqj9z6CA4KeCvhws600b67W3odF');

const OrderPage = () => {
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [createStripeIntent, { isLoading: loadingIntent }] = useCreateStripePaymentIntentMutation();

  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (order && order.paymentMethod === 'Stripe' && !order.isPaid) {
      createStripeIntent(orderId)
        .unwrap()
        .then(res => setClientSecret(res.clientSecret))
        .catch(err => toast.error(err?.data?.message || 'Failed to prepare payment.'));
    }
  }, [order, orderId, createStripeIntent]);

  // Options for the Stripe Elements provider
  const appearance = { theme: 'stripe' };
  const options = { clientSecret, appearance };

  // This is the handler that will be passed to the CheckoutForm
  const handleSuccessfulPayment = async (paymentResult) => {
    try {
      await payOrder({ orderId, details: paymentResult });
      refetch(); // Refetch order details to update the UI
      toast.success('Payment Successful! 🎉');
    } catch (err) {
      toast.error(err?.data?.message || 'An error occurred during payment confirmation.');
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <Container className="my-4">
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name: </strong> {order.user.name}</p>
              <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
               {(order.isPaid || order.paymentMethod === 'Cash on Delivery') && (
                order.isDelivered ? (
                  <Message variant="success">Delivered on {new Date(order.deliveredAt).toLocaleDateString()}</Message>
                ) : (
                  <Message variant="info">On the Way</Message>
                )
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p><strong>Method: </strong>{order.paymentMethod}</p>
               {order.paymentMethod === 'Cash on Delivery' ? (
                  <Message variant="warning">Pending Payment (To be paid upon delivery)</Message>
              ) : order.isPaid ? (
                  <Message variant="success">Paid on {new Date(order.paidAt).toLocaleDateString()}</Message>
              ) : (
                  <Message variant="danger">Pending Payment</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row className="align-items-center">
                    <Col md={1}><Image src={item.image} alt={item.name} fluid rounded /></Col>
                    <Col><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                    <Col md={4} className="text-end">{item.qty} x ${item.price.toFixed(2)} = ${(item.qty * item.price).toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item><h2>Order Summary</h2></ListGroup.Item>
              <ListGroup.Item><Row><Col>Items</Col><Col>${order.itemsPrice}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col>Shipping</Col><Col>${order.shippingPrice}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col>Tax</Col><Col>${order.taxPrice}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col><strong>Total</strong></Col><Col><strong>${order.totalPrice}</strong></Col></Row></ListGroup.Item>
              
              {!order.isPaid && order.paymentMethod === 'Stripe' && (
                <ListGroup.Item>
                  {loadingIntent && <Loader />}
                  {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                      <CheckoutForm onSuccessfulPayment={handleSuccessfulPayment} />
                    </Elements>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderPage;
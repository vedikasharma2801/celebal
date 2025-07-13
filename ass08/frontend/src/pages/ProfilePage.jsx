import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

import Message from '../components/Message';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice'; // Import the hook for fetching orders
import { setCredentials } from '../slices/authSlice';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  // --- This is the new data fetching logic ---
  const { data: orders, isLoading: loadingOrders, error: errorOrders } = useGetMyOrdersQuery();
  // ------------------------------------------

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully!');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Container className="my-4">
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='my-2'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter new password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword' className='my-2'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm new password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3'>
              Update
            </Button>
            {loadingUpdateProfile && <Loader />}
          </Form>
        </Col>

        {/* --- This is the new "My Orders" section --- */}
        <Col md={9}>
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant='danger'>
              {errorOrders?.data?.message || errorOrders.error}
            </Message>
          ) : (
            <Table striped hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td>
                      {order.isPaid ? (
                        new Date(order.paidAt).toLocaleDateString()
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        new Date(order.deliveredAt).toLocaleDateString()
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td>
                      <Button as={Link} to={`/order/${order._id}`} className='btn-sm' variant='light'>
                      Details
                    </Button>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
        {/* ------------------------------------------- */}
      </Row>
    </Container>
  );
};

export default ProfilePage;
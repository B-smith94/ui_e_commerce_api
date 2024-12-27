import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Container, ListGroup, Row, Col } from 'react-bootstrap';
import {array, func } from 'prop-types'

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate()

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/orders');
            setOrders(response.data);
            console.log(orders);
        } catch (error) {
            console.error('Error fetching orders', error);
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Orders</h3>
                    <ListGroup>
                        {orders.map(order => (
                            <ListGroup.Item key={order.id} className='d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded'>
                                <p><b>Order ID:</b> {order.id}, Customer ID: {order.customer_id}--
                                <i>Order Date:</i> {order.date},&nbsp; 
                                <i>Expected Delivery:</i> {order.expected_delivery_date},&nbsp; 
                                <i>Products:</i> {order.products.map(product => (
                                    <div key={product.id}>{product.name}</div>
                                ))}</p>
                                <div>
                                    <Button variant='primary' onClick={() => navigate(`/edit-order/${order.id}`)}>Edit</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

OrderList.propTypes = {
    orders: array
}

export default OrderList;
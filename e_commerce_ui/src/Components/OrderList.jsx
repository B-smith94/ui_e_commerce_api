import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, ListGroup, Row, Col, Modal } from 'react-bootstrap';


const OrderList = () => {
    const [orders, setOrders] = useState([]); 
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const fetchOrders = async () => { // fetches data for all orders
        try {
            const response = await axios.get('http://127.0.0.1:5000/orders');
            setOrders(response.data);
            console.log(orders);
        } catch (error) {
            console.error('Error fetching orders', error);
        }
    }

    const deleteOrder = async (id) => { // function to delete a selected order
        try {
            await axios.delete(`http://127.0.0.1:5000/orders/${id}`);
            fetchOrders();
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    useEffect(() => {
        fetchOrders()
    }, [])

    const handleClose = () => {
        setShowSuccessModal(false);
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Orders</h3>
                    <ListGroup>
                        {orders.map(order => (
                            <ListGroup.Item key={order.id} className='d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded'>
                                <p><b>Order ID:</b> {order.id} | Customer ID: {order.customer_id} | 
                                <i> Order Date:</i> {order.date} |&nbsp; 
                                <i>Expected Delivery:</i> {order.expected_delivery_date} |&nbsp; 
                                <i>Products:</i> {order.products.map(product => (
                                    <div key={product.id}>{product.name}(Product ID: {product.id})</div>
                                ))}</p>
                                <div>
                                    <Button variant='danger' onClick={() => deleteOrder(order.id)} className='me-2'>Cancel Order</Button> {/* creates button that will delete the associated order */}
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            
            <Modal show={showSuccessModal} onHide={handleClose}> {/* displays a message to confirm deletion of an order */}
                <Modal.Header closeButton>
                    <Modal.Title>Deletion Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>Order successfully canceled.</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default OrderList;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Modal, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';

const OrderForm = () => {
    const [order, setOrder] = useState({ 
        date: '', 
        customer_id: '', 
        expected_delivery_date: '', 
        product_id: '' 
    });
    const [isSubmitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('')
    const [showSuccessModal, setShowSuccessModal] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://127.0.0.1:5000/orders/${id}`)
                .then(response => {
                    setOrder(response.data);
                    console.log(order);
                })
                .catch(error => setErrorMessage(error.message))
        };
    }, [id])

    const validateForm = () => {
        let errors = {};
        if (!order.customer_id || order.customer_id <=0) errors.customer_id = 'Invalid Customer ID';
        if (!order.product_id || order.product_id <= 0) errors.product_id = 'Invalid Product ID';
        if (!order.date) errors.date = 'Must enter the date ordered';
        if (!order.expected_delivery_date) errors.expected_delivery_date = 'Must enter the expected delivery date'
        setErrors(errors);
        return Object.keys(errors).length
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm() > 0) return;
        setSubmitting(true);
        try {
            if (id) {
                await axios.put(`http://127.0.0.1:5000/orders/${id}`, order)
            } else {
                await axios.post('http://127.0.0.1:5000/orders', order)
            }
            setShowSuccessModal(true);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOrder(prevOrder => ({
            ...prevOrder,
            [name]: value
        }));
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setOrder({ 
            date: '', 
            customer_id: '', 
            expected_delivery_date: '', 
            product_id: '' 
        });
        setSubmitting(false);
        navigate('/orders');
    }

    if (isSubmitting) return <p>Submitting order data...</p>
         
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h3>{id ? 'Update' : 'Make'} an Order</h3>
                {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                <Form.Group controlId="customer_id">
                    <Form.Label>Customer ID:</Form.Label>
                    <Form.Control
                        type='number'
                        name='customer_id'
                        value={order.customer_id}
                        onChange={handleChange}
                        isInvalid={!!errors.customer_id}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.customer_id}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='product_id'>
                    <Form.Label>Product Id:</Form.Label>
                    <Form.Control
                        type='number'
                        name='product_id'
                        value={order.product_id}
                        onChange={handleChange}
                        isInvalid={!!errors.product_id}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.product_id}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='date'>
                    <Form.Label>Date ordered:</Form.Label>
                    <Form.Control
                        type='date'
                        name='date'
                        value={order.date}
                        onChange={handleChange}
                        isInvalid={!!errors.date}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.date}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='expected_delivery_date'>
                    <Form.Label>Expected Delivery Date:</Form.Label>
                    <Form.Control
                        type='date'
                        name='expected_delivery_date'
                        value={order.expected_delivery_date}
                        onChange={handleChange}
                        isInvalid={!!errors.expected_delivery_date}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.expected_delivery_date}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant='primary' type='submit' disabled={isSubmitting}>
                    {isSubmitting ? <Spinner as='span' animation='border' size='sm' /> : 'Submit'}
                </Button>
            </Form>
            
            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Order successfully {id ? 'updated!' : 'completed!'}</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default OrderForm;
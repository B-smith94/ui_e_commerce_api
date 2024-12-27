import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Modal, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';

const OrderForm = () => {
    const [order, setOrder] = useState({ date: '', customerId: '', expectedDeliveryDate: '', productId: '' })
    /*const [currentDate, setCurrentDate] = useState({ year: '', day: '', month: '' });
    const [deliveryDate, setDeliveryDate] = useState({ year: '', day: '', month: '' }); */
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
        if (!order.customerId || order.customerId <=0) errors.customerId = 'Invalid Customer ID';
        if (!order.productId || order.productId <= 0) errors.productId = 'Invalid Product ID';
        if (!order.date) errors.date = 'Must enter the date ordered';
        if (!order.expectedDeliveryDate) errors.expectedDeliveryDate = 'Must enter the expected delivery date'
        setErrors(errors);
        return Object.keys(errors).length
    }
        
    /* const getCurrentDate = () => {
        const timestamp = new Date();
            const year = timestamp.getFullYear();
            const month = timestamp.getMonth();
            const day = (timestamp.getDate())+5;
            setCurrentDate({
                year: {year},
                month: {month},
                day: {day}
            })
    };

    const getExpectedDelivery = () => {
        const timestamp = new Date();
        const year = timestamp.getFullYear();
        const month = timestamp.getMonth();
        const day = timestamp.getDate();
        setCurrentDate({
            year: {year},
            month: {month},
            day: {day} 
        })
    }; */
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm() > 0) return;
        setSubmitting(true);
        try {
            /* getCurrentDate();
            getExpectedDelivery(); */
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
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOrder(prevOrder => ({
            ...prevOrder,
            [name]: value
        }));
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setOrder({ date: '', customerId: '', expectedDeliveryDate: '', productId: '' });
        setSubmitting(false);
        navigate('/orders');
    }

    if (isSubmitting) return <p>Submitting order data...</p>
         
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h3>{id ? 'Edit' : 'Make'} an Order</h3>
                {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                <Form.Group controlId="customerId">
                    <Form.Label>Customer ID:</Form.Label>
                    <Form.Control
                        type='number'
                        name='customerId'
                        value={order.customerId}
                        onChange={handleChange}
                        isInvalid={!!errors.customerId}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.customerId}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='productId'>
                    <Form.Label>Product Id:</Form.Label>
                    <Form.Control
                        type='number'
                        name='productId'
                        value={order.productId}
                        onChange={handleChange}
                        isInvalid={!!errors.productId}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.productId}
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

                <Form.Group controlId='expectedDeliveryDate'>
                    <Form.Label>Expected Delivery Date:</Form.Label>
                    <Form.Control
                        type='date'
                        name='expectedDeliveryDate'
                        value={order.expectedDeliveryDate}
                        onChange={handleChange}
                        isInvalid={!!errors.expectedDeliveryDate}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.expectedDeliveryDate}
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
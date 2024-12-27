import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Modal, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';

const CustomerForm = () =>{
    const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });
    const [isSubmitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('')
    const [showSuccessModal, setShowSuccessModal] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://127.0.0.1:5000/customers/${id}`)
                .then(response => {
                    setCustomer(response.data);
                    console.log(customer);
                })
                .catch(error => setErrorMessage(error.message))
        };
    }, [id])

    const validateForm = () => {
        let errors = {};
        if (!customer.name) errors.name = 'Name is required';
        if (!customer.email) errors.email = 'Email is required';
        if (!customer.phone) errors.phone = 'Phone is required';
        setErrors(errors);
        return Object.keys(errors).length;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm() > 0) return;
        setSubmitting(true);
        try {
            if (id) {
                await axios.put(`http://127.0.0.1:5000/customers/${id}`, customer); 
            } else {
                await axios.post('http://127.0.0.1:5000/customers', customer);
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
        setCustomer(prevCustomer => ({
            ...prevCustomer,
            [name]: value
        }));
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setCustomer({ name: '', email: '', phone: ''});
        setSubmitting(false);
        navigate('/customers');
    }

    if (isSubmitting) return <p>Submitting customer data...</p>

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h3>{id ? 'Update' : 'Add'} Customer</h3>
                {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                <Form.Group controlId="customerName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type="text"
                        name='name'
                        value={customer.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                        placeholder='First and last name'
                        />
                    <Form.Control.Feedback type='invalid'>
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="customerEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="text"
                        name='email'
                        value={customer.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        placeholder='example123@example.com'
                        />
                    <Form.Control.Feedback type='invalid'>
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group controlId="customerPhone">
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control
                        type="tel"
                        name='phone'
                        value={customer.phone}
                        onChange={handleChange}
                        isInvalid={!!errors.phone}
                        placeholder='123-456-7890'
                        />
                    <Form.Control.Feedback type='invalid'>
                        {errors.phone}
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
                <Modal.Body>Customer has been successfully {id ? 'updated' : 'added'}!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CustomerForm;
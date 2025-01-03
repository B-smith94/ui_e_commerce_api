import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Alert, Modal, Spinner } from "react-bootstrap";

const CustomerForm = () => {
    const [customer, setCustomer] = useState({ name: '', email: '', phone: ''} );
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => { // When an ID is set in the URL, this pulls data based on that ID and sets the customer state to that information
        if (id) {
            axios.get(`http://127.0.0.1:5000/customers/${id}`)
                .then(response => {
                    setCustomer(response.data);
                    console.log(customer);
                })
                .catch(error => setErrorMessage(error.message));
        }
    }, [id])

    const validateForm = () => { // if any of the fields are left blank, these messages are logged in the errors state
        let errors = {};
        if (!customer.name) errors.name = 'Customer name is requried';
        if (!customer.email) errors.email = 'Customer email is required';
        if (!customer.phone) errors.phone = 'Customer phone is required';
        setErrors(errors);
        return Object.keys(errors).length;
    };

    const handleSubmit = async (event) => { // validates the form, updates the database with inputs in the form, logs errors that occur
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

    const handleChange = (event) => { // updates changed fields without removing any other key value pairs in the customer state
        const { key, value } = event.target;
        setCustomer(prevCustomer => ({
            ...prevCustomer,
            [key]: value
        }));
    }

    const handleClose = () => { // resets the various states to their default values
        setShowSuccessModal(false);
        setCustomer({ name: '', email: '', phone: '' });
        setSubmitting(false);
        navigate('/customers');
    }

    if (isSubmitting) return <p>Submitting product data...</p>

    return ( // renders form
        <>
            <Form onSubmit={handleSubmit}>
                <h3>{id? 'Edit' : 'Add'} Customer</h3>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form.Group controlId="customerName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        type="text"
                        name="name"
                        value={customer.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="customerEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control 
                        type="text"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="customerPhone">
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control 
                        type="tel"
                        name="phone"
                        value={customer.phone}
                        onChange={handleChange}
                        isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phone}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <Spinner as="span" animation="border" size="sm" /> : 'Submit'}
                </Button>
            </Form>    

            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Customer had been successfully {id ? 'updated' : 'added'}!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CustomerForm;
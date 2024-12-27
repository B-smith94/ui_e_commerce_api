import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';

const OrderForm = () => {
    const [order, setOrder] = useState({ date: '', customerId: '', expectedDeliveryDate: '', productId: '' })
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
                    setOrder(response.data);
                })
                .catch(error => setErrorMessage(error.message))
        };
    }, [id])

    return (
        <div>
            <h3>{id ? 'Edit' : 'Make'} an Order</h3>
            <h2>Component Under Construction</h2>
            <p>We will update very soon!</p>
        </div>
    )
}

export default OrderForm;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Alert, Modal, Spinner } from "react-bootstrap";

const ProductForm = () => {
    const [product, setProduct] = useState({ name: '', price: '' });
    const [errors, setErrors] = useState({}) 
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    useEffect(() => { // retrieves specific product data if an id is provided in the URL
        if (id) {
            axios.get(`http://127.0.0.1:5000/products/${id}`)
                .then(response => {
                    setProduct(response.data);
                    console.log(product);
                })
                .catch(error => setErrorMessage(error.message));
        }
    }, [id])
    
    const validateForm = () => { // Makes sure that each field is filled out before submission
        let errors = {};
        if (!product.name) errors.name = 'Product name is required';
        if (!product.price || product.price <= 0) errors.price = 'Price must be a positive number';
        setErrors(errors); 
        return Object.keys(errors).length
    };

    const handleSubmit = async (event) => {  // If validation was successful, updates the API with new information
        event.preventDefault(); 
        if (validateForm() > 0) return;
        setSubmitting(true);
        try {
            if (id) {
                await axios.put(`http://127.0.0.1:5000/products/${id}`, product);   
            } else {
                await axios.post('http://127.0.0.1:5000/products', product);
            }
            setShowSuccessModal(true);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (event) => { // Preserves unchanged information while allowing you to update product information
        const { name, value } = event.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleClose = () => { // resets the product state to default
        setShowSuccessModal(false);
        setProduct({ name: '', price: '' });
        setSubmitting(false);
        navigate('/products'); 
    }

    if (isSubmitting) return <p>Submitting product data...</p>

    return (
        <> 
            <Form onSubmit={handleSubmit}>
                <h3>{id ? 'Edit' : 'Add'} Product</h3>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form.Group controlId="productName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="productPrice">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        isInvalid={!!errors.price}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.price}
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
                <Modal.Body>Product has been successfully {id ? 'updated' : 'added'}!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProductForm;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Container, ListGroup, Row, Col, Modal } from 'react-bootstrap';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    
    const fetchProducts = async () => { // Fetches data from the Products table in the API
        try {
            const response = await axios.get('http://127.0.0.1:5000/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products', error);
        }
    }

    const deleteProduct = async (id) => { // funciton to delete selected product
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${id}`);
            fetchProducts();
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleClose = () => {
        setShowSuccessModal(false);
    }

    useEffect(() => { 
        fetchProducts()
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Products</h3>
                    <ListGroup>
                        {products.map(product => (
                            <ListGroup.Item key={product.id} className='d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded'>
                                <b>{product.name}</b> ID: {product.id} | Price: ${product.price}
                                <div>
                                    <Button variant='primary' onClick={() => navigate(`/edit-product/${product.id}`)} className='me-2'>Edit</Button>{/* redirects to the Edit Product page and fills the form element with selected data to edit */}
                                    <Button variant='danger' onClick={() => deleteProduct(product.id)} className='me-2'>Delete</Button>{/* deletes product */}
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>

            <Modal show={showSuccessModal} onHide={handleClose}> {/* confirms product deletion */}
                <Modal.Header closeButton>
                    <Modal.Title>Deletion Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>Product successfully deleted.</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ProductList;

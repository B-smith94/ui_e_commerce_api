import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Container, ListGroup, Row, Col } from 'react-bootstrap';
import {array, func } from 'prop-types'

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/products');
            setProducts(response.data);
            console.log(products);
        } catch (error) {
            console.error('Error fetching products', error);
        }
    }

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

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
                                <b>{product.name}</b> (ID: {product.id}) (Price: ${product.price})
                                <div>
                                    <Button variant='primary' onClick={() => navigate(`/edit-product/${product.id}`)} className='me-2'>Edit</Button>
                                    <Button variant='danger' onClick={() => deleteProduct(product.id)} className='me-2'>Delete</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

ProductList.propTypes = {
    products: array,
    onEditProduct: func,
    onProductDelete: func
}

export default ProductList;

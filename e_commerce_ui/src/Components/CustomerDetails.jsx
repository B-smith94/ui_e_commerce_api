import { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Container, ListGroup, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {array, func } from 'prop-types'

const CustomerDetails= () => {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate()

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/customers');
            setCustomers(response.data);
            console.log(customers);
        } catch (error) {
            console.error('Error fetching products', error);
        }
    }

    const deleteCustomer = async (customerId) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${customerId}`);
            fetchCustomers();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    
    useEffect(() => {
        fetchCustomers()
    }, [])

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Customers</h3>
                    <ListGroup>
                        {customers.map(customer => (
                            <ListGroup.Item key={customer.id} className='d-flex justify-content-evenly align-items-center shadow-sm p-3 mb-3 bg-white rounded'>
                                <b>{customer.name}</b> (ID: {customer.id}) (Email: {customer.email}) (Phone: {customer.phone})
                                <div>
                                    <Button variant="primary" onClick={() => navigate(`/edit-customer/${customer.id}`)} className='me-2'>Edit</Button>
                                    <Button variant="danger" onClick={() => deleteCustomer(customer.id)} className='me-2'>Delete</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

CustomerDetails.propTypes = {
    customers: array,
    onEditCustomer: func,
    onCustomerDelete: func
}

export default CustomerDetails;
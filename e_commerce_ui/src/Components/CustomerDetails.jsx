import { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Container, ListGroup, Col, Row, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CustomerDetails= () => {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate()
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const fetchCustomers = async () => { // Fetches the customer data from the Customers table
        try {
            const response = await axios.get('http://127.0.0.1:5000/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers', error);
        }
    }

    const deleteCustomer = async (customerId) => { // Removes selected customer from the API
        try {
            await axios.delete(`http://127.0.0.1:5000/customers/${customerId}`);
            fetchCustomers();
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const handleClose = () => {
        setShowSuccessModal(false);
    }
    
    useEffect(() => { // sets fetchCustomers to run once on mount
        fetchCustomers()
    }, [])

    return ( // Configuration of display of customer details, including name, email, and phone number.  Also includes buttons for editing and deleting
        <Container>
            <Row>
                <Col>
                    <h3>Customers</h3>
                    <ListGroup>
                        {customers.map(customer => (
                            <ListGroup.Item key={customer.id} className='d-flex justify-content-evenly align-items-center shadow-sm p-3 mb-3 bg-white rounded'>
                                <b>{customer.name} | ID: {customer.id})</b> | <i>Email:</i> {customer.email} | <i>Phone:</i> {customer.phone}
                                <div>
                                    <Button variant='primary' onClick={() => navigate(`/edit-customer/${customer.id}`)} className='me-2'>Edit</Button>{/* redirects to the form for editing customer details */}
                                    <Button variant="danger" onClick={() => deleteCustomer(customer.id)} className='me-2'>Delete</Button> {/* deletes customers */}
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>

            <Modal show={showSuccessModal} onHide={handleClose}>{/* Displays to confirm when Customer Details were successfully deleted */}
                <Modal.Header closeButton>
                    <Modal.Title>Deletion Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>Customer details successfully deleted.</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default CustomerDetails;
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function NavigationBar () { // sets up Navigation bar
    return (
        <nav className="clearfix">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/" className="p-2" >E-Commerce App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} to="/" activeclassname="active">
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/add-customer" activeclassname="active">
                            Add Customer
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/customers" activeclassname="active">
                            Customers
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/add-product" activeclassname="active">
                            Add Product
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/products" activeclassname="active">
                            Products
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/new-order" activeclassname="active">
                            Make an Order
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/orders" activeclassname="active">
                            Active Orders
                        </Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </nav>
    )
}
export default NavigationBar;

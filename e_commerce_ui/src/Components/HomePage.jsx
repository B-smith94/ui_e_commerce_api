import { Link } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";

function HomePage () { // Provides welcome message and links to various parts of the application
    return (
        <div>
            <h1>Welcome to Our E-Commerce App</h1>
            <p>This is the place to find all your needs at one click.</p>
            <Nav.Link as={Link} to="/add-customer" className="mb-2">
                <Button>Click Here to Add a New Customer</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/customers" className="mb-2">
                <Button>Click Here to View Current Customers</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/add-product" className="mb-2">
                <Button>Click Here to Add a New Product</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className="mb-2">
                <Button>Click Here to View Products</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/new-order" className="mb-2">
                <Button>Click here to Make an Order</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/orders" className="mb-2">
                <Button>Click here to View Active Orders</Button>
            </Nav.Link>
        </div>
    )
}

export default HomePage;
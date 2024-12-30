import { Link } from "react-router-dom";

function NotFound() { // If a page is not found, this page loads and provides a link to take you back to the homepage
    return (
        <div>
            <h2>404 - Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <p>You can always go back to the <Link to="/">homepage</Link>.</p>
        </div>
    )
}

export default NotFound;
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button, Navbar as BSNavbar, Container, Nav } from 'react-bootstrap'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <BSNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BSNavbar.Brand as={Link} to="/">CRUD App</BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Button variant="outline-light" onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  )
}
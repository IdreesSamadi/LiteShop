import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { CartFill, PersonFill } from 'react-bootstrap-icons'

const Header: React.FC = () => {
  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">LiteShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse>
            <Nav className="ml-auto">
              <Nav.Link href="/cart">
                <CartFill className="h5 mr-1" />
                Cart
              </Nav.Link>
              <Nav.Link href="/login">
                <PersonFill className="h5 mr-1" />
                Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

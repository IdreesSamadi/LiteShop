import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { CartFill, PersonFill } from 'react-bootstrap-icons'
import { LinkContainer } from 'react-router-bootstrap'

const Header: React.FC = () => {
  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>LiteShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse>
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <CartFill className="h5 mr-1" />
                  Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <PersonFill className="h5 mr-1" />
                  Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

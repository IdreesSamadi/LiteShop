import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { CartFill, PersonFill, BoxArrowRight } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

import { logout } from '../store/actions/user'
import { AppState } from '../store/store'

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: AppState) => state.userLogin)

  const logoutHandler = () => {
    dispatch(logout())
  }
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
              {userInfo ? (
                <>
                  <LinkContainer to="/profile">
                    <Nav.Link>
                      <PersonFill className="h5 mr-1" />
                      Profile
                    </Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={logoutHandler}>
                    <BoxArrowRight className="h5 mr-1" />
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <PersonFill className="h5 mr-1" />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

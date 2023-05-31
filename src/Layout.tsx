import './sticky-footer-navbar.css';
import React, { ReactNode } from "react"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { navigationRoot } from './common';

export interface LayoutProp {
  title?: string;
  children?: ReactNode;
}

export function Layout(prop: LayoutProp) {
  const { title, children } = prop;
  document.title = title || document.title;

  return (
    <>

      <header>
        <Navbar bg="dark" variant="dark" expand="md">
          <Container>

            <Navbar.Brand href={navigationRoot.fullpath}>{navigationRoot.title}</Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >

                {navigationRoot.children === undefined
                  ? (<></>)
                  : navigationRoot.children.map(child => (
                    <>
                      {child.children === undefined
                        ? (<Nav.Link href={child.fullpath} disabled={child.element === null}>{child.title}</Nav.Link>)
                        : (
                          <NavDropdown title={child.title} id="navbarScrollingDropdown">
                            <NavDropdown.Item href={child.fullpath} disabled={child.element === null}>{child.title}</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {child.children.map(grand => (
                              <NavDropdown.Item href={grand.fullpath} disabled={grand.element === null}>{grand.title}</NavDropdown.Item>
                            ))}
                          </NavDropdown>
                        )
                      }
                    </>
                  ))}

              </Nav>

              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>

            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {/* Begin page content */}
      <main role="main" className="container">
        {children
          ? children
          : (
            <>
              <h1 className="mt-5">Sticky footer with fixed navbar</h1>
              <p className="lead">Pin a fixed-height footer to the bottom of the viewport in desktop browsers with this custom HTML and CSS. A fixed navbar has been added with <code>padding-top: 60px;</code> on the <code>body &gt; .container</code>.</p>
              <p>Back to <a href="../sticky-footer/">the default sticky footer</a> minus the navbar.</p>
            </>
          )}
      </main>

      <footer className="footer">
        <div className="container">
          <span className="text-muted">Place sticky footer content here.</span>
        </div>
      </footer>

    </>
  );
}
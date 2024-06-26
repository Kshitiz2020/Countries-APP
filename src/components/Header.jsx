import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import LoginButton from "./LoginButton";
import Logout from "./LogoutButton";
import RegisterButton from "./RegisterButton";
import { Link } from "react-router-dom";

// import { onAuthStateChanged } from "firebase/auth"
// import { useEffect, useState } from "react"
// import { auth } from "../config/config"
import ProfileIcon from "./ProfileIcon";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const authValues = useAuth();

  // const [userSignedIn, setUserSignedIn] = useState(false)

  return (
    <Container fluid>
      <Row>
        <Navbar bg="light" variant="light">
          <Container className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Link to="/">
                  <Button variant="contained">Home</Button>
                </Link>
                <Link to="/countries">
                  <Button variant="contained">Countries</Button>
                </Link>
                <Link to="/favourites">
                  <Button variant="contained">Favourites</Button>
                </Link>
              </Nav>
              {/*   <div className="login"> */}
              {!authValues?.user && (
                <Nav>
                  <Link to="/login">
                    <Button variant="contained">Login</Button>
                  </Link>
                </Nav>
              )}
              {authValues?.user && <ProfileIcon />}

              {authValues?.user ? (
                <Nav>
                  <Link to="/">
                    <Logout />
                  </Link>
                </Nav>
              ) : null}
              {!authValues?.user && (
                <Nav>
                  <Link to="/register">
                    <Button variant="contained">Register</Button>
                  </Link>
                </Nav>
              )}

              {/*      </div> */}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
    </Container>
  );
};

export default Header;

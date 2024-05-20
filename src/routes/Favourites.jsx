import { useEffect } from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";
import { Button } from "react-bootstrap";
import { getFavourites, deleteFavourite } from "../store/favouritesSlice";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Favourites = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const favourites = useSelector((state) => state.favourites.favourites);

  // TODO: Implement logic to retrieve favourites later.
  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavourites(user?.uid));
  }, [dispatch, user]);

  return (
    <Container fluid>
      {user ? (
        <Row xs={2} md={3} lg={4} className=" g-3">
          {favourites?.map((country, idx) => (
            <Col key={country.name.official} className="mt-5">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  className="rounded h-50"
                  src={country.flags.svg}
                  style={{
                    objectFit: "cover",
                    minHeight: "200px",
                    maxHeight: "200px",
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{country.name.common}</Card.Title>
                  <Card.Subtitle className="mb-5 text-muted">
                    {country.name.official}
                  </Card.Subtitle>
                  <ListGroup
                    variant="flush"
                    className="flex-grow-1 justify-content-end"
                  >
                    <ListGroup.Item>
                      <i className="bi bi-translate me-2"></i>
                      {Object.values(country.languages ?? {}).join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="bi bi-cash-coin me-2"></i>
                      {Object.values(country.currencies || {})
                        .map((currency) => currency.name)
                        .join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {country.population.toLocaleString()}
                      <Button
                        onClick={() =>
                          dispatch(
                            deleteFavourite({
                              docId: user?.uid,
                              countryName: country?.name.common,
                            })
                          )
                        }
                      >
                        Remove
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div
          style={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "1.25rem",
          }}
        >
          <span>
            Please <Link to="/login">Login</Link> or{" "}
            <Link to="/register">Register</Link>
          </span>
        </div>
      )}
    </Container>
  );
};

export default Favourites;

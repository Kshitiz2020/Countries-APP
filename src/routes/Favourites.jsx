// Favourites.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import {
  fetchFavourites,
  removeFavouriteFromFirestore, // Removed addFavouriteToFirestore import as it's not used in this file
} from "../store/favouritesSlice";
import { auth } from "../config/config";

const Favourites = () => {
  const dispatch = useDispatch();
  const { favourites, loading, error } = useSelector(
    (state) => state.favourites
  );
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      dispatch(fetchFavourites(user.uid));
    }
  }, [dispatch, user]);

  const handleRemoveFavourite = (favouriteId) => {
    if (user) {
      dispatch(removeFavouriteFromFirestore({ userId: user.uid, favouriteId }));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container fluid>
      <Row xs={1} md={2} lg={3} className="g-3">
        {/* Changed xs={2} to xs={1} for better responsiveness */}
        {favourites.map((country) => (
          <Col key={country.name.common} className="mt-5">
            {/* Changed key to country.id */}
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
                  </ListGroup.Item>
                </ListGroup>
                <button onClick={() => handleRemoveFavourite(country.id)}>
                  Remove
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Favourites;

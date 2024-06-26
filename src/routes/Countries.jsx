import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button, Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import NoUserModel from "../components/NoUserModal";

import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";
import { addFavourites } from "../store/favouritesSlice";
import { useAuth } from "../contexts/AuthContext";

const Countries = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const [showNoUserModel, setShowNoUserModel] = useState(false);

  const favouriteCountryNames = favouritesList?.map((country) => {
    return country.name.common;
  });
  //console.log(countriesList[0]);

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  if (loading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  return (
    <Container fluid>
      <NoUserModel
        showNoUserModel={showNoUserModel}
        setShowNoUserModel={setShowNoUserModel}
      />

      <Row xs={2} md={3} lg={4} className=" g-3">
        {countriesList.map((country) => (
          <Col key={country.name.official} className="mt-5">
            <Card className="h-100">
              <FavoriteIcon
                color={
                  favouriteCountryNames?.includes(country.name.common)
                    ? "primary"
                    : "dark"
                }
                onClick={() => {
                  if (!user) return setShowNoUserModel(true);
                  return dispatch(
                    addFavourites({ docId: user?.uid, newDataToAdd: country })
                  );
                }}
              />
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
                <Link to={`/countries/${country.name.common}`}>
                  <Button variant="primary">Country Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Countries;

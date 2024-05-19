import { useEffect } from "react";
import { auth, db } from "../config/config";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";
import { Button } from "react-bootstrap";
import { removeFavourite } from "../store/favouritesSlice";
import { getDocs, collection } from "firebase/firestore";

const Favourites = async () => {
  const dispatch = useDispatch();

  //const userDoc = {};
  /*   try {
    const usersCollection = await getDocs(collection(db, `users`));
    usersCollection.forEach((userData) => {
      if (userData.data().email === auth.currentUser.email) {
        userDoc.docID = userData.id;
        userDoc.data = userData.data();
      }
    });
  } catch (error) {
    console.error(error);
  } */

  //const favourites = useSelector((state) => state.favourites.favourites);
  const favourites = [];

  // TODO: Implement logic to retrieve favourites later.
  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  const clearFav = (countryCommonName) => {
    //logic
    //console.log(countryCommonName);
    dispatch(removeFavourite(countryCommonName));
  };

  return (
    <Container fluid>
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
                  </ListGroup.Item>
                  <Button onClick={() => clearFav(country.name.common)}>
                    Remove
                  </Button>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Favourites;

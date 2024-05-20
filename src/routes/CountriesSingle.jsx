import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";

import { Button, Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";

const CountriesSingle = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCountries());
  }, []);

  const countriesList = useSelector((state) => state.countries.countries);

  const { single } = useParams();

  const myCountry = countriesList.filter(
    (country) => country.name.common === single
  )[0];

  const neighbor = myCountry?.borders?.map((borderCode) => {
    return countriesList.filter((country) => {
      return country?.cca3 === borderCode;
    })[0];
  });

  //? name xaina vaney tyo dekhi ko right processing nagreny
  //(value xaina vaney tyo vnda uta preocess nagrney)
  return (
    <Container>
      <h2 className="text-center"> {single}'s Neighbor</h2>

      <Row xs={2} md={3} lg={4} className=" g-3">
        {neighbor?.map((country) => (
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
                </ListGroup>
                <Link to={`/countries/${country.name.common}`}>
                  <Button
                    onClick={() => console.log(country.name.common)}
                    variant="primary"
                  >
                    Country Details
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <a target="_blank" href={myCountry?.maps.googleMaps}>
        {myCountry?.name.common} GoogleMap
      </a>
    </Container>
  );
};

export default CountriesSingle;

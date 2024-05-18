import React from "react";
import Container from "react-bootstrap/Container";

const Home = () => {
  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center">Welcome to Virtual Tour!</h1>
      <p className="lead mb-4 text-center">
        Embark on a journey across the globe from the comfort of your own home
        with Virtual Tour. Explore the wonders of different countries, discover
        fascinating cultures, and immerse yourself in breathtaking
        landscapes—all at your fingertips.
      </p>
      <p className="text-muted text-center">Start your adventure today!</p>
    </Container>
  );
};

export default Home;

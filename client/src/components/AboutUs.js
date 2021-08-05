import React from "react";
import { Container, Row, Col, Figure } from "react-bootstrap";

const AboutuS = () => {
  return (
    <div>
      <br />
      <br />
      <Container style={{ width: "85%", marginLeft: "10%" }}>
        <Row>
          <Col sm={6}>
            <Figure.Caption><br /><br /><br /><br /><br /><br />
              CarShar is a 100% Tunisian trustworthy community platform, which
              makes it possible to offer trips throughout Tunisia. To achieve
              this service, we had to find a dynamic, passionate team with a
              common goal: to offer the best carpooling experiences possible.
            </Figure.Caption>
          </Col>
          <Col sm={6}>
            <Figure>
              <Figure.Image
                width={400}
                height={500}
                alt="180x200"
                src="/images/cov.PNG"
              />
              <Figure.Caption>
                Hope our Site was offren to you the best experience.
              </Figure.Caption>
            </Figure>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
    </div>
  );
};

export default AboutuS;

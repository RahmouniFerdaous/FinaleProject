import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Row, Col } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
}));
const TripDetails = ({ trip }) => {
  const classes = useStyles();
  return (
    <Card
      style={{
        background: "#fceabb" ,
        background:
          "-webkit-linear-gradient(to right, #fceabb, #f8b500)" ,
        background:
          "linear-gradient(to right, #fceabb, #f8b500)" ,
      }}
      className={classes.card}
    >
      <CardContent className={classes.cardContent}>
        <Container>
          <Row>
            <Col>
              <Typography gutterBottom variant="h6" component="h4">
                <i class="bi bi-geo-alt">{trip.from}</i>
              </Typography>
              <Typography gutterBottom variant="h6" component="h4">
                <i class="bi bi-cursor">{trip.to}</i>
              </Typography>
            </Col>
            <Col>
              <span>{trip.price.$numberDecimal} DT</span>
            </Col>
            <Col>
              <i class="bi bi-truck"></i>
              <i class="fa fa-car" aria-hidden="true"></i>
              <span> {trip.carModel}</span>
            </Col>
          </Row>
        </Container>
      </CardContent>
      <CardActions>
        <Button href="/searchRide" size="small" color="primary">
          RESERVE NOW!
        </Button>
      </CardActions>
    </Card>
  );
};

export default TripDetails;

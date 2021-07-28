import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Row, Col, Image } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { getAllTrips } from "../redux/actions/tripActions";

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
const cards = [1, 2, 3, 4, 5, 6];

function HomePage() {
  const classes = useStyles();

  //dispatch action
  const dispatch = useDispatch();
  // component did mount
  useEffect(() => {
    dispatch(getAllTrips());
  }, []);
  return (
    <main>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container>
          <Row>
            <Col>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Car Sharing
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                CarShar connecting people who need to travel with drivers who
                have empty seats. Trusted Carpooling, fully insured!
              </Typography>
            </Col>
            <Col>
              <Image src="/images/homePic.PNG" />
            </Col>
          </Row>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button variant="contained" color="primary">
                  Search a Ride
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Offer a Ride
                </Button>
              </Grid>
            </Grid>
          </div>
          <br />
          <br />
          <br />
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Why you'll love CarShar
          </Typography>
          <br />
          <Row>
            <Col className="icons">
              <i class="bi bi-person-fill"></i>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                IN CONTROL
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                Verified Member profiles mean you know exactly who you're
                travelling with.
              </Typography>
            </Col>
            <Col className="icons">
              <i class="bi bi-file-earmark-person-fill"></i>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                CARPOOL WITH CONFIDENCE
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                ID verification adds another level of security of member
                profiles
              </Typography>
            </Col>
            <Col className="icons">
              <i class="bi bi-hand-thumbs-up-fill"></i>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                YOU RIDE IS FULLY INSURED
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                You can get comfort, spend less money and know new persons
              </Typography>
            </Col>
          </Row>
          <br />
          <br />
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Thousands of departures every day
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
          >
            WHERE DO YOU WANT TO GO?
          </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Container>
                    <Row>
                      <Col>
                        <Typography gutterBottom variant="h6" component="h2">
                          <i class="bi bi-geo-alt">Tunis</i>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                          <i class="bi bi-cursor">Sousse</i>
                        </Typography>
                      </Col>
                      <Col>
                        <i class="bi bi-currency-dollar">
                          <span>8.5 DT</span>
                        </i>
                      </Col>
                    </Row>
                  </Container>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <i class="bi bi-truck"></i>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}

export default HomePage;

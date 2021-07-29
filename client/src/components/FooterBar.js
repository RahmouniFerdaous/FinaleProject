import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const FooterBar = () => {
    return (
      <Container>
          <br/>
          <br/>
        <Row>
        <Col>
        <p>Contact Us</p>
        </Col>
          <Col  className="social-links">
            <a href="https://github.com/RahmouniFerdaous"
                   target="_blank"
                   rel="noopener noreferrer"><i class="bi bi-github"></i>
            </a>
                

            <a  href="https://www.facebook.com/FerdaousRahmouni"
                target="_blank"
                rel="noopener noreferrer"><i class="bi bi-facebook"></i>
            </a>

            <a  href="https://www.instagram.com/?hl=fr"
                target="_blank"
                rel="noopener noreferrer"><i class="bi bi-instagram"></i>
            </a>
                
            <a href="https://www.linkedin.com/in/ferdaous-rahmouni-57b389108/"
               target="_blank" 
               rel="noopener noreferrer"><i class="bi bi-linkedin"></i>
            </a>
        </Col>
        </Row>
        <Row>
          <Col>
        <Box mt={1}>
        <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="#">
          CarShar. All rights reserved.
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      </Box>
      </Col>
      </Row>
      </Container>
    )
}

export default FooterBar

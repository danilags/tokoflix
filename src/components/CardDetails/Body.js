import React from 'react';
import {
  Row,
  Col,
  CardBody,
  CardText
} from 'reactstrap';

import { IMAGE_BASE_URL } from '../../constants';

const Body = (props) => (
  <Row>
    <Col md={8}> 
      <CardBody>
        <h3>{props.film.original_title}</h3>
        <CardText>
          {props.film.overview}
        </CardText>
      </CardBody>
    </Col>
    <Col md={4}>
      <div style={{ margin: '20px' }}>
        <img style={{ width: '100%' }} src={`${IMAGE_BASE_URL}${props.film.poster_path}`} alt="Generic placeholder image" />
      </div>
    </Col>
  </Row>
);

export default Body;

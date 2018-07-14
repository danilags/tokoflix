import React from 'react';
import {
  Row,
  Col,
  Media
} from 'reactstrap';

import { IMAGE_BASE_URL } from '../../constants';

const Banner = (props) => (
  <Row>
    <Col>
      <Media className="mt-1">
        <Media heading>
          <img style={{ width: '100%' }} src={`${IMAGE_BASE_URL}${props.film.backdrop_path}`} alt="Generic placeholder image" />
        </Media>
      </Media>
    </Col>
  </Row>
);

export default Banner;

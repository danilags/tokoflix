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
          {
            props.film.backdrop_path === null ?
            <img
              style={{ width: '50%' }} 
              src={`http://pixselo.com/wp-content/uploads/2018/03/dummy-placeholder-image-400x400.jpg`}
              alt={`${props.film.title}`} 
            />
            :
            <img 
              style={{ width: '100%' }}
              src={`${IMAGE_BASE_URL}${props.film.backdrop_path}`} 
              alt={`${props.film.title}`} 
            />
          }
        </Media>
      </Media>
    </Col>
  </Row>
);

export default Banner;

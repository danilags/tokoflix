import React from 'react';
import {
  Card,
  CardBody,
  CardText,
  Media
} from 'reactstrap';

import { IMAGE_BASE_URL } from '../constants';

const SimilarMovie = ({ item }) => (
  <Card>
    <CardBody>
      <Media className="mt-1">
        <Media heading>
          <img style={{ width: '100%' }} src={`${IMAGE_BASE_URL}${item.backdrop_path}`} alt={item.title} />
        </Media>
      </Media>
      <CardText>
        <h3 style={{ color: '#4a4a4a' }}>{item.title}</h3>
      </CardText>
      <p>{item.overview}</p>
    </CardBody>
  </Card>
);

export default SimilarMovie;

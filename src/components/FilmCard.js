import React from 'react';
import { IMAGE_BASE_URL } from '../constants';

import {
  Card,
  CardBody,
  CardTitle,
  CardText,
} from 'reactstrap';

const FilmCard = (props) => (
  <Card style={styles.container}>
    <CardBody>
      <img style={{ width: '100%'  }} src={`${IMAGE_BASE_URL}${props.film.poster_path}`} alt="Card image cap" />
    </CardBody>
    <CardBody>
      <CardTitle>{props.film.title}</CardTitle>
      <CardText>
        <span style={{ padding: '2px' }}>{props.film.release_date} </span> | 
        <span style={{ padding: '2px' }}>{props.film.vote_average} </span> |
        <spn style={{ padding: '2px' }}>{props.film.adult ? 'Dewasa' : 'Remaja'}</spn>
      </CardText>
    </CardBody>
  </Card>
)
const styles = {
  container: {
    margin: '2rem 0',
  }
}

export default FilmCard;

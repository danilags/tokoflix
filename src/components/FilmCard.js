import React from 'react';
import { IMAGE_BASE_URL } from '../constants';

import {
  Card,
  CardImg,
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
      <CardTitle>Card subtitle</CardTitle>
      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
    </CardBody>
  </Card>
)
const styles = {
  container: {
    margin: '2rem 0',
  }
}

export default FilmCard;

import React from 'react';

import {
  Card,
  CardBody,
  CardText,
  Row,
  Col,
  Badge,
  ButtonGroup,
  Button,
  Media
} from 'reactstrap';

import { converDate, convertPrice, convertToRupiah } from '../../utils';

const Header = (props) => (
  <CardBody style={{ padding: '10px' }}>
    <Row>
      <Col md={10}><h1>{props.film.title}</h1></Col>
      <Col md={2}>
        <Badge>
          <h2>{props.film.vote_average}/10</h2>
          <p>{props.film.vote_count} Voters</p>
        </Badge>
      </Col>
    </Row>
    <ButtonGroup>
    {
      props.film.genres.map((item, index) =>(
        <Button key={index} color="success" style={{ marginRight: '2px', marginBottom: '2px' }}>{item.name}</Button>
      ))
    }
    </ButtonGroup>
    <Row>
      <Col>
        <p>
          {props.film.imdb_id !== null ? props.film.imdb_id.toUpperCase() : '-' } | 
          {converDate(props.film.release_date)} (US) | 
          { props.film.runtime } minutes | 
          IDR. {convertToRupiah(convertPrice(props.film.vote_average))} 
        </p>
      </Col>
    </Row>
    <Row>
      <Col>
        <Button size="lg" block onClick={() => props.onBuyMovie(props.film.vote_average)} color="success" block>Beli</Button>
      </Col>
    </Row>
  </CardBody> 
);

export default Header;

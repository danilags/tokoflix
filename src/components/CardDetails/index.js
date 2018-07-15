import React from 'react';
import {
  Card,
  CardBody,
  CardText,
  Jumbotron,
  Row,
  Col,
  Badge,
  ButtonGroup,
  Button,
  Media
} from 'reactstrap';

import { IMAGE_BASE_URL } from '../../constants';

import Header from './Header';
import Banner from './Banner';
import Body from './Body';

const CardDetail = (props) => (
  <Card>
    <Header film={props.film} onBuyMovie={props.onBuyMovie} isLoading={props.isLoading} />
    <Banner film={props.film} />
    <Body film={props.film} />
  </Card>
);

export default CardDetail;

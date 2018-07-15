import React from 'react';
import {
  Card,
} from 'reactstrap';

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

import React from 'react';
import {
  Container,
} from 'reactstrap';

const Wrapper = (props) => (
  <Container style={styles.container}>
    {props.children}
  </Container>
)

const styles = {
  container: {
    flex: 1,
    minHeight: '500px'
  }
}

export default Wrapper;

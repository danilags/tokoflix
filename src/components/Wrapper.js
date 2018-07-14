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
    marginTop: '3rem',
    marginBottom: '3rem',
    padding: '3rem 0rem',
    minHeight: '500px'
  }
}

export default Wrapper;

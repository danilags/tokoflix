import React from 'react';
import { connect } from 'react-redux'; 

import { Wrapper } from '../../components';

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    
  }


  render() {
    console.log('REDUX', this.props);
    return (
      <Wrapper>
       <h3>Home Page</h3>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  films: state.filmReducer
});


export default connect(mapStateToProps, null)(HomePage);



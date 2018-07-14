import React from 'react';
import { connect } from 'react-redux'; 
import {
  Row,
  Col
} from 'reactstrap';

import { Wrapper, FilmCard } from '../../components';
import { getApiData } from '../../actions';

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1
    }
  }

  componentDidMount() {
    this.props.getApiData({ page: this.state.page })
  }

  slugify(title) {
    return title.split(' ').join('-').toLowerCase();
  }

  renderFilm() {
    const { filmList } = this.props.films;
    if (filmList.isFetch) {
      return <h4>Loading...</h4>
    }
    return filmList.data.map((item, index) => {
      
      return <Col key={index} md={4}><a href={`/${item.id}/${this.slugify(item.title)}`}><FilmCard film={item} /></a></Col>
    });
  }

  render() {
    return (
      <Wrapper>
        <h4>Newly created movie</h4>
       <Row>
        { this.renderFilm() }
       </Row>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  films: state.filmReducer
});

const mapDispatchToProps = dispatch => ({
  getApiData: (params) => dispatch(getApiData(params))
})


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);



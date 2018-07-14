import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap'; 

import { Wrapper, FilmCard, CardDetails } from '../../components';
import { getMovieDetails } from '../../actions';

class MovieDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      idMovie: this.props.match.params.id,
      movieDetails: null 
    }
  }

  componentDidMount() {
    this._getMovieDetails();
  }

  async _getMovieDetails() {
    const request = await this.props.getMovieDetails(this.state.idMovie);
    const { data } = request.payload
    await this.setState({ movieDetails: data })
  }

  renderDetails() {
    if (this.state.movieDetails === null) {
      return <Alert color="primary"><h4>Loading...</h4></Alert>
    }
    return <CardDetails film={this.state.movieDetails} />
  }

  render() {
    return (
      <Wrapper>
        {this.renderDetails()}
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  films: state.filmReducer
});

const mapDispatchToProps = dispatch => ({
  getMovieDetails: (id) => dispatch(getMovieDetails(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)

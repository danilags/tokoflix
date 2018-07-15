import React from 'react';
import { connect } from 'react-redux';
import { 
  Alert, 
  CardText
} from 'reactstrap'; 

import { GET_MOVIE_DETAILS, GET_SIMILAR_MOVIE } from '../../constants';
import { Wrapper, CardDetails, SimilarMovie } from '../../components';
import { getApiData, userBuyMovie } from '../../actions';

class MovieDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      page: 1,
      prevY: 0,
      idMovie: this.props.match.params.id,
      movieDetails: null,
      similarMovie: [],
      region: localStorage.getItem('region'),
      isLoading: false
    }
    this.onBuyMovie = this.onBuyMovie.bind(this);
  }

  componentDidMount() {
    this._getMovieDetails();
    let options = {
      root: null, 
      rootMargin: '0px',
      threshold: 1.0
    };
    // Create an observer instance
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this), // pass the callback
      options
    );
    this.observer.observe(this.loadingRef);
  }

  async handleObserver(entities, observer) {
    const { idMovie } = this.state;
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const curPage = this.state.page + 1;
      const requestSimilar = await this.props.getApiData({ 
        url: `3/movie/${idMovie}/similar?language=en-US&page=${curPage}`,
        type: GET_SIMILAR_MOVIE
      });
      const { results } = requestSimilar.payload.data;
      if (results.length === 0) {
        this.setState({
          loading: false,
          prevY: 0
        })
      } else {
        let lastState = this.state.similarMovie;
        await this.setState({ 
          page: curPage, 
          loading: true,
          similarMovie: [ ...lastState, ...requestSimilar.payload.data.results ] 
        });
      }
    }
    this.setState({ prevY: y });
  }

  async _getMovieDetails() {
    const { idMovie } = this.state;
    const requestDetails = await this.props.getApiData({
      url: `3/movie/${idMovie}?language=en-US`,
      type: GET_MOVIE_DETAILS
    });
    const requestSimilar = await this.props.getApiData({
      url: `3/movie/${idMovie}/similar?language=en-US`,
      type: GET_SIMILAR_MOVIE
    });
    const { data } = requestDetails.payload;
    
    await this.setState({ 
      movieDetails: data,
      similarMovie: requestSimilar.payload.data.results
    })
  }

  async onBuyMovie(film) {
    const { currentUser } = this.props.dataUser;
    const { id, title, vote_average } = film;
    const movie = {
      id, title, vote_average
    }
    if (currentUser.token !== null) {
      await this.setState({ isLoading: true })
      this.props.userBuyMovie(movie);
      setTimeout(() => {
        alert('Thank you');
        this.setState({ isLoading: false })
      }, 1200)
    } else {
      alert('Silahkan masuk terlebih dahulu');
    }
    
  }

  renderDetails() {
    if (this.state.movieDetails === null) {
      return <Alert color="primary"><h4>Loading...</h4></Alert>
    }
    return (
      <CardDetails 
        film={this.state.movieDetails} 
        onBuyMovie={this.onBuyMovie}
        isLoading={this.state.isLoading} 
      />
    )
  }

  slugify(title) {
    return title.split(' ').join('-').toLowerCase();
  }

  renderSimilarMovie() {
    if (this.state.similarMovie.length === []) {
      return <Alert color="primary"><h4>Loading...</h4></Alert>
    }
    return this.state.similarMovie.map((item, index) => (
      <a key={index} href={`/${item.id}/${this.slugify(item.title)}`}>
        <SimilarMovie item={item} />
      </a>
    ))
  }

  render() {
    const loadingTextCSS = { color: '#4a4a4a', display: this.state.loading ? 'block' : 'none' };
    const loadingCSS = {
      height: '100px',
      margin: '30px'
    };
    
    return (
      <Wrapper>
        {this.renderDetails()}
        <CardText style={{ margin: '2rem 0rem' }}><h3>Similar Movie</h3></CardText>
        {this.renderSimilarMovie()}
        <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
            <span style={loadingTextCSS}>Loading...</span>
        </div>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  films: state.filmReducer,
  dataUser: state.userReducer
});

const mapDispatchToProps = dispatch => ({
  getApiData: (params) => dispatch(getApiData(params)),
  userBuyMovie: (movie) => dispatch(userBuyMovie(movie))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)

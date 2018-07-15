import React from 'react';
import { connect } from 'react-redux'; 
import {
  Row,
  Col,
  Alert
} from 'reactstrap';

import { GET_ALL_MOVIES } from '../../constants';
import { Wrapper, FilmCard } from '../../components';
import { getApiData } from '../../actions';

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      prevY: 0,
      loading: false,
      hasMore: true,
      region: localStorage.getItem('region')
    }
  }

  componentWillMount() {
    if (this.props.location.search !== "") {
      var test = new URLSearchParams(this.props.location.search);
      let fixPage = 0;
      for(let pair of test.entries()) {
        fixPage = pair[1]
        // console.log(pair[0]+ ', '+ pair[1]); 
      }
      this.setState({
        page: parseInt(fixPage)
      })
    } else {
      this.setState({
        page: 1
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { filmList, isFetch } = nextProps.films;
    if (!filmList.nextUrl && !isFetch) {
      this.setState({
        hasMore: false,
        loading: false
      })
    } else if (filmList.status_code === 200 && !isFetch) {
      this.setState({
        loading: false
      })
    }
  }

  componentDidMount() {
    const { page } = this.state;
    this.props.getApiData({ 
      url: `3/movie/now_playing?language=en-US&page=${page}&region=${this.state.region}`,
      type: GET_ALL_MOVIES
    });
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
    const y = entities[0].boundingClientRect.y;
    if (this.state.hasMore) {
      if (this.state.prevY > y) {
        const curPage = this.state.page + 1;
        this.props.getApiData({ 
          url: `3/movie/now_playing?language=en-US&page=${curPage}&region=${this.state.region}`,
          type: GET_ALL_MOVIES
        });
        await this.setState({ page: curPage, loading: true });
        this.props.history.push(`/?page=${this.state.page}`);
      }
      this.setState({ prevY: y });
    }
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
    const loadingTextCSS = { color: '#4a4a4a', display: this.state.loading ? 'block' : 'none' };
    const loadingCSS = {
      height: '100px',
      margin: '30px'
    };

    return (
      <Wrapper>
        <h4>Newly created movie</h4>
       <Row>
        { this.renderFilm() }
       </Row>
        <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <Alert style={loadingTextCSS}><span>Loading...</span></Alert>
        </div>
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



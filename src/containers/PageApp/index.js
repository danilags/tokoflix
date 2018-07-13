import React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';

import Route from '../Route';
import { NavBar } from '../../components';

class PageApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          {this.props.routes.map((route, i) => (
              <Route key={i} {...route} />
          ))}
        </Switch>
        <div>
          <h3>Footer TokoFlix</h3>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  dataUser: state.usersReducer
});

export default connect(mapStateToProps, null)(PageApp);

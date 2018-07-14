import React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { 
  NavItem,
  NavLink, 
} from 'reactstrap';

import { setRegion, userAuth, fetchCurrentUser } from '../../actions';
import Route from '../Route';
import { NavBar, ModalText } from '../../components';
import { convertToRupiah } from '../../utils';

class PageApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      name: ''
    }

    this.onSetRegion = this.onSetRegion.bind(this);
    this.onRenderButtonAuth = this.onRenderButtonAuth.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onChangesName = this.onChangesName.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  onChangesName(e) {
    const lastState={...this.state};
    lastState[e.target.name]=e.target.value;
    this.setState({...lastState});
  }

  _onSubmit(e) {
    e.preventDefault();
    this.props.userAuth(this.state.name);
  }

  onSetRegion(params) {
    this.props.setRegion(params)
  }

  onRenderButtonAuth() {
    const currenUser = this.props.dataUser;
    let buttons
    if (currenUser === null) {
      buttons = [
        <NavItem onClick={this.toggle}>
          <NavLink style={{ color: '#fff' }}>
            Login sebagai Tamu
          </NavLink>
        </NavItem>,
      ]
    } else {
      buttons = [
        <NavItem onClick={this.toggle}>
          <NavLink style={{ color: '#fff' }}>
            { currenUser.name } - Rp. {convertToRupiah(currenUser.userBalance)}
          </NavLink>
        </NavItem>,
      ]
    }
    return buttons;
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  renderModal() {
    return (
      <ModalText 
        isOpen={this.state.isOpen}
        toggle={this.toggle}
        onChangesName={this.onChangesName}
        onSubmitData={this._onSubmit}
      />
    )
  }

  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    return (
      <div>
        {this.renderModal()}
        <NavBar 
          onSetRegion={this.onSetRegion}
          onRenderButtonAuth={this.onRenderButtonAuth}
        />
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
  dataUser: state.userReducer.currentUser
});

const mapDispatchToProps = dispatch => ({
  setRegion: (params) => dispatch(setRegion(params)),
  userAuth: (params) => dispatch(userAuth(params)),
  fetchCurrentUser: () => dispatch(fetchCurrentUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(PageApp);

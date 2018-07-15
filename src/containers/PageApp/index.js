import React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { 
  NavItem,
  NavLink, 
} from 'reactstrap';

import { setRegion, userAuth, fetchCurrentUser, userLogout } from '../../actions';
import Route from '../Route';
import { NavBar, ModalText } from '../../components';
import { convertToRupiah } from '../../utils';

class PageApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      name: '',
      isLogged: false,
      isLoading: false
    }

    this.onSetRegion = this.onSetRegion.bind(this);
    this.onRenderButtonAuth = this.onRenderButtonAuth.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onChangesName = this.onChangesName.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onChangesName(e) {
    const lastState={...this.state};
    lastState[e.target.name]=e.target.value;
    this.setState({...lastState});
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.dataUser.token !== nextProps.dataUser.token && nextProps.isLogin) {
      await this.toggle();
      await this.setState({ isLoading: false })
    }
  }

  async _onSubmit(e) {
    e.preventDefault();
    await this.setState({ isLoading: true })
    await this.props.userAuth(this.state.name);
  }

  onSetRegion(params) {
    this.props.setRegion(params)
  }

  onRenderButtonAuth() {
    const currenUser = this.props.dataUser;
    let buttons
    if (currenUser.token === null) {
      buttons = (
        <NavItem onClick={this.toggle}>
          <NavLink style={{ color: '#fff' }}>
            Login sebagai Tamu
          </NavLink>
        </NavItem>
      )
    } else {
      buttons = (
        <NavItem onClick={this.toggle}>
          <NavLink style={{ color: '#fff' }}>
            { currenUser.name } - Rp. {convertToRupiah(currenUser.userBalance)}
          </NavLink>
        </NavItem>
      )
    }
    return buttons;
  }

  toggle() {
    const currenUser = this.props.dataUser;
    this.setState({
      isOpen: !this.state.isOpen,
      isLogged: currenUser.token === null ? false : true
    })
  }

  async onLogout() {
    await this.toggle();
    this.props.userLogout();
  }

  renderModal() {
    return (
      <ModalText 
        isOpen={this.state.isOpen}
        isLogged={this.state.isLogged}
        isLoading={this.state.isLoading}
        toggle={this.toggle}
        onChangesName={this.onChangesName}
        onSubmitData={this._onSubmit}
        onLogout={this.onLogout}
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
  dataUser: state.userReducer.currentUser,
  isLogin: state.userReducer.isLogin
});

const mapDispatchToProps = dispatch => ({
  setRegion: (params) => dispatch(setRegion(params)),
  userAuth: (params) => dispatch(userAuth(params)),
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  userLogout: () => dispatch(userLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(PageApp);

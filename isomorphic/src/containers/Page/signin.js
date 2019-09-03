import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import appAction from '../../redux/app/actions';
import Auth0 from '../../helpers/auth0';
import Firebase from '../../helpers/firebase';
import FirebaseLogin from '../../components/firebase';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';

const { login } = authAction;
const { clearMenu } = appAction;

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = (token = false) => {
    const { login, clearMenu } = this.props;
    if (token) {
      login(token);
    } else {
      login();
    }
    clearMenu();
    this.props.history.push('/dashboard');
  };
  render() {
    const { history } = this.props;
    const from = { pathname: '/dashboard' };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                {/* <IntlMessages id="page.signInTitle" /> */}
                Entrar
              </Link>              
            </div>

            <div>
              
              <p>Bem-vindo, insira seu e-mail e senha para acessar o LIT ou para acessar a série Na Real</p>
              {<br></br>}
            </div>

            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                <Input size="large" placeholder="E-mail" />
              </div>

              <div className="isoInputWrapper">
                <Input size="large" type="password" placeholder="Senha" />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  {/* <IntlMessages id="page.signInRememberMe" /> */}
                  <a>Lembrar senha</a>
                </Checkbox>
                <Button type="primary" onClick={this.handleLogin}>
                  {/* <IntlMessages id="page.signInButton" /> */}
                  <a>Entrar</a>
                </Button>
              </div>

              {/* <p className="isoHelperText">
                <IntlMessages id="page.signInPreview" />
              </p> */}

              <div className="isoInputWrapper isoOtherLogin">
                <Button
                  onClick={this.handleLogin}
                  type="primary"
                  className="btnFacebook"
                >
                  <IntlMessages id="page.signInFacebook" />
                </Button>
                <Button
                  onClick={this.handleLogin}
                  type="primary"
                  className="btnGooglePlus"
                >
                  <IntlMessages id="page.signInGooglePlus" />
                </Button>

                {Auth0.isValid && (
                  <Button
                    onClick={() => {
                      Auth0.login();
                    }}
                    type="primary"
                    className="btnAuthZero"
                  >
                    <IntlMessages id="page.signInAuth0" />
                  </Button>
                )}

                {Firebase.isValid && (
                  <FirebaseLogin history={history} login={this.props.login} />
                )}
              </div>
              <div className="isoCenterComponent isoHelperWrapper">
                <h2>Ainda não tem conta?</h2>
                {<br></br>}
                  <a>Crie uma conta para acessar o LIT</a>
                  <a>Crie uma conta para assistir a série Na Real</a>
                {/* <Link to="/forgotpassword" className="isoForgotPass">
                  <IntlMessages id="page.signInForgotPass" />
                </Link>
                <Link to="/signup">
                  <IntlMessages id="page.signInCreateAccount" />
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false,
  }),
  { login, clearMenu }
)(SignIn);

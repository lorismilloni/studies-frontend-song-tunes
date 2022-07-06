import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      disableButton: true,
      redirectToPage: false,
      loading: false,
    };
  }

  componentWillUnmount() {
    this.setState = () => {};
  }

  handleChange = ({ target }) => {
    this.setState({ userName: target.value }, this.validateButton);
  }
  // a handleChange vai atualizar o username no estado com o que foi digitado no campo, e vai ao final chamar a função que faz a validação para liberar o botão de login

  validateButton = () => {
    const MIN_LENGTH = 3;
    const { userName } = this.state;
    if (userName.length >= MIN_LENGTH) {
      this.setState({ disableButton: false });
    } else {
      this.setState({ disableButton: true });
    }
  }
  // a função validateButton fará a validação do botão de login, se tiver mais que três caracteres ele será habilitado

  onClickButton = async () => {
    this.setState({ loading: true });
    const { userName } = this.state;
    await createUser({ name: userName });
    this.setState({ redirectToPage: true, loading: false });
  }
  // quando o botão de login é clicado, essa função é chamada, e seta o estado de loading como true, liberando o componente <Loading /> no render, após isso a função createUser() será chamada de modo assíncrono, e após o retorno o loading volta para false, e não renderiza mais o componente loading, e muda o estado de logged para true, redirecionando para a próxima página

  // requisito 2 feito acompanhando o PR do Leonardo Vogel

  render() {
    const { disableButton, redirectToPage, loading } = this.state;
    return (
      <div data-testid="page-login">
        { redirectToPage && <Redirect to="/search" /> }
        { loading ? <Loading /> : (
          <form>
            <input
              data-testid="login-name-input"
              type="text"
              placeholder="Nome de usuário"
              onChange={ this.handleChange }
            />
            <button
              data-testid="login-submit-button"
              type="submit"
              disabled={ disableButton }
              onClick={ this.onClickButton }
            >
              Entrar
            </button>
          </form>)}
      </div>
    );
  }
}

export default Login;

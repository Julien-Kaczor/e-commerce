import React from "react";
import axios from "axios";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name: '', password: '', response: undefined};

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange1(e) {
    this.setState({
      name: e.target.value
    });
  }

    handleChange2(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      name: this.state.name,
      password: this.state.password
    };

    let uri = "http://localhost:8000/api/login";

    axios.post(uri, user).then((response) => {
      localStorage.setItem('token', JSON.stringify(response.data));
      this.props.history.push("/");
    })
    .catch(error => {
      this.setState({response: false})
  });
  
  }

  render() {
    if (JSON.parse(localStorage.getItem("token")) !== null) {
      this.props.history.push("/");
    }
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            <b>
              <i className="fa fa-shopping-cart" /> E-COMPOSANT
            </b>
          </a>
          <div className="navbar-brand" href="/">
            <a className="nav-item" href="/">
              <i className="fa fa-home" /> Accueil
            </a>
            <a className="nav-item" href="/login">
              <i className="fa fa-sign-in" /> Connexion
            </a>
            <a className="nav-item" href="/register">
              <i className="fa fa-user-plus" /> Inscription
            </a>
          </div>
        </nav>
        <div>
          <div className="card form login">
          {this.state.response === false ? <div className="mt-3 alert alert-danger ml-3 mr-3">
          <strong><i class="fa fa-times"></i> Erreur</strong> : Les identifiant que vous avez saisies n'existent pas !
                </div> : <div></div>
                }
            <form
              id="formpost"
              method="POST"
              action="http://localhost:8001/api/login"
              acceptCharset="UTF-8"
              onSubmit={this.handleSubmit}
            >
              <h1 className="mt-3">
                <i className="fa fa-sign-in" /> Se connecter
              </h1>
              <hr />
              <label>
                <h5 className="font-login">Nom d'utilisateur :</h5>
                <input
                  name="username"
                  className="input-login"
                  type="text"
                  onChange={this.handleChange1}
                />
                <h5 className="font-login">Mot de passe :</h5>
                <input name="password" type="password" onChange={this.handleChange2} />
              </label>
              <div>
                <button type="submit" className="btn btn-outline-secondary">
                  <i className="fa fa-sign-in" /> Se connecter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;

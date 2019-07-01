import React from "react";
import axios from "axios";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', email: '', password: ''};

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange1(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleChange2(e) {
    this.setState({
      email: e.target.value
    });
  }

    handleChange3(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    let uri = "http://localhost:8000/api/register";

    axios.post(uri, user).then((response) => {
      console.log(response);
      this.props.history.push("/login");
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
          <div className="form card login">
            <form id="formpost" method="POST" onSubmit={this.handleSubmit}>
              <h1 className="mt-4">
                <i className="fa fa-user-plus" /> S'inscrire
              </h1>
              <hr />
              <label>
                <h5 className="font-login">Nom d'utilisateur :</h5>
                <input
                  name="name"
                  className="input-login"
                  type="text"
                  onChange={this.handleChange1}
                  required
                />
                <h5 className="font-login">Adresse mail :</h5>
                <input
                  name="email"
                  type="email"
                  onChange={this.handleChange2}
                  required
                />
              </label>
              <h5 className="font-login">Mot de passe :</h5>
              <input
                name="password"
                className="input-login"
                type="password"
                onChange={this.handleChange3}
                required
              />
              <div>
                <button type="submit" className="btn btn-outline-secondary">
                  <i className="fa fa-user-plus" /> S'inscrire
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;

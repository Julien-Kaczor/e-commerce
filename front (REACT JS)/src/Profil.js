import React from "react";
import axios from "axios";
import sha256 from "sha256";

class Profil extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
    };
  }

  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/api/products`, {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })

      .then(res => {
        const data = res.data;
        this.setState({ products: data.produits });
        this.setState({ count: data.count });
        this.setState({ countAvailability: data.countAvailability });
        this.setState({ countAvailabilityT: data.countAvailabilityT });
        this.setState({ countUser: data.countUser });
      });

    if (JSON.parse(localStorage.getItem("token")) == null) {
      axios
        .get(`http://127.0.0.1:8000/api/profil`, {
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        })

        .then(res => {
          this.setState({ admin: res.data });
        });
    } else {
      axios
        .get(`http://127.0.0.1:8000/api/profil`, {
          mode: "no-cors",
          headers: {
            Authorization:
              "Bearer " + sha256(JSON.parse(localStorage.getItem("token"))),
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        })

        .then(res => {
            const data = res.data[0];
            this.setState({ user: data });
        });
    }

    axios
      .get(`http://127.0.0.1:8000/api/categories`, {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })

      .then(res => {
        const data = res.data;
        this.setState({ user: data });
      });
  }

  handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("Products");
  }

  render() {
    let button;
    let buttonR;
    let buttonP;

    const { user } = this.state;

    if (JSON.parse(localStorage.getItem("token")) !== null) {
      buttonP = (
        <a className="nav-item" href="/profil">
          <i className="fa fa-user" /> Mon profil
        </a>
      );

      button = (
        <a className="nav-item" href="/" onClick={() => this.handleLogout()}>
          <i className="fa fa-sign-out" /> Déconnexion
        </a>
      );
    } else {
      button = (
        <a className="nav-item" href="/login">
          <i className="fa fa-sign-in" /> Connexion
        </a>
      );
      buttonR = (
        <a className="nav-item" href="/register">
          <i className="fa fa-user-plus" /> Inscription
        </a>
      );
    }

    if (JSON.parse(localStorage.getItem("token")) == null) {
      this.props.history.push("/login");
    }

    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            <b>
              <i className="fa fa-shopping-cart" /> E-COMPOSANT
            </b>
          </a>

          <div className="col">
            <form className="navbar-form" role="search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Chercher un produit, une catégorie, ..."
                  name="q"
                />
                <div className="input-group-btn">
                  <button className="btn btn-default icon-search" type="submit">
                    <i className="fa fa-search " />
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="navbar-brand" href="/">
            <a className="nav-item" href="/">
              <i className="fa fa-home" /> Accueil
            </a>
            <a className="nav-item" href="/cart">
              <i className="fa fa-cart-plus" /> Mon panier
            </a>
            {buttonP}
            {button}
            {buttonR}
          </div>
        </nav>

        <div>
          <div className="container">
            <h1 className="test32">Modifier profil</h1>
            <hr className="test34" />
            <div className="row">
              <div className="col-md-3">
                <div className="text-center">
                  
                </div>
              </div>

              <div className="col-md-9">
                <div className="form-horizontal" role="form">
                  <div className="form-group">
                    <label className="col-lg-3 control-label">Nom d'utilisateur:</label>
                    <div className="col-lg-8">
                      <input
                        className="form-control"
                        type="text"
                        value={user.name}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-lg-3 control-label">Adresse mail:</label>
                    <div className="col-lg-8">
                      <input className="form-control" type="text" value={user.email} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-lg-3 control-label">Mot de passe:</label>
                    <div className="col-lg-8">
                      <input className="form-control" type="text" value="•••••••••••••" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-lg-3 control-label">Création du compte:</label>
                    <div className="col-lg-8">
                      <label className="form-control mb-4" type="text">{user.created_at}</label>
                      <button type="button" class="btn btn-danger large-btn mb-3"><i class="fa fa-times"></i> Supprimer ce compte définitivement</button>
                      <button type="button" class="btn btn-primary large-btn"><i class="fa fa-edit"></i> Modifier</button>
                    </div>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Profil;

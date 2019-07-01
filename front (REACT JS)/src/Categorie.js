import React from "react";
import axios from "axios";

class Categorie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categorie: [],
      products: [],
      count: [],
      countAvailability: [],
      countAvailabilityT: [],
      countUser: []
    };
  }

  handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("Products");
  }

  componentDidMount() {
    const uri = window.location.href;
    const id = uri.split("/");
    axios
      .get(`http://127.0.0.1:8000/api/categorie/` + id[4], {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })

      .then(res => {
        const data = res.data;
        this.setState({ categorie: data });
      });

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
  }

  render() {
    const { count } = this.state;
    const { countAvailability } = this.state;
    const { countAvailabilityT } = this.state;
    const { countUser } = this.state;
    const { categorie } = this.state;
    let button;
    let buttonR;
    let buttonP;

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
        <div className="container-fluid row block d-flex justify-content-center">
          <div className="col-xl-2 col-md-6 mb-4 mt-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Produits totals
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {count}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fa fa-shopping-cart fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-2 col-md-6 mb-4 mt-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                      Produits en stock
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {countAvailability}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fa fa-check fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-2 col-md-6 mb-4 mt-4">
            <div className="card border-left-info shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                      Produits en rupture
                    </div>
                    <div className="row no-gutters align-items-center">
                      <div className="col-auto">
                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                          {countAvailabilityT}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fa fa-times fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-2 col-md-6 mb-4 mt-4">
            <div className="card border-left-warning shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Utilisateurs inscrits
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {countUser}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fa fa-user-plus fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 className="test32">{categorie.title}</h1>
        <hr className="test34" />
      </div>
    );
  }
}

export default Categorie;

import React from "react";
import axios from "axios";
import sha256 from "sha256";

import "./App.css";
import "./bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      count: [],
      categories: [],
      countAvailability: [],
      countAvailabilityT: [],
      countUser: []
    };
  }

  setProductCart(e) {
    e.preventDefault();
    const id = e.target.value;

    axios
      .get(`http://127.0.0.1:8000/api/product/` + id, {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })

      .then(res => {
        const data = res.data;

        var showProducts = [];

        var show = {
          id: data.id,
          title: data.title,
          description: data.description,
          price: data.price,
          picture: data.pictures
        };

        showProducts.push(show);
        showProducts = showProducts.concat(
          JSON.parse(localStorage.getItem("Products") || "[]")
        );
        console.log(showProducts);

        localStorage.setItem("Products", JSON.stringify(showProducts));
      });
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("token")) == null) {
      axios
        .get(`http://127.0.0.1:8000/api/loginCheck`, {
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
        .get(`http://127.0.0.1:8000/api/loginCheck`, {
          mode: "no-cors",
          headers: {
            Authorization:
              "Bearer " + sha256(JSON.parse(localStorage.getItem("token"))),
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        })

        .then(res => {
          this.setState({ admin: res.data });
        });
    }

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
        this.setState({ categories: data });
      });
  }

  handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("Products");
  }

  render() {
    const { products } = this.state;
    const { categories } = this.state;
    const { count } = this.state;
    const { countAvailability } = this.state;
    const { countAvailabilityT } = this.state;
    const { countUser } = this.state;
    const { admin } = this.state;
    let button;
    let buttonR;
    let buttonP;
    let adminB;

    if (admin === true) {
      adminB = (
        <a className="nav-item" href="/admin">
          <i className="fa fa-shield" /> Administrateur
        </a>
      );
    }

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
            <a className="nav-item" href="/forum">
              <i className="fa fa-book" /> Forum
            </a>
            {adminB}
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
        <div
          className="container alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>
            <i className="fa fa-warning" /> Information :
          </strong>{" "}
          Pour savoir quels sont les produits High tech les plus populaires{" "}
          <a href="/popularity">clique ici</a> !
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div
          class="container alert alert-dark alert-dismissible fade show"
          role="alert"
        >
          <strong><i class="fa fa-clock-o"></i> Bons plans :</strong> Ne perdez plus une seule seconde et accéder à nos ventes <strong>flash</strong> en <a href="/flash">cliquant ici</a> !
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <h1 className="test32">Catégories</h1>
        <hr className="test34" />

        <div className="container btn-toolbar justify-content-between">
          <div className="row justify-content-md-center btn-group">
            {categories.map(categorie => (
              <div key={categorie.id}>
                <div className="col">
                  <a href={"categorie/" + categorie.id}>
                    <button
                      type="button"
                      className="second-color btn btn-outline-primary btn-lg mb-2 dropdown-toggle"
                    >
                      {categorie.title}
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h1 className="test32">Nouveautés </h1>
        <hr className="test33" />

        <div className="card-columns">
          {products.map(product => (
            <div key={product.id} className="card">
              <img
                height="286"
                className="img-card"
                src={
                  product.pictures[0] === ""
                    ? "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16b4bc3c694%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16b4bc3c694%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22106.3984375%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                    : product.pictures[0]
                }
                alt="Card"
              />

              <div className="card-body">
                <h5 className="card-title">
                  <b>{product.title}</b>
                </h5>
                <p className="card-text">
                  <b>{product.description}</b>
                </p>
                <p className="card-text">
                  Prix: <b>{product.price} €</b>
                </p>
                <p className="card-text">
                  <i className="fa fa-calendar" /> Ajouté le:{" "}
                  <b>{product.created_at}</b>
                </p>
                <p className="card-text right">
                  <a href={"product/" + product.id}>
                    <i className="fa fa-plus" /> En savoir plus
                  </a>
                </p>
                {product.availability === 0 ? (
                  <span className="prefixS">
                    <i className="fa fa-check" /> EN STOCK
                  </span>
                ) : (
                  <span className="prefixR">
                    <i className="fa fa-times" /> EN RUPTURE
                  </span>
                )}
                {product.availability === 0 ? (
                  <button
                    type="submit"
                    value={product.id}
                    onClick={this.setProductCart}
                    className="btn btn-primary large-btn"
                  >
                    <i className="fa fa-shopping-cart" /> Ajouter au panier
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary large-btn disabled"
                    disabled
                  >
                    <i className="fa fa-shopping-cart" /> Ajouter au panier
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;

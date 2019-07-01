import React from "react";
import axios from "axios";

import "./App.css";
import "./bootstrap.min.css";

class Popularity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      count: [],
      countAvailability: [],
      countAvailabilityT: [],
      countUser: []
    };
  }

  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/api/products/popularity`, {
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

  handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("Products");
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

  render() {
    const { products } = this.state;
    const { count } = this.state;
    const { countAvailability } = this.state;
    const { countAvailabilityT } = this.state;
    const { countUser } = this.state;
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
        <div class="container-fluid row block d-flex justify-content-center">
          <div class="col-xl-2 col-md-6 mb-4 mt-4">
            <div class="card border-left-primary shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Produits totals
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">
                      {count}
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fa fa-shopping-cart fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-2 col-md-6 mb-4 mt-4">
            <div class="card border-left-success shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                      Produits en stock
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">
                      {countAvailability}
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fa fa-check fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-2 col-md-6 mb-4 mt-4">
            <div class="card border-left-info shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">
                      Produits en rupture
                    </div>
                    <div class="row no-gutters align-items-center">
                      <div class="col-auto">
                        <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                          {countAvailabilityT}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fa fa-times fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-2 col-md-6 mb-4 mt-4">
            <div class="card border-left-warning shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Utilisateurs inscrits
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">
                      {countUser}
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fa fa-user-plus fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="container alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>
            <i class="fa fa-check" /> Information :
          </strong>{" "}
          Les produits sur cette page sont maintenant classés par popularité !
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <h1 className="test32">Produits les plus vus</h1>
        <hr className="test34" />
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
                  <i class="fa fa-calendar" /> Ajouté le:{" "}
                  <b>{product.created_at}</b>
                </p>
                <p className="card-text right">
                  <a href={"product/" + product.id}>
                    <i className="fa fa-plus" /> En savoir plus
                  </a>
                </p>
                {product.availability === 0 ? (
                  <span className="prefixS">
                    <i class="fa fa-check" /> EN STOCK
                  </span>
                ) : (
                  <span className="prefixR">
                    <i class="fa fa-times" /> EN RUPTURE
                  </span>
                )}
                {product.availability === 0 ? (
                  <button
                    type="submit"
                    className="btn btn-primary large-btn"
                    value={product.id}
                    onClick={this.setProductCart}
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

export default Popularity;

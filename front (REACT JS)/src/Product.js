import React from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: undefined
    };
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

  componentDidMount() {
    const uri = window.location.href;
    const id = uri.split("/");
    axios
      .get(`http://127.0.0.1:8000/api/product/` + id[4], {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })

      .then(res => {
        const data = res.data;
        this.setState({ product: data });
        console.log(res.data);
        axios.post(
          `http://127.0.0.1:8000/api/product/popularity/` + id[4],
          id[4]
        );
      });
  }

  render() {
    const { product } = this.state;
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

    if (product === undefined) {
      return <div />;
    } else {
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
                    <button
                      className="btn btn-default icon-search"
                      type="submit"
                    >
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
            <div className="card form mt-4 mb-4">
              <Carousel>
                {product.pictures.map(picture => (
                  <div>
                    <img
                      className="img-card2"
                      src={
                        picture === ""
                          ? "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16b4bc3c694%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16b4bc3c694%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22106.3984375%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                          : picture
                      }
                      alt="Card"
                    />
                  </div>
                ))}
              </Carousel>
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
                  <i class="fa fa-eye" /> Ce produit a été visionné{" "}
                  <b>{product.popularity}</b> fois.
                </p>
                <p className="card-text">
                  <i class="fa fa-calendar" /> Ajouté le:{" "}
                  <b>{product.created_at}</b>
                </p>
                {product.availability === 0 ? (
                  <span className="prefixSp">
                    <i class="fa fa-check" /> EN STOCK
                  </span>
                ) : (
                  <span className="prefixRp">
                    <i class="fa fa-times" /> EN RUPTURE
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
          </div>
        </div>
      );
    }
  }
}

export default Product;

import React from "react";

class Cart extends React.Component {
  handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("Products");
  }

  render() {
    let button;
    let buttonR;
    let buttonP;
    let cart;
    var tab = JSON.parse(localStorage.getItem("Products"));
    var total = 0;
    if (tab === null) {
      tab = [];
    }
    tab.forEach(element => {
      total += element.price;
    });
    if (JSON.parse(localStorage.getItem("Products")) == null) {
      cart = (
        <div
            class="alert alert-warning alert-dismissible fade show mb-5"
            role="alert"
          >
            <strong><i class="fa fa-warning"></i> Information :</strong> Il semblerait que votre panier est vide, pour ajouter des articles <a href="/">cliquer ici</a> !
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
      )
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
        <nav className="navbar navbar-dark bg-dark mb-5">
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
        <div className="container-cart">
          {cart}
          <h1 className="test32">Votre panier</h1>
            <hr className="test35" />
          <table id="cart" className="table table-hover table-condensed">
            <thead>
              <tr>
                <th>Produits</th>
                <th>Prix</th>
                <th>Quantités</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            {tab.map(product => (
              <tbody>
                <tr>
                  <td data-th="Product">
                    <div className="row">
                      <div className="col-sm-2 hidden-xs">
                        <img
                          src={product.picture[0]}
                          alt="..."
                          className="img-responsive img-cart"
                        />
                      </div>
                      <div className="col-sm-10">
                        <h4 className="nomargin ml-3">{product.title}</h4>
                        <p className="ml-3">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="col-sm-1" data-th="Price">
                    {product.price} €
                  </td>
                  <td data-th="Quantity">
                    <input
                      type="number"
                      className="form-control text-center"
                      value="1"
                    />
                  </td>
                  <td className="actions" data-th="">
                    <button
                      className="delete-prod btn btn-danger btn-sm"
                      value={product.id}
                      onClick={this.deleteCardProduct}
                    >
                      <i className="fa fa-trash-o" /> Supprimer
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
            <tfoot>
              <tr>
                <td>
                  <a href="/" className="btn btn-warning">
                    <i className="fa fa-angle-left" /> Continuer vos achats
                  </a>
                </td>
                <td colSpan="2" className="hidden-xs" />
                <td className="col-lg-2 hidden-xs text-center mt-4">
                  <strong className="ml-5">Total: {total} € </strong>
                </td>
              </tr>
            </tfoot>
          </table>
          <a href="/" className="btn btn-success btn-block mb-5">
            Procéder au paiement <i className="fa fa-paper-plane" />
          </a>
        </div>
      </div>
    );
  }
}
export default Cart;

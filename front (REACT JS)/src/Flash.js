import React from "react";
import Confetti from "react-confetti";

class Flash extends React.Component {
  render() {
    const h = window.innerHeight;
    const w = window.innerWidth;
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
        <div
          className="container alert alert-warning alert-dismissible fade show mt-5"
          role="alert"
        >
          <strong>
            <i className="fa fa-warning" /> Information :
          </strong>{" "}
          Tous les produits affichés ci-dessous sont à des prix très avantageux
          pour une courte durée, faite vite !
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <h1 className="test32">Ventes flash</h1>
        <hr className="test34" />

        <div style={{zIndex: 2}} className="card-columns">
          <div className="card">
            <img
              height="286"
              src="https://firebasestorage.googleapis.com/v0/b/e-commerce-181c0.appspot.com/o/images%2Fps4-slim-1to-playstation-4-manette-dualshock-4-n.jpg?alt=media&token=1f8517a3-c6f3-4ba7-8f46-24449e99cedb"
              className="img-card"
              alt="Card"
            />

            <div className="card-body">
              <h5 className="card-title">
                <b>PS4 + manette (Dualshock 4)</b>
              </h5>
              <p className="card-text">
                <b>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam...
                </b>
              </p>
              <p className="card-text">
                Prix: <b>300 €</b>
              </p>
              <p className="card-text">
                <i className="fa fa-calendar" /> Ajouté le:
                <b>2019-06-19 18:31:21</b>
              </p>
              <p className="card-text right">
                <a href="/fwef">
                  <i className="fa fa-plus" /> En savoir plus
                </a>
              </p>
              <button type="submit" className="btn btn-primary large-btn">
                <i className="fa fa-shopping-cart" /> Ajouter au panier
              </button>
            </div>
          </div>
          <div className="card">
            <img
              height="286"
              src="https://firebasestorage.googleapis.com/v0/b/e-commerce-181c0.appspot.com/o/images%2Fps4-slim-1to-playstation-4-manette-dualshock-4-n.jpg?alt=media&token=1f8517a3-c6f3-4ba7-8f46-24449e99cedb"
              className="img-card"
              alt="Card"
            />

            <div className="card-body">
              <h5 className="card-title">
                <b>PS4 + manette (Dualshock 4)</b>
              </h5>
              <p className="card-text">
                <b>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam...
                </b>
              </p>
              <p className="card-text">
                Prix: <b>300 €</b>
              </p>
              <p className="card-text">
                <i className="fa fa-calendar" /> Ajouté le:
                <b>2019-06-19 18:31:21</b>
              </p>
              <p className="card-text right">
                <a href="/fwef">
                  <i className="fa fa-plus" /> En savoir plus
                </a>
              </p>
              <button type="submit" className="btn btn-primary large-btn">
                <i className="fa fa-shopping-cart" /> Ajouter au panier
              </button>
            </div>
          </div>
          <div className="card">
            <img
              height="286"
              src="https://firebasestorage.googleapis.com/v0/b/e-commerce-181c0.appspot.com/o/images%2Fps4-slim-1to-playstation-4-manette-dualshock-4-n.jpg?alt=media&token=1f8517a3-c6f3-4ba7-8f46-24449e99cedb"
              className="img-card"
              alt="Card"
            />

            <div className="card-body">
              <h5 className="card-title">
                <b>PS4 + manette (Dualshock 4)</b>
              </h5>
              <p className="card-text">
                <b>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam...
                </b>
              </p>
              <p className="card-text">
                Prix: <b>300 €</b>
              </p>
              <p className="card-text">
                <i className="fa fa-calendar" /> Ajouté le:
                <b>2019-06-19 18:31:21</b>
              </p>
              <p className="card-text right">
                <a href="/fwef">
                  <i className="fa fa-plus" /> En savoir plus
                </a>
              </p>
              <button type="submit" className="btn btn-primary large-btn">
                <i className="fa fa-shopping-cart" /> Ajouter au panier
              </button>
            </div>
          </div>
        </div>

        <Confetti classaName="confetti" style={{zIndex: 1}}  width={w} height={h} />
      </div>
    );
  }
}

export default Flash;

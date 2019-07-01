import React from "react";

import "./App.css";
import "./bootstrap.min.css";

class Forum extends React.Component {
  render() {
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
                  placeholder="Chercher un sujet, un tag, ..."
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
            <a className="nav-item" href="/">
              <i className="fa fa-book" /> Forums
            </a>
            <a className="nav-item" href="/">
              <i className="fa fa-paper-plane" /> Créer un sujet
            </a>
          </div>
        </nav>
        <div
          class="mt-3 container alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>
            <i class="fa fa-warning" /> Information :
          </strong>{" "}
          Si vous avez un problème quelconque avec un composant n'hésitez pas à
          créer un sujet en <a href="/">cliquant ici</a> !
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="container">
          <h1 className="test32">LES DERNIERS SUJETS POSTÉS</h1>
          <hr className="test35" />
          <div class="card">
            <div class="card-header fontSize">Carte graphique</div>
            <div class="card-body tc">
              <img
                class="card-img-forum"
                src="https://firebasestorage.googleapis.com/v0/b/e-commerce-181c0.appspot.com/o/images%2FCarte-graphique-Geforce-1060.jpg?alt=media&token=1348491e-ce3c-4a10-b0da-46b9eb6ea75f"
                alt="Card image cap"
              />
              <blockquote class="blockquote mb-0 fonts">
                <p>
                  Bonjour chère communauté, que pensez vous de cette fameuse
                  carte graphique?
                </p>
                <footer class="blockquote-footer">
                  Posté par
                  <cite title="Source Title">
                    {" "}
                    <a href="">@Kaanal</a>
                    {" il y à 15 minutes"}
                    <span class="membre">
                      <i class="fa fa-user" /> MEMBRE
                    </span>
                  </cite>
                </footer>
              </blockquote>
              <a href="#" class="mt-3 btn btn-primary">
                <i class="fa fa-search" /> Lire sujet
              </a>
              <h4 className="test333">LES DERNIERES RÉPONSES</h4>
              <hr className="" />
              <div class="card">
                <div class="card-body tc">
                  Bonjour, l'ayant moi meme essayer je peux vous la conseiller
                  sans probleme, en passant tenez mon code de parainage :{" "}
                  <strong>EYRTG2K19</strong>
                  <footer class="mt-4 blockquote-footer">
                    Posté par
                    <cite title="Source Title">
                      {" "}
                      <a href="">@Julien</a>
                      {" à l'instant"}
                      <span class="helper">
                        <i class="fa fa-shield" /> HELPER
                      </span>
                    </cite>
                  </footer>
                </div>
              </div>
            </div>
          </div>

          <div class="card mt-3">
            <div class="card-header fontSize">Écran PC Gamer</div>
            <div class="card-body tc">
              <img
                class="card-img-forum"
                src="https://firebasestorage.googleapis.com/v0/b/e-commerce-181c0.appspot.com/o/images%2Fecran-incurve-gaming-asus-rog-swift.jpg?alt=media&token=2e2cc01e-4c29-4b7f-b552-c76a097101be"
                alt="Card image cap"
              />
              <blockquote class="blockquote mb-0 fonts">
                <p>
                  Bonjour chère communauté, que pensez vous de ce fameux Ecran
                  PC Gamer?
                </p>
                <footer class="blockquote-footer">
                  Posté par
                  <cite title="Source Title">
                    {" "}
                    <a href="">@Salem</a>{" "}
                    <span class="membre">
                      <i class="fa fa-user" /> MEMBRE
                    </span>
                  </cite>
                </footer>
              </blockquote>
              <a href="#" class="mt-3 btn btn-primary text-align-left">
                <i class="fa fa-search" /> Lire sujet
              </a>
              <h4 className="test333">LES DERNIERES RÉPONSES</h4>
              <hr className="" />
              <div class="card">
                <div class="card-body tc">
                  Bonjour, l'ayant moi meme essayer je peux vous la conseiller
                  sans probleme, en passant tenez mon code de parainage :{" "}
                  <strong>EYRTG2K19</strong>
                  <footer class="mt-4 blockquote-footer">
                    Posté par
                    <cite title="Source Title">
                      {" "}
                      <a href="">@Julien</a>
                      {" à l'instant"}
                      <span class="helper">
                        <i class="fa fa-shield" /> HELPER
                      </span>
                    </cite>
                  </footer>
                </div>
              </div>
            </div>
          </div>
          <div class="card mt-3 mb-4">
            <div class="card-header fontSize">Souris Gamer</div>
            <div class="card-body tc">
              <img
                class="card-img-forum"
                src="https://firebasestorage.googleapis.com/v0/b/e-commerce-181c0.appspot.com/o/images%2Fcorsair-harpoon-rgb-wireless_444c8208d1844202.jpg?alt=media&token=a200762a-a3a3-4424-87e1-c4b0381230f5"
                alt="Card image cap"
              />
              <blockquote class="blockquote mb-0 fonts">
                <p>
                  Bonjour chère communauté, que pensez vous de cette fameuse
                  souris Gamer?
                </p>
                <footer class="blockquote-footer">
                  Posté par
                  <cite title="Source Title">
                    {" "}
                    <a href="">@Kaanal</a>{" "}
                    <span class="membre">
                      <i class="fa fa-user" /> MEMBRE
                    </span>
                  </cite>
                </footer>
              </blockquote>
              <a href="#" class="mt-3 btn btn-primary text-align-left">
                <i class="fa fa-search" /> Lire sujet
              </a>
              <h4 className="test333">LES DERNIERES RÉPONSES</h4>
              <hr className="" />
              <div class="card">
                <div class="card-body">
                  Bonjour, l'ayant moi meme essayer je peux vous la conseiller sans probleme, en passant tenez mon code de parainage : <strong>EYRTG2K19</strong>
                  <footer class="mt-4 blockquote-footer">
                  Posté par
                  <cite title="Source Title">
                    {" "}
                    <a href="">@Julien</a>{" à l'instant"}
                    <span class="helper">
                      <i class="fa fa-shield" /> HELPER
                    </span>
                  </cite>
                </footer>
                </div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Forum;

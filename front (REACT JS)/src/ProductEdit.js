import React from "react";
import axios from "axios";
import sha256 from "sha256";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { storage } from "./firebase";

class ProductEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      admin: null,
      title: "",
      description: "",
      price: "",
      availability: "0",
      product: undefined,
      photo: [],
      submitable: true,
      loading: "",
      compteur: 0,
      response: false
    };

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
  }

  componentDidMount() {
    const uri = window.location.href;
    const id = uri.split("/");
    axios
      .get(`http://127.0.0.1:8000/api/product/` + id[5], {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })

      .then(res => {
        const data = res.data;
        this.setState({
          product: data,
          description: data.description,
          price: data.price,
          title: data.title,
          photo: data.pictures
        });
      });

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
  }

  handleChange1(e) {
    this.setState({
      title: e.target.value,
      response: false
    });
  }

  handleChange2(e) {
    this.setState({
      description: e.target.value,
      response: false
    });
  }

  handleChange3(e) {
    this.setState({
      price: e.target.value,
      response: false
    });
  }

  handleChange4(e) {
    this.setState({
      availability: e.target.checked,
      response: false
    });
  }

  handleChangeImage(e) {
    this.setState({
      response: false
    });
    var self = this;
    console.log(self);
    var compteur = e.target.files.length;
    if (e.target.files[0]) {
      this.setState({ submitable: true });
      for (var i = 0; i < e.target.files.length; i++) {
        const image = e.target.files[i];
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          snapshot => {
            //progress function
          },
          error => {
            //error function
            console.log(error);
          },
          () => {
            var self2 = self;
            // complete function
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url => self2.SubmitApi(url))
              .then(url => self2.submiatble(compteur));
          }
        );
      }
    }
  }

  SubmitApi(url) {
    var tmp = this.state.compteur;
    tmp++;
    this.setState({ compteur: tmp });
    this.setState({ loading: "Please wait files are loading.." });
    this.setState({ photo: [...this.state.photo, url] });
    var tab = this.state.product;
    console.log(tab);
    tab.pictures.push(url);

    this.setState({ product: tab });
  }

  submiatble(nb_img) {
    console.log(this.state.compteur, nb_img);
    if (this.state.compteur === nb_img) {
      console.log("yess");
      this.setState({ submitable: true });
      this.setState({ loading: "" });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.submitable === true) {
      const product = {
        title: this.state.title,
        description: this.state.description,
        price: this.state.price,
        availability: this.state.availability,
        pictures: this.state.photo
      };

      console.log(product);

      const test = window.location.href;
      const id_prod = test.split("/");

      let uri = `http://localhost:8000/api/edit/product/` + id_prod[5];

      axios.post(uri, product).then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({ response: true });
        }
      });
    }
  }

  deleteImage(e) {
    var tab = this.state.photo;
    tab.splice(tab.indexOf(e.target.value), 1);
    this.setState({ photo: tab });
  }

  render() {
    const { admin } = this.state;
    const { product } = this.state;

    if (
      admin === null ||
      product === undefined ||
      JSON.parse(localStorage.getItem("token")) == null
    ) {
      return (
        <div className="container mt-4">
          <div className="alert alert-danger center-alert" role="alert">
            <i className="fa fa-warning" /> Il faut être
            <strong> administrateur</strong> pour accéder a cette page !
            <a href="/"> Retourner à l'accueil...</a>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      );
    } else if (admin === true) {
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
            <div className="card form mt-4">
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
                    <button
                      className="btn btn-danger legend  delete-img"
                      value={picture}
                      onClick={this.deleteImage}
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </Carousel>
              <form
                id="addform"
                method="POST"
                onSubmit={this.handleSubmit.bind(this)}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    <b>Titre:</b>
                  </h5>
                  <input
                    type="text"
                    className="input-edit mb-3"
                    value={this.state.title}
                    onChange={this.handleChange1}
                  />
                  <h5 className="card-title">
                    <b>Description:</b>
                  </h5>
                  <textarea
                    rows="4"
                    cols="50"
                    type="text"
                    className="input-edit mb-3"
                    value={this.state.description}
                    onChange={this.handleChange2}
                  />
                  <h5 className="card-title">
                    <b>Prix:</b>
                  </h5>
                  <input
                    type="text"
                    className="input-edit"
                    value={this.state.price}
                    onChange={this.handleChange3}
                  />
                  <label>Ajouter photos: </label>
                  <div class="input-group mb-4">
                    <div class="custom-file">
                      <input
                        onChange={this.handleChangeImage}
                        type="file"
                        multiple
                        className="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                      />
                      <label class="custom-file-label" for="inputGroupFile01">
                        Choisir photos
                      </label>
                    </div>
                  </div>
                  {this.state.loading === "" ? (
                    ""
                  ) : (
                    <div className="alert alert-warning">
                      {this.state.loading}
                    </div>
                  )}
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="mb-3 mt-4 form-check-input"
                      onChange={this.handleChange4}
                    />
                    <label
                      class="mb-3 mt-4 form-check-label checkboxStatus"
                      for="exampleCheck1"
                    >
                      Coché si produit en <strong>rupture de stock</strong>.
                    </label>
                  </div>
                  <button type="submit" class="mt-3 btn btn-primary input-edit">
                    <i class="icon fa fa-edit" /> Modifier
                  </button>
                </div>
                {this.state.response === true ? (
                  <div className="mt-3 alert alert-success">
                    Votre produit a bien ete edite !
                  </div>
                ) : (
                  <div />
                )}
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container mt-4">
          <div className="alert alert-danger center-alert" role="alert">
            <i className="fa fa-warning" /> Il faut être
            <strong> administrateur</strong> pour accéder a cette page !
            <a href="/"> Retourner à l'accueil...</a>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      );
    }
  }
}
export default ProductEdit;

import React from "react";
import axios from "axios";
import sha256 from "sha256";
import { storage } from "./firebase";

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      admin: null,
      title: "",
      description: "",
      price: "",
      products: [],
      image: [],
      url: "",
      submitable: false,
      loading: "",
      compteur: 0,
      response: false
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
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

  handleChangeImage(e) {
    this.setState({
      response: false
    });
    var self = this;
    console.log(self);
    var compteur = e.target.files.length;
    if (e.target.files[0]) {
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

  submiatble(nb_img) {
    if (this.state.compteur === nb_img) {
      console.log("yess");
      this.setState({ submitable: true });
      this.setState({ loading: "" });
    }
  }

  handleDelete(id) {
    axios.delete(`http://localhost:8000/api/product/delete/${id}`);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.submitable === true) {
      console.log(this.state.image);
      const product = {
        title: this.state.title,
        description: this.state.description,
        price: this.state.price,
        image: this.state.image
      };

      let uri = "http://localhost:8000/api/product/add";

      axios.post(uri, product).then(response => {
        console.log(response.status);
        if (response.status === 200) {
          this.setState({ response: true });
        }
      });
    }
  }

  SubmitApi(url) {
    var tmp = this.state.compteur;
    tmp++;
    this.setState({ compteur: tmp });
    this.setState({ loading: "Please wait files are loading.." });
    this.setState({ image: [...this.state.image, url] });
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
      });
  }

  handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("Products");
  }

  render() {
    const { admin } = this.state;
    const { products } = this.state;

    if (JSON.parse(localStorage.getItem("token")) == null) {
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

    if (admin === null) {
      return <div />;
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
              <a
                className="nav-item"
                href="/"
                onClick={() => this.handleLogout()}
              >
                <i className="fa fa-sign-out" /> Déconnexion
              </a>
            </div>
          </nav>
          <div className="container">
          <div class="row justify-content-md-center">
          
          <div class="col col-lg-6">
            <form id="addform" method="POST" onSubmit={this.handleSubmit}>
              <div className="card form mt-5">
                <h1 className=" title-card mt-3">
                  <i className="fa fa-plus" /> Ajouter une annonce
                </h1>
                <div className="card-body">
                  <div className="form-group">
                    <label>Titre:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      onChange={this.handleChange1}
                      placeholder="Votre titre..."
                    />
                  </div>
                  <div className="form-group">
                    <label>Description:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      onChange={this.handleChange2}
                      placeholder="Votre description..."
                    />
                  </div>
                  <div className="form-group">
                    <label>Prix:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      onChange={this.handleChange3}
                      placeholder="Votre prix..."
                    />
                  </div>
                  <label>Ajouter photos: </label>
                  <div className="mb-5">
                    <div className="custom-file">
                      <input
                        onChange={this.handleChangeImage}
                        type="file"
                        multiple
                        className="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile01"
                      >
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
                  <button type="submit" className="btn btn-primary large-btn">
                    <i className="fa fa-plus" /> Ajouter
                  </button>
                  {this.state.response === true ? (
                    <div className="mt-3 alert alert-success">
                      Votre produit a bien ete ajoute !
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </form>
            </div>
            <div class="col col-lg-6">
            <div class="card form margin-top">
            <h1 className=" title-card mt-3">
                  <i className="fa fa-plus" /> Ajouter une description
                </h1>
            <div className="card-body">
                  <div className="form-group">
                    <label>Titre:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      onChange={this.handleChange1}
                      placeholder="Votre titre..."
                    />
                  </div>
                  <div className="form-group">
                    <label>Description:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      onChange={this.handleChange2}
                      placeholder="Votre description..."
                    />
                  </div>
                  
                <a href="/" class="btn btn-primary large-btn">
                  <i className="fa fa-plus" /> Ajouter
                </a>
              </div>
            </div>
          </div>
          </div>
          </div>
          <div className="container-table mt-5 mb-5">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Titre</th>
                  <th scope="col">Description</th>
                  <th scope="col">Prix</th>
                  <th scope="col">Supprimer</th>
                  <th scope="col">Modifier</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <th scope="row">{product.id}</th>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td>{product.price} €</td>
                    <td>
                      <span
                        className="cursor-click"
                        onClick={() => this.handleDelete(product.id)}
                      >
                        <i className="fa fa-trash fa-2x" />
                      </span>
                    </td>
                    <td>
                      <a href={"edit/product/" + product.id}>
                        <i className="fa fa-edit fa-2x" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default Admin;

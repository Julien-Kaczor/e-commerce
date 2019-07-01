import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import Register from './Register';
import Login from './Login';
import Forum from './Forum';
import Product from './Product';
import Cart from './Cart';
import ProductEdit from './ProductEdit';
import Popularity from './Popularity';
import Flash from './Flash';
import Categorie from './Categorie';
import Admin from './Admin';
import Profil from './Profil';
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/Popularity" component={Popularity} />
        <Route path="/product/" component={Product} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route path="/profil" component={Profil} />
        <Route path="/categorie/" component={Categorie} />
        <Route path="/flash/" component={Flash} />
        <Route path="/register" component={Register} />
        <Route path="/edit/product/" component={ProductEdit} />
        <Route path="/cart/" component={Cart} />
        <Route path="/forum" component={Forum}/>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();

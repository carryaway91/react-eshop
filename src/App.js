import React from 'react';
import './App.css';
import Layout from './HOC/Layout/Layout'
import Homepage from './containers/Homepage/Homepage'
import ProductList from './containers/ProductList/ProductList'
import ProductShow from './containers/ProductShow/ProductShow'
import Cart from './containers/Cart/Cart'

import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/products" exact component={ProductList} />
          <Route path="/products/:id" exact component={ProductShow} />
          <Route path="/cart" exact component={Cart} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;

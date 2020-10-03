import React from 'react';
import './App.css';
import Layout from './HOC/Layout/Layout'
import Homepage from './containers/Homepage/Homepage'
import ProductList from './containers/ProductList/ProductList'
import ProductShow from './containers/ProductShow/ProductShow'
import Cart from './containers/Cart/Cart'
import Checkout from './containers/Checkout/Checkout'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Switch, Route, withRouter } from 'react-router-dom'

function App({ location }) {
  return (
    <div className="App">
      <Layout>
        <TransitionGroup className="transition-group">
          <CSSTransition
            key={location.key}
            timeout={300}
            classNames={'fade'}
          >
            <section className="route-section">
              <Switch location={location}>
                <Route path="/react-eshop" exact component={Homepage} />
                <Route path="/react-eshop/products" exact component={ProductList} />
                <Route path="/react-eshop/products/:id" exact component={ProductShow} />
                <Route path="/react-eshop/cart" exact component={Cart} />
                <Route path="/react-eshop/checkout" exact component={Checkout} />
              </Switch>
            </section>
          </CSSTransition>
        </TransitionGroup>

      </Layout>
    </div>
  );
}

export default withRouter(App);

import React from 'react';
import { render } from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import { Home } from './components/Home';
import { ProductGridView } from './components/ProductGridView';
import { ProductDetail } from './components/ProductDetail';
import { Checkout } from './components/Checkout';

class App extends React.Component {
    render() {
        return (
          <Router history={browserHistory}>
               <Route path={"/"} component={Home} >
                   <IndexRoute component={ProductGridView} />
                   <Route path={"product/:id"} component={ProductDetail} />
                   <Route path={"checkout/:id"} component={Checkout} />
               </Route>
           </Router>
        );
    }
}

render(<App/>, window.document.getElementById('main'));

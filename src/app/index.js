import React from 'react';
import { render } from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import { Home } from './components/Home';
import { ProductGridView } from './components/ProductGridView';
import { ProductDetail } from './components/ProductDetail';
import { Checkout } from './components/Checkout';
import { UserLogin } from './components/UserLogin';
import { Order } from './components/Order';
import { StoreHome } from './components/Store/StoreHome';
import { StoreLogin } from './components/Store/StoreLogin';
import { StoreRegister } from './components/Store/StoreRegister';
import { StoreProduct } from './components/Store/StoreProduct';
import { AddEditProduct } from './components/Store/AddEditProduct';
import { StoreOrder } from './components/Store/StoreOrder';

class App extends React.Component {
    render() {
        return (
          <Router history={browserHistory}>
               <Route path={'/'} component={Home} >
                   <IndexRoute component={ProductGridView} />
                   <Route path={'product/:id'} component={ProductDetail} />
                   <Route path={'checkout/:id'} component={Checkout} />
                   <Route path={'login'} component={UserLogin} />
                   <Route path={'order'} component={Order} />
               </Route>
               <Route path={'/panel'} component={StoreHome} >
                   <Route path={'login'} component={StoreLogin} />
                   <Route path={'register'} component={StoreRegister} />
                   <IndexRoute component={StoreProduct} />
                   <Route path={'newProduct'} component={AddEditProduct} />
                   <Route path={'product/:id'} component={AddEditProduct} />
                   <Route path={'order'} component={StoreOrder} />
               </Route>
           </Router>
        );
    }
}

render(<App/>, window.document.getElementById('main'));

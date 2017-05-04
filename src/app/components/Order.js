import React from 'react';
import { Header } from './Header';
import { ProductGridView } from './ProductGridView';
import { Footer } from './Footer';
import FacebookLogin from 'react-facebook-login';

export class Order extends React.Component {
    constructor() {
        super();
        this.state = { orders: [] };
    }

    componentDidMount() {
        fetch('https://localhost:3000/api/order', {
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + localStorage.getItem('userToken')
          })
        })
            .then((resp) => resp.json())
            .then((result) => {
              console.log(result.data);
                this.setState({orders:result.data});
            });

    }
    render() {
        return (
          <div className="container-fluid">
            <div className="row">
                <div className="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
                    <ul className="list-group">
                            {this.state.orders.map( (order) => {
                              return  <li className="list-group-item">
                                          <strong>{order.item.title}</strong>
                                          <span className="label label-success pull-right">{order.item.price}€</span>
                                      </li>
                            })}
                    </ul>
                </div>
            </div>
          </div>
        );
    }
}

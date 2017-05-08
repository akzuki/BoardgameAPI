import React from 'react';

export class StoreOrder extends React.Component {
    constructor() {
        super();
        this.state = { orders: [] };
    }

    componentDidMount() {
      const storeToken =  localStorage.getItem('storeToken');
      if (storeToken) {
        fetch('https://localhost:3000/panel/order', {
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + localStorage.getItem('storeToken')
          })
        })
            .then((resp) => resp.json())
            .then((result) => {
              console.log(result.data);
                this.setState({orders:result.data});
            });
      } else {
        browserHistory.push('/panel/login');
      }
    }

    render() {
        return (
          <div className="container">
            <br/>
            <br/>
            <div className="collection">
              {this.state.orders.map( (order) => {
                return  <div className="row collection-item">
                            <div className="col-sm-8">
                              <div className="row">
                                <div className="col-xs-4 col-lg-3">
                                  <img src={"https://localhost:3000/photos/product/" + order.item.photoUrl} className="img-responsive c-img" alt="Image"/>
                                </div>
                                <div className="col-xs-8 col-lg-9">
                                  <span className="c-info__name">{order.item.title}</span>
                                  <br/>
                                  <span>Shipping address: {order.shippingAddress}</span>
                                  <br/>
                                  <span>Buyer: {order.buyer.firstName}</span>
                                  <br/>
                                  <span>Transaction id: {order.transactionId}</span>
                                  <br/>
                                  <span className="label label-success">{order.item.price}€</span>
                                </div>
                              </div>
                            </div>
                          </div>
                })}

            </div>
          </div>
        );
    }
}

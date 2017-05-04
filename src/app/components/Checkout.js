import React from 'react';

export class Checkout extends React.Component {
    constructor() {
        super();
        this.state = {
          item: {},
          address: '',
          cardNumber: '',
          expMonth: '',
          expYear: '',
          cvc: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      const url = 'https://localhost:3000/api/product/' + this.props.params.id;
        fetch(url)
            .then((resp) => resp.json())
            .then((result) => {
                this.setState({item:result.data});
            });

    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    handleSubmit(event) {
      event.preventDefault();
    }

    render() {
        return (
          <div className="content-wrapper">
            <div className="row">
                <div className="col-sm-6 col-md-4 col-md-offset-4 col-sm-offset-3">
                    <h1>Checkout</h1>
                    <h4>Your Total: {this.state.item.price}€</h4>
                    <div id="charge-error" className="alert alert-danger">

                    </div>
                    <form id="checkout-form" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="address">Shipping Address</label>
                                    <input type="text" value={this.state.address} onChange={this.handleInputChange} id="address" className="form-control" required name="address"/>
                                </div>
                            </div>
                            <hr/>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="card-number">Credit Card Number</label>
                                    <input type="text" value={this.state.cardNumber} onChange={this.handleInputChange} id="card-number" className="form-control" name="cardNumber" required/>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="row">
                                    <div className="col-xs-6">
                                        <div className="form-group">
                                            <label htmlFor="card-expiry-month">Expiration Month</label>
                                            <input type="text" value={this.state.expMonth} onChange={this.handleInputChange} id="card-expiry-month" className="form-control" name="expMonth" required/>
                                        </div>
                                    </div>
                                    <div className="col-xs-6">
                                        <div className="form-group">
                                            <label htmlFor="card-expiry-year">Expiration Year</label>
                                            <input type="text" value={this.state.expYear} onChange={this.handleInputChange} id="card-expiry-year" className="form-control" name="expYear" required/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="card-cvc">CVC</label>
                                    <input type="text" value={this.state.cvc} onChange={this.handleInputChange} id="card-cvc" className="form-control" name="cvc" required/>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success">Buy now</button>
                    </form>
                </div>
            </div>
          </div>
        );
    }
}

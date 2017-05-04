import React from 'react';
import { Carousel } from './Carousel';
import { Link } from 'react-router';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

export class ProductDetail extends React.Component {
    constructor() {
        super();
        this.state = { item: {} };
    }

    componentDidMount() {
      const url = 'https://localhost:3000/api/product/' + this.props.params.id;
        fetch(url)
            .then((resp) => resp.json())
            .then((result) => {
                console.log(result.data);
                this.setState({item:result.data});
            });

    }

    onClickBuy() {
      const userToken =  localStorage.getItem('userToken');

      const checkoutPath = "/checkout/" + this.state.item._id;
      const loginPath = "/login"
      browserHistory.push(userToken ? checkoutPath : loginPath);
    }

    render() {
        return (
          <div className="container-fluid">
                <div className="content-wrapper">
            		<div className="item-container">
            			<div className="container">
            				<div className="col-md-4">
            					<div className="product col-md-4">
                          <img id="item-display" src={"https://localhost:3000/photos/product/" + this.state.item.photoUrl} alt=""/>
            					</div>
            				</div>

            				<div className="col-md-8">
            					<div className="product-title">{this.state.item.title}</div>
            					<div className="product-desc">{this.state.item.description}</div>
            					<hr/>
            					<div className="product-price">{this.state.item.price}€</div>
            					<div className="product-stock">In Stock</div>
            					<hr/>
            					<div className="btn-group cart">
            						<button onClick={this.onClickBuy.bind(this)} type="button" className="btn btn-success">
            							Buy
            						</button>
            					</div>
            				</div>
            			</div>
            		</div>
            		<div className="container-fluid">
            			<div className="col-md-12 product-info">
            					<ul id="myTab" className="nav nav-tabs nav_tabs">

            						<li className="active"><a href="#service-one" data-toggle="tab">DESCRIPTION</a></li>

            					</ul>
            				<div id="myTabContent" className="tab-content">
            						<div className="tab-pane fade in active" id="service-one">

            							<section className="container product-info">
            								{this.state.item.description}

            								<h3>Features:</h3>
            								<li>Player: {this.state.item.player}</li>
            								<li>Time: {this.state.item.time}</li>
            								<li>Ages: {this.state.item.ages}</li>
            							</section>

            						</div>
            					<div className="tab-pane fade" id="service-two">

            						<section className="container">

            						</section>

            					</div>
            					<div className="tab-pane fade" id="service-three">

            					</div>
            				</div>
            				<hr/>
            			</div>
            		</div>
            	</div>
            </div>
        );
    }
}

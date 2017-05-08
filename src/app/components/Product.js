import React from 'react';
import { Carousel } from './Carousel';
import { Link } from 'react-router';

export class Product extends React.Component {
    render() {
        return (
          <Link to ={"/product/"+this.props.id}>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div className="thumbnail">
              <img src={"https://localhost:3000/photos/product/" + this.props.photoUrl} className="img-responsive product-image" alt="Image"/>
              <div className="caption">
                  <span className="label label-success pull-right">{this.props.price}€</span>
                  <h4>{this.props.title}</h4>
                  <p className="product-description">{this.props.description}</p>
              </div>
            </div>
          </div>
          </Link>
        );
    }
}

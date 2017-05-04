import React from 'react';
import { Product } from './Product';
import { Carousel } from './Carousel';

export class ProductGridView extends React.Component {
    constructor() {
        super();
        this.state = { items: [] };
    }

    componentDidMount() {
        fetch('https://localhost:3000/api/product')
            .then((resp) => resp.json())
            .then((result) => {
              console.log(result.data);
                this.setState({items:result.data});
            });

    }

    render() {
        return (
          <div>
            <Carousel data={this.state.items}/>
            <div className="block-title">
                <h2>New arrivals</h2>
                <hr style={{"width": "200px"}}/>
            </div>
            <div className="container product-container">
              <div className="row">
                {this.state.items.map( item => <Product id={item._id} title={item.title} price={item.price} description={item.description} photoUrl={item.photoUrl}/>)}
              </div>
            </div>
          </div>
        );
    }
}

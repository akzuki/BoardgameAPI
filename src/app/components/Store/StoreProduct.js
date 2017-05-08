import React from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

export class StoreProduct extends React.Component {
    constructor() {
        super();
        this.state = { items: [] };
    }

    componentDidMount() {
      const storeToken =  localStorage.getItem('storeToken');
      if (storeToken) {
        this.fetchData();
      } else {
        browserHistory.push('/panel/login');
      }
    }

    fetchData() {
      fetch('https://localhost:3000/panel/product', {
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + localStorage.getItem('storeToken')
        })
      })
          .then((resp) => resp.json())
          .then((result) => {
            console.log(result.data);
              this.setState({items:result.data});
          });
    }

    addNewProduct() {
      browserHistory.push('/panel/newProduct');
    }

    onClickUpdateItem(id) {
      const path = '/panel/product/' + id;
      browserHistory.push(path);
    }

    onClickDeleteItem(id) {
      fetch('https://localhost:3000/panel/product/', {
        method: 'DELETE',
        body: JSON.stringify({
          'boardgameId': id
        }),
        mode: 'cors',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + localStorage.getItem('storeToken')
        })
      }).then((resp) => resp.json())
        .then((result) => {
          if (result.status == 200) {
            this.fetchData();
          }
        });
    }

    render() {
        return (
          <div className="container">
            <br/>
            <br/>
            <div>
              <button onClick={this.addNewProduct.bind(this)} type="button" className="btn c-btn c-btn__update">Add new product</button>
            </div>
            <div className="collection">
              {this.state.items.map( (item) => {
                return  <div className="row collection-item">
                            <div className="col-sm-8">
                              <div className="row">
                                <div className="col-xs-4 col-lg-3">
                                  <img src={"https://localhost:3000/photos/product/" + item.photoUrl} className="img-responsive c-img" alt="Image"/>
                                </div>
                                <div className="col-xs-8 col-lg-9">
                                  <span className="c-info__name">{item.title}</span>
                                  <br/>
                                  <span><p className="product-description">{item.description}</p></span>
                                  <br/>
                                  <span>Price: {item.price}€</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-4 c-list__btn">
                              <div className="row">
                                <div className="col-sm-12">
                                  <button onClick={() => this.onClickUpdateItem(item._id)} type="button" className="btn c-btn c-btn__update">Update</button>
                                  <button onClick={() => this.onClickDeleteItem(item._id)} type="button" className="btn c-btn c-btn__delete">Delete</button>
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

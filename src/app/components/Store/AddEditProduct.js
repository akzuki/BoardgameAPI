import React from 'react';
import { browserHistory } from 'react-router';

export class AddEditProduct extends React.Component {
    constructor() {
        super();
        this.state = {
          title: '',
          description: '',
          player: '',
          time: '',
          ages: '',
          price: '',
          error: null
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdateProduct = this.handleUpdateProduct.bind(this);
    }

    componentDidMount() {
      if (this.props.params.id) {
        const url = 'https://localhost:3000/api/product/' + this.props.params.id;
        fetch(url, {
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + localStorage.getItem('storeToken')
          })
        })
            .then((resp) => resp.json())
            .then((result) => {
              this.setState({
                title: result.data.title,
                description: result.data.description,
                player: result.data.player,
                time: result.data.time,
                ages: result.data.ages,
                price: result.data.price
              });
            });
      }
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
      const input = document.querySelector('input[type="file"]')
      var data = new FormData()
      data.append('photo', input.files[0])

      fetch('https://localhost:3000/panel/product/photo', {
        method: 'POST',
        body: data,
        mode: 'cors',
        headers: new Headers({
          'Authorization': 'JWT ' + localStorage.getItem('storeToken')
        })
      }).then((resp) => resp.json())
        .then((result) => {
          if (result.status == 200) {
            return result.data
          } else {
            this.setState({
              error: result.description
            });
          }
        }).then((photoUrl) => {
          return fetch('https://localhost:3000/panel/product/', {
            method: 'POST',
            body: JSON.stringify({
              'photoUrl': photoUrl,
              'title': this.state.title,
              'description': this.state.description,
              'player': this.state.player,
              'time': this.state.time,
              'ages': this.state.ages,
              'price': this.state.price
            }),
            mode: 'cors',
            headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'JWT ' + localStorage.getItem('storeToken')
            })
          })
        }).then((resp) => resp.json())
          .then((result) => {
            if (result.status == 200) {
              browserHistory.push('/panel');
            } else {
              this.setState({
                error: result.description
              });
            }
        });
    }

    handleUpdateProduct(event) {
      event.preventDefault();
      const input = document.querySelector('input[type="file"]')
      var data = new FormData()
      data.append('photo', input.files[0])

      fetch('https://localhost:3000/panel/product/photo', {
        method: 'POST',
        body: data,
        mode: 'cors',
        headers: new Headers({
          'Authorization': 'JWT ' + localStorage.getItem('storeToken')
        })
      }).then((resp) => resp.json())
        .then((result) => {
          if (result.status == 200) {
            return result.data
          } else {
            this.setState({
              error: result.description
            });
          }
        }).then((photoUrl) => {
          const url = 'https://localhost:3000/panel/product/' + this.props.params.id;
          return fetch(url, {
            method: 'PUT',
            body: JSON.stringify({
              'photoUrl': photoUrl,
              'title': this.state.title,
              'description': this.state.description,
              'player': this.state.player,
              'time': this.state.time,
              'ages': this.state.ages,
              'price': this.state.price
            }),
            mode: 'cors',
            headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'JWT ' + localStorage.getItem('storeToken')
            })
          })
        }).then((resp) => resp.json())
          .then((result) => {
            if (result.status == 200) {
              browserHistory.push('/panel');
            } else {
              this.setState({
                error: result.description
              });
            }
        });
    }

    render() {
        return (
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-4 col-md-offset-4">
                  <h1>{this.props.params.id ? 'Update product' : 'Add new product'}</h1>
                      <div style={{display: this.state.error ? 'block' : 'none' }} className="alert alert-danger">
                          {this.state.error}
                      </div>
                  <form onSubmit={this.props.params.id ? this.handleUpdateProduct : this.handleSubmit}>
                      <div className="form-group">
                          <label htmlFor="title">Name: </label>
                          <input type="text" value={this.state.title} onChange={this.handleInputChange} id="title" name="title" required className="form-control"/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="description">Description: </label>
                          <input type="text" value={this.state.description} onChange={this.handleInputChange} id="description" name="description" required className="form-control"/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="player">Player: </label>
                          <input type="text" value={this.state.player} onChange={this.handleInputChange} id="player" name="player" required className="form-control"/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="time">Time: </label>
                          <input type="text" value={this.state.time} onChange={this.handleInputChange} id="time" name="time" required className="form-control"/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="ages">Ages: </label>
                          <input type="text" value={this.state.ages} onChange={this.handleInputChange} id="ages" name="ages" required className="form-control"/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="price">Price: </label>
                          <input type="text" value={this.state.price} onChange={this.handleInputChange} id="price" name="price" required className="form-control"/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="photo">Photo: </label>
                          <input type="file" id="photo" name="photo" required className="form-control"/>
                      </div>
                      <button type="submit" className="btn btn-primary">{this.props.params.id ? 'Save' : 'Add'}</button>
                  </form>
              </div>
            </div>
          </div>
        );
    }
}

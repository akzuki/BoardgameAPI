import React from 'react';
import { Header } from './Header';
import { ProductGridView } from './ProductGridView';
import { Footer } from './Footer';
import FacebookLogin from 'react-facebook-login';

export class Home extends React.Component {
    render() {
        return (
            <div>
              <Header/>
                <div className="content">
                  {this.props.children}
                </div>
              <Footer/>
            </div>
        );
    }
}

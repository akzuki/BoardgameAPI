import React from 'react';
import { StoreHeader } from './StoreHeader';
import { Footer } from '../Footer';

export class StoreHome extends React.Component {
    render() {
        return (
            <div>
              <StoreHeader/>
                <div className="content">
                  {this.props.children}
                </div>
              <Footer/>
            </div>
        );
    }
}

import React from 'react';

export class Carousel extends React.Component {
    render() {
        return (
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner" role="listbox">
              <div className="item active">
                <img className="carousel-image" src="http://everything.demo1.wpdance.com/demo/wp-content/uploads/2016/08/slider_1_game.jpg" alt="Image"/>
                <div className="carousel-caption carousel-content">
                  <h2 className="carousel-title">Hahahahaha</h2>
                </div>
              </div>
              <div className="item">
                <img className="carousel-image" src="http://everything.demo1.wpdance.com/demo/wp-content/uploads/2016/08/slider_2_game.jpg"alt="Image"/>
                <div className="carousel-caption carousel-content">
                  <h3>More Sell $</h3>
                  <p>Lorem ipsum...</p>
                </div>
              </div>
            </div>


            <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
              <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
              <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
        </div>
        );
    }
}

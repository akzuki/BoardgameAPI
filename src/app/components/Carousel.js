import React from 'react';

export class Carousel extends React.Component {
    render() {
        return (
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner" role="listbox">
              <div className="item active">
                <img className="carousel-image" src="https://images-cdn.fantasyflightgames.com/filer_public/54/f1/54f171a5-aae7-43e4-bf5b-a0400e36aea7/dj01_feature_art.jpg" alt="Image"/>
                <div className="carousel-caption carousel-content">
                  <h2 className="carousel-title">DESCENT: JOURNEYS IN THE DARK</h2>
                </div>
              </div>
              <div className="item">
                <img className="carousel-image" src="https://talesfromthecards.files.wordpress.com/2014/06/faction.jpg"alt="Image"/>
                <div className="carousel-caption carousel-content">
                  <h2 className="carousel-title">LORD OF THE RINGS: THE CARD GAME</h2>
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

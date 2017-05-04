import React from 'react';

export class Footer extends React.Component {
    render() {
        return (
          <footer>
             <div className="container">

                     <div className="row text-center">
                        <ul className="list-inline">

                                         <li>
                                              <a href="#"><i className="fa fa-facebook fa-2x"></i></a>
                                         </li>

                                         <li>
                                              <a href="#"><i className="fa fa-dropbox fa-2x"></i></a>
                                         </li>

                                         <li>
                                              <a href="#"><i className="fa fa-flickr fa-2x"></i></a>
                                         </li>

                                         <li>
                                              <a href="#"><i className="fa fa-github fa-2x"></i></a>
                                         </li>

                                         <li>
                                              <a href="#"><i className="fa fa-linkedin fa-2x"></i></a>
                                         </li>

                                         <li>
                                              <a href="#"><i className="fa fa-tumblr fa-2x"></i></a>
                                         </li>


                               </ul>
                      </div>

                      <div className="row text-center">
                            <ul className="menu list-inline">

                                   <li>
                                      <a href="#">Home</a>
                                    </li>

                                    <li>
                                       <a href="#">About</a>
                                    </li>

                                    <li>
                                      <a href="#">Blog</a>
                                    </li>

                                    <li>
                                       <a href="#">Gallery</a>
                                    </li>

                                    <li>
                                      <a href="#">Contact</a>
                                   </li>

                           </ul>
                       </div>


              </div>
          </footer>
        );
    }
}

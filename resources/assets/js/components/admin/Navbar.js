import React, { Component } from 'react';

export default class Navbar extends Component {
    constructor(props){
      super(props);
      this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(e){
      e.preventDefault();
      return this.props.onClick(e.target.href);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-dark text-white mx-0">
              <div className="navbar-brand">
                Zámbó és Társa Bt. - Adminisztrációs panel
              </div>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="admin/categories" onClick={this.handleOnClick}>
                      <i className="fas fa-2x fa-th-list"></i><br/>
                      kategóriák
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="admin/new_picture" onClick={this.handleOnClick}>
                      <i className="far fa-2x fa-images"></i><br/>
                      képek
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="admin/informations" onClick={this.handleOnClick}>
                      <i className="fas fa-2x fa-info-circle"></i><br />
                      cégadatok
                        </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <i className="fas fa-2x fa-sign-out-alt"></i><br/>
                      kilépés
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
        );
    }
}

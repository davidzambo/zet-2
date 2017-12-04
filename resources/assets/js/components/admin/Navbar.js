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
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="#">Köszöntő <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Miben segíthetünk?</a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Referenciáink
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Elérhetőségeink</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/admin/categories" onClick={this.handleOnClick}>Kategóriák</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="admin/new_picture" onClick={this.handleOnClick}>Képfeltöltés</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Kilépés</a>
                  </li>
                </ul>
              </div>
            </nav>
        );
    }
}

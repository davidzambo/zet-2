import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';

export default class App extends Component {
    render() {
        return (
            <div className="container-fluid px-0">
              <Navbar/>
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}

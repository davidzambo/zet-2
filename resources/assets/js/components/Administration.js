import {Container, Row, Col, Form, FormGroup, Label, Input, FormText, Button} from 'reactstrap';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './admin/Navbar';
import Upload from './admin/Upload';
import Warning from './admin/Warning';
import Categories from './admin/Categories';


export default class Administration extends Component {
    constructor(props){
      super(props);
      this.getCategories = this.getCategories.bind(this);
      this.handleNavbarOnClick = this.handleNavbarOnClick.bind(this);
      this.state = {
        page: 'welcome',
        categories: [],
      }
    }

    componentWillMount(){
      this.getCategories();
    }

    // fetch the categories. The main section should manage this, because the
    // 'categories' component and the 'upload' component should also work with
    // the returned datas
    getCategories(){
      return axios.get('/api/admin/categories')
          .then(response => {
            this.setState({
              categories: response.data
            })
          });
    }


    // get the clcked navbar element's href, split it, and set it as a state
    handleNavbarOnClick(link){
      this.setState({
        page: link.split('admin/')[1]
      });
    }

    render() {
        // Based on state.page decide what to render.
        let page;
        switch (this.state.page){
          case 'welcome':
            page = 'welcome';
            break;
          case 'new_picture':
            page = <div>
                      <Upload categories={this.state.categories} refreshCategories={this.getCategories}/>
                      <Warning/>
                    </div>
            break;
          case 'categories':
            page = <div>
                    <Categories categories={this.state.categories} refreshCategories={this.getCategories}/>
                  </div>
            break;
        }

        return (
            <div>
              <Navbar onClick={this.handleNavbarOnClick}/>

              <main className="container-fluid">
                <div className="row justify-content-center py-5">
                  { page }
                </div>
              </main>
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Administration />, document.getElementById('root'));
}

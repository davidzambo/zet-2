import React, { Component } from 'react';
import {Col, Form, FormGroup, Label, Input, FormText, Button} from 'reactstrap';
import Warning from './Warning';

export default class Upload extends Component {
    constructor(props){
      super(props);
      this.openNewCategoryDialog = this.openNewCategoryDialog.bind(this);
      this.closeNewCategoryDialog = this.closeNewCategoryDialog.bind(this);
      this.storeNewCategory = this.storeNewCategory.bind(this);
      this.state = {
        categories: [],
        warning:{
          hasErrors: false,
          message: ''
        }
      }
    }

    componentWillMount(){
      this.setState({
        categories: this.props.categories
      })
    }

    openNewCategoryDialog(e){
      if (e.target.value === "new")
        this.setState({ isNewCategory: true });
    }

    closeNewCategoryDialog(){
      this.setState({ isNewCategory: false });
    }

    storeNewCategory(){
      const data = {
        name: document.getElementById('category_name').value
      };

      axios({
        method: 'post',
        url: '/api/admin/categories',
        header: {'Accept': 'application/json'},
        data: data
      })
        .then(response => {
          // handle validation errors
          if (response.data.hasOwnProperty('errors')) {
            this.setState({
              warning: {
                hasErrors: true,
                message: response.data.errors
              }
            })
          }
          console.log(response.data);
        });
      // this.setState({ newCategory: false });
    }

    render() {
        let addNewCategory = '';
        let errors = '';
        
        if (this.state.isNewCategory === true)
          if (this.state.warning.hasErrors){
            errors = <p>this.state.warning.message</p>;
          }
          addNewCategory =
          <div>
            <FormGroup>
              <Label for="category">Új kategória megnevezése:</Label>
              <Input type="text" name="category_name" id="category_name" onChange={this.addNewCategory}></Input>
            </FormGroup>
            { errors }
            <FormGroup>
              <Button color="primary" onClick={this.storeNewCategory}>mentés</Button> {' '}
              <Button color="secondary" onClick={this.cancelNewCategory}>mégsem</Button>
            </FormGroup>
          </div>

        var categories = this.state.categories.map( (el, i) => {return <option value={el.id} key={'category'+el.id}>{el.name}</option>} );

        return (
          <Col>
            <h1>Képek és videók feltöltése</h1>
            <Form>
              <FormGroup>
                <Label for="category">Hova:</Label>
                <Input type="select" name="category" id="category" onChange={this.addNewCategory}>
                  <option value="references">referenciák</option>
                  <option value="shop">bolt</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="category">Kategória:</Label>
                <Input type="select" name="category" id="category" onChange={this.addNewCategory}>
                  { categories }
                  <option value="new">Új kategória</option>
                </Input>
              </FormGroup>

              { addNewCategory }

              <FormGroup>
                <Label for="files">Fényképek feltöltése: </Label>
                <Input type="file" name="files" id="files" multiple></Input>
              </FormGroup>

              <FormGroup>
                <Button type="submit" color="primary" className="ml-auto">Feltöltés</Button>
              </FormGroup>
            </Form>
            <Warning hasErrors={this.state.hasErrors} message={this.state.errors}/>
          </Col>
        );
    }
}

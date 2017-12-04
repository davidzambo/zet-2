import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter} from 'reactstrap';

export default class CategoryModal extends Component {
    constructor(props){
      super(props);
      this.updateCategory = this.updateCategory.bind(this);
      this.createCategory = this.createCategory.bind(this);
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      }
    }

    componentWillReceiveProps(nextProps){
      // if there is no update set up, this class won't get any 'details' props.
      this.setState({isOpen: (nextProps.details === undefined) ? false : nextProps.details.isOpen})
    }

    toggle(){
      // the categories class will change the toggle, as it has to changes it's stage to
      // not to pop up the modal window again.
      // If this state has been changed itself, the modal window will fade away, but in the
      // next state refresh of the parent class will open again the modal box.
      this.props.details.cancel();
    }

    updateCategory(){
      let category = this.props.details.item;
      category.name = document.getElementById('category_name').value;
      axios({
        url: '/api/admin/categories/'+category.id,
        method: 'put',
        data: category
      })
        .then( () => this.props.details.confirm())
        .then( () => { return this.toggle() });
    }

    createCategory(){
      let name = document.getElementById('category_name').value;
      axios({
        url: '/api/admin/categories/',
        method: 'post',
        data: {
          name: name
        }
      })
        .then( () => this.props.details.confirm())
        .then( () => { return this.toggle() });
    }


    render() {
      let title = '', value = '', button = '';

      if (this.props.details !== undefined){
        if (this.props.details.isUpdate) {
          value = this.props.details.item.name;
          title = 'Kategória frissítése';
          button = <Button color="primary" onClick={this.updateCategory} className="mr-auto">frissítés</Button>;
          } else {
            value = '';
            title = 'Új kategória hozzáadása';
            button = <Button color="primary" onClick={this.createCategory} className="mr-auto">mentés</Button>;
            }
      }

      return (
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{ title }</ModalHeader>
          <ModalBody>
            <label>Kategória megnevezése:</label>
            <input type="text" className="form-control mt-2 mb-4" name="category_name" id="category_name" defaultValue={ value }/>
          </ModalBody>
          <ModalFooter>
            { button }
            <Button color="secondary" onClick={this.toggle} className="ml-auto">mégsem</Button>
          </ModalFooter>
        </Modal>
      );
    }
}

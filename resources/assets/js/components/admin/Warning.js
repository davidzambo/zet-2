import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter} from 'reactstrap';

export default class Warning extends Component {
    constructor(props){
      super(props);
      this.toggle = this.toggle.bind(this);
      this.handleConfirm = this.handleConfirm.bind(this);
      this.state = {
        isOpen: false
      }
    }

    componentWillReceiveProps(nextProps){
      this.setState({isOpen: nextProps.isOpen})
    }

    handleConfirm(){
      return (this.props.details === undefined) ? true : this.props.details.button.action(this.props.details.item);
    }

    toggle(){
      this.props.details.cancel();
    }


    render() {
      let button = '';
      // by default the categories.js doesn't initialize the detailed 'destroy' state,
      // so we have to check it's status.
      // the Categories class' confirmDestroy function will set it up.
      if (this.props.details !== undefined){
        if (this.props.details.isConfirmable === true){
          button =
          <div>
            <Button color="danger" onClick={this.handleConfirm} className="mr-auto">{this.props.details.button.label}</Button> {' '}
            <Button color="secondary" onClick={this.toggle} className="ml-auto">mégsem</Button>
            </div>;
          } else {
            button = <Button color="primary" onClick={this.toggle} className="m-auto">rendben</Button>;
            }
      }
      let nameStyle = {
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        padding: '6px 12px',
        margin: '12px auto',
        display: 'inline-block'
      }

      return (
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            {(this.props.details === undefined) ? '' : this.props.details.title}
          </ModalHeader>
          <ModalBody>
            <h4>{(this.props.details === undefined) ? '' : this.props.details.message.question}</h4>
            <span style={nameStyle}>{(this.props.details === undefined) ? '' : this.props.details.item.name}</span><br/>
            <p>{(this.props.details === undefined) ? '' : this.props.details.message.description}</p>
          </ModalBody>
          <ModalFooter>

            { button }

          </ModalFooter>
        </Modal>
      );
    }
}

import React, { Component } from 'react';
import {Col, Form, FormGroup, Label, Input, FormText, Button} from 'reactstrap';

export default class ShowPreview extends Component {
    constructor(props){
      super(props);
      this.handleOnClick = this.handleOnClick.bind(this);
      this.handleRotate = this.handleRotate.bind(this);
    }

    handleOnClick(e){
      let el = e.target.getAttribute('data-index');
      console.log(el);
      this.props.remove(el);
    }

    handleRotate(e){
      let el = e.target.getAttribute('data-index');      
      let isClockwise = e.target.getAttribute('data-isClockwise');
      console.log(isClockwise);
      this.props.rotate(el, isClockwise);
    }

    render() {
        let removeButtonContainer = {
          position:         'absolute',
          right:            2,
          top:              -10,
          cursor:           'pointer',
          backgroundColor:  'transparent',
          border:           'none'
        },

          undoButtonContainer = {
            position: 'absolute',
            right: -2,
            cursor: 'pointer',
            backgroundColor: 'transparent',
            border: 'none'
          },

          redoButtonContainer = {
            position: 'absolute',
            left: -2,
            cursor: 'pointer',
            backgroundColor: 'transparent',
            border: 'none'
          },

          rotateButtonContainer = {
            position: 'absolute',
            left: 1,
            top: -10,
            cursor: 'pointer',
            backgroundColor: 'black',
            border: '1px solid black',
            borderRadius : 50,
            height: 22,
            width: 44
          };

        let preview;
        let rotate;
        
        // decide if the uploadable file will be an image or a video file.
        // checking the base64 informations, SPLIT it on the ";" mark,
        // and investigate the string part after data:
        if (this.props.src.split(';')[0].slice(5,10) === 'video'){
          
          preview = 
            <video style={{ width: '100%', height: 'auto'}} preload="metadata">
              <source src={this.props.src} type="video/mp4"/>
            </video>;
          
          rotate = '';

        } else {

          preview = <img src={this.props.src} className="img-fluid" />;
          
          rotate = <div style={rotateButtonContainer}>
            <button type="button" className="fa-layers fa-fw fa-lg"
              onClick={this.handleRotate}
              data-isClockwise={false}
              data-index={this.props.index}
              style={undoButtonContainer}>
              <i className="fas fa-circle" style={{ color: 'black' }}></i>
              <i className="fa-inverse fas fa-undo" data-fa-transform="shrink-6"></i>
            </button>

            <button type="button" className="fa-layers fa-fw fa-lg"
              onClick={this.handleRotate}
              data-isClockwise={true}
              data-index={this.props.index}
              style={redoButtonContainer}>
              <i className="fas fa-circle" style={{ color: 'black' }}></i>
              <i className="fa-inverse fas fa-redo" data-fa-transform="shrink-6"></i>
            </button>

          </div>;
        }

        return (
          <div className="col-4 preview-container my-2">

            { rotate }

            <button type="button" className="fa-layers fa-fw fa-lg"
                    onClick={this.handleOnClick}
                    data-index={this.props.index}
                    style={removeButtonContainer}>
              <i className="fas fa-circle" style={{ color: 'black' }}></i>
              <i className="fa-inverse fas fa-times" data-fa-transform="shrink-6"></i>
            </button>
            <a href={this.props.src} target="_blank">

              { preview }
              
            </a>
          </div>
        );
    }
}

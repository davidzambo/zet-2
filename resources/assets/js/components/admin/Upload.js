import React, { Component } from 'react';
import {Col, Form, FormGroup, Label, Input, FormText, Button} from 'reactstrap';
import Warning from './Warning';
import ShowPreview from './ShowPreview';
import Waiting from '../Waiting';

export default class Upload extends Component {
    constructor(props){
      super(props);
      this.handleSelectCategory = this.handleSelectCategory.bind(this);
      this.openNewCategoryDialog = this.openNewCategoryDialog.bind(this);
      this.closeNewCategoryDialog = this.closeNewCategoryDialog.bind(this);
      this.storeNewCategory = this.storeNewCategory.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.readFiles = this.readFiles.bind(this);
      this.rotate = this.rotate.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
      this.state = {
        categories: [],
        category: '',
        warning:{
          hasErrors: false,
          message: ''
        },
        files: [],
        readedFiles: [],
        isFileReadFinished: false,
        waiting: false,
      }
    }

    handleSelectCategory(e){
      if (e.target.value !== 'new')
        this.setState({
          category : e.target.value
        });
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
              files: [],
              readedFiles: [],
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

    handleFormSubmit(e){
      e.preventDefault();

      axios({
        method: 'POST',
        url: 'api/admin/references',
        data: {
          readedFiles: this.state.readedFiles,
          category: this.state.category
        }
      }).then( (response) =>{
        console.log(response.data);
      }).then( () => {
        return this.setState({
          readedFiles: [],
          category: ''
        });
      });
    }


    // This method will read the files from thee "files state"
    readFiles(e, index, result){
      // initialize the parameters
      var upload = document.querySelector("#files");
      var idx = (index === undefined) ? 0 : index;
      var readedFiles = (result === undefined) ? [] : result;

      var reader = new FileReader();

      reader.onload = () => {

        readedFiles.push(reader.result);

        if (idx < upload.files.length - 1)
          // iterate through the
          this.readFiles(e, ++idx, readedFiles);
        else
          console.log(new Date().getTime());
          this.setState({
            readedFiles: readedFiles,
            isFileReadFinished: true,
            waiting: (this.state.waiting === true) ? true : false,
          })
      };

      setTimeout(reader.readAsDataURL(upload.files[idx]), 0);
      // alert(e.target.files.length);
      // reader.readAsDataURL(this.state.files[index]);
    }

    rotate(index, isClockwise){
      let canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d'),
          readedFiles = this.state.readedFiles.slice(),
          img = new Image();
      
      img.src = readedFiles[index];
      
      canvas.height = img.width;
      canvas.width = img.height;
      
      console.log(index, isClockwise);
      if (isClockwise == 'true') {
        ctx.rotate(90 * Math.PI / 180);
        ctx.translate(0, -canvas.width);
      } else {
        ctx.rotate(-90 * Math.PI / 180);
        ctx.translate(-canvas.height, 0);
      }
      ctx.drawImage(img, 0, 0);

      readedFiles[index] = canvas.toDataURL("image/jpeg", 100);

      this.setState({
        readedFiles: readedFiles,
      });

    }


    handleRemove(index){
      console.log('i will remove ' + index + 'th element');
      // let files = this.state.files.slice().splice(el, 1);
      let readedFiles = this.state.readedFiles.slice();
      readedFiles.splice(index, 1);
      // console.log(files, readedFiles);
      this.setState({
        readedFiles: readedFiles
      });
    }


    render() {
        let waiting = '',
            addNewCategory = '',
            errors = '',
            showPreview,
            submitButton;

        if (this.state.isNewCategory === true){
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
        }

        let categories = this.state.categories.map( (el, i) => {return <option value={el.id} key={'category'+el.id}>{el.name}</option>} );

        let uploadButtonLabel = (this.state.readedFiles.length > 0) ? this.state.readedFiles.length + " fénykép kiválasztva" : "Fényképek kiválasztása"


        if (this.state.readedFiles.length > 0 && this.state.isFileReadFinished) {
          showPreview = this.state.readedFiles.map( (el, i) => {
            return  <ShowPreview src={el} index={i} key={i} remove={this.handleRemove} rotate={this.rotate}/>
          });
          submitButton =
            <FormGroup className="col-12 d-flex justify-content-end">
              <Button color="primary" className="px-5">Feltöltés</Button>
            </FormGroup>;
        } else {
          showPreview = '';
          submitButton = '';
        }

        if (this.state.waiting){
          waiting = <Waiting/>
        } else {
          waiting = '';
        }

        return (
              <Form className="row" onSubmit={this.handleFormSubmit}>
                <div className="col-4">
                  <h2 className="my-3">Képek és videók feltöltése</h2>

                    <FormGroup>
                      <Label for="category">Kategória:</Label>
                      <Input type="select" name="category" id="category" className="custom-select" onChange={this.handleSelectCategory} title="Kategória kiválasztása">
                        <option value="">Válasszon kategóriát!</option>
                        { categories }
                        <option value="new">Új kategória</option>
                      </Input>
                    </FormGroup>

                    { addNewCategory }

                    <FormGroup>
                      <Label for="files" className="btn btn-info mt-2 btn-block">
                        <i className="fas fa-upload"></i> {uploadButtonLabel}
                      </Label>
                      <Input type="file" name="files" id="files" style={{ display: 'none' }} multiple onChange={this.readFiles}
                        accept="video/mp4,video/x-m4v,video/*,image/*"></Input>
                    </FormGroup>

                  <Warning hasErrors={this.state.hasErrors} message={this.state.errors}/>
                </div>

                <div className="col-8">
                  <div className="row">

                    { showPreview }

                    { submitButton }


                  </div>
                </div>

                { waiting }
                
              </Form>
        );
    }
}

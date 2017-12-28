import React, { Component } from 'react';
import Warning from './Warning';
import CategoryModal from './CategoryModal';
import {Button, Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter} from 'reactstrap';

export default class Categories extends Component {
    constructor(props){
      super(props);
      this.updateCategory = this.updateCategory.bind(this);
      this.createCategory = this.createCategory.bind(this);
      this.refreshCategories = this.refreshCategories.bind(this);
      this.cancelUpdate = this.cancelUpdate.bind(this);
      this.destroyCategory = this.destroyCategory.bind(this);
      this.confirmDestroy = this.confirmDestroy.bind(this);
      this.cancelDestroy = this.cancelDestroy.bind(this);
      this.setItem = this.setItem.bind(this);
      this.showCreateOrUpdateCategoryModal = this.showCreateOrUpdateCategoryModal.bind(this);

      this.state = {
        categories: [],
        destroy: {},
        update: {}
      };
    }

    componentWillMount(){
      return this.setState({
        categories: this.props.categories
      });
    }

    // Every time the database has been updated, the administration component will fetch
    // the new datas. componentWillReceiveProps's task to pass it to the Categories component.
    componentWillReceiveProps(nextProps){
      let categories = nextProps.categories;
      this.setState({
        categories: categories
      })
    }

    confirmDestroy(e){
      let item = this.setItem(e);

      this.setState({
        destroy: {
          isOpen: true,
          details: {
            item: item,
            title: 'Kategóra törlése',
            message: {
              question: 'Biztosan törölni szeretné a következő kategóriát?',
              description: 'A törléssel a kategórában található képeket is törölni fogja a rendszer, melyet később már nem tud visszavonni.'
            },
            cancel: this.cancelDestroy,
            isConfirmable: true,
            button : {
              action: this.destroyCategory,
              label: 'törlés'
            }
          }
        }
      })
    }

    cancelDestroy(){
      return this.setState({ destroy: {}});
    }

    destroyCategory(item){
      axios.delete('/api/admin/categories/' + item.id)
        .then(response => {
          if (JSON.stringify(response.data) != 204){
            alert('Hiba történt a törlés során!');
          } else {
            this.props.refreshCategories();
            this.setState({
              destroy: {}
            })
          }
        });
    }

    showCreateOrUpdateCategoryModal(e){
      // get the datas from parent 'tr'.
      // if there is no parent 'tr', that means it a new category
      let item = this.setItem(e);
      this.setState({
        update: {
          isOpen: true,
          isUpdate: (item.id === null) ? false : true,
          item: item,
          cancel: this.cancelUpdate,
          confirm: (item.id === null) ? this.createCategory : this.updateCategory
        }
      });
    }

    // As the database has been updated in the categoryModal component
    // we have to re-render the updates
    refreshCategories(){
      this.props.refreshCategories();
    }

    cancelUpdate(){
      return this.setState({ update: {} });
    }

    updateCategory(item){
      console.log(item);
      axios({
        url: '/api/admin/categories/'+item.id,
        method: 'put',
        data: item
      })
        .then( () => this.refreshCategories());
    }

    createCategory(name){
      axios({
        url: '/api/admin/categories/',
        method: 'post',
        data: {
          name: name
        }
      })
        .then( () => this.refreshCategories());
    }


    // this function gathers the information of the category item,
    // which should be edited or deleted,
    setItem(e){
      let row = e.target.parentNode.parentNode;
      return {
        index: row.getAttribute('data-index'),
        id: row.getAttribute('data-categoryId'),
        name: row.getAttribute('data-categoryName'),
      };
    }



    render() {
      // setting up a warning modal, to confirm action
      let warning;
      if (this.state.destroy.isOpen){
        warning = <Warning isOpen={this.state.destroy.isOpen} details={this.state.destroy.details} />
      } else {
        warning = <Warning isOpen={this.state.destroy.isOpen} />;
      }


      const categories = this.props.categories.map( (el,i) => {
        return <tr key={el.name+el.id}
                   data-categoryId={el.id}
                   data-categoryName={el.name}
                   data-index={i}>
                <td>{(i+1)}</td>
                <td>{el.name}</td>
                <td className="my-0 py-0">
                  <button className="btn btn-info"
                    onClick={ (e) => {this.showCreateOrUpdateCategoryModal(e)}}>szerkesztés
                  </button>
                </td>
                <td className="my-0 p-0">
                  <button className="btn btn-danger"
                          onClick={this.confirmDestroy}>törlés
                  </button>
                </td>
              </tr>} );

      let categoryModal;

      if (this.state.update.isOpen)
        categoryModal = <CategoryModal isOpen={this.state.update.isOpen} details={this.state.update} />
      else
        categoryModal = <CategoryModal isOpen={this.state.update.isOpen}/>;


      return (
        <div className="row my-4 justify-content-center">
         <div className="col-12 col-md-10 col-lg-8 col-xl-6">
          <h1>Kategóriák kezelése</h1>

          <table className="table table-striped table-hover table-sm">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Kategória megnevezés</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>

              { categories }

            </tbody>
          </table>

          { warning }

          { categoryModal }

           <button type="button" className="btn btn-primary" onClick={this.showCreateOrUpdateCategoryModal}>új kategória</button>
          </div>
        </div>
      );
    }
}

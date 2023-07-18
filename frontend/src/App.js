// import Component from the react module
import React, { Component } from "react";
import Modal from "./Components/Modal";
import axios from 'axios';
import './App.css'

// create a class that extends the component
class App extends Component {

  // add a constructor to take props
  constructor(props) {
    super(props);
    
    // add the props here
    this.state = {
      selectedFile: null,
      imageList: [],
    };
  }

  // Add componentDidMount()
  componentDidMount() {
    this.refreshList();
  }


  refreshList = () => {
    axios //Axios to send and receive HTTP requests
    .get("http://localhost:8000/api/input_images/")
    .then(res => this.setState({ imageList: res.data }))
    .catch(err => console.log(err));
  };

  
  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  // Submit an item
  // handleSubmit = (item) => {
  //   this.toggle();
  //   alert("save" + JSON.stringify(item));
  //   if (item.id) {
  //   // if old post to edit and submit
  //   axios
  //     .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
  //     .then((res) => this.refreshList());
  //   return;
  //   }
  //   // if new post to submit
  //   axios
  //   .post("http://localhost:8000/api/tasks/", item)
  //   .then((res) => this.refreshList());
  // };

  // // Delete item
  // handleDelete = (item) => {
  //   alert("delete" + JSON.stringify(item));
  //   axios
  //   .delete(`http://localhost:8000/api/tasks/${item.id}/`)
  //   .then((res) => this.refreshList());
  // };

  // // Create item
  // createItem = () => {
  //   const item = { input_image };
  //   this.setState({ activeItem: item, modal: !this.state.modal });
  // };

  // //Edit item
  // editItem = (item) => {
  //   this.setState({ activeItem: item, modal: !this.state.modal });
  // };

  renderFileList() {
    return(
      <div>
        <table>
          <tr>
            <th>Image Id</th>
            <th>Image Address</th>
            <th>Action</th>
          </tr>
          {this.state.imageList.map((item) => {
            return(
              <tr key={item.id}>
                <td>item.id</td>
                <td>item.input_image</td>
                <td><button
                // onClick={() => this.handleDelete(item)}
                className="btn btn-danger"
              >
                Delete
              </button></td>
              </tr>
            )
          })}
          {/* <li
            
            className="list-group-item d-flex justify-content-between align-items-center"
            
          >
            <span>
              {item.id}
            </span>
            <span>
              {/* <button
                // onClick={() => this.editItem(item)}
                className="btn btn-secondary mr-2"
              >
                Change Image
              </button> */}
              
            {/* </span>
          </li> */} 
        </table>
      </div>
    )
  }

  render() {
    return (
      <main className="content">
        <h1 className="text-success text-center my-4">
        Image Upscaler
        </h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-info">
                  Upload Image
                </button>
              </div>
              {/* {this.renderTabList()} */}
              <ul>
                <div style={{display: 'flex',  justifyContent:'center'}}>
                  {this.renderFileList()}
                </div>
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;

// import Component from the react module
import React, {useState, useEffect, useRef} from "react";
import DeletingModal from "./Components/Modal";
import axios from 'axios';
import './App.css'


// create a class that extends the component

const App = () => {
// class App extends Component {

  // add a constructor to take props
  // constructor(props) {
  //   super(props);
    
  //   // add the props here
  //   this.state = {
  //     selectedFile: null,
  //     imageList: [],
  //   };
  // }
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [canUpload, setCanUpload] = useState(false);
  const [deletePermission, setDeletePermission] = useState(false);

  useEffect(() => {
    axios //Axios to send and receive HTTP requests
    .get("http://localhost:8000/api/input_images/")
    .then(res => setImageList(res.data))
    .catch(err => console.log(err));
  }, []);

  const fileInput = useRef(null);
  
  // Add componentDidMount()
  // componentDidMount() {
  //   this.refreshList();
  // }

  const refreshList = () => {
    axios //Axios to send and receive HTTP requests
    .get("http://localhost:8000/api/input_images/")
    .then(res => setImageList(res.data))
    .catch(err => console.log(err));
  };
  
  
  const onUpload = event => {
    setSelectedFile(event.target.files[0]);
    setCanUpload(true);
  };

  // const onUpload = file => {
  // }

  // Submit an item
  const uploadFile = (uploadPermission) => {
    if(uploadPermission === true && selectedFile !== null){
      let formData = new FormData();

      formData.append('input_image', selectedFile);
      const url = "http://localhost:8000/api/input_images/";
      const config = {
        headers: {'content-type': 'multipart/form-data'}
      }

      axios.post(url, formData, config)
        .then((res) => {
          console.log(res.data);
          alert("File uploaded successfully");
        })
        .catch(err => {
          console.log(err);
          alert("File not uploaded");
        });
      renderFileList(); 

      setSelectedFile(null);
    }
  };

  // // Delete item
  const onDelete = (item) => {
    if(!deletePermission){
      return;
    }

    let formData = new FormData();
    formData.append('input_image', item);
    const url = `http://localhost:8000/api/input_images/${item.id}/`;

    alert("Deleting" + JSON.stringify(item));
    axios.delete(url, item)
    .then((res) => refreshList())
    .catch(err => {
      console.log(err);
      alert("File not deleted");
    })
  };

  // // Create item
  // createItem = () => {
  //   const item = { input_image };
  //   this.setState({ activeItem: item, modal: !this.state.modal });
  // };

  // //Edit item
  // editItem = (item) => {
  //   this.setState({ activeItem: item, modal: !this.state.modal });
  // };

  const renderFileList = () => {
    if(renderFileList){
      return(
        <div style={{margin: "40px", alignItems: "center", justifyContent: "center"}}>
          <span>
            <table style={{width: "600px", height: "30px"}}>
              <tr style={{border: "3px solid rgb(0, 0, 0)"}}>
                <th style={{border: "3px solid rgb(0, 0, 0)"}}>Image Id</th>
                <th style={{border: "3px solid rgb(0, 0, 0)"}}>Image Name</th>
                <th style={{border: "3px solid rgb(0, 0, 0)"}}>Action</th>
              </tr>
              {imageList.map((item) => {
                return(
                  <tr key={item.id} style={{border: "3px solid rgb(0, 0, 0)"}}>
                    <td style={{border: "3px solid rgb(0, 0, 0)"}}>{item.id}</td>
                    <td style={{border: "3px solid rgb(0, 0, 0)"}}>{item.input_image.split("/")[5]}</td>
                    <td style={{border: "3px solid rgb(0, 0, 0)"}}>
                      <button className="btn btn-primary" style={{margin: "2px"}}>

                          Download
                      </button>
                      <button
                      onClick={() => 
                        <DeletingModal itemToDelete={item} deletingPermission = {setDeletePermission} deletingFunc = {onDelete}/>
                      }
                      className="btn btn-danger"
                      style={{margin: "2px"}}
                      fade={false}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </table>
          </span>
        </div>
      )
    } 
  };

  const onCancel = () => {
    fileInput.current.value = null;
    setSelectedFile(null);
    setCanUpload(false);
  }
  
  return (
    <main className="content">
      <h1 className="text-success text-center my-4">
      Image Upscaler
      </h1>
      <div className="row ">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="">
              <input type="file" ref={fileInput} style={{marginLeft: "30px"}} onChange={(e) => onUpload(e)}/>
              {canUpload===true && selectedFile !== null && 
                <div>
                  <button
                    className="btn btn-info"
                    style={{marginLeft: "30px"}}
                    onClick={() => uploadFile(true)}>
                      Upload Image
                  </button>
                  <button
                  className="btn btn-danger"
                  style={{marginLeft: "30px"}}
                  onClick={() => onCancel()}>
                  Cancel
                  </button>
                </div>
              }
            </div>
            <ul>
              <div style={{display: 'flex',  justifyContent:'center'}}>
                {renderFileList()}
              </div>
            </ul>
          </div>
        </div>
      </div>
      {/* {this.state.modal ? (
        <Modal
          activeItem={this.state.activeItem}
          toggle={this.toggle}
          onSave={this.handleSubmit}
        />
      ) : null} */}
    </main>
  );
  
// }
};
export default App;

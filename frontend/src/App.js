// import Component from the react module
import React, {useState, useEffect, useRef} from "react";
import DeletingModal from "./Components/Modal";
import axios from 'axios';
import './App.css'





/*


fetch("http://localhost:8000/api/input_images/10/", {
  "headers": {
    "accept": "text/html; q=1.0, *",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-csrftoken": "vU4avToDSWDz3oF8YZdklc4pItAb9s8g8ijUGuoagAc3Dqi11QcM8U3tx689aWhT",
    "x-requested-with": "XMLHttpRequest"
  },
  "referrer": "http://localhost:8000/api/input_images/10/",
  "referrerPolicy": "same-origin",
  "body": null,
  "method": "DELETE",
  "mode": "cors",
  "credentials": "include"
});



*/



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
          refreshList();
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
    // if(!deletePermission){
    //   return;
    // }

    let formData = new FormData();
    formData.append('input_image', item);
    const url = `http://localhost:8000/api/input_images/${item.id}/`;
    const config = {
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    }
    
    alert("Deleting" + JSON.stringify(item));

    axios.delete(url, formData, config)
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
                        // <DeletingModal itemToDelete={item} deletingPermission = {setDeletePermission} deletingFunc = {onDelete}/>
                        onDelete(item)
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

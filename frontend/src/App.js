import React, {useState, useEffect, useRef} from "react";
import axios from 'axios';
import './App.css'

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [canUpload, setCanUpload] = useState(false);

  useEffect(() => {
    axios 
    .get("http://localhost:8000/api/input_images/")
    .then(res => setImageList(res.data))
    .catch(err => console.log(err));
  }, []);

  const fileInput = useRef(null);
  
  const refreshList = () => {
    axios 
    .get("http://localhost:8000/api/input_images/")
    .then(res => setImageList(res.data))
    .catch(err => console.log(err));
  };
  
  const renderFileList = () => {
    if(imageList){
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
                      <button className="btn btn-primary" style={{margin: "2px"}} 
                        onClick={() => downloadFile(item)}
                        >
                          Download
                      </button>
                      <button
                      onClick={() => 
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

  const onUpload = event => {
    setSelectedFile(event.target.files[0]);
    setCanUpload(true);
  };

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
          fileInput.current.value = null;
        })
        .catch(err => {
          console.log(err);
          alert("File not uploaded");
        });
      renderFileList(); 

      setSelectedFile(null);
    }
  };

  const onCancel = () => {
    fileInput.current.value = null;
    setSelectedFile(null);
    setCanUpload(false);
  }
    
  const onDelete = (item) => {
    let formData = new FormData();
    formData.append('input_image', item);
    const url = `http://localhost:8000/api/input_images/${item.id}/`;
    const config = {
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    }
    
    alert(`Deleting ${item.input_image.split("/")[5]}`);

    axios.delete(url, formData, config)
    .then((res) => refreshList())
    .catch(err => {
      console.log(err);
      alert("File not deleted");
    })
  };

  var fileDownload = require('js-file-download');
 
  const downloadFile = (item) => {
    if(imageList !== [] && item){
      axios
      .get(`${item.input_image}`, {responseType: 'blob',})
      .then((res) => {
        fileDownload(res.data, `${item.input_image.split("/")[5]}`);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    }
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
                <>
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
                </>
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
    </main>
  );
};
export default App;

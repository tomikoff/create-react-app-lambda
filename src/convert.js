//Install 
/*
//npm install imaginary --save

//Import 
var fs = require('fs')
var imaginary = require('imaginary')
var serverUrl = 'localhost:8080'

imaginary('myImage.jpg')
  .server(serverUrl)
  .watermark({ text: 'copyright' })
  .on('error', function (err) {
    console.error('Cannot resize the image:', err)
  })
  .pipe(fs.createWriteStream('markedImage.jpg'))*/

  //Import 

  import axios from 'axios';

  import React,{Component} from 'react';
  import styles from "./css/MainPage.module.css"
  import { saveAs } from 'file-saver';


  class convert extends Component {
      
    state = {
  
    // Initially, no file is selected
    selectedFile: null
    };
    
    // On file select (from the pop up)
    onFileChange = event => {
    
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
    
    };
    
    // On file upload (click the upload button)
    onFileUpload = () => {
    
    // Create an object of formData
    const formData = new FormData();
    
    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    
    // Details of the uploaded file
    console.log(this.state.selectedFile);
    
    // Request made to the backend api
    // Send formData object
    axios.post("api/uploadfile", formData);
    };
    
    // File content to be displayed after
    // file upload is complete
    fileData = () => {
    
    if (this.state.selectedFile) {
      /*
      var FileSaver = require('file-saver');
      var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(file);
      */
      
      return (
      <div className={styles.Page}>
        <h2>File Details:</h2>
        
        <p>File Name: {this.state.selectedFile.name}</p>  
        <p>File Type: {this.state.selectedFile.type}</p>      
        <p>Last Modified:{" "}
          {this.state.selectedFile.lastModifiedDate.toDateString()}
        </p>
        <canvas id='demo'></canvas>
        
      </div>
      );
    } else {
      return (
      <div className={styles.Page}>
        <br />
        <h4>Choose before Pressing the Upload button</h4>
      </div>
      );
    }
    };
    
    render() {
    
    return (
      <div className={styles.Page}>
        <h1>
        GeeksforGeeks
        </h1>
        <h3>
        File Upload using React!
        </h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>
          Upload!
          </button>
        </div>
      {this.fileData()}
      </div>
    );
    }

    
  }
   
  export default convert;
  
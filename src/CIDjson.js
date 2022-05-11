import React, { useState, useEffect}  from 'react';
import styles from "./css/CID.module.css"
import { Link, useParams } from 'react-router-dom';
import { get } from 'firebase/database';
var myHeaders = new Headers();

myHeaders.append('Content-Type', 'text/xml');
const CIDjson = props => {
    
const { id } = useParams();
const [data,setData]=useState([]);
var hlp;
const getData=()=>{
    fetch(window.location.origin + '/nft/json/'+ id +'.json'
    ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(function(response){
            console.log(response)
            return response.json();
          })
          .then(function(myJson) {
            console.log(myJson);setData(myJson);
            //console.log(data.attributes[0].trait_type)
            
           
          });
      }
      
      useEffect(()=>{
        getData()
        hlp = data.attributes
      },[])

      function Attributes(){
          return(
            <div className={styles.TextDiv}>
                <p className={styles.Text}> {data.attributes[0].trait_type + " " + data.attributes[0].value}</p>
                <p className={styles.Text}> {data.attributes[1].trait_type + " " + data.attributes[1].value}</p>
                <p className={styles.Text}> {data.attributes[2].trait_type + " " + data.attributes[2].value}</p>
                <p className={styles.Text}> {data.attributes[3].trait_type + " " + data.attributes[3].value}</p>
            </div>
          )
      }
      const script = document.createElement("script");
      script.src = "./CID.js";
      script.async = true;
      script.type = "application/javascript"; // notice the change here
      
return(
    //console.log("as ",data.attributes[0].value),
   
   JSON.stringify(data)
    );

}

window.addEventListener('DOMContentLoaded', (event) => {
    
  console.log("test");
  //Attributes();
});


export default CIDjson;
import React, {useState , useRef} from "react";
import {
    AccountData,
    ContractData,
    ContractForm,
    MyContractForm 
} from '@drizzle/react-components';
import web3 from 'web3';
import styles from "./css/Tx.module.css"
import { render } from "react-dom";
import { saveAs } from "file-saver";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set , onValue , update } from "firebase/database";
import Web3 from "web3";
import $, { getJSON } from 'jquery';
import axios from "axios";
import { async } from "@firebase/util";
import ReactLoading from 'react-loading';
import Loading from "react-loading";
import {Button} from "@mui/material/"
import { styled } from '@mui/material/styles';
require('dotenv').config();
const { PINATAapiKEY, REACT_APP_PINATAapiSECRET } = process.env;

//console.log("pinata "+process.env.REACT_APP_PINATAapiKEY + " scr "+REACT_APP_PINATAapiSECRET);
// Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBMurRKSJ5_91S4SgsFi3AdcYSvALA_9kA",
    authDomain: "rod-collection.firebaseapp.com",
    databaseURL: "https://rod-collection-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rod-collection",
    storageBucket: "rod-collection.appspot.com",
    messagingSenderId: "72578792020",
    appId: "1:72578792020:web:1b52b53c81569414850bc1",
    measurementId: "G-9605FSBBL1"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

// DB FUNCTIONS


function writeUserData(userId, name, email, imageUrl) {
  
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

async function writePlaceholderDB() {
  const db = getDatabase();
  set(ref(db, 'MintedAlready/' + 0), {
    name: "placeholder",
    cost: "placeholder",
    imageHashIPFS : "placeholder",
    jsonHashIPFS : "placeholder",
  });
  set(ref(db, 'NftUpdate/' + 0), {
    name: "placeholder",
    cost: "placeholder",
    imageHashIPFS : "placeholder",
    jsonHashIPFS : "placeholder",
  });
}

async function removePlaceholderDB() {
  const db = getDatabase();
  
  const updates = {};
  updates['MintedAlready/'+0+"/"] = null;
  updates['NftUpdate/'+0+"/"] = null;
  return update(ref(db), updates);
}

async function writeAlreadyMintedNFT(nftId, cost, imageIPFS , jsonIPFS) {
    const db = getDatabase();
    var addMintNumber = 0;
    //console.log("stalo sa1");
    set(ref(db, 'MintedAlready/' + nftId), {
      name: nftId,
      cost: cost,
      imageHashIPFS : imageIPFS,
      jsonHashIPFS : jsonIPFS,
    });
    
    var AlreadyMintedData = await waitForDBdata(AlreadyMintedData,"MintedAlready/");
    
    const updates = {};
    updates['NumberMinted'] = (Object.keys(AlreadyMintedData).length - 1);
    
    return update(ref(db), updates);
  }

  /*inserts info about NFTs before they were confirmed (we need to upload NFT sooner than, they confirm transaction - we will erase "minted" nfts from ipfs afterwards)  */
  function writeUpdateMintedNFT(nftId, cost, imageIPFS , jsonIPFS) {
    const db = getDatabase();
    var addMintNumber = 0;
    set(ref(db, 'NftUpdate/' + nftId), {
      name: nftId,
      cost: cost,
      imageHashIPFS : imageIPFS,
      jsonHashIPFS : jsonIPFS,
    });

  }

  //checking if we have uploaded more NFTs then was bought (happens when somebody cancel transaction) - returns true
  function waitForDBdata(data,tableName) {
    return new Promise(resolve => {
      const NftUpdateCount = ref(db, tableName)
      onValue(NftUpdateCount, (number) => {
      data = number.val();
      //console.log("nftupdate data " + data); 

      resolve(data);
      })
    });
  }
  async function checkDBforNftIPFSremoval(){
    var NumberMintedDB;
    const NFTcount = ref(db, 'NumberMinted');
    onValue(NFTcount, (number) => {
    NumberMintedDB = number.val();
    //console.log("NumberMintedDB " + NumberMintedDB);
    })
    
    var data = await waitForDBdata(data,"NftUpdate/");
    
    //console.log("nftupdate json " + JSON.stringify(data));
    //console.log("nftupdate size " + Object.keys(data).length);
    
    if(NumberMintedDB == (Object.keys(data).length -1)){
      //console.log("are we here");
      return false;
    }else{return true;}
   
  }

  async function checkWhichIPFSneedRemoving(){
    var NftUpdateData = await waitForDBdata(NftUpdateData,"NftUpdate/");
    var AlreadyMintedData = await waitForDBdata(AlreadyMintedData,"MintedAlready/");
    var NeedsRemovingA =[];
    var NeedsRemovingB =[];
    var NeedsRemoving =[];
    var ImageIPFSremove =[]; 
    var JsonIPFSremove =[]; 
    var countA = 0;
    var countB = 0;
    for(var i = 0; i < Object.keys(NftUpdateData).length;i++){
      NeedsRemovingA[countA] = Object.keys(NftUpdateData)[i];countA++;

      //toto tu je len kvoli testovaniu
      //NeedsRemovingA[countA] ="55";countA++;
    }
    for(var j = 0; j < Object.keys(AlreadyMintedData).length;j++){
      NeedsRemovingB[countB] = Object.keys(AlreadyMintedData)[j];countB++;
    }
    NeedsRemoving = NeedsRemovingA.filter(x => !NeedsRemovingB.includes(x));
    console.log("needs removingA : "+NeedsRemovingA);
    console.log("needs removingB : "+NeedsRemovingB);
    console.log("needs removing : "+NeedsRemoving);
    countA = 0;
    for(var x = 0; x < Object.keys(NeedsRemoving).length;x++){
      //console.log("check for ipfs");
      ImageIPFSremove[countA] = Object.keys(NftUpdateData)[Object.keys(NeedsRemoving)[x]];
      var hlp =  Object.keys(NftUpdateData)[Object.keys(NeedsRemoving)[x]];
      //console.log("help "+Object.keys(hlp)["67"]);
      //console.log("3O : "+NeedsRemoving[x]);
      //console.log("yx "+NftUpdateData[NeedsRemoving[x]]["imageHashIPFS"]);
      ImageIPFSremove[countA] = NftUpdateData[NeedsRemoving[x]]["imageHashIPFS"];
      //console.log("pls "+ Object.keys(NftUpdateData)[Object.keys(NeedsRemoving)[x]]);
      JsonIPFSremove[countA] = NftUpdateData[NeedsRemoving[x]]["jsonHashIPFS"];
      countA++;
    }
    console.log("images needs remove : "+ImageIPFSremove);
    console.log("jsons needs remove : "+JsonIPFSremove);
    var ImgJsonArray = [];
    ImgJsonArray[0] = ImageIPFSremove;
    ImgJsonArray[1] = JsonIPFSremove;
    ImgJsonArray[2] = NeedsRemoving;
    return ImgJsonArray;
  }
// we need number of NFTs minted as soon as possible, so we made it global
  var NFTsMinted="";

  const NFTcount = ref(db, 'NumberMinted');
  onValue(NFTcount, (callback) => {
      NFTsMinted = callback.val();
  console.log("NFTs minted: " + NFTsMinted);
  
  })
  
  // remove falsly uploaded NFT numbers from database 
  async function updateDBafterIPFSremoval(NeedsRemoving){
    var NftUpdateData = await waitForDBdata(NftUpdateData,"NftUpdate/");
    /*
    for(var i = 0; i < Object.keys(NftUpdateData).length;i++){
      for(var j = 0; j < Object.keys(NeedsRemoving).length;j++){
        console.log("NftUpdateData[i]" +NftUpdateData[i] + " NeedsRemoving[j] "+NeedsRemoving[j]);
        if(NftUpdateData[i] == NeedsRemoving[j]){
          console.log("NftUpdateData[i]" +NftUpdateData[i] + " NeedsRemoving[j] "+NeedsRemoving[j]);
        }
      }
    }*/
    const updates = {};
    
    for(var j = 0; j < Object.keys(NeedsRemoving).length;j++){
      //console.log(NftUpdateData[NeedsRemoving[j]]);
      //console.log(NeedsRemoving[j]);
      updates['NftUpdate/'+NeedsRemoving[j]+"/"] = null;
       
    }
    return update(ref(db), updates);
  }

  // return array of numbers which have been minted ([20,44] etc) 
  async function NFTnumbersMinted(){
    var AlreadyMintedData = await waitForDBdata(AlreadyMintedData,"MintedAlready/");
    var NumbersMinted = [];

    for(var j = 0; j < Object.keys(AlreadyMintedData).length;j++){
      NumbersMinted[j] = Object.keys(AlreadyMintedData)[j];
    }
    return NumbersMinted;
  }

  //IPFS FUNCTIONS 
  function pinFileToIPFS(pinataApiKey, pinataSecretApiKey,filex) {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    //we gather a local file for this example, but any valid readStream source will work here.
    let data = new FormData();
    data.append('file', filex)
    //data.append(importik);
    return axios
        .post(url, data, {
            maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
            }
        })
        .then(function (response) {
            //handle response here
            console.log(response);
            ImageIPFS = response.data.IpfsHash;
        })
        .catch(function (error) {
            //handle error here
            console.log(error +" error");
        });
};
function pinJSONToIPFS(pinataApiKey, pinataSecretApiKey, JSONBody) {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return axios
      .post(url, JSONBody, {
          headers: {
              pinata_api_key: pinataApiKey,
              pinata_secret_api_key: pinataSecretApiKey
          }
      })
      .then(function (response) {
          //handle response here
          console.log(response);
          JsonIPFS = response.data.IpfsHash;
      })
      .catch(function (error) {
          //handle error here
          console.log(error + " error");
      });
};
    function removePinFromIPFS(pinataApiKey, pinataSecretApiKey, hashToUnpin) {
      const url = `https://api.pinata.cloud/pinning/unpin/${hashToUnpin}`;
      return axios
          .delete(url, {
              headers: {
                  pinata_api_key: pinataApiKey,
                  pinata_secret_api_key: pinataSecretApiKey
              }
          })
          .then(function (response) {
              //handle response here
          })
          .catch(function (error) {
              //handle error here
          });
    };

    

   const ColorButton = styled(Button)(({ theme }) => ({
        fontFamily: [
            'Space',
          ],
          color: "#6bd4cd",
          borderColor: "#6bd4cd",
          size: "Large",
          fontSize: "22px",
          backgroundColor : "black",
      }));

    
 /*global variables*/
var Address;
var NFTnumber = 1;
var updatedJSON;
var ImageIPFS;
var JsonIPFS;
var xfile;
class WalletInfo extends React.Component {
    constructor(props, context)
    {
        super(props);

        this.Supprt = this.Supprt.bind(this);
        this.ContractForm= React.createRef();
        this.canvas = React.createRef();
        this.image = React.createRef();
        this.state = {
            LoginButtonSTYLE : "bg-red-700 rounded-md p-2 text-white no-cursor cursor-not-allowed",
            MetaMaskInfo : "Login with MetaMask",
            LoginDisable : true,
            MetamaskAddress : "You need to login!",
            Visibility : "invisible",
            donation : '1',
            organization : 1,
            WalletBalance : "",

            GamingNumber : 0,
            NFTCollection : "Mint your NFT",
            imgNumber : 1,

            Loading : true,
            Show : false,
            Placeholder : true,
            MintDisable : true,
            ImagesSupported : false,
            OrgLink : "http://localhost:3000/Donations/",
        }

       

    }
    
     //returns true if collection is not out of stock and false otherwise (350 dostupnych)
    IsNotFullyMinted = () => {
        //writeUserData("4","tomasek","email","xdxdxd");
        if(NFTsMinted<350)
        {
            this.setState({ NFTCollection : "Mint your NFT, only "+(350-NFTsMinted)+" left!"}); 
            //console.log("somtu ")
            return true;
        }
        else{
            return false;
        }
    }
    
    // returns true if random Number from Gameability is already minted, false otherwise
    isAlreadyMinted = (NftNumber,NumbersMinted) => {
      
      for(var j = 0; j < NumbersMinted.length;j++){
          if(NftNumber == NumbersMinted[j]){
            return true;
        }
      }
        return false;
    }

    // function that give us NFT minted number
     Gameability = async () => {
        //this.state.GamingNumber = zober ho z pickera html 
        var GamingNumber = 0;
        var CollectionNotFullyMinted = this.IsNotFullyMinted(); //chekni databazu a kukni či už je mintnutych 350 NFTs, čiže cela kolekcia, ak je tak stopni všetko
        console.log("collection NOT fully minted "+CollectionNotFullyMinted);

        var Number = 0;
        if(CollectionNotFullyMinted){

            Number = Math.floor(Math.random() * (350 - 1 + 1) + 1);
            console.log("FINAL number "+Number);
            var NumbersMinted = await NFTnumbersMinted(); 
            //console.log("debug gameability");
            if(GamingNumber == 0)
            { 
                
                while(this.isAlreadyMinted(Number,NumbersMinted) && CollectionNotFullyMinted)// checkni databazu, ak tam number už je ako mintunty, tak treba mintnuť iny number
                {
                    Number = Math.floor(Math.random() * (350 - 1 + 1) + 1);
                    console.log("new number "+Number);    
                }
                return Number;
            }
            else{ // to do - vačšia hratelnost, vacsi random, viac to ovplyvni ten clovek
                Number = Math.floor(Math.random() * (350 - 1 + 1) + 1);
                console.log("new your number "+Number);
                return Number;
            }
        }
        else{
            console.log("Collection is out of stock");
            this.setState({ NFTCollection : "Collection is out of stock!"});
            
            return;
        }
     }

    getContract = async (web3) => {
      const data = await $.getJSON("RoDsc_local.json");
      const netId = await web3.eth.net.getId();
      const deployedNetwork = data.networks[netId];
      console.log("deployednetwork : "+JSON.stringify(deployedNetwork) + " adres : "+deployedNetwork.address + " netid "+netId);
      const greeting = new web3.eth.Contract(
        data.abi,
        deployedNetwork && deployedNetwork.address
      );
      return greeting;
    };

    getContractTEST = async (web3) => {
      //const data = await $.getJSON("RoDsc.json");
      const data = await $.getJSON("RoDsc.json");
      const netId = await web3.eth.net.getId();
      
      if(netId != 4){
        console.log("Change your network to Rinkeby!" + netId);
        this.setState({Loading : false});
        this.setState({ NFTCollection : "Change your network to Rinkeby!!"});
        alert("Change your network to Rinkeby!!");
        return;
      }
      //const deployedNetwork = data.networks[netId];
      //console.log("deployednetwork : "+deployedNetwork + " adres : "+deployedNetwork.address + " netid "+netId);
      const greeting = new web3.eth.Contract(
        data.abi,
        "0x2b498D1F842Bc282351A77e21BcfEf8c7Ef5C09e"
      );
      return greeting;
    };

    getWeb3 = () => {
      return new Promise((resolve, reject) => {
        window.addEventListener("load", async () => {
          if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            
            //const web3 = new Web3('wss://rinkeby.infura.io/ws/v3/0b148e4b64e5421da1318aba238760d2');
            try {
              // ask user permission to access his accounts
              console.log("getwe3")
              await window.ethereum.request({ method: "eth_requestAccounts" });
              resolve(web3);
            } catch (error) {
              reject(error);
            }
          } else {
            reject("must install MetaMask");
          }
        });
      });
    };

    getYourNumber = async () =>{;
      await this.x();this.forceUpdate();
      this.setState({MintDisable : false});
    }

     Supprt = () => {
      var image = new Image();
      image.onload = function() {
        if (image.width > 0) {
          console.log("images are supported!!!");
          this.setState({ ImagesSupported : true});
          this.setState({ Loading : false});
          //console.log("state images supported "+this.state.ImagesSupported);
        }
        else{
          console.log("images are not supported!!!");
        }
      }.bind(this);
      //image.onError = function() {console.log("images are not supported!!!")};
      image.src = 'logo192.png';
    };

  


    StartMinting = async () =>{
      const web3 = new Web3(window.ethereum);
      //const web3 = await this.getWeb3();
      
      const accounts = await web3.eth.getAccounts();
      //const contract = await this.getContract(web3);
      const contract = await this.getContractTEST(web3);

      this.MintNft(contract,accounts);
     
      
    }

    x = async() =>{
      NFTnumber = await this.Gameability();
        //this.NFTwatermark();
        this.setState({imgNumber :  NFTnumber}, this.NFTwatermark);
        //console.log("x async");
    }

    MintNft = async(contract,accounts) => {
      if(this.IsNotFullyMinted()){
        this.setState({ Loading : true});
        await this.getMyJSON(NFTnumber,"lnk");
       
        var apiKEY = "660cfc4f0ef91d7a5ac2";
        var apiSECRET = "749ab528675ff7f856dc63147aee81f7d11fd32a8f350e1ce3400e908de54d0b";

        var DonationInWei = Web3.utils.toWei(this.state.donation,"ether");
        var DonationInEther = this.state.donation;
        this.setState({ Show : true}); 
        
        //1. upload image to IPFS pinata
        pinFileToIPFS(apiKEY,apiSECRET,xfile).then((response) => {

          
          //2. update json (donation amount and image ipfs link)
          this.updateJSON(updatedJSON,ImageIPFS);
          //3. upload json to IPFS pinata
          pinJSONToIPFS(apiKEY,apiSECRET,updatedJSON).then(async(response) => {
            //insert into database for future checks (if transaction fails)
          writeUpdateMintedNFT(NFTnumber,this.state.donation,ImageIPFS,JsonIPFS);

          this.setState({ Loading : false});
          var ipfsJsonLink = "ipfs://"+JsonIPFS+"/"
          console.log("ipfsjsonlink "+ipfsJsonLink);
          //try mint transaction from smart contract

          try{
            await contract.methods
              .mint(DonationInWei,this.state.organization,ipfsJsonLink)
              .send({ from: accounts[0], value: Web3.utils.toWei(this.state.donation,"ether")})
                .on('transactionHash', function (hash) {
                  console.log('transactionHash');
                   console.log(hash);
                 })
                 .on('confirmation', async function (confirmationNumber, receipt) {
                   console.log('confirmation');
                   console.log(confirmationNumber);
                  //pridat do databazy ako potvrdene
                  await writeAlreadyMintedNFT(NFTnumber,DonationInEther,ImageIPFS,JsonIPFS);
                  
                   console.log(receipt);
  
                 })
                 .on('receipt', function (receipt) {
                   console.log('receipt');
                   console.log(receipt);
                 })
                .on('error', function (error, receipt) {
                   console.log('error');
                  console.log(error);
                   console.log(receipt);
                 });
          }catch (e) {
            console.log("Error with transaction!")
          }
            
          });  
        });
        
        
        
        var bool = await checkDBforNftIPFSremoval();
            if(bool){
              var RemoveLinks = await checkWhichIPFSneedRemoving();
              //console.log("posledne");
              //console.log("imgs_ "+RemoveLinks[0]+" jsons_ "+RemoveLinks[1]);
              for(var i = 0;i < RemoveLinks[0].length;i++){
                //console.log(RemoveLinks[0][i]+" ide?");
                removePinFromIPFS(apiKEY,apiSECRET,RemoveLinks[0][i]);
                removePinFromIPFS(apiKEY,apiSECRET,RemoveLinks[1][i]);
                updateDBafterIPFSremoval(RemoveLinks[2]);
              }
            }
            this.setState({Placeholder : true});
            writePlaceholderDB();

            this.setState({MintDisable : true});
         
        
      }else{
        console.log("Collection is out of stock.");
      }
    }
    
    getMyJSON = (NFTnumber,NFTLinkIPFS) =>{
      var donationUPDATE = this.state.donation;
      fetch(window.location.origin + '/nft/json/'+ NFTnumber +'.json'
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
            updatedJSON = myJson;
            //console.log("jsonx name "+updatedJSON.name);
            //console.log("jsonx name "+updatedJSON.attributes[0].value);
            //console.log("jsonx image "+updatedJSON.image);
            updatedJSON.attributes[0].value = donationUPDATE + " eth";
            updatedJSON.image = NFTLinkIPFS;
            //console.log(updatedJSON);
            //console.log(myJson);
            
          });   
          return updatedJSON;
    }

    updateJSON = (myJson,NFTLinkIPFS) =>{
      myJson.attributes[0].value = this.state.donation + " eth";
      myJson.image = NFTLinkIPFS;
    }
    UsePromiseToWait = (NFTnumber,NFTLinkIPFS) =>{
      return Promise.all([this.getMyJSON(NFTnumber,NFTLinkIPFS)])
    }

    WatermarkRefresh = () =>{
      //console.log("kedy sa spuista watermark");
      var canvas = this.canvas.current;
      var c2 = document.getElementById("canvas");
      //console.log("c2 "+c2);
      //console.log("canvas "+ canvas);
      var ctx = canvas.getContext("2d");
      
      var img = this.image.current;
      //console.log(img+" imgggg");
      if (img && img.complete) {
        ctx.drawImage(img, 0, 0);
        ctx.font = "35px Space";
        ctx.fillStyle = "#ffffff";
        if(0!=document.getElementById("donationmoney").value ){
          ctx.fillText(document.getElementById("donationmoney").value+" eth", 900, 1000); // THIS IS THE PLACE TEXT IS EMBEDDED INTO THE PICTURE
      }else{
        ctx.fillText(this.state.donation+" eth", 900, 1000);
      }

      var dataURL = canvas.toDataURL();

      var blobBin = atob(dataURL.split(',')[1]);
      var array = [];
      for(var i = 0; i < blobBin.length; i++) {
          array.push(blobBin.charCodeAt(i));
      }
      
      var file=new Blob([new Uint8Array(array)], {type: 'image/png'});
      //console.log("canvas dataURL "+dataURL);
      
      
    }
      
          xfile = file;
          
    }
    NFTwatermark = () =>
      {
        
          //console.log("kedy sa spuista watermark");
          var canvas = this.canvas.current;
          //var c2 = document.getElementById("canvas");
          //console.log("c2 "+c2);
          //console.log("canvas "+ canvas);
          var ctx = canvas.getContext("2d");
          
          var img = this.image.current;
          //console.log(img+" imgggg");
          if (img && img.complete) {
            ctx.drawImage(img, 0, 0);
            ctx.font = "35px Space";
            ctx.fillStyle = "#ffffff";
            if(0!=document.getElementById("donationmoney").value ){
              ctx.fillText(document.getElementById("donationmoney").value+" eth", 900, 1000); // THIS IS THE PLACE TEXT IS EMBEDDED INTO THE PICTURE
          }else{
            ctx.fillText(this.state.donation+" eth", 900, 1000);
          }

          var dataURL = canvas.toDataURL();

          var blobBin = atob(dataURL.split(',')[1]);
          var array = [];
          for(var i = 0; i < blobBin.length; i++) {
              array.push(blobBin.charCodeAt(i));
          }
          
          var file=new Blob([new Uint8Array(array)], {type: 'image/png'});
          //console.log("canvas dataURL "+dataURL);
          
          return file;
        }
        
      }
      UsePromiseToWait = () =>{
        return Promise.all([this.NFTwatermark()])
      }

    donationAmount = () =>
    {
      this.setState({ donation : document.getElementById("donationmoney").value});
      this.WatermarkRefresh();
      //this.NFTwatermark(); //new 
      //console.log(this.state.donation + " donation ");
    }

     orgNumber = () =>
    {
        //setWhichOrg(document.getElementById("org-select").value);
        this.setState({ organization : document.getElementById("org-select").value});
        var OrgName = "#firstOrg";
        if(document.getElementById("org-select").value == 1)
        {
          OrgName = "#firstOrg";
        }
        if(document.getElementById("org-select").value == 2)
        {
          OrgName = "#secondOrg";
        }
        if(document.getElementById("org-select").value == 3)
        {
          OrgName = "#thirdOrg";
        }
        if(document.getElementById("org-select").value == 4)
        {
          OrgName = "#fourthOrg";
        }
        this.setState({ OrgLink : "http://localhost:3000/Donations/"+OrgName});
        
        //console.log("org "+document.getElementById("org-select").value);
    }
    

     logInWithMetamask = async () =>
    {
        this.getWeb3();
        var myAddress = ""
        const accounts = await window.ethereum.request({method: "eth_requestAccounts" })
        .catch((e) =>
        {
            console.error(e.message)
            return
        })
        
        if(!accounts)
        {
            return
        }
        myAddress = accounts[0]
        //setA(accounts[0])
        Address = accounts[0]
        //const balance = web3.eth.getBalance(myAddress)
        this.setState({ MetamaskAddress : "Address of your account: "+myAddress,
        WalletBalance : "My balance is: "
    })
        /*
        setMetaAddress("Address of our account: "+myAddress)
        setBalance("My balance is: ")  */
        console.log("My Adress: "+myAddress)
    }
    
    
    componentDidMount = async () =>{
        
        this.Supprt();
        writePlaceholderDB();
        
         this.setState({ NFTCollection : "Mint your NFT, only "+(350 - parseInt(NFTsMinted))+" left!"});

         if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
        
            this.setState({ MetaMaskInfo: "MetaMask is installed!",
                LoginButtonSTYLE : "bg-blue-600 rounded-md p-2 text-white",
                Visibility : "visible",
                LoginDisable : false
        })
        
        }
        else{
            console.log('MetaMask is NOT installed!');
            this.setState({ MetaMaskInfo: "MetaMask is NOT installed!",
            MetamaskAddress : "Please install MetaMask to continue!",
            LoginDisable : true
        })
        }

    }
    
    render(){
    return(
      
      

    <div className={styles.Page}>
      <img id="flag" src="clear.gif" alt=""></img>
      {this.state.Loading &&(<div className={styles.LoadingDiv}><div className={styles.Ldiv}><ReactLoading type="cylon" color="green" height={'20%'} width={'20%'} className={styles.hh}/></div></div> )}
      
      
      <div>
        
        <div className={styles.TextDiv}>
        <button className={this.state.LoginButtonSTYLE } onClick={this.logInWithMetamask} disabled={this.state.LoginDisable} >Login to MetaMask</button>
        </div>

        <h2 className={styles.Title}>Metamask wallet info</h2>
        
            
        
            <h3 className={styles.Text}>{this.state.MetamaskAddress}</h3>
        <div className={styles.TextDiv}>
            
        </div>

        <div className={styles.Title}>MINT</div>
            <p className={styles.Text}>{this.state.NFTCollection}</p><br></br>
            <div className={styles.TextDiv}>
                <p className={styles.Text}>Step 1 - Connect with your MetaMask wallet.<br></br>

                Step 2 - First create your dogo with Create your Dogo! button.<br></br>
                <ColorButton className={styles.Text}  variant="outlined" onClick={this.getYourNumber}>Create your Dogo!</ColorButton><br></br>
                </p>
            </div>  
            
                <div className={styles.NFTdiv}>
                  <img id="image" className={styles.imagew}
                  ref={this.image}
                  alt="Upload NFT"
                  src={window.location.origin + '/nft/images/'+ NFTnumber +'.png'}
                  onLoad={this.WatermarkRefresh}/>
                </div>
          
          <div className={styles.TextDiv}>
                <p className={styles.Text}>
                Step 3 - Choose organization and how much you want to donate. <br></br>
                <select name="orgs" id="org-select" onChange={this.orgNumber}>
                  <option value="1">--Please choose an organizations--</option>
                  <option selected value="1">Hope for paws</option>
                  <option value="2">Paws</option>
                  <option value="3">Life Saver dogs</option>
                  <option value="4">Edinburgh Dog and Cat home</option>
              </select> <a href={this.state.OrgLink} target="_blank">Link</a>

              <h2> Put number in Ethers</h2>
              <input type="number" id="donationmoney" inputMode="decimal" onChange={this.donationAmount} step="any" min={0.00001} ></input>
              <br></br>
                
                Step 4 - Then just click on DONATE! button, wait for MetaMask and confirm the transaction.<br></br>
                <ColorButton className={styles.Text}  variant="outlined" disabled={this.state.MintDisable} onClick={this.StartMinting}>DONATE!</ColorButton><br></br>
                Step 5 - Receive your NFT.
                </p>
            </div>

        <div className={styles.TextDiv}>
        

        
        
        </div>

        
      </div>

      <div style={{display : "none"}}>
        <canvas id="canvas"  ref={this.canvas} width={1920} height={1080}/>
        
        
      </div>

    </div>  
    );
    }
    
    

   
    
}

window.addEventListener("load",function() {
  //alert("loaded");
});

export default WalletInfo;

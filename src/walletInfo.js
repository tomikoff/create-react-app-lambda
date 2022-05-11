import React, {useState , useRef} from "react";
import {
    AccountData,
    ContractData,
    ContractForm,
    MyContractForm 
} from '@drizzle/react-components';
import web3 from 'web3';
import styles from "./css/Connect.module.css"
import { render } from "react-dom";
import { saveAs } from "file-saver";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set , onValue , update} from "firebase/database";
import axios from "axios";
import ImageUploading from "react-images-uploading";
//vymazat
import PropTypes from "prop-types";import { drizzleConnect } from "@drizzle/react-plugin";


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

// functions to add data to database
function writeNftData(userId, cost, TxHash) {
  
  set(ref(db, 'NftUpdate/' + userId), {
    id_name: userId,
    cost: cost,
    TxHash : TxHash
  });
}

function writeAlreadyMintedNFT(nftId, cost, imageUrl) {
    const db = getDatabase();
    var addMintNumber = 0;
    set(ref(db, 'MintedAlready/' + nftId), {
      name: nftId,
      cost: cost,
      profile_picture : imageUrl
    });

    const NFTcount = ref(db, 'NumberMinted');
    onValue(NFTcount, (number) => {
    const data = number.val();
    console.log("data " + data);
    addMintNumber = data+1;
    })
    //console.log("star"+NFTcount + " data2 "+addMintNumber);
    
    const updates = {};
    updates['NumberMinted'] = addMintNumber;
    
    return update(ref(db), updates);
  }

// we need number of NFTs minted as soon as possible, so we made it global
  var NFTsMinted="";

  const NFTcount = ref(db, 'NumberMinted');
  onValue(NFTcount, (callback) => {
      NFTsMinted = callback.val();
  console.log("NFTs minted: " + NFTsMinted);
  })

const NFTname = "2";
var dataURL;
class WalletInfo extends React.Component {
    constructor(props, context)
    {
        super(props);

        this.ContractForm= React.createRef();
        this.canvas = React.createRef();
        this.image = React.createRef();
        this.state = {
            LoginButtonSTYLE : "bg-red-700 rounded-md p-2 text-white no-cursor cursor-not-allowed",
            MetaMaskInfo : "Login with MetaMask",
            LoginDisable : true,
            MetamaskAddress : "You need to login!",
            Visibility : "invisible",
            donation : '0',
            organization : 1,
            WalletBalance : "",

            GamingNumber : 0,
            NFTCollection : "Mint your NFT"
        }
    }
    

    onChange = (imageList) => {
        // data for submit
        
        // Create an object of formData 
        const formData = new FormData(); 
         
        // Update the formData object 
        formData.append( 
          "myFile", 
          imageList[0].file, 
          imageList[0].file.name
        ); 
       
        // Details of the uploaded file 
        console.log(imageList[0].file); 
        console.log(imageList[0].file.name); 
       
        // Request made to the backend api 
        // Send formData object to my php file for save in folder
        axios.post(window.location.origin +'/ImageUpload.php', formData); 
      }; 

     //returns true if collection is not out of stock and false otherwise (350 dostupnych)
    IsNotFullyMinted = () => {
        //writeUserData("4","tomasek","email","xdxdxd");
        if(NFTsMinted<350)
        {
            this.setState({ NFTCollection : "Mint your NFT, only "+(350-NFTsMinted)+" left!"}); 
            console.log("somtu ")
            return true;
        }
        else{
            return false;
        }
    }
    
    // returns true if random Number from Gameability is already minted, false otherwise
    isAlreadyMinted = (NftNumber) => {
        const db = getDatabase();
        var data="";

        const NFTcount = ref(db, 'MintedAlready/' + NftNumber);
        onValue(NFTcount, (callback) => {
        data = callback.val();
        //console.log("callback data " + data.name);
        })
        
        if(NftNumber == data){
            return true;
        }
        return false;
    }

    // function that give us NFT minted number
     Gameability = () => {
        //this.state.GamingNumber = zober ho z pickera html 
        var GamingNumber = 0;
        var CollectionNotFullyMinted = this.IsNotFullyMinted(); //chekni databazu a kukni či už je mintnutych 350 NFTs, čiže cela kolekcia, ak je tak stopni všetko
        console.log("collection NOT fully minted "+CollectionNotFullyMinted);

        var Number = 0;
        if(CollectionNotFullyMinted){

            Number = Math.floor(Math.random() * (350 - 1 + 1) + 1);
            console.log("FINAL number "+Number);
            if(GamingNumber == 0)
            { 
                while(this.isAlreadyMinted(Number) && CollectionNotFullyMinted)// checkni databazu, ak tam number už je ako mintunty, tak treba mintnuť iny number
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

     

     ToggleButton = () => {
        //writeAlreadyMintedNFT(2, 1, "asd.com");
        //this.isAlreadyMinted(2);
        //this.IsNotFullyMinted();
        var NFTnumber = this.Gameability();
        this.NFTwatermark(NFTnumber);
        this.UploadInfoPHP();
        //writeNftData("2","5","TxHash")

        /*if (!window.ethereum || true)
        {
            loginButton.innerText = "Metamask is not installed!";
            loginButton.classList.remove('isInstalled');
            loginButton.classList.add('isNotInstalled');
            return false
        }*/
        

        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');

            this.setState({ MetaMaskInfo: "MetaMask is installed!",
                LoginButtonSTYLE : "bg-blue-600 rounded-md p-2 text-white",
                Visibility : "visible",
                LoginDisable : false
        })
            /*
            setMetaMaskInfo("MetaMask is installed!")
            setLoginStyle("bg-blue-600 rounded-md p-2 text-white")
            setVisibility("visible")
            disableButton(false)*/
        }
        else{
            console.log('MetaMask is NOT installed!');
            this.setState({ MetaMaskInfo: "MetaMask is NOT installed!",
            MetamaskAddress : "Please install MetaMask to continue!",
            LoginDisable : true
    })
            
            /*
            setMetaMaskInfo("MetaMask is NOT installed!")
            setMetaAddress("Please install MetaMask to continue!")
            disableButton(true)*/
            
        }
    }

    NFTwatermark = (NFTnumber) =>
    {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext("2d");
        const img = this.image.current;
        
        ctx.drawImage(img, 0, 0);
        ctx.font = "35px Space";
        ctx.fillText(document.getElementById("donationmoney").value+" eth", 900, 1000); // THIS IS THE PLACE TEXT IS EMBEDDED INTO THE PICTURE
        
        dataURL = canvas.toDataURL();
        console.log("canvas dataURL "+dataURL);
    }
    UploadInfoPHP = () =>{
        // Create an object of formData 
        const formData = new FormData(); 
        // Update the formData object 
            formData.append( 
            "myFile", 
            dataURL, 
            "ahoj"
        ); 
        
        // Details of the uploaded file 
        console.log(dataURL); 
        
        // Request made to the backend api 
        // Send formData object to my php file for save in folder
        axios.post("../src/ImageUpload.php", formData); 
    }
     donationAmount = () =>
    {
        //setA(document.getElementById("donationmoney").value);
        this.setState({ donation : document.getElementById("donationmoney").value});
        const canvas = this.canvas.current;
        const ctx = canvas.getContext("2d");
        const img = this.image.current;
        

        
        ctx.drawImage(img, 0, 0);
        ctx.font = "35px Space";
        ctx.fillText(document.getElementById("donationmoney").value+" eth", 900, 1000); // THIS IS THE PLACE TEXT IS EMBEDDED INTO THE PICTURE
        
        //var dataURL = canvas.toDataURL();

        this.putEthOnImage();
        
        
        const canvas2 = document.getElementById("canvas");
        canvas2.toBlob(function(blob) {
        saveAs(blob, "pretty image.png");});
        /*
        let downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', 'CanvasAsImage.png');
        
        let dataURL = canvas.toDataURL('image/png');
        let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
        downloadLink.setAttribute('href', url);
        downloadLink.click();*/
    }

     orgNumber = () =>
    {
        //setWhichOrg(document.getElementById("org-select").value);
        this.setState({ organization : document.getElementById("org-select").value})
        console.log("org "+document.getElementById("org-select").value);
    }
    

     logInWithMetamask = async () =>
    {
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
        
        //const balance = web3.eth.getBalance(myAddress)
        this.setState({ MetamaskAddress : "Address of our account: "+myAddress,
        WalletBalance : "My balance is: "
    })
        /*
        setMetaAddress("Address of our account: "+myAddress)
        setBalance("My balance is: ")  */
        console.log("My Adress: "+myAddress)
    }


    /*
    var DivStyle = {
        padding : "3em",
        textAlign :  "center"
    }*/
    putEthOnImage = () =>{
        const canvas = this.canvas.current;
        const ctx = canvas.getContext("2d");
        const img = this.image.current;
        

        img.onload = () => {
        ctx.drawImage(img, 0, 0);
        ctx.font = "35px Space";
        ctx.fillText(this.state.donation+" eth", 900, 1000); // THIS IS THE PLACE TEXT IS EMBEDDED INTO THE PICTURE
        };

    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    componentDidMount() {
    /*
        const canvas = this.canvas.current;
        const ctx = canvas.getContext("2d");
        const img = this.image.current;
        

        img.onload = () => {
        ctx.drawImage(img, 0, 0);
        ctx.font = "35px Space";
        ctx.fillText(this.state.donation+" eth", 900, 1000); // THIS IS THE PLACE TEXT IS EMBEDDED INTO THE PICTURE
        };
       */
        
    }
    
    render(){
    return(
    

    <div className={styles.Page}> 
    <div  className="flex-col w-screen h-screen justify-center items-center">
        <h2 className="text-lg text-white font-semibold">Metamask wallet info</h2>
        
        <button className="rounded-md p-2 bg-blue-800 text-white"  onClick={this.ToggleButton}  >{this.state.MetaMaskInfo}</button>
        <button className={this.state.LoginButtonSTYLE } onClick={this.logInWithMetamask} disabled={this.state.LoginDisable} >Login to MetaMask</button>    
        
        <h3 className="font-semibold">{this.state.MetamaskAddress}</h3>
        <AccountData accountIndex={0} units={"ether"} precision={3}></AccountData>
        
        <h2> pick org for donation</h2>
        <label for="org-select">--Please choose an option--</label>

        <select name="orgs" id="org-select" onChange={this.orgNumber}>
            <option value="">--Please choose an option--</option>
            <option selected value="1">org1</option>
            <option value="2">org2</option>
            <option value="3">org3</option>
            <option value="4">org4</option>
        </select>

        <ImageUploading
        onChange={this.onChange}
      >
        {({ imageList, onImageUpload }) => (
          // write your building UI
          <div className="imageuploader">
            <div className="mainBtns">
            <button className="btn btn-primary mr-1" onClick={onImageUpload}>Upload Image</button>
            
            </div>
            {imageList.map((image) => (
              <div className="imagecontainer" key={image.key}>
                <img src={image.dataURL} />
                
              </div>
            ))}
          </div>
        )}
      </ImageUploading>

        <h2> mint NFT</h2>
        <input type="number" id="donationmoney" inputMode="decimal" onChange={this.donationAmount} step="any" min={0.00001} ></input>
        
        <ContractForm  contract="RoDsc" method="mint" sendArgs={{value : web3.utils.toWei(this.state.donation,"ether"), gas:3000000}} ></ContractForm>

        

        <ContractForm
             
              contract="RoDsc"
              
              method="mint"
              sendArgs={{value : web3.utils.toWei("1","ether"), gas:3000000}}
              render={({ inputs, inputTypes, state, handleInputChange , handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                  {inputs.map((input, index) => (
                    <input
                      style={{ fontSize: 30 }}
                      key={input.name}
                      type={inputTypes[index]}
                      name={input.name}
                      value={state[input.name]}
                      placeholder={input.name}
                      onChange={handleInputChange}
                    />
                  ))}
                  <button
                    key="submit"
                    type="button"
                    onClick={handleSubmit}
                    style={{ fontSize: 40 }}
                  >
                    Submit 40px
                  </button>
                </form>

              )}
            />
        <h2>Withdraw</h2>
        <ContractForm contract="RoDsc" method="withdraw2"  sendArgs={{gas:3000000}}></ContractForm>


        <canvas id="canvas"  ref={this.canvas} width={1920} height={1080} />
        <img
          ref={this.image}
          alt="Upload NFT"
          src={window.location.origin + '/nft/images/'+ NFTname +'.png'}
          
        />
  
        <div className={this.state.Visibility}>
        <h2  className="font-semibold"> awardLicense()</h2>
        <ContractForm contract="PictureLicense" method="awardLicense" labels={['zadajte adresu','tokenID']} sendArgs={{value : web3.utils.toWei("1","ether"), gas:3000000}} />
        
        
            
        
        

        
        <ContractForm contract="RoDsc" method="mint"  sendArgs={{value : web3.utils.toWei(this.state.donation,"ether"), gas:3000000}}></ContractForm>
        
        
        </div>
    </div>
    </div>   
    );
    }
    
    

   
    
}



window.addEventListener('DOMContentLoaded', (event) => {
    
    console.log("test");
});



export default WalletInfo;


      
      
      
    

  
  
import React  from "react";
import styles from "./css/Tx.module.css"
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import web3utils from "./web3utils";
import Web3 from "web3";

const ColorButton = styled(Button)(({ theme }) => ({
  fontFamily: [
      'Space',
    ],
    color: "gold",
    borderColor: "gold",
    size: "Large",
    fontSize: "22px",
    backgroundColor : "#220b25",
}));

class Canvas extends React.Component {
  constructor(props) {
    super(props);
   
  }

  hi = async() =>{
    const web3 = new Web3(window.ethereum);
    //const web3 = await this.getWeb3();
    
    const accounts = await web3.eth.getAccounts();
    const contract = await web3utils.getContract(web3);// getContract(web3);
    //const contract = await this.getContractTEST(web3);

    this.Withdraw(contract,accounts);
   
  }

  Withdraw = async(contract,accounts) =>{
    try{
      await contract.methods
        .withdraw2()
        .send({ from: accounts[0]})
          .on('transactionHash', function (hash) {
            console.log('transactionHash');
             console.log(hash);
           })
           .on('confirmation', async function (confirmationNumber, receipt) {
             console.log('confirmation');
             console.log(confirmationNumber);
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
      console.log("Error with transaction! "+e);
    }
  }
  
  componentDidMount() { 
  }
  
  render() {
   
    return (
      
      <div className={styles.Page}>
        <h1 className={styles.Title}>Here you can withdraw your donated ethers from people!</h1>
         <h1 className={styles.Title}><ColorButton className={styles.Text} onClick={this.hi} variant="outlined">withdraw!</ColorButton></h1>
      </div>
    );
    
  }
  
}


export default Canvas;

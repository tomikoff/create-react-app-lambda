import React from "react";
import {
    AccountData,
    ContractData,
    ContractForm 
} from '@drizzle/react-components';
import web3 from 'web3';



const MyComponent = () => { return (
    <div>
        <h2> Balance prvého Accountu</h2>
        <AccountData accountIndex={0} units={"ether"} precision={3}></AccountData>

        <h2> Balance druhého Accountu</h2>
        <AccountData accountIndex={1} units={"ether"} precision={3}></AccountData>

        <h2> getData()</h2>
        <ContractData contract="SimplePaymentChannel" method="getData" ></ContractData> {/*methodArgs={[{value : web3.utils.toWei("2","ether")}]} */}

        <h2> setData()</h2>
        <ContractForm contract="SimplePaymentChannel" method="setData" labels={['new value of data']}></ContractForm>

        <h2> TestPayment()</h2>
        <ContractForm contract="SimplePaymentChannel" method="TestPayment" sendArgs={{value : web3.utils.toWei("2","ether")}} />

        <h2> awardLicense()</h2>
        <ContractForm contract="PictureLicense" method="awardLicense" labels={['zadajte adresu','tokenID']} sendArgs={{value : web3.utils.toWei("1","ether"), gas:3000000}} />
         <p>
              <strong>Počet Rozdaných Licencií</strong>:{" "}
              <ContractData contract="PictureLicense" method="getTokenIds" ></ContractData>
              
              
              {/*<ContractData contract="PictureLicense" method="ownerOf" ></ContractData> */}
              {" "}
              
            </p>
            <strong>sendEther</strong>
            <ContractForm contract="PictureLicense" method="sendEther" labels={['zadaj adresu']}></ContractForm>  


        {/* whenClicked is a property not an event, per se. 
        <h2> setData()</h2>
        <ContractForm contract="SimplePaymentChannel" method="setDataTODO" labels={['new value of data']}></ContractForm>
        */}
    

    </div>
    
);}

export default MyComponent;


  

  
  

  


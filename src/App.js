/* Imports */
import React, { Component } from 'react';
import { DrizzleProvider } from '@drizzle/react-plugin';
import { LoadingContainer } from '@drizzle/react-components';
import drizzleOptions from './DrizzleOptions'; 
import {Route, Routes} from 'react-router-dom';
import MediaQuery from 'react-responsive';

/* Imports of Pages (Site components) */
import MyComponent from './MyComponent'; import WalletInfo from './walletInfo'; import TransactionConnect from "./TransactionConnect";
import HomePage from './HomePage'; import NavBar from './NavBar'; import SmartContractPAGE from './SmartContractPAGE';
import Mint from './Mint';import Minting_Do from './MintingDo';import Donations from './Donations'; import ScrollToTop from './ScrollToTop';
import Canvas from './canvas';import ImageTextEdit from './imageTextEdit'; import Convert from './convert';
import CID from './CID';import Helper from "./Helper";import CIDjson from './CIDjson';



/* Stary sposob
class App extends Component {
  render(){  
    return (
      
          <React.Fragment>
            <HomePage></HomePage>
            <DrizzleProvider options={drizzleOptions}>
              <LoadingContainer>
                  <WalletInfo></WalletInfo>
                </LoadingContainer>  
          </DrizzleProvider>
          </React.Fragment>
         
       
      
    );
  }
}
*/


function App(){
  return(
    <div className='App'>
      <MediaQuery minWidth={661}>
        <NavBar/>
      </MediaQuery>

      <MediaQuery maxWidth={660}>
        <NavBar  />
      </MediaQuery>

      <ScrollToTop>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/WalletInfo" element={<DrizzleProvider options={drizzleOptions}>
                <LoadingContainer>
                    <WalletInfo></WalletInfo>
                  </LoadingContainer>  
            </DrizzleProvider>} />

          <Route exact path="/MyComponent" element={<DrizzleProvider options={drizzleOptions}>
                <LoadingContainer>
                    <MyComponent/>
                  </LoadingContainer>  
            </DrizzleProvider>} />
          
          <Route exact path="/SmartContract" element={<SmartContractPAGE/>}></Route>
          <Route exact path="/HomePage" element={<HomePage/>}></Route>
          <Route exact path="/Mint" element={<Mint/>}></Route>
          <Route exact path="/Minting" element={<Minting_Do/>}></Route>
          <Route exact path="/Donations" element={<Donations/>}></Route>
          <Route exact path="/CID" element={<Helper/>}></Route>
          <Route path="/CID/:id" element = {<CID/>}></Route>
          <Route path="/CID/json/:id" element = {<CIDjson/>}></Route>

          <Route exact path="/Org" element={
                    <Canvas></Canvas>} />

          <Route exact path="/MintTx" element={
                
                    <TransactionConnect></TransactionConnect>
                   
                  
            } />
          <Route exact path="/Upload" element={<DrizzleProvider options={drizzleOptions}> 
                <LoadingContainer>
                    <WalletInfo></WalletInfo>
                  </LoadingContainer>  
            </DrizzleProvider>} />
        </Routes>
      </ScrollToTop>
    </div>
  );
}
export default App;

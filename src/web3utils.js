import $ from "jquery";
import Web3 from "web3";




    async function getContract(web3){
    const data = await $.getJSON("RoDsc.json");
    const netId = await web3.eth.net.getId();
    const deployedNetwork = data.networks[netId];
    console.log("deployednetwork : "+deployedNetwork + " adres : "+deployedNetwork.address + " netid "+netId);
    const greeting = new web3.eth.Contract(
      data.abi,
      deployedNetwork && deployedNetwork.address
    );
    return greeting;
  };

  async function getContractTEST(web3) {
    //const data = await $.getJSON("RoDsc.json");
    const data = await $.getJSON("RoDsc.json");
    const netId = await web3.eth.net.getId();
    const deployedNetwork = data.networks[netId];
    console.log("deployednetwork : "+deployedNetwork + " adres : "+deployedNetwork.address + " netid "+netId);
    const greeting = new web3.eth.Contract(
      data.abi,
      "0x2b498D1F842Bc282351A77e21BcfEf8c7Ef5C09e"
    );
    return greeting;
  };

  function getWeb3() {
    return new Promise((resolve, reject) => {
      window.addEventListener("load", async () => {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
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



  export default {getContract,getWeb3,getContractTEST};



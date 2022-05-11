import Web3 from "web3";

const getWeb3 = () =>
    new Promise((resolve, reject) => {
        //wait for loading completion to avoid race conditions with web3 injection timing.
        window.addEventListener("load", async () => {
            //modern dapp browsers
                if(window.ethereum){
                    const web3 = new Web3(window.ethereum);
                    try{
                        //request account acces if needed
                        await window.ethereum.enable();
                        resolve(web3);
                    }catch(e){console.log("e "+e);reject(e);};
                
                }else if(window.web3){
                    const web3 = window.web3;
                    console.log("injected web3 detected.");
                    resolve(web3);
                }
            //fallback to localhost
                else{
                    const provider = new Web3.providers.HttpProvider
                    (
                    "http://127.0.0.1:9545"
                    );
                    const web3 = new Web3(provider);
                    console.log("no web3 instance injected, using localhost callback web3");
                    resolve(web3);
                }
            
        });
    });

    export default getWeb3;
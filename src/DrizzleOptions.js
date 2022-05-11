import SimplePayment from './contracts/SimplePaymentChannel.json';
import PictureLicense from './contracts/PictureLicense.json';
import RoDsc from './contracts/RoDsc.json';
import Web3 from 'web3';
const options = {
    contracts: [RoDsc],
    web3: {
        //customProvider: new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/'),
        fallback: {
            type: "ws",
            //url: "wss://rinkeby.infura.io/ws/v3/0b148e4b64e5421da1318aba238760d2",
            //url: "wss://rinkeby.infura.io/ws",
            url: "ws://127.0.0.1:9545", //ganache local
            //url: "https://ropsten.infura.io/v3/", //ropsten test ntwrk
        },
    }
    /*,
    
    web3: {
        fallback: {
            type: "ws",
            //url: "wss://rinkeby.infura.io/ws/v3/0b148e4b64e5421da1318aba238760d2",
            //url: "wss://rinkeby.infura.io/ws",
            url: "ws://127.0.0.1:9545", //ganache local
            //url: "https://ropsten.infura.io/v3/", //ropsten test ntwrk
        },
    }*/
};

export default options;
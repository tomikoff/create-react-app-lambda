import React,{ useState } from "react";
import styles from "./css/SmartContract.module.css"


function SmartContractPage(){
    const [dontShow,setShowing] = useState(false)

    return (
        <div className={styles.Page}>
            <h1 className={styles.Title}>This is smart contract webpage</h1>
            <div className={styles.TextDiv}>
                <p className={styles.Text}>This is our Smart Contract. This chunk of code is responsible for delivering your crypto-currency to the organization, you choosed.
                 It is transparent, so You dont have to worry about your money donation through buying an NFT.</p>
            </div>
            <div className={styles.ContractDiv}>
                <div className={styles.ContractTitle}><p className={styles.Text}>Smart Contract</p></div>
                <div className={styles.CodeDiv}></div>
                
                {dontShow && (<p>sdfsdf as da da da ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssssssssssssssssssssssss  sssssssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss s s s</p>)}  
            </div>
        </div>
    );
}

export default SmartContractPage;
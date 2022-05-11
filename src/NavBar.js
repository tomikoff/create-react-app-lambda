import React, {useState} from "react";
import {Link} from "react-router-dom"
import styles from "./css/NavBar.module.css"
import { Squash as Hamburger } from 'hamburger-react'


function NavBar(){
    const [isOpen, setOpen] = useState(false)
    const [isOpenColor,setColor] = useState("#d8d8d8")
    const [Visibility,setVisibility] = useState("invisible")
    

    function ToggleMobileMenu()
    {
        if(isOpen)
        {
            setVisibility("invisible")
            setColor("#d8d8d8")
        }else{
            setVisibility("visible")
            setColor("gold")
        }
    }

    return(
        <div className={styles.NavBarDIV}>
            <ul className={styles.test}>
                <li className={styles.LIleft}><Link to="/">Revenge of Dogos</Link></li>
                <li><a href="/#MintDiv">ABOUT</a></li>
                <li><Link to="/Minting">MINT</Link></li>
                <li><Link to="/SmartContract">SMART CONTRACT</Link></li>
                <li className={styles.LIright}><Link to="/MintTx">CONNECT!</Link></li>
                
            </ul>  
            <div className={styles.Hamburgerr} onClick={ToggleMobileMenu}>
                
                
                <div className={styles.LIleft_mobile + " " + styles.ul_mobile}><Link  to="/">Revenge of Dogos</Link></div>
                <Hamburger color={isOpenColor} toggled={isOpen} toggle={setOpen} />
            </div>
            
            {isOpen && (
            <div className={styles.NavBarDIVmobile}>
                <ul className={styles.ul_mobile}>
                <li className={styles.LIleft_mobile}><Link  to="/">Revenge of Dogos</Link></li>
                <li className={styles.li_mobile+" "+styles.Helper}><a href="/#MintDiv">ABOUT</a></li>
                <li className={styles.li_mobile+" "+styles.Helper}><Link to="/Minting" className={styles.Helper}>MINT</Link></li>
                <li className={styles.li_mobile +" "+styles.Helper}><Link to="/SmartContract" className={styles.Helper} >SMART CONTRACT</Link></li>
                <li className={styles.LIright + " " + styles.li_mobile}><Link to="/MintTx" className={styles.Helper}>CONNECT!</Link></li>
                </ul>
            </div>)
            }
          
            
        </div>  

        
    );
}

export default NavBar;
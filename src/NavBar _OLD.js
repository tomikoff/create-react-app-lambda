import React, {useState} from "react";
import {Link} from "react-router-dom"
import styles from "./css/mystyle.module.css"
import { Squash as Hamburger } from 'hamburger-react'

function NavBar(){
    /*
    const [hamburgerOpen, setHamburgerOpen] = useState(true)
    const [hamburgerOpen2, setHamburgerOpen2] = useState(false)
    const [styling, setStyle] = useState("menu-btn__burger")
    const [styling2,setStyle2] = useState("menubtn")

    const toggleHamburger2 = () =>{
        setHamburgerOpen2(!hamburgerOpen2)
        if(styling2==="menubtn"){
            setStyle2("")
            setStyle2("menubtn open")
        }else{
            setStyle2("menubtn")
        }
    }

    const toggleHamburger = () =>{
        setHamburgerOpen(!hamburgerOpen)
        if(styling==="menu-btn__burger"){
            setStyle("menu-btn__burger")
        }else{
            setStyle("hamburger hamburger--3dx")
        }
        
    }
*/
    const [isOpen, setOpen] = useState(false)

    return(
        <div className={styles.NavBarDIV}>
            <ul className={styles.test}>
                <li className={styles.LIleft}><Link to="/">Revenge of Dogos</Link></li>
                <li><Link to="/NFTPreview">ABOUT</Link></li>
                <li>MINT</li>
                <li><Link to="/SmartContract">SMART CONTRACT</Link></li>
                <li className={styles.LIright}><Link to="/WalletInfo">CONNECT!</Link></li>
            </ul>  

            <div className="hamb">
                    asd
            </div>

            <Hamburger toggled={isOpen} toggle={setOpen} />
            <style jsx>{
                `
                .hamb{
                    display : ${hamburgerOpen ? 'inline' : 'none'};
                    
                }
                
                .hamburgerboring .hamburgerinner, .hamburgerboring .hamburgerinner::before, .hamburgerboring .hamburgerinner::after {
                    transition-property: none; }
                  
                  .hamburgerboring.is-active .hamburgerinner {
                    transform: rotate(45deg); }
                    .hamburgerboring.is-active .hamburgerinner::before {
                      top: 0;
                      opacity: 0; }
                    .hamburgerboring.is-active .hamburgerinner::after {
                      bottom: 0;
                      transform: rotate(-90deg); }
                `
            }</style>
            
        </div>  

        
    );
}

export default NavBar;
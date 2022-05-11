import React, { useState } from "react";
import styles from "./css/MainPage.module.css"
import NFTImage from "./assets/NFTMain.png"
import { Link } from "react-router-dom";
import {Button} from "@mui/material/"
import { styled } from '@mui/material/styles';

function HomePage(){
    const [dontShow,setShowing] = useState(false)
    const ColorButton = styled(Button)(({ theme }) => ({
        fontFamily: [
            'Space',
          ],
          color: "#6bd4cd",
          borderColor: "#6bd4cd",
          size: "Large",
          fontSize: "22px",
          backgroundColor : "black",
      }));

    return (
        <div className={styles.Page}>
            <h1 className={styles.Title}>Welcome to the Revenge of Dogos</h1>
            <div className={styles.TextDivIntro}>
                <p className={styles.TextLeft}>Shh, do you hear that?<br></br><br></br> That is the barking and howling of hungry abandoned dogs that have decided to end us! <br></br>
                    "We will never be hungry again, we don't want to be abandoned again!"<br></br>
                    "We came to take what is ours!"<br></br>
                    "Either it will be YOU people OR ..."<br></br>
                    "Or you will help us get food for hungry, abandoned comrades!"<br></br>
                    <br></br>
                    "Think twice about your next steps, thats the only chance you gonna be spared !!!"</p>

                <div className={styles.ImgDiv}><img className={styles.Img} src={NFTImage} alt="NFT" ></img></div>
                
            </div>

            <div className={styles.LearnDiv}>
                <h1 className={styles.Title}><ColorButton className={styles.Text} href="#MintDiv" variant="outlined">LEARN MORE!</ColorButton></h1>
                <div id="MintDiv"><div className={styles.Arrow} ></div></div>
            </div>

            <div className={styles.MintDiv} >
                <h1 className={styles.Title} >MINT!</h1>

                <div className={styles.TextDiv}>
                    <p className={styles.Text} >Try to Mint your personal NFT dog. You just need to connect your Crypto Wallet and you can start minting and helping out!</p>
                </div>

                <h1 className={styles.Title}><ColorButton className={styles.Text}  variant="outlined"><Link to="/Mint">About minting</Link></ColorButton></h1>
                
            </div>

            {dontShow &&(<div className={styles.TeamDiv}>
                <h1 className={styles.Title}>TEAM!</h1>
                <p className={styles.Text} >We are two!</p>
            </div>)}

            <div className={styles.DonationsDiv}>
                <h1 className={styles.Title}>DONATIONS!</h1>

                <div className={styles.TextDiv}>
                    <p className={styles.Text} >After every mint, We send out crypto currency gained from your purchase to various organizations, that will use the crypto currency for saving animal lifes.
                Basically, your money for buying Revenge of Dogos NFT, will go to the organization that you choose, as a donation :)</p>
                </div>

                <h1 className={styles.Title}><ColorButton className={styles.Text}  variant="outlined"><Link to="/Donations">LEARN MORE!</Link></ColorButton></h1>
            </div>

            <div className={styles.MintDiv}>
                <h1 className={styles.Title}>BACKSTORY!</h1>
                <div className={styles.TextDiv}>
                    <p className={styles.Text} >I was seeking something, that will have good synergy with Smart Contracts for my diploma thesis. 
                    And then all of a sudden, baam NFTs were popping of everywhere, everybody started to talk about them, they were already becoming huge. 
                    But then on the other hand, I needed something, that would be somewhat unique as an NFT and I found it. I found it in me. 
                    My happy little foxy dogo Berry died in 2021 and He have been in my head ever since. I grew up with him, we had quadrilion of memories together, he was the best friend a man can get.
                    And as a remembrance, he is the main hero of this NFT collection. Yea sure, dogs arent that unique, you might say, but helping them and other animals IS, 
                    that is the difference between this NFT and maybe others.<br></br>
                    We will help other animals that are in need together!</p>
                </div>
            </div>

            <div className={styles.ContactDiv}>
            
                <h1 className={styles.Title}>Do you have any questions? Contact us!</h1>
                <div className={styles.Text + " " + styles.Socials}><div className={styles.SocSietVIDtwi} ></div><div className={styles.SocSietVIDfac} ></div><div className={styles.SocSietVIDing} ></div></div>
                <p className={styles.Text} >Reach out via Instagram, Linked In, or e-mail!</p>
            
            </div>
        </div>
    );
}

export default HomePage;
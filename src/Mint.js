import React from "react";
import styles from "./css/Mint.module.css";
import { Link } from "react-router-dom";
import {Button} from "@mui/material/"
import { styled } from '@mui/material/styles';
import nft1 from "./assets/nftPreview/nft1.png";import nft2 from "./assets/nftPreview/nft2.png";import nft3 from "./assets/nftPreview/nft3.png";import nft4 from "./assets/nftPreview/nft4.png";import nft5 from "./assets/nftPreview/nft5.png";import nft6 from "./assets/nftPreview/nft6.png";

function Mint(){

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

    return(
        <div className={styles.Page}>
            <div className={styles.Title}>What really is Minting?</div>
            <div className={styles.TextDiv}><p className={styles.Text}>Minting is a process when your personal custom NFT is being published onto ethereum blockchain for small minting price.</p></div>
            
            <div className={styles.Title}>What will you get ?</div>
                <div className={styles.TextDiv}>
                    <p className={styles.Text}>You-ll get your one of a kind Revenge of Dogos NFT.</p>
                    <p className={styles.Text}>You-ll help organization of your choice, with crypto gathered from your purchase.</p>
                    <p className={styles.Text}>You-ll get full power over your new NFT, so u can trade it with others, make a collection out of it, or use it in your own projects.</p>
                
                </div>
            
            <div className={styles.Title}>What will we get ?</div>
            <div className={styles.TextDiv}>
                <p className={styles.Text}>Nothing.<br></br> Purpose of this NFT is solely helping out animals in needs.</p>
            </div>

            <div className={styles.Title}>NFT preview !</div>

            <div className={styles.PreviewDiv}>
                <img className={styles.Img} src={nft1} alt="nft1 preview" ></img>
                <img className={styles.Img} src={nft2} alt="nft2 preview" ></img>
                <img className={styles.Img} src={nft3} alt="nft3 preview" ></img>
                <img></img>
                <img className={styles.Img} src={nft6} alt="nft6 preview" ></img>
                <img className={styles.Img} src={nft5} alt="nft5 preview" ></img>
                <img className={styles.Img} src={nft4} alt="nft4 preview" ></img>
            </div>

            <div className={styles.TextDiv}>
                <p className={styles.Text}>This collection have One super rare NFT.</p>
                <p className={styles.Text}>Over 400 unique combinations.</p>
                <p className={styles.Text}>Only 350 unique combinations can be minted!</p>
                <p className={styles.Text}>Every minted NFT is different and unique.</p>
            </div>

            <div className={styles.Title}>Lets Mint your first unique NFT !</div>
            <h1 className={styles.Title}><ColorButton className={styles.Text}  variant="outlined"><Link to="/Minting">Mint me!</Link></ColorButton></h1>
        </div>
    );
}

export default Mint;
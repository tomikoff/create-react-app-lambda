import React from "react";
import styles from "./css/Donations.module.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import HopeForPaws from "./assets/organizations/HopeForPaws.png"
import Paws from "./assets/organizations/Paws.png"
import Lifesaver from "./assets/organizations/Lifesaver.jpg"
import Edin from "./assets/organizations/Edin.png"

function Donations(){

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
            <div className={styles.Title}> How does it work?</div>
                <div className={styles.TextDiv}>
                    <p className={styles.Text}>You start with minting your nft for crypto currency Ethereum. 
                    You will pay a small fee for minting and a small starting cost that has been set for this NFT (together circa 0.3ETH).
                    <br></br>
                    After that, you get your one of a kind NFT, which you can use in your projects or trade in the future.
                    All crypto currency gathered from your purchase is automatically transferred from Smart Contract to Organization which you choosed in the mint process, once the process is completed.
                    </p>
                </div>
            <div className={styles.Title}> More about minting and RoD NFT !</div>

            <h1 className={styles.Title}><ColorButton className={styles.Text}  variant="outlined"><Link to="/Mint">SEE MORE!</Link></ColorButton></h1>

            
            <div id="DonationsWho" className={styles.Title}> Who can you donate to?</div>
            
            <div id="firstOrg" style={{height:"4.6em"}}></div>
            <div className={styles.OrganizationDivLEFT} >
                <div className={styles.OrganizationTextDiv}>
                    <h1 className={styles.OrganizationTextTitleLeft}>Hope for Paws (Mint number 1)</h1>
                    <p className={styles.OrganizationText}>Hope For Paws is a 501 C-3 non-profit animal rescue organization (E.I.N: 26-2869386). We rescue dogs, cats and other types of animals suffering on the streets or neglected in the wild. Through rescue and education, Hope For Paws works to raise awareness for abandoned animals.</p>
                        <div className={styles.OrganizationContactDiv}>
                            <p className={styles.OrganizationContactText}>Contact : <br></br></p>
                            <div className={styles.OrganizationContactText}><a href="https://www.hopeforpaws.org/">Website</a> <a href="https://www.youtube.com/hopeforpaws">YouTube</a> <a href="https://www.facebook.com/hopeforpawscalifornia/">Facebook/Meta</a> <a href="https://www.instagram.com/hopeforpawsrescue/">Instagram</a></div>
                        </div>
                </div>
                <div className={styles.OrganizationImg}>
                    <img className={styles.Img} src={HopeForPaws} alt="Hope for Paws" ></img>
                </div>
            </div>

            <div id="secondOrg" style={{height:"4.6em"}}></div>
            <div className={styles.OrganizationDivRIGHT} >
                <div className={styles.OrganizationImg}>
                <img className={styles.Img} src={Paws} alt="Paws" ></img>
                </div>

                <div className={styles.OrganizationTextDiv}>
                    <h1 className={styles.OrganizationTextTitleRight}>Paws (Mint number 2)</h1>
                    <p className={styles.OrganizationText}>PAWS is people helping cats, dogs and wild animals go home and thrive – whether home is the family room or the forest. We do this by rehabilitating orphaned and injured wildlife, sheltering and adopting homeless cats and dogs, and educating the community to inspire compassionate action for animals.

Since 1967, PAWS has united more than 130,000 cats and dogs with loving families, cared for more than 140,000 sick, injured and orphaned wild animals, and made the world a better place for countless others through outreach, education and advocacy.</p>
                        <div className={styles.OrganizationContactDiv}>
                            <p className={styles.OrganizationContactText}>Contact : <br></br></p>
                            <div className={styles.OrganizationContactText}><a href="https://www.paws.org/">Website</a> <a href="https://www.youtube.com/channel/UCsAJo0Hcb6JXNphodEKWi3Q">YouTube</a> <a href="https://www.facebook.com/PAWSWashington">Facebook/Meta</a> <a href="https://www.instagram.com/paws_wa/">Instagram</a></div>
                        </div>
                </div>
                
            </div>
            
            <div id="thirdOrg" style={{height:"4.6em"}}></div>
            <div className={styles.OrganizationDivLEFT} >
                <div className={styles.OrganizationTextDiv}>
                    <h1 className={styles.OrganizationTextTitleLeft}>Life saver dogs (Mint number 3)</h1>
                    <p className={styles.OrganizationText}>Life Saver Dogs is dedicated to help people with disabilities get a custom-trained service dog tailored to their individual needs. We help people raise most (around 90%) of the money required to finance their service dog, and have our professional service dog trainers select, test and fully train those dogs. We support our service dog recipients throughout the entire process and for the life-time of the service dog.</p>
                        <div className={styles.OrganizationContactDiv} >
                            <p className={styles.OrganizationContactText}>Contact : <br></br></p>
                            <div className={styles.OrganizationContactText}><a href="https://lifesaverdogs.org/">Website</a> <a href="https://www.youtube.com/channel/UCiyjp_is3Xc4Wv05RjGjn9Q">Youtube</a> <a href="https://www.facebook.com/lifesaverdogs">Facebook/Meta</a> <a href="https://www.instagram.com/lifesaverdogs/">Instagram</a></div>
                        </div>
                </div>
                <div className={styles.OrganizationImg}>
                    <img className={styles.Img} src={Lifesaver} alt="Life Saver Dogs" ></img>
                </div>
            </div>

            <div id="fourthOrg" style={{height:"4.6em"}}></div>
            <div className={styles.OrganizationDivRIGHT} >
                <div className={styles.OrganizationImg}>
                <img className={styles.Img} src={Edin} alt="Edinburgh Dog and Cat Home" ></img>
                </div>

                <div className={styles.OrganizationTextDiv}>
                    <h1 className={styles.OrganizationTextTitleRight}>Edinburgh Dog and Cat Home (Mint number 4)</h1>
                    <p className={styles.OrganizationText}>Our mission is To rescue, reunite and rehome dogs and cats across Edinburgh and the Lothians. Our Vision is To create a community where unwanted and mistreated animals are given a voice and a second chance for a happy and forever home; and where anybody who can, will act to advocate for animals still suffering.</p>
                        <div className={styles.OrganizationContactDiv}>
                            <p className={styles.OrganizationContactText}>Contact : <br></br></p>
                            <div className={styles.OrganizationContactText}><a href="https://edch.org.uk/">Website</a> <a href="https://www.youtube.com/channel/UCeJSVCxn87nsJYadats5EBA">YouTube</a> <a href="https://www.facebook.com/EdinDogCatHome/?fref=ts">Facebook/Meta</a> <a href="https://www.instagram.com/edindogcathome/">Instagram</a></div>
                        </div>
                </div>
                
            </div>


            <div className={styles.Title}>Help these dogos with us, Connect your wallet, mint and get your one of a kind custom Revenge of Dogos NFT.</div>
            <h1 className={styles.Title}><ColorButton className={styles.Text}  variant="outlined"><Link to="/Minting">Connect!</Link></ColorButton></h1>

            <div className={styles.TextDiv} ><p className={styles.Text}>Or you can donate without it in each organization description.</p></div>
        </div>
    );
}

export default Donations;
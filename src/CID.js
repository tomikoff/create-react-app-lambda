import React, { useState, useEffect}  from 'react';
import styles from "./css/Connect.module.css"
import { Link, useParams } from 'react-router-dom';

const CID = props => {
    /*
    constructor(props, context)
    {
        super(props);

        this.ContractForm= React.createRef();
        this.canvas = React.createRef();
        this.image = React.createRef();
        
    }
    componentDidMount(){
        
        const img = this.image.current;
        
        

        var xOffset;var newWidth;
        var yOffset;var newHeight;
        /*
        (function() {
            
    
            // resize the canvas to fill browser window dynamically
            window.addEventListener('resize', resizeCanvas, false);
            
            function resizeCanvas() {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    var wrh = img.width / img.height;
                newWidth = canvas.width;
                newHeight = newWidth / wrh;
                if (newHeight > canvas.height) {
                            newHeight = canvas.height;
                    newWidth = newHeight * wrh;
                }
                xOffset = newWidth < canvas.width ? ((canvas.width - newWidth) / 2) : 0;
                yOffset = newHeight < canvas.height ? ((canvas.height - newHeight) / 2) : 0;

                    
                    drawStuff(); 
            }
            resizeCanvas();
            
            function drawStuff() {
                    // do your drawing stuff here
                    ctx.drawImage(img, xOffset, yOffset, newWidth, newHeight);
            }
        })
    }*/
                
                const { id } = useParams();
                return(
                    <div className={styles.Page}>  
                        <img alt="Upload NFT" src={window.location.origin + '/nft/images/'+ id +'.png'}/>
                        ID: {id}
                    </div>
                );
        
    }

    

    export default CID;
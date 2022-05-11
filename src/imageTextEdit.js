import styles from "./css/imageTextEdit.module.css"


const imageTextEdit = () => {
    
    return (
            <div className={styles.page_wrap}>
                <div className={styles.controls}>
                    <input className={styles.controls + " " + styles.__input}  type="file" id="imageLoader" name="imageLoader" />
                    <label className={styles.controls + " " +styles.__label} for="name">First, choose an image.</label>

                    <input className={styles.controls + " " + styles.__input} id="name" type="text" value="" />
                    <label className={styles.controls + " " + styles.__label} for="name">Overlay Text</label>

                    <input className={styles.controls + " " +  styles.__input} id="name1" type="text" value="" />
                    <label className={styles.controls + " " + styles.__label} for="name1"> Text</label>
                </div>
                <div className={styles.canvas_wrap}>
                    <canvas  id="imageCanvas" width="400px" height="400px">
                        <canvas id="canvasID"></canvas>
                    </canvas>
                </div>

            </div>
    );

    var text_title = "Overlay text";
    var imageLoader = document.getElementById("imageLoader");
    imageLoader.addEventListener("change", handleImage, false);

    var canvas = document.getElementById("imageCanvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.crossOrigin = "anonymous";

    window.addEventListener("load", DrawPlaceholder);

    function DrawPlaceholder() {
    img.onload = function() {
        DrawOverlay(img);
        DrawText();
        DynamicText(img);
    };
    img.src = "https://unsplash.it/400/400/?random";
    }
    function DrawOverlay(img) {
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = "rgba(30, 144, 255, 0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    function DrawText() {
    ctx.fillStyle = "white";
    ctx.textBaseline = "middle";
    ctx.font = "50px 'Montserrat'";
    ctx.fillText(text_title, 50, 50);
    }
    function DynamicText(img) {
    document.getElementById("name").addEventListener("keyup", function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        DrawOverlay(img);
        DrawText();
        text_title = this.value;
        ctx.fillText(text_title, 50, 50);
    });
    }
    function handleImage(e) {
    var reader = new FileReader();
    var img = "";
    var src = "";
    reader.onload = function(event) {
        img = new Image();
        img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        };
        img.src = event.target.result;
        src = event.target.result;
        canvas.classList.add("show");
        DrawOverlay(img);
        DrawText();
        DynamicText(img);
    };

    reader.readAsDataURL(e.target.files[0]);
    }
    function convertToImage() {
    window.open(canvas.toDataURL("png"));
    }
    document.getElementById("download").onclick = function download() {
    convertToImage();
    };
}

export default imageTextEdit;
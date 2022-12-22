<script>
    import ColorDisplay from "./ColorDisplay.svelte";

    import {quantizeRgbObj, rgbaToRgbObj} from "../util/color";

    let imageData;
    let quantizedColors = [];
    let canvas, fileInput;

    let mode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";

    let loading = false;

    async function handleImageUpload(e) {
        loading = true;
        let image = new Image();
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = () => {
            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(image, 0, 0);
                imageData = ctx.getImageData(0, 0, image.width, image.height);
                prepColors();
            };
            image.src = reader.result;
        };
        reader.readAsDataURL(file);
    }

    function prepColors() {
        let data = rgbaToRgbObj(imageData.data);
        quantizedColors = quantizeRgbObj(data);

        quantizedColors.sort((a, b) => {
            return a.lum() - b.lum();
        });

        loading = false;

        if (mode === "dark") {
            quantizedColors.reverse();
        }

    }

    function switchTheme() {
        mode = mode === "light" ? "dark" : "light"

        if (!imageData) {
            return;
        }

        quantizedColors = quantizedColors.reverse();
    }
</script>

<main>
    <div id="title">
        <h2>Make a color theme from an image</h2>
    </div>
    <canvas bind:this={canvas} id="display-image"></canvas>
    {#if loading}
        <p>processing image, this could take a while..</p>
    {:else}
        <div>
            <button id="submit" on:click={() => fileInput.click()}>Upload Image</button>
            <input on:change={async (e)=>{await handleImageUpload(e)}} type="file" id="image-upload"
                   accept="image/jpeg, image/jpg, image/png"
                   bind:this={fileInput}>
        </div>
        <div id="mode-selector">
            <p><strong>Mode: </strong></p>
            <p class="button" on:click={switchTheme}>{mode}</p>
        </div>

        <ColorDisplay colors={quantizedColors}/>
    {/if}
</main>

<style>
    /*noinspection CssUnknownTarget*/
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

    * {
        font-family: 'Bebas Neue', cursive;
        color: #e3d3cd;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        height: 100%;

        background: #3c3130;
        padding: 20px;
        margin: 20px 0;
        border-radius: 10px;

        max-width: 600px;
        min-width: 300px;
    }

    button {
        width: 100%;
        height: 30px;

        color: #83d1b8;
        background: #da6d4f;
        border-radius: 10px;

        border: 1px solid #da6d4f;
    }

    #image-upload {
        display: none;
    }

    #submit {
        font-size: large;
        font-weight: bold;
    }

    #mode-selector {
        display: flex;
    }

    #mode-selector p {
        padding: 0.1em;
    }

    #display-image {
        display: none;
    }

    .button {
        text-decoration: underline;
    }
    .button:hover {
        text-decoration: none;
    }
</style>
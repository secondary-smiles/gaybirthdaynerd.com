<script>
    import copy from 'copy-to-clipboard';

    let shift = 1;
    let prevTimout;

    export let colors = [];

    let copied = new Array(12).fill("");

    function copyHex(hex, i) {
        clearTimeout(prevTimout)
        copied = new Array(12).fill("");
        copied[i] = "✅";
        copied = copied;

        copy("#" + hex);

        shift++;

        prevTimout = setTimeout(() => {
            copied = new Array(12).fill("");
        }, 2000)
    }
</script>

<main>
    <div id="palette">
        {#each colors as color, i}
            <div class="color-disp-holder">
                <div class="color-disp"
                     on:click={()=>{copyHex(color.hex(), i)}}
                     style="background: {color.rgb()}; border: 2px solid {colors[(i+shift) % colors.length].rgb()}"></div>
                <p on:click={()=>{copyHex(color.hex(), i)}}>#{color.hex()} {copied[i]} &nbsp;</p>
            </div>
        {/each}
    </div>
</main>

<style>
    main {
        text-align: center;
    }

    #palette {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;

        width: 100%;
        height: 25%;
    }

    .color-disp-holder {
        text-align: center;
        padding: 1px;
    }

    .color-disp {
        aspect-ratio: 1;
        width: 10vw;

        border-radius: 3px;
        border: 2px solid #96aaf5;
    }
</style>
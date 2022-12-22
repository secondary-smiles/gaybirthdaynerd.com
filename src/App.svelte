<script>
    import Apod from "./lib/apis/nasa/Apod.svelte";
    import Activity from "./lib/apis/boredapi/Activity.svelte";
</script>

<main>
    <div id="message">

        <h1>Aw shit</h1>
        <h2>this was supposed to be a christmas present but I guess I got carried away..</h2>
        <h3>happy birthday too? (this isn't your birthday present though)</h3>
        <h4>I guess, here's a few cool things (I'm making this in only one night, remember)</h4>
    </div>
    <div id="api-fun">
        <div id="nasa-image-of-the-day">
            <Apod></Apod>
        </div>
        <div id="random-activity">
            <Activity></Activity>
        </div>
    </div>
    <div id="footer-stuff">
        <h5>LOVE U SIMON</h5>
    </div>
</main>
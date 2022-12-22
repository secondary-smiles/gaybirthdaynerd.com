<script>
    import Apod from "./lib/apis/nasa/Apod.svelte";
    import Activity from "./lib/apis/boredapi/Activity.svelte";
    import Trivia from "./lib/apis/trivia/Trivia.svelte";
    import RandomFact from "./lib/apis/facts/RandomFact.svelte";

    const isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    let show = false;
</script>

{#if !isMobile.any() && !show}
    <div id="mobile-error">
        <h3 id="error">Hey just so you know this site works best on mobile devices, on desktop things might get
            funky</h3>
        <h4 id="close-message" on:click={()=>{show = true}}>x</h4>
    </div>
{/if}
<main>
    <div id="message">
        <h1>Aw shit</h1>
        <h2>this was supposed to be a christmas present but I guess I got carried away..</h2>
        <h3>happy birthday too? I guess??? (this isn't your birthday present though)</h3>
        <h4>Here's a few cool things anyways tho (I'm making this in only one night, remember)</h4>
    </div>
    <div id="api-fun">
        <div id="nasa-image-of-the-day">
            <Apod></Apod>
        </div>
        <div id="random-activity">
            <Activity></Activity>
        </div>
        <div id="trivia-question">
            <Trivia></Trivia>
        </div>
        <div id="random-fact">
            <RandomFact></RandomFact>
        </div>
    </div>
    <div id="footer-stuff">
        <h5>LOVE U SIMON</h5>
    </div>
</main>

<style>
    /*noinspection CssUnknownTarget*/
    @import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap');
    /*noinspection CssUnknownTarget*/
    @import url('https://fonts.googleapis.com/css2?family=League+Spartan&display=swap');

    main {
        padding: 8px;
        background: #0c0a02;
    }

    #mobile-error {
        top: 0;
        padding: 20px;
        margin: 0;

        display: flex;
        justify-content: space-between;

        background: #f8ccdc;
        color: #e6528b;
    }

    #close-message {
        text-decoration: underline;
    }

    #close-message:hover {
        text-decoration: none;
    }

    #message {
        font-family: 'Black Han Sans', sans-serif;
        color: #fecc00;
    }

    #footer-stuff {
        font-family: 'League Spartan', sans-serif;
        color: #9d9292;
    }
</style>
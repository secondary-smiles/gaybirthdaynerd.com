<script>
    import Apod from "./lib/apis/nasa/Apod.svelte";
    import Activity from "./lib/apis/boredapi/Activity.svelte";
    import Trivia from "./lib/apis/trivia/Trivia.svelte";
    import RandomFact from "./lib/apis/facts/RandomFact.svelte";
    import Riddle from "./lib/apis/riddle/Riddle.svelte";
    import ImgToTheme from "./lib/elem/ImgToTheme.svelte";

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
        <h4>Here's a few cool things anyways (I'm making this in only one night, remember)</h4>
    </div>
    <div id="column-wrapper">

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
            <div id="riddle-api">
                <Riddle></Riddle>
            </div>
        </div>
        <div id="other">
            <div id="makeatheme">
                <ImgToTheme></ImgToTheme>
            </div>
        </div>
    </div>
    <div id="footer-stuff">
        <h5>LOVE U SIMON</h5>
        <img src="https://visitor-badge.glitch.me/badge?page_id=gaybirthdaynerd/visitors&left_color=teal&right_color=yellow" alt="visitor badge"/>
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
        padding-left: 5px;
        padding-right: 5px;
        margin: 0;

        display: flex;
        justify-content: space-between;
        align-items: baseline;

        background: #441022;
        color: #a3456b;
    }

    #close-message {
        text-decoration: underline;
        padding: 10px;
        border: 3px solid #cc97a8;
        border-radius: 4px;

    }

    #close-message:hover {
        text-decoration: none;
    }

    #message {
        font-family: 'Black Han Sans', sans-serif;
        color: #fecc00;
    }

    #column-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #api-fun {
        display: flex;

        flex-direction: column;
        align-items: stretch;
    }

    #footer-stuff {
        font-family: 'League Spartan', sans-serif;
        color: #9d9292;
    }
</style>
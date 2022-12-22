<script>
    class Fact {
        constructor(fact, count) {
            this.fact = fact;
            this.count = count;
            this.source = ""
        }
    }

    let fact = new Fact("Loading Fact..", "0")

    async function getFact() {
        const response = await fetch("https://test.cors.workers.dev/?https://www.thefact.space/random");
        // const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.thefact.space/random')}`)
        const data = await response.json();

        fact.fact = data.text;
        fact.count = data.index
        fact.source = data.source;
        console.log(data)
    }

    getFact();
</script>

<main>
    <div id="title">
        <h2>I Bet You'll Love this Random Fact</h2>
    </div>
    <div id="content">
        <p id="count">#{fact.count}</p>
        <h3 id="fact">{fact.fact}</h3>
        {#if fact.source}
            <a id="source" href={fact.source}>source</a>
        {/if}
    </div>
</main>

<style>
    /*noinspection CssUnknownTarget*/
    @import url('https://fonts.googleapis.com/css2?family=Allerta&display=swap');

    * {
        font-family: 'Allerta', sans-serif;
        color: #ce6058;
    }

    main {
        background: #78292a;
        padding: 20px;
        margin: 20px 0;
        border-radius: 10px;

        max-width: 600px;
    }

    #activity {
        color: #ed227c;
    }

    #count {
        padding: 0;
        margin: 0;
    }

    #source #count {
        color: #f7a668;
    }

    #fact {
        margin-top: 0;
        margin-bottom: 0;
        color: #fdf9ee;
    }
</style>
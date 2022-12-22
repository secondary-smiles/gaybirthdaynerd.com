<script>
    class Riddle {
        constructor(question, answer, category) {
            this.riddle = question;
            this.answer = answer;
            this.shown = false;
        }
    }

    let riddle = new Riddle("Loading riddle..", "Loading answer..")

    async function getRiddle() {
        const response = await fetch("https://riddles-api.vercel.app/random");
        const data = await response.json();

        riddle.riddle = data.riddle;
        riddle.answer = data.answer;
    }

    getRiddle();
</script>

<main>
    <div id="title">
        <h2>Trivia and Riddles are Two Different things</h2>
    </div>
    <div id="content">
        <div id="question-holder">
            <h3 id="question">{riddle.riddle}</h3>
        </div>
        {#if riddle.shown}
            <p id="answer">Answer: "{riddle.answer}"</p>
        {:else }
            <div id="reveal-button">
                <button on:click={()=>{riddle.shown = true}}>Reveal Answer..</button>
            </div>
        {/if}
    </div>
</main>

<style>
    /*noinspection CssUnknownTarget*/
    @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

    * {
        font-family: 'Anton', sans-serif;
        color: #ced9d9;
    }

    main {
        background: #012c57;
        padding: 20px;
        margin: 20px 0;
        border-radius: 10px;

        max-width: 600px;
    }

    button {
        width: 50%;
        height: 30px;

        color: #e5c460;
        background: #05a7dc;
        border-radius: 10px;

        border: 1px solid #ced9d9;
    }

    #reveal-button {
        width: 100%;
        height: 100%;
    }

    #question {
        color: #ced9d9;
    }

    #answer {
        color: #e5c460;
    }
</style>
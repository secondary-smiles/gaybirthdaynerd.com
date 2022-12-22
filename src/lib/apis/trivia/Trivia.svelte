<script>
    class Question {
        constructor(question, answer, category) {
            this.question = question;
            this.answer = answer;
            this.category = category
            this.shown = false;
        }
    }

    let question = new Question("Loading question..", "Loading answer..", "loading category..")

    async function getTrivia() {
        const response = await fetch("https://jservice.io/api/random");
        const data = await response.json();

        question.question = data[0].question;
        question.answer = data[0].answer.replace(/<[^>]*>?/gm, '');
        question.category = data[0].category.title;
    }

    getTrivia();
</script>

<main>
    <div id="title">
        <h2>How About a Random Trivia Question?</h2>
    </div>
    <div id="content">
        <div id="question-holder">
            <h3 id="question">{question.question}</h3>
            <p id="category">Category: {question.category}</p>
        </div>
        {#if question.shown}
            <p id="answer">Answer: "{question.answer}"</p>
        {:else }
            <div id="reveal-button">
                <button on:click={()=>{question.shown = true}}>Reveal Answer..</button>
            </div>
        {/if}
    </div>
</main>

<style>
    /*noinspection CssUnknownTarget*/
    @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');

    * {
        font-family: 'Fredoka One', cursive;
        color: #f9f8f7;
    }

    main {
        background: #14373d;
        padding: 20px;
        margin: 20px 0;
        border-radius: 10px;

        max-width: 600px;
    }

    button {
        width: 50%;
        height: 30px;

        color: #faa189;
        background: #7f7780;
        border-radius: 10px;

        border: 1px solid #faa189;
    }

    #reveal-button {
        width: 100%;
        height: 100%;
    }

    #question {
        color: #7f7780;
    }

    #answer {
        color: #faa189;
    }

    #category {
        color: #7f7780;
    }
</style>
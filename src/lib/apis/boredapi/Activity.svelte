<script>
    class Activity {
        constructor(name, link) {
            this.name = name;
            this.link = link;
        }
    }

    let activity = new Activity("Placeholder Activity..", "")

    async function getActivity() {
        const response = await fetch("https://www.boredapi.com/api/activity/");
        const data = await response.json();

        activity.name = data.activity;
        activity.link = data.link;
    }

    getActivity();
</script>

<main>
    <div id="title">
        <h2>Want a Random Activity?</h2>
        <h3>It actually doesn't matter because I'm going to put one here anyways</h3>
    </div>
    <div id="content">
        <h3>You should..</h3>
        <h3 id="activity">{activity.name}</h3>
        {#if activity.link}
            <a href={activity.link}>learn more..</a>
        {/if}
    </div>
</main>

<style>
    /*noinspection CssUnknownTarget*/
    @import url('https://fonts.googleapis.com/css2?family=Unbounded&display=swap');

    *{
        font-family: 'Unbounded', cursive;
        color: #eeeeee;
    }

    main {
        background: #252122;
        padding: 20px;
        margin: 20px 0;
        border-radius: 10px;

        max-width: 600px;
    }

    #activity {
        color: #ed227c;
    }
</style>
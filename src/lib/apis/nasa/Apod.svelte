<script>
    const APOD_KEY = "k2uZJunhObVqwkESabbPhCKTk5FZ5zrcfqX3lV6V";

    class NasaImage {
        constructor(title, description, imageUrl) {
            this.title = title;
            this.description = description;
            this.imageUrl = imageUrl;
        }
    }

    let nasaImage = new NasaImage("Placeholder Title", "Loading image, please wait..", "https://via.placeholder.com/450x250");

    async function getNasaData() {
        const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=" + APOD_KEY);
        const data = await response.json();
        nasaImage.title = data.title;
        nasaImage.description = data.explanation;
        nasaImage.imageUrl = data.hdurl;
    }

    getNasaData();
</script>

<main>
    <div id="title">
        <h2>NASA Image of the Day</h2>
    </div>
    <div id="image">
        <img src={nasaImage.imageUrl} id="nasa-apod" alt="NASA Picture of the Day">
    </div>
    <div id="data">
        <h2>{nasaImage.title}</h2>
        <p>{nasaImage.description}</p>
    </div>
</main>

<style>
    /*noinspection CssUnknownTarget*/
    @import url("https://fonts.googleapis.com/css2?family=Chivo+Mono&display=swap");

    *{
        font-family: 'Chivo Mono', monospace;
        color: #fff4d9;
    }

    main {
        background: #1a1a26;
        padding: 20px;
        border-radius: 10px;
    }

    img {
        width: 100%;
        border-radius: 10px;
    }

    #title {
        text-align: center;
    }

    #image {
        text-align: center;
    }

    #data {
        color: #9294f7;
    }
</style>
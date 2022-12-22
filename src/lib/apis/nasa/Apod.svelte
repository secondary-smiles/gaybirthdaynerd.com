<script>
    const APOD_KEY = "k2uZJunhObVqwkESabbPhCKTk5FZ5zrcfqX3lV6V";

    class nasaImage {
        constructor(title, description, imageUrl) {
            this.title = title;
            this.description = description;
            this.imageUrl = imageUrl;
        }
    }

    async function getNasaData() {
        const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=" + APOD_KEY);
        const data = await response.json();
        console.log(data)
    }

    getNasaData();
</script>

<main>
    <img src="" id="nasa-apod" alt="NASA Picture of the Day">
</main>
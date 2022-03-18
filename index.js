const PORT = process.env.PORT || 8080;

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();

app.use(cors())

app.get('/image/:string', (req, res) => {
    const path = `https://unsplash.com/s/photos/${req.params.string}`;
    var imageList = [];

    axios.get(path).then((response) => {
        const $ = cheerio.load(response.data);
        console.log(path)
        var id = 0
        $(".YVj9w").each((i, el) => {
            var src = $(el).attr('src')
            if (src != null) {
                imageList.push({
                    "id": id,
                    "url": src
                })
                id++
            }
        })
    })

    setTimeout(() => res.json(imageList), 2000)


})

app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`))
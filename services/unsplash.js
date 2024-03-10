const axios = require('axios');
require("dotenv").config()

async function getImagesUnsplash(text) {
    const response = await axios.get(`https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_TOKEN}&query=${text}`)
    return response.data.results.map(r => r.urls.raw)
}

module.exports = { getImagesUnsplash }


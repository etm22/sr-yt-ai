const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs/promises");
require("dotenv").config();

(async () => {
    const remotion_data = JSON.parse(await fs.readFile("./remotion/public/remotion.json", "utf-8"))

    let data = new FormData();
    data.append("file", require('fs').createReadStream("outputs/shorts_boosted.mp4"));
    data.append("video_title", `speedrunning yt shorts #${Date.now().toString().slice(-5)} #shorts`);
    data.append("video_description", `speedrunning youtube shorts (Asking Artificial intelligence to create images of ${remotion_data.prompt})`);

    const response_3 = await axios.post(process.env.YT_UPLOADER_API, data);
})();

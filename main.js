const { convertTTS } = require("./services/tts");
const fs = require("fs/promises");


(async () => {
    const { audio } = await convertTTS("hello world", "en_us_006")
    await fs.writeFile(`audio.wav`, audio);
})()
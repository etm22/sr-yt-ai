const { convertTTS } = require("./services/tts");
const fs = require("fs/promises");


(async () => {
    const prompts_json = JSON.parse(await fs.readFile("./data/prompts.json", "utf-8"))
    const selected_prompt = prompts_json.find(prompt => !prompt.hasOwnProperty("used"))

    // create tts + alignment
    const text = `I asked artificial intelligence to create an image of ${selected_prompt.user_prompt}`
    const { audio, payload } = await convertTTS(text, "en_us_006")
    await fs.writeFile(`output/audio.wav`, audio);
    await fs.writeFile("output/alignment.json", JSON.stringify(payload))


    // TODO: set used

})()
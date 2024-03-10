const { generateJoke } = require("./services/gemini");
const { convertTTS } = require("./services/tts");
const fs = require("fs/promises");


(async () => {
    const prompts_json = JSON.parse(await fs.readFile("./data/prompts.json", "utf-8"))
    const selected_prompt = prompts_json.find(prompt => !prompt.hasOwnProperty("used"))

    // create tts + alignment
    const text = `I asked artificial intelligence to create images of ${selected_prompt.user_prompt} here are the results`
    const { audio, payload } = await convertTTS(text, "en_us_006")
    await fs.writeFile(`remotion/public/audio.wav`, audio);

    // joke tts + alignment
    const joke = await generateJoke(selected_prompt.user_prompt)
    const joke_tts_data = await convertTTS(joke, "en_us_006")
    await fs.writeFile(`remotion/public/joke.wav`, joke_tts_data.audio);


    const remotion_data = {
        prompt: selected_prompt.user_prompt,
        images: selected_prompt.responses.map(r => `https://ideogram.ai/api/images/direct/${r.response_id}.jpg`),
        bg_video: `https://huggingface.co/upmr/temp/resolve/main/m${getRandomInt(
            1,
            7
        )}.mp4`,
        joke: await generateJoke(selected_prompt.user_prompt),
        alignment_prompt: payload,
        alignment_joke: joke_tts_data.payload,

    }
    await fs.writeFile("remotion/public/remotion.json", JSON.stringify(remotion_data))


    // TODO: set used

})()

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const fs = require("fs/promises");
const { generateJoke } = require("./services/gemini");
const { extractNouns } = require("./services/noun");
const { convertTTS } = require("./services/tts");
const { getImagesUnsplash } = require("./services/unsplash");
require("dotenv").config();

(async () => {
    // Get prompt
    const prompts_json = JSON.parse(await fs.readFile("./data/prompts.json", "utf-8"))
    const selected_prompt = prompts_json[0] // used prompts are deleted
    console.log("Prompt: ", selected_prompt.user_prompt)

    // create tts + alignment
    const text = `I asked artificial intelligence to create images of ${selected_prompt.user_prompt} here are the results`
    const { audio, payload } = await convertTTS(text, "en_us_006")
    await fs.writeFile(`remotion/public/audio.wav`, audio);

    // joke tts + alignment
    const joke = await generateJoke(selected_prompt.user_prompt)
    const joke_tts_data = await convertTTS(joke, "en_us_006")
    await fs.writeFile(`remotion/public/joke.wav`, joke_tts_data.audio);

    // unsplash images
    const nouns = extractNouns(text)
    const unsplash_images = {}

    for (let idx = 0; idx < nouns.length; idx++) {
        let noun = nouns[idx];
        let noun_images
        if (noun == "intelligence") {
            new_noun = "robot"
            noun_images = await getImagesUnsplash(new_noun)
        } else {
            noun_images = await getImagesUnsplash(noun)

        }
        unsplash_images[noun] = noun_images[getRandomInt(0, noun_images.length - 1)]
    }

    const remotion_data = {
        prompt: selected_prompt.user_prompt,
        images: selected_prompt.responses.map(r => `${process.env.IDEO_URL}/${r.response_id}`),
        bg_video: `https://huggingface.co/${process.env.HF_USERNAME}/videos/resolve/main/Minecraft/Clip%20${getRandomInt(
            1,
            10
        )}.mp4`,
        joke: await generateJoke(selected_prompt.user_prompt),
        unsplash_images,
        alignment_prompt: payload,
        alignment_joke: joke_tts_data.payload,

    }
    await fs.writeFile("remotion/public/remotion.json", JSON.stringify(remotion_data))

    // Remove used prompt from json
    let updated_prompts = prompts_json.filter(p => p.request_id != selected_prompt.request_id);
    await fs.writeFile("./data/prompts.json", JSON.stringify(updated_prompts))
})()

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

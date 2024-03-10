// node --version # Should be >= 18
// npm install @google/generative-ai

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");
require("dotenv").config()

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.GEMINI_API_KEY;

async function generateJoke(prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
            {
                role: "user",
                parts: [{ text: "I will provide you with a text prompt. Your job is to create a funny one-liner sentence to make people subscribe to my youtube channel. Here is some examples: Subscribe or you'll get sucked into the plastic wormhole. Subscribe or the ginger monster will eat you. Reply directly with the sentence, starting with Subscribe or you'll.." }],
            },
            {
                role: "model",
                parts: [{ text: "Subscribe or you'll miss out on all the juicy tea and secret dance moves." }],
            },
            {
                role: "user",
                parts: [{ text: "A penguin scientist inventing fish-flavored ice cream" }],
            },
            {
                role: "model",
                parts: [{ text: "Subscribe or you'll miss the scoop on the latest fish-flavored ice cream sensation!" }],
            },
            {
                role: "user",
                parts: [{ text: "A dog flying inside the nasa launchpad during halloween" }],
            },
            {
                role: "model",
                parts: [{ text: "Subscribe or you'll miss the most paw-some Halloween adventure from inside NASA!" }],
            },
            {
                role: "user",
                parts: [{ text: "a ant robot eating pineapple salad" }],
            },
            {
                role: "model",
                parts: [{ text: "Subscribe or you'll miss out on the most ANT-icipated pineapple salad eating competition!" }],
            },
            {
                role: "user",
                parts: [{ text: "a rat engineer cooking slim spaghetti" }],
            },
            {
                role: "model",
                parts: [{ text: "Subscribe or you'll miss the most whisker-licking good slim spaghetti cooking demo!" }],
            },
        ],
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    return response.text();
}

module.exports = { generateJoke }
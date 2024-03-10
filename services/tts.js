const WebSocket = require("ws");

async function convertTTS(text, speaker) {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket(
            "wss://sami-maliva.byteintlapi.com/internal/api/v1/ws"
        );
        const data = {};

        ws.on("open", () => {
            ws.send(
                JSON.stringify({
                    appkey: "ddjeqjLGMn",
                    event: "StartTask",
                    namespace: "TTS",
                    payload: `{"audio_config":{"bit_rate":64000,"enable_timestamp":true,"format":"ogg_opus","pitch_rate":0,"sample_rate":24000},"speaker":"${speaker}","texts":["${text}"]}`,
                    token:
                        "WEtPclZJR0V6SHVUZXAyT09yhoz2s7BkBQVoosFp/Y7M7kD2WGxHTWPNx2VyD3XykHyBAEsefstrFWiyqz8XCZI4Jdj3d3zF64VVl5hoHB/b21vBPVB1sHOEEJ030SOit5EZQc5+nCrWlz6oW1JCEjyItAzuWC3Jj6pvSSEuJtUHbQjHaAJYUTq3fWg93bkj4R9TVyR8FextiJsx5Iv9VmK3eGFyvlMdyUiULKCfJV7k6lm2oX+mGld90xSUHLEhjeMmTbqnCLFSRkP2taVacMCvQ29GM1BqaY2h3hIVyNaOWWG1oZbBYmqTLCFKIgLKlAf3yr7IXalg+J7scCrbaJVVTY0GrgrBhWEnUDz+A5GtBTz2BvTi4JAfe7ZUryf+rhTI6OAVPuu0ge0imweVUPp4FOze291IqdRIVnDVsgKMtmqVT4UraLwgQlvooiO7wKvzYhcWdkfolpCwjDvqCEocy5UYtxFuvfdf7iACigeozAJoerCtsY6z677EvYPF/v6rhvRB5sEOvMv+dBcrD+Q+1m8DBcVx+bmzAWt/BHMovFoQuLx1EPbuOmg2Q2tzU58Y160etJqnUMgWM7QhcI4Q1rf9CFGPundxxWKdIJDpIS09cTiOQRpuZO68T0aUWjv41KpXvbFFc2uNkp7Xm0azAW9Dv/YPQTn4Gk9Yi8ZMVvBUzMsvX+6Jwm6q2QAwMNxbbER4LPwJ2MMm2ByKzw==",
                    version: "sdk_v1",
                })
            );
        });

        ws.on("message", async (message) => {
            try {
                const response = JSON.parse(message.toString("utf-8"));
                if (response.event == "TTSResponse") {
                    data.payload = JSON.parse(response.payload);
                    data.message_id = response.message_id;
                }
            } catch (error) {
                data.audio = message;
                resolve(data);
            }
        });

        ws.on("error", (error) => {
            console.error("WebSocket error:", error);
            reject(error);
        });
    });
}

module.exports = { convertTTS }
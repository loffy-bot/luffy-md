const fs = require('fs');
const path = require('path');
const axios = require('axios');

const token = "8b92f92183a0db747b8f4e43493e2bdd94d3636f4ac5f66523104ecb8e77417fb6daf2b03b0acc7e817f0c3551d69af68ed52b993c9ce56e673224592e9c1436";

async function MakeSession(sessionId, folderPath) {
    try {
        const pasteId = sessionId.split("~")[1];
        const rawUrl = `https://hastebin.com/raw/${pasteId}`;

        const config = {
            method: 'get',
            url: rawUrl,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await axios(config);

        if (!response.data || !response.data.content) {
            throw new Error("Empty or invalid response from Hastebin.");
        }

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        const outputPath = path.join(folderPath, "creds.json");

        const dataToWrite = typeof response.data.content === "string"
            ? response.data.content
            : JSON.stringify(response.data.content);

        fs.writeFileSync(outputPath, dataToWrite);
        console.log("Session file saved successfully!");

    } catch (error) {
        console.error("An error occurred while saving session:", error.message);
    }
}

module.exports = { MakeSession };

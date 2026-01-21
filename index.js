import { ComprehendClient, DetectSentimentCommand, DetectKeyPhrasesCommand, DetectEntitiesCommand } from "@aws-sdk/client-comprehend";

const client = new ComprehendClient({});

export const handler = async (event) => {
    const body = JSON.parse(event.body || "{}");
    const text = body.text;

    if (!text) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "No text provided" })
        };
    }

    const sentiment = await client.send(new DetectSentimentCommand({
        Text: text,
        LanguageCode: "en"
    }));

    const keyPhrases = await client.send(new DetectKeyPhrasesCommand({
        Text: text,
        LanguageCode: "en"
    }));

    const entities = await client.send(new DetectEntitiesCommand({
        Text: text,
        LanguageCode: "en"
    }));

    return {
        statusCode: 200,
        body: JSON.stringify({
            sentiment,
            keyPhrases,
            entities
        })
    };
};
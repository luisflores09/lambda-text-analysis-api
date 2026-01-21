### lambda-text-analysis-api

An AWS Lambda function that performs basic text analysis using **Amazon Comprehend**.

Given an input string, it returns:

- **Sentiment** (e.g., POSITIVE/NEGATIVE/NEUTRAL/MIXED, plus scores)
- **Key phrases** detected in the text
- **Entities** detected in the text (people, locations, organizations, etc.)

Implementation lives in [index.js](index.js).

#### How it works

- Entry point: `handler(event)`
- Expected request body (API Gateway / Lambda proxy integration):

```json
{ "text": "I love this product." }
```

- If `text` is missing/empty, it returns:

- HTTP `400`
- Body: `{ "error": "No text provided" }`

- On success, it returns HTTP `200` with:

```json
{
  "sentiment": { "Sentiment": "POSITIVE", "SentimentScore": { "Positive": 0.99 } },
  "keyPhrases": { "KeyPhrases": [/* ... */] },
  "entities": { "Entities": [/* ... */] }
}
```

Notes:
- The Lambda currently hard-codes `LanguageCode: "en"`.
- The response includes the raw AWS SDK responses for each Comprehend call.

#### AWS permissions

The Lambda’s execution role must allow Comprehend actions:

- `comprehend:DetectSentiment`
- `comprehend:DetectKeyPhrases`
- `comprehend:DetectEntities`

#### Dependencies

- `@aws-sdk/client-comprehend` (v3 AWS SDK)

See [package.json](package.json).

#### Example request (API Gateway)

If you expose the Lambda through an HTTP endpoint (e.g., API Gateway), you can call it like:

```bash
curl -sS -X POST "$API_URL" \
  -H 'Content-Type: application/json' \
  -d '{"text":"Amazon Comprehend can extract entities and sentiment."}'
```

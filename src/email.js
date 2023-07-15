import path from 'path'
import fs from 'fs/promises'
const {google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');
const MailComposer = require('nodemailer/lib/mail-composer');

/*
see https://developers.google.com/gmail/api/quickstart/nodejs
*/
const SCOPES = [
    "https://www.googleapis.com/auth/gmail.addons.current.action.compose",
    "https://www.googleapis.com/auth/gmail.compose"
]
const TOKEN_PATH = path.resolve(__dirname, '../token.json')
const CREDENTIALS_PATH = path.resolve(__dirname, '../credentials.json')

/**
* Reads previously authorized credentials from the save file.
*
* @return {Promise<OAuth2Client|null>}
*/
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/**
* Serializes credentials to a file compatible with GoogleAUth.fromJSON.
*
* @param {OAuth2Client} client
* @return {Promise<void>}
*/
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });

    await fs.writeFile(TOKEN_PATH, payload);
}

/**
* Load or request or authorization to call APIs.
*
*/
async function authorize() {
    let client = await loadSavedCredentialsIfExist();

    if (client) {
        return client;
    }

    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });

    if (client.credentials) {
        await saveCredentials(client);
    }

    return client;
}

async function sendMessage(message) {
    const authClient = await authorize()
    const gmail = google.gmail({version: 'v1', auth: authClient})

    const _message = await new MailComposer(message).compile().build()
    // see https://www.labnol.org/google-api-service-account-220405
    const _messageRaw = Buffer.from(_message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

    const res = await gmail.users.messages.send({
        userId: 'me',
        resource: {
          raw: _messageRaw,
        },
    })

    return res.data.id
}

export default sendMessage
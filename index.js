//
// Copyright (C) 2023 Salman Wahib (sxlmnwb)
//

require("dotenv").config()

const {Client, GatewayIntentBits, Message} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// setting up OpenAI

const {Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({
    organization:process.env.OPENAI_ORG,
    apiKey:process.env.OPENAI_KEY
});

const openai = new OpenAIApi(configuration)

client.on('messageCreate', async function(message){
    try {

        if(message.author.bot) return;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Hey berikan saya respon tentang ini : ${message.content}`,
            temperature: 0.5,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 1.0,
          });

          message.reply(`${response.data.choices[0].text}`)

    } catch (error) {

        console.log(error)

    }
});

client.login(process.env.DISCORD_KEY);

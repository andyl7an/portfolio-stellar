const fs = require('fs')
const { resolve } = require('path')

// Create the dotenv secrets for bundling
const secrets = ['DIALOGFLOW_PRIVATE_KEY', 'DIALOGFLOW_PRIVATE_EMAIL']
const dotenvContent = secrets.map(s => `${s}=${process.env[s]}`).join('\n')
const dotenvLocation = resolve(__dirname, '../', `.env.${process.env.NODE_ENV}`)
console.log(`Writing ${dotenvLocation}`)
fs.writeFileSync(dotenvLocation, dotenvContent)

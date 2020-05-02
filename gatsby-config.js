// Initialize secrets
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

console.log(`Setting configurations from ${`.env.${process.env.NODE_ENV}`}`)

if (
  process.env.DIALOGFLOW_PRIVATE_EMAIL === undefined ||
  process.env.DIALOGFLOW_PRIVATE_KEY === undefined
) {
  throw new Error('DialogFlow keys not configured')
}

const configs = require('./readthru-config')

module.exports = {
  siteMetadata: {
    title: 'Andy Tan - Portfolio',
    author: 'Andy Tan',
    description: 'Portfolio site',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/images/website-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-offline',
    {
      // Define secrets from environment variables here
      resolve: `gatsby-plugin-env-variables`,
      options: {
        whitelist: ['DIALOGFLOW_PRIVATE_KEY', 'DIALOGFLOW_PRIVATE_EMAIL'],
      },
    },
    // Read Thru
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/markdown-pages`,
        name: `markdown-pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    { resolve: `gatsby-transformer-remark` },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: configs.app_name,
        short_name: configs.app_name,
        start_url: configs.path_prefix,
        background_color: configs.body_background_color,
        theme_color: configs.app_title_color,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: configs.google_analytics_ID,
      },
    },
    `gatsby-plugin-styled-components`,
  ],
}

let twitterHandle = `@_jonesian`
let twitterUrl = `https://twitter.com/_jonesian/`
let githubHandle = `theianjones`
let githubUrl = `https://github.com/theianjones/`
let eggheadUrl = `https://egghead.io/instructors/ian-jones?af=ay44db`
let { funk } = require('@theme-ui/presets')

module.exports = {
  siteMetadata: {
    // Used for the site title and SEO
    title: `Ian's Blog`,
    // Used to provide alt text for your avatar
    author: `Ian Jones`,
    // Used for SEO
    description: `I work remotely building eggheadio.`,
    // Used for social links in the root footer
    canonicalUrl: `https://ianjones.us`,
    image: `./content/assets/logo.png`,
    eggheadUrl,
    twitterHandle,
    twitterUrl,
    githubHandle,
    githubUrl,
    social: [
      {
        name: 'Github',
        url: githubUrl,
      },
      {
        name: 'Twitter',
        url: twitterUrl,
      },
      {
        name: 'egghead.io',
        url: eggheadUrl,
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ian's Blog`,
        short_name: `Ian's Blog`,
        start_url: `/`,
        background_color: funk.background_color,
        theme_color: funk.primary,
        display: `standalone`,
        icon: `content/assets/logo.png`,
      },
    },
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `@aengusm/gatsby-theme-brain`,
      options: {
        rootNote: 'notebook',
        rootPath: '/',
        notesDirectory: 'content/',
        additionalNoteTypes: {
          blogIndex: './templates/blog.js',
        },
      },
    },
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        defaultCrumb: {
          // location: required and must include the pathname property
          location: {
            pathname: '/',
          },
          // crumbLabel: required label for the default crumb
          crumbLabel: 'Home',
          // all other properties optional
          crumbSeparator: ' / ',
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Open Sans`,
          `Avenir Next`,
          `Source Serif Pro\:400,700` // you can also specify font weights and styles
        ],
        display: 'swap'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `content/assets`,
        name: `content/assets`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-netlify`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
  ],
}

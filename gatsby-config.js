let twitterHandle = `@_jonesian`
let twitterUrl = `https://twitter.com/_jonesian/`
let githubHandle = `theianjones`
let githubUrl = `https://github.com/theianjones/`
let eggheadUrl = `https://egghead.io/instructors/ian-jones?af=ay44db`
let { deep } = require('@theme-ui/presets')

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
        background_color: deep.background_color,
        theme_color: deep.primary,
        display: `standalone`,
        icon: `content/assets/logo.png`,
      },
    },
    {
      resolve: `gatsby-theme-blog-core`,
      options: {
        basePath: '/blog',
        contentPath: 'content/blog',
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
        mdxOtherwiseConfigured: true,
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
            pathname: '/notes',
          },
          // crumbLabel: required label for the default crumb
          crumbLabel: 'Notes',
          // all other properties optional
          crumbSeparator: ' / ',
        },
      },
    },
  ],
}

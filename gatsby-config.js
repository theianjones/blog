let twitterHandle = `@_jonesian`
let twitterUrl = `https://twitter.com/_jonesian/`
let githubHandle = `theianjones`
let githubUrl = `https://github.com/theianjones/`
let eggheadUrl = `https://egghead.io/instructors/ian-jones?af=ay44db`
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
        rootPath: 'notes',
        //notesDirectory: 'content/notes/',
        mdxOtherwiseConfigured: true,
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

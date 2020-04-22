module.exports = {
  siteMetadata: {
    // Used for the site title and SEO
    title: `Ian's Blog`,
    // Used to provide alt text for your avatar
    author: `Ian Jones`,
    // Used for SEO
    description: `I work remotely building eggheadio.`,
    // Used for social links in the root footer
    eggheadUrl: "https://egghead.io/instructors/ian-jones?af=ay44db",
    canonicalUrl: `https://ianjones.us`,
    image: `./content/assets/logo.png`,
    twitterHandle: "@_jonesian",
    twitterUrl: `https://twitter.com/_jonesian/`,
    githubHandle: `theianjones`,
    githubUrl: `https://github.com/theianjones/`,
  },
  plugins: [
    {
      resolve: `gatsby-theme-blog-core`,
      options: {
        basePath: "/blog",
        contentPath: "content/blog",
      },
    },
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-react-helmet`,
  ],
}

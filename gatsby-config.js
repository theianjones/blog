module.exports = {
  siteMetadata: {
    title: `Ian Jones' Blog`,
    author: `Ian Jones`,
    description: `I write on things that interest me, mostly web development.`,
    siteUrl: `https://ianjones.us/`,
    social: {
      twitter: `_jonesian`,
    },
  },
  __experimentalThemes: [
    {
      resolve: 'gatsby-theme-digital-garden',
      options: {
        notesPath: '/notes',
      },
    },
    {
      resolve: 'gatsby-theme-digital-garden-blog',
      options: {
        postsPath: '/writing',
      },
    },
  ],
}

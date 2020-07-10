/** @jsx jsx */
import { jsx, Styled, Flex } from 'theme-ui'
import Layout from '../components/note-layout'
import { graphql } from 'gatsby'
import PostList from '../components/post-list'

const data = {
  data: {
    allBrainNote: {
      edges: [
        {
          node: {
            slug: 'zaiste-programming-doom-emacs-tutorial',
            title: 'Doom Emacs Zaiste Programming Tutorial',
          },
        },
        {
          node: {
            slug: 'variable-spaced-fonts',
            title: 'Variable Spaced Fonts in Doom Emacs',
          },
        },
        {
          node: {
            slug: 'io',
            title: 'Io: the "simplest" programming language on the block',
          },
        },
        {
          node: {
            slug: 'progressive-summarization-in-org-mode',
            title: 'Progressive Summarization in Org Mode',
          },
        },
        {
          node: {
            slug: 'org-pomodoro',
            title: 'Org Pomodoro',
          },
        },
        {
          node: {
            slug: 'org-roam-bibtex',
            title: 'Org Roam Bibtex',
          },
        },
        {
          node: {
            slug: '2020-05-28-track-your-dotfiles',
            title: 'Track Your Dotfiles',
          },
        },
        {
          node: {
            slug: '2020-05-19-pair-with-maggie-live-event',
            title: '📆 Livestream Event - Build Your Own Public Digital Garden',
          },
        },
        {
          node: {
            slug: 'own-your-second-brain',
            title:
              '🧠 Own Your Second Brain: Set Up org-roam on Your Own Machine',
          },
        },
        {
          node: {
            slug: '2020-03-18-custom-roam-themes',
            title: 'Custom Roam Research Themes',
          },
        },
        {
          node: {
            slug: '2020-03-18-redwoodjs-jamstack',
            title: 'RedwoodJS: a full-stack framework for JAMstack',
          },
        },
        {
          node: {
            slug: '2020-03-17-reasonml-applications-for-the-react-developer',
            title:
              '📝 ReasonML Applications for the React Developer egghead Collection Notes',
          },
        },
        {
          node: {
            slug:
              '2020-03-11-making-an-http-server-in-reasonml-egghead-collection-notes',
            title:
              '📝 Making an HTTP server in ReasonML egghead Collection Notes',
          },
        },
        {
          node: {
            slug: '2020-02-24-urql-with-react',
            title: 'Introduction to Urql: A Robust GraphQL Client',
          },
        },
        {
          node: {
            slug: '2020-02-13-rails-csrf-detected-error',
            title: 'Rails Omniauth CSRF Detected error',
          },
        },
        {
          node: {
            slug: 'client-side-web-apis',
            title: 'Get Started with JavaScript in the Browser',
          },
        },
        {
          node: {
            slug: '2020-02-10-how-to-teach-a-beginner-topic',
            title: 'How do you Teach a Beginner Topic?',
          },
        },
        {
          node: {
            slug: '2020-01-27-yarn-2',
            title: 'Yarn 2 🧶',
          },
        },
        {
          node: {
            slug: '2019-12-19-roam-research',
            title: 'Roam Research to Explore Ideas',
          },
        },
        {
          node: {
            slug: '2019-12-19-how-we-use-notions',
            title: 'Use Notion to Organize your Brain',
          },
        },
        {
          node: {
            slug: '2019-12-04-advent-of-code',
            title: '🎄 Advent of Code Day 4 2019',
          },
        },
        {
          node: {
            slug: '2019-11-25-npm-eacces-error',
            title: 'Dont run npm with sudo',
          },
        },
        {
          node: {
            slug: 'fast-tests-with-factory-bot-build-stubbed',
            title: "Fast Ruby Test's with FactoryBot#build_stubbed",
          },
        },
        {
          node: {
            slug: 'add-options-to-a-gatsby-theme',
            title: 'Add Options To A Gatsby Theme',
          },
        },
        {
          node: {
            slug: 'the-complete-guide-to-faunadb-notes',
            title: '📝 The Complete Guide to FaunaDB',
          },
        },
        {
          node: {
            slug: 'stop-thinking-in-lifecycle-methods',
            title: 'Stop Thinking In Lifecycle Methods',
          },
        },
        {
          node: {
            slug: 'neo4j-graph-algorithms-oscon',
            title: '📝 Graph Algorithms',
          },
        },
        {
          node: {
            slug: 'getting-started-with-gatsby-themes',
            title: 'Getting Started with Gatsby Themes',
          },
        },
        {
          node: {
            slug: 'understanding-by-design-notes',
            title: 'Understanding By Design meets Neuroscience Notes 🧠',
          },
        },
        {
          node: {
            slug: 'information-architecture',
            title: '📝 Everyday Information Architecture',
          },
        },
        {
          node: {
            slug: 'set-up-react-on-rails-routes',
            title: 'Set Up React Router in Rails',
          },
        },
        {
          node: {
            slug: 'mobx-window-size-store',
            title: 'Mobx Window Size Store',
          },
        },
        {
          node: {
            slug: 'converting-rails-data-to-csv',
            title: 'Using Rails Console To Turn Data Into a CSV',
          },
        },
        {
          node: {
            slug: 'power-of-habit',
            title: '📝 The Power Of Habit',
          },
        },
        {
          node: {
            slug: 'traveling-europe',
            title: 'Traveling Throughout Europe',
          },
        },
        {
          node: {
            slug: 'getting-started-with-react-rails',
            title: 'Getting Started With react-rails',
          },
        },
        {
          node: {
            slug: 'sieve-of-eratosthenes',
            title: 'Sieve of Eratosthenes',
          },
        },
        {
          node: {
            slug: 'just-start-writing',
            title: 'Just Start Writing',
          },
        },
        {
          node: {
            slug: 'xcode-licence-issue-with-node',
            title: "XCode's License Issue with Node",
          },
        },
        {
          node: {
            slug: 'javascript-this-keyword',
            title: "Javascript's <em>this</em> keyword",
          },
        },
        {
          node: {
            slug: 'basics-of-functional-javascript-foreach',
            title: 'Basics of Functional Javascript: Array.forEach',
          },
        },
        {
          node: {
            slug: 'basics-of-functional-javascript-reduce',
            title: 'Basics of Functional Javascript: Array.reduce',
          },
        },
        {
          node: {
            slug: 'setting-up-jekyll-with-gh-pages',
            title: 'Setting Up Jekyll With Github Pages',
          },
        },
        {
          node: {
            slug: 'javascript-closures',
            title: 'Javascript Closures',
          },
        },
        {
          node: {
            slug: 'javascript-arrays',
            title: 'Javascript Arrays',
          },
        },
        {
          node: {
            slug: 'learning-javascript-the-right-way',
            title: 'Learning Javascript the Right Way',
          },
        },
      ],
    },
  },
}

function Articles() {
  return (
    <Layout>
      <Styled.h1>Articles</Styled.h1>
      <PostList posts={data.data.allBrainNote.edges} />
    </Layout>
  )
}

export default Articles

// export const pageQuery = graphql`
//   query ArticlesQuery {
//     allBrainNote(
//       sort: { fields: [childMdx___frontmatter___date, title], order: DESC }
//       filter: { childMdx: { frontmatter: { type: { eq: "post" } } } }
//     ) {
//       edges {
//         node {
//           slug
//           title
//         }
//       }
//     }
//   }
// `

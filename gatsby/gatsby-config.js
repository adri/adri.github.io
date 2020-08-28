require(`dotenv`).config({
  path: `.env`,
});

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

module.exports = {
  siteMetadata: {
    siteTitleAlt: `Adrian Philipp`,
    siteTitle: `Adrian Philipp`,
    siteTitleAlt: `Adrian Philipp`,
    siteHeadline: `Adrian Philipp`,
    siteUrl: `https://adrian-philipp.com`,
    siteDescription: `This blog and notes are about passions of Adrian`,
    siteLanguage: `en`,
    siteImage: `/banner.jpg`,
    author: `@adrian_philipp`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          `gatsby-remark-line-breaks`,
          `gatsby-remark-external-links`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              backgroundColor: "transparent",
              linkImagesToOriginal: true,
              maxWidth: 960,
              quality: 90,
              tracedSVG: true,
              withWebp: true,
            },
          },
        ],
      },
    },
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        mdx: false,
        showLineNumbers: false,
        blogPath: "/posts/",
        postsPath: "../content/posts/",
        formatString: "YYYY-MM-DD",
        navigation: [
          {
            title: `Home`,
            slug: `/`,
          },
          {
            title: `Posts`,
            slug: `/posts/`,
          },
          {
            title: `Notes`,
            slug: `/notes/`,
          },
        ],
        externalLinks: [
          {
            name: `Twitter`,
            url: `https://twitter.com/adrian_philipp`,
          },
          {
            name: `Github`,
            url: `https://github.com/adri`,
          },
        ],
      },
    },
    {
      resolve: "./plugins/gatsby-theme-brain",
      options: {
        notesDirectory: `../content/notes/`,
        rootPath: "/notes",
        rootNote: "notes",
        linkifyHashtags: true,
        hideDoubleBrackets: true,
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `codingnightmare`,
      },
    },
    `gatsby-plugin-force-trailing-slashes`,
    {
      resolve: "gatsby-plugin-flexsearch",
      options: {
        languages: ["en"],
        type: "MarkdownRemark", // Filter the node types you want to index
        // Fields to index.
        fields: [
          {
            name: "title",
            indexed: true, // If indexed === true, the field will be indexed.
            store: true, // In case you want to make the field available in the search results.
            resolver: "frontmatter.title",
            // Attributes for indexing logic. Check https://github.com/nextapps-de/flexsearch#presets for details.
            attributes: {
              encode: "advanced",
              tokenize: "forward",
              threshold: 1,
              depth: 3,
            },
          },
          {
            name: "description",
            indexed: true,
            store: false,
            resolver: "frontmatter.description",
            attributes: {
              encode: "advanced",
              tokenize: "forward",
              threshold: 0,
              depth: 3,
            },
          },
          {
            name: "slug",
            indexed: false,
            store: true,
            resolver: "fields.slug",
          },
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Adrian Philipp`,
        short_name: `adrian-philipp`,
        description: ` I’m a software and site reliability engineer. My drive is to make technology easy to use and simple to develop.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
};

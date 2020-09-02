const escapeStringRegexp = require("escape-string-regexp");

const pagePath = `content`;
const indexName = process.env.GATSBY_ALGOLIA_INDEX_NAME;

const pageQuery = `{
  pages: allMdxPost {
    nodes {
      id
      slug
      title
      excerpt(pruneLength:5000)
    }
  }
}`;

const notesQuery = `{
  notes: allBrainNote {
    nodes {
      id
      title
      slug
      childMdx {
        excerpt(pruneLength: 5000)
      }
    }
  }
}`;

function pageToAlgoliaRecord({ id, ...fields }) {
  return {
    objectID: id,
    ...fields,
  };
}

function noteToAlgoliaRecord({ id, childMdx, slug, ...fields }) {
  return {
    objectID: id,
    excerpt: childMdx.excerpt,
    slug: `/notes/${slug}`,
    ...fields,
  };
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.nodes.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },

  {
    query: notesQuery,
    transformer: ({ data }) => data.notes.nodes.map(noteToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
];

module.exports = queries;

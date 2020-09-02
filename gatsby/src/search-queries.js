const indexQuery = `{
  pages: allMdxPost {
    nodes {
      id
      slug
      title
      excerpt(pruneLength:5000)
    }
  }
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
    query: indexQuery,
    transformer: ({ data }) => [
      ...data.pages.nodes.map(pageToAlgoliaRecord),
      ...data.notes.nodes.map(noteToAlgoliaRecord),
    ],
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
];

module.exports = queries;

/** @jsx jsx */
import { createRef, default as React, useState } from "react";
import { jsx, Link as TLink } from "theme-ui";
import algoliasearch from "algoliasearch/lite";
import { Link } from "gatsby";
import {
  InstantSearch,
  Highlight,
  Snippet,
  connectHits,
  connectSearchBox,
  PoweredBy,
} from "react-instantsearch-dom";

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
);

const Hit = ({ hit }) => (
  <div>
    <TLink
      as={Link}
      to={hit.slug}
      sx={{ fontSize: [2, 2, 3], fontWeight: "bold", color: `text` }}
    >
      <Highlight attribute="title" hit={hit} tagName="mark" />
    </TLink>
    <p
      sx={{
        color: `secondary`,
        mt: 1,
        mb: [3, 4],
        a: { color: `secondary` },
        fontSize: [1, 1, 2],
      }}
    >
      <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </p>
  </div>
);

const Hits = ({ hits }) => (
  <div>
    {hits.map((hit) => (
      <Hit key={hit.objectID} hit={hit} />
    ))}
  </div>
);

const CustomHits = connectHits(Hits);

const SearchBox = connectSearchBox(
  ({
    refine,
    createURL,
    isSearchStalled,
    currentRefinement,
    indexContextValue,
    ...rest
  }) => (
    <form sx={{ mb: [3, 4] }}>
      <input
        sx={{
          outline: "none",
          borderRadius: 16,
          backgroundColor: "muted",
          color: "text",
          p: 3,
          border: 0,
        }}
        type="text"
        placeholder="Search here..."
        aria-label="Search"
        onChange={(e) => refine(e.target.value)}
        {...rest}
      />
    </form>
  )
);

const Search = function Search() {
  return (
    <InstantSearch
      indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
      searchClient={searchClient}
    >
      <SearchBox autoFocus={true} />
      <CustomHits />
      <PoweredBy />
    </InstantSearch>
  );
};

export default Search;

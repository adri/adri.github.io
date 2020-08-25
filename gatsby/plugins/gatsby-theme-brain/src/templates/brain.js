import React from "react";
import { graphql } from "gatsby";
import BrainNote from "../components/BrainNote";

export default (props) => {
  return <BrainNote note={props.data.brainNote} linkedNotes={[]} />;
};

export const query = graphql`
  query AdrianBrainNoteBySlug($slug: String!, $references: [String]) {
    brainNote(slug: { eq: $slug }) {
      slug
      title
      inboundReferenceNotes {
        title
        slug
        childMdx {
          excerpt
        }
      }
      inboundReferences
      childMdx {
        body
        excerpt
      }
    }
    allBrainNote(filter: { slug: { in: $references } }) {
      nodes {
        slug
        title
        childMdx {
          excerpt
        }
      }
    }
  }
`;

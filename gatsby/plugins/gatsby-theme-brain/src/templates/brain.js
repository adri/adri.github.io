import React from "react";
import { graphql } from "gatsby";
import BrainNote from "../components/BrainNote";

export default (props) => {
  return <BrainNote note={props.data.brainNote} />;
};

export const query = graphql`
  query AdrianBrainNoteBySlug($slug: String!) {
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
  }
`;

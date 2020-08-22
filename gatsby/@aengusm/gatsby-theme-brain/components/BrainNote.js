/** @jsx jsx */
import React from "react";
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import { Container, Heading, Text, Link as TLink, jsx, Box } from "theme-ui";
import { Link } from "gatsby";
import Portal from "@reach/portal";
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo";

const BrainNote = ({ note, linkedNotes }) => {
  let references = [];
  let referenceBlock;

  if (note.inboundReferenceNotes != null) {
    references = references.concat(
      note.inboundReferenceNotes.map((ref) => (
        <Text mb="4" key={ref.title}>
          <TLink as={Link} to={`/notes/${ref.slug}`}>
            {ref.title}
          </TLink>
          <Text>{ref.childMdx.excerpt}</Text>
        </Text>
      ))
    );
  }

  if (note.inboundReferencePreviews != null) {
    references = references.concat(
      note.inboundReferencePreviews.map((ref) => (
        <Box mb={4} as="article">
          <div dangerouslySetInnerHTML={{ __html: ref.previewHtml }} />
          <em>source:</em>{" "}
          <TLink as={Link} to={`/notes/${ref.source}`}>
            {" "}
            {ref.source}
          </TLink>
        </Box>
      ))
    );
  }

  if (references.length > 0) {
    referenceBlock = (
      <Box mt={6}>
        <Heading mb={3}>Linked references</Heading>
        <Box>{references}</Box>
      </Box>
    );
  }

  return (
    <Layout>
      <SEO title={`Notes on ${note.title}`} />
      <Container variant="narrow">
        <Text sx={{ fontSize: 1, fontStyle: "italic", my: 4 }}>
          These notes are unpolished collections of thoughts, unfinished ideas,
          and things I want to remember later. In the spirit of learning in
          public, I'm sharing them here. Have fun exploring, if you want!
        </Text>

        <div id="brainNote">
          <Heading as="h1" mb={3} sx={{ textTransform: "capitalize" }}>
            {note.title}
          </Heading>
          <MDXRenderer>{note.childMdx.body}</MDXRenderer>
          {referenceBlock}
        </div>
        {linkedNotes &&
          linkedNotes
            .filter(
              (ln) =>
                !(note.inboundReferences || []).includes(ln.slug) &&
                !!ln.childMdx.excerpt
            )
            .map((ln) => (
              <Portal key={ln.slug}>
                <div
                  sx={{
                    position: "fixed",
                    width: 250,
                    backgroundColor: "white",
                    p: 3,
                    boxShadow:
                      "0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05)",
                  }}
                  id={`notes/${ln.slug}`}
                >
                  <Heading as="h4">{ln.title}</Heading>
                  <Text sx={{ fontSize: "0" }}>{ln.childMdx.excerpt}</Text>
                </div>
              </Portal>
            ))}
      </Container>
    </Layout>
  );
};

export default BrainNote;

/** @jsx jsx */
import React from "react";
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import { Container, Heading, Text, Link as TLink, jsx, Box } from "theme-ui";
import { Link } from "gatsby";
import Portal from "@reach/portal";
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo";
import { Disqus } from "gatsby-plugin-disqus";

const px = [`32px`, `16px`, `8px`, `4px`];
const shadow = px.map((v) => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`);

const BrainNote = ({ note, linkedNotes }) => {
  let references = [];
  let referenceBlock;

  if (note.inboundReferenceNotes != null) {
    references = references.concat(
      note.inboundReferenceNotes.map((ref) => (
        <Text mb="3" key={ref.title}>
          <TLink as={Link} to={`/notes/${ref.slug}`}>
            {ref.title}
          </TLink>
        </Text>
      ))
    );
  }

  if (false && note.inboundReferencePreviews != null) {
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
      <Box mt={5}>
        <Heading mb={3}>Links to this note</Heading>
        <Box>{references}</Box>
      </Box>
    );
  }

  return (
    <Layout>
      <SEO title={`Notes on ${note.title}`} />
      <Container variant="narrow">
        <div id="brainNote">
          <Heading as="h1" mb={3} sx={{ textTransform: "capitalize" }}>
            {note.title}
          </Heading>
          <div
            sx={{
              my: 4,
              ".gatsby-resp-image-wrapper": {
                my: [3, 3, 4],
                boxShadow: shadow.join(`, `),
              },
              a: {
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderBottomColor: `primary`,
                "&:hover": {
                  textDecoration: "none",
                },
              },
            }}
          >
            <MDXRenderer>{note.childMdx.body}</MDXRenderer>
          </div>
          {referenceBlock}
          <Text sx={{ fontSize: 1, fontStyle: "italic", my: 4 }}>
            These notes are unpolished collections of thoughts, unfinished
            ideas, and things I want to remember later. In the spirit of
            learning in public, I'm sharing them here. Have fun exploring, if
            you want!
          </Text>

          <div sx={{ mt: 5, a: { color: "primary" }, color: "text" }}>
            <Disqus config={{ identifier: note.slug, title: note.title }} />
          </div>
        </div>
        {false &&
          linkedNotes &&
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

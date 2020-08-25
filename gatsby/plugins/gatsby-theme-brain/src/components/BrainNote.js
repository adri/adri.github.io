/** @jsx jsx */
import React from "react";
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import { Container, Heading, Text, Link as TLink, jsx, Box } from "theme-ui";
import { Link } from "gatsby";
import Portal from "@reach/portal";
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo";
import { Helmet } from "react-helmet";

const px = [`32px`, `16px`, `8px`, `4px`];
const shadow = px.map((v) => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`);

const BrainNote = ({ note }) => {
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
      <SEO title={`${note.title}`} />
      <Helmet>
        <script
          src="https://hypothes.is/embed.js"
          type="text/javascript"
          async
        />
      </Helmet>
      <Container variant="narrow">
        <div id="brainNote">
          <Heading variant="styles.h2">{note.title}</Heading>
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
        </div>
      </Container>
    </Layout>
  );
};

export default BrainNote;

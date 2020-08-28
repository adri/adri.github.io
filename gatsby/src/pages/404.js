/** @jsx jsx */
import { jsx, Heading, section } from "theme-ui";
import React from "react";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";

const PageNotFound = () => (
  <Layout>
    <Heading variant="styles.h2">Not found</Heading>
    <p
      sx={{
        color: `secondary`,
        mt: 2,
        a: { color: `secondary` },
        fontSize: [1, 1, 2],
      }}
    >
      Page was not found.
    </p>
  </Layout>
);
export default PageNotFound;

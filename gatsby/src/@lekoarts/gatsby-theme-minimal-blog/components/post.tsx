/** @jsx jsx */
import { jsx, Heading, section } from "theme-ui";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import Layout from "./layout";
import ItemTags from "@lekoarts/gatsby-theme-minimal-blog/src/components/item-tags";
import SEO from "./seo";
import { Disqus } from "gatsby-plugin-disqus";
import NoteInfo from "./note-info";

type PostProps = {
  data: {
    post: {
      slug: string;
      title: string;
      date: string;
      tags?: {
        name: string;
        slug: string;
      }[];
      description?: string;
      body: string;
      excerpt: string;
      timeToRead?: number;
      banner?: {
        childImageSharp: {
          resize: {
            src: string;
          };
        };
      };
    };
  };
};

const px = [`32px`, `16px`, `8px`, `4px`];
const shadow = px.map((v) => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`);

const Post = ({ data: { post } }: PostProps) => (
  <Layout title={post.title}>
    <SEO
      title={post.title}
      description={post.description ? post.description : post.excerpt}
      image={post.banner ? post.banner.childImageSharp.resize.src : undefined}
      pathname={post.slug}
    />
    <NoteInfo date={post.date} timeToRead={post.timeToRead} />

    <section
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
      <MDXRenderer variant="post">{post.body}</MDXRenderer>
    </section>
    <div sx={{ a: { color: "primary" }, color: "text" }}>
      <Disqus config={{ identifier: post.slug, title: post.title }} />
    </div>
  </Layout>
);
export default Post;
